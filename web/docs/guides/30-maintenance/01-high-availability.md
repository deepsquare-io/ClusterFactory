# Creating a highly available cluster

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

You can set up a HA cluster any time without destroying your old cluster.

:::

This guide is about setting up a highly available Kubernetes cluster with stacked control plane nodes. The etcd members and control plane nodes are co-located.

We use HAProxy for the Load Balancer of the control plane.

## The architecture of a High-Available Kubernetes cluster

To set up a highly available Kubernetes cluster, you need:

- A load balancer (a cloud load balancer or HAProxy) which can route the traffic to the control plane nodes and to the following ports.
  - 6443 (for Kubernetes API)
  - 8132 (for Konnectivity)
  - 9443 (for controller join API)
- 3 or more machines, preferably one per failure zone. Having an odd number of control plane nodes can help with leader selection in the case of machine or zone failure.

<div style={{textAlign: 'center'}}>

![high-availability_overview](03-high-availability.assets/high-availability_overview.png#white-bg)

</div>

The kubectl will connect to the load-balancer.

## Setting up the HA cluster

### 1. Setting up HAProxy

1. On a machine able to route the traffic to all the control plane nodes, install HAProxy:

<Tabs groupId="os">
  <TabItem value="dnf" label="dnf" default>

```shell title="root@haproxy"
dnf install haproxy
```

  </TabItem>
  <TabItem value="apt" label="apt" default>

```shell title="root@haproxy"
apt install haproxy
```

  </TabItem>
</Tabs>

2. Edit `/etc/haproxy/haproxy.cfg`:

```properties title="/etc/haproxy/haproxy.cfg"
global
    log         127.0.0.1 local2

    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon

    # turn on stats unix socket
    stats socket /var/lib/haproxy/stats

    # utilize system-wide crypto-policies
    ssl-default-bind-ciphers PROFILE=SYSTEM
    ssl-default-server-ciphers PROFILE=SYSTEM

defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    timeout connect         10s
    timeout client          86400s
    timeout server          86400s
    timeout tunnel          86400s
    maxconn                 3000

# Fronends
frontend kubeAPI
    bind :6443
    mode tcp
    default_backend kubeAPI_backend
frontend konnectivity
    bind :8132
    mode tcp
    default_backend konnectivity_backend
frontend controllerJoinAPI
    bind :9443
    mode tcp
    default_backend controllerJoinAPI_backend

# Backends
backend kubeAPI_backend
    mode tcp
    balance leastconn
    server k0s-ch-sion-1 10.10.0.2:6443 check check-ssl verify none
    server k0s-at-vie-1 10.10.1.2:6443 check check-ssl verify none
    server k0s-de-fra-1 10.10.2.2:6443 check check-ssl verify none
backend konnectivity_backend
    mode tcp
    balance leastconn
    server k0s-ch-sion-1 10.10.0.2:8132 check check-ssl verify none
    server k0s-at-vie-1 10.10.1.2:8132 check check-ssl verify none
    server k0s-de-fra-1 10.10.2.2:8132 check check-ssl verify none
backend controllerJoinAPI_backend
    mode tcp
    balance leastconn
    server k0s-ch-sion-1 10.10.0.2:9443 check check-ssl verify none
    server k0s-at-vie-1 10.10.1.2:9443 check check-ssl verify none
    server k0s-de-fra-1 10.10.2.2:9443 check check-ssl verify none

# Listen
listen stats
    bind *:9000
    mode http
    stats enable
    stats uri /
```

### 2. Editing `cfctl.yaml` to set up the nodes

```yaml title="cfctl.yaml"
apiVersion: cfctl.clusterfactory.io/v1beta1
kind: Cluster
metadata:
  name: k8s.example.com-cluster
spec:
  hosts:
    - ssh:
        address: 10.10.0.2
        user: root
        port: 22
        keyPath: ~/.ssh/id_ed25519
      role: controller+worker
      noTaints: true
      privateInterface: eth0
      privateAddress: 10.10.0.2
      installFlags:
        - --debug
        - --labels="topology.kubernetes.io/region=ch-sion,topology.kubernetes.io/zone=ch-sion-1"
      hooks:
        apply:
          before:
            # Set SELinux Permissive
            - sh -c 'if [ "$(getenforce)" != "Permissive" ]; then sed -i s/^SELINUX=.*$/SELINUX=permissive/ /etc/selinux/config; fi'
            - sh -c 'if [ "$(getenforce)" != "Permissive" ]; then setenforce 0; fi'

    - ssh:
        address: 10.10.1.2
        user: root
        port: 22
        keyPath: ~/.ssh/id_ed25519
      role: controller+worker
      noTaints: true
      privateInterface: eth0
      privateAddress: 10.10.1.2
      installFlags:
        - --debug
        - --labels="topology.kubernetes.io/region=at-vie,topology.kubernetes.io/zone=at-vie-1"
      hooks:
        apply:
          before:
            # Set SELinux Permissive
            - sh -c 'if [ "$(getenforce)" != "Permissive" ]; then sed -i s/^SELINUX=.*$/SELINUX=permissive/ /etc/selinux/config; fi'
            - sh -c 'if [ "$(getenforce)" != "Permissive" ]; then setenforce 0; fi'

    - ssh:
        address: 10.10.3.2
        user: root
        port: 22
        keyPath: ~/.ssh/id_ed25519
      role: controller+worker
      noTaints: true
      privateInterface: eth0
      privateAddress: 10.10.3.2
      installFlags:
        - --debug
        - --labels="topology.kubernetes.io/region=de-fra,topology.kubernetes.io/zone=de-fra-1"
      hooks:
        apply:
          before:
            # Set SELinux Permissive
            - sh -c 'if [ "$(getenforce)" != "Permissive" ]; then sed -i s/^SELINUX=.*$/SELINUX=permissive/ /etc/selinux/config; fi'
            - sh -c 'if [ "$(getenforce)" != "Permissive" ]; then setenforce 0; fi'

  k0s:
    ...

    config:
      ...

      spec:
        api:
          k0sApiPort: 9443
          port: 6443
          externalAddress: 10.10.4.10 # LB address
          sans:
            - 10.10.4.10
```

Apply the config and be patient:

```shell
cfctl apply --debug --config=cfctl.yaml
```

### Verify everything is good

```shell
cfctl kubeconfig --config ./cfctl.yaml >./kubeconfig
chmod 600 ./kubeconfig
export KUBECONFIG="$(pwd)/kubeconfig"
kubectl get nodes
# NAME            STATUS   ROLES           AGE     VERSION
# k0s-ch-sion-1   Ready    control-plane   61d     v1.23.6+k0s
# k0s-at-vie-1    Ready    control-plane   3d22h   v1.23.6+k0s
# k0s-de-fra-1    Ready    control-plane   4d      v1.23.6+k0s
```

**On a controller node**:

```shell
# Install etcdctl
ETCD_VER=v3.5.2
OS=linux
ARCH=amd64
curl -fsSL https://github.com/etcd-io/etcd/releases/download/${ETCD_VER}/etcd-${ETCD_VER}-${OS}-${ARCH}.tar.gz | tar -xvzf - "etcd-${ETCD_VER}-${OS}-${ARCH}/etcdctl"
mkdir -p /usr/local/bin/
mv "etcd-${ETCD_VER}-${OS}-${ARCH}/etcdctl" /usr/local/bin/etcdctl
rmdir "etcd-${ETCD_VER}-${OS}-${ARCH}"

# Verify
etcdctl --endpoints=https://127.0.0.1:2379 --key=/var/lib/k0s/pki/etcd/server.key --cert=/var/lib/k0s/pki/etcd/server.crt --insecure-skip-tls-verify member list
# abcdef1234567890, started, k0s-ch-sion-1, https://10.10.0.2:2380, https://127.0.0.1:2379, false
# deadcafe12345678, started, k0s-at-vie-1, https://10.10.1.2:2380, https://127.0.0.1:2379, false
# deaddead12345678, started, k0s-de-fra-1, https://10.10.2.2:2380, https://127.0.0.1:2379, false
```

## Ejecting a controller

1. Cordon the node

```shell
kubectl cordon <node>
```

2. Drain the node

```shell
kubectl drain <node>
```

3. Delete the node

```shell
kubectl delete <node>
```

**Remove the node from `cfctl.yaml`.**

4. Remove the controller from ETCD.

**On a controller node, install etcdctl**:

```shell title="root@k0s-ch-sion-1"
ETCD_VER=v3.5.2
OS=linux
ARCH=amd64
curl -fsSL https://github.com/etcd-io/etcd/releases/download/${ETCD_VER}/etcd-${ETCD_VER}-${OS}-${ARCH}.tar.gz | tar -xvzf - "etcd-${ETCD_VER}-${OS}-${ARCH}/etcdctl"
mkdir -p /usr/local/bin/
mv "etcd-${ETCD_VER}-${OS}-${ARCH}/etcdctl" /usr/local/bin/etcdctl
rmdir "etcd-${ETCD_VER}-${OS}-${ARCH}"
```

**Find the node to be removed**:

```shell title="root@controller"
etcdctl --endpoints=https://127.0.0.1:2379 --key=/var/lib/k0s/pki/etcd/server.key --cert=/var/lib/k0s/pki/etcd/server.crt --insecure-skip-tls-verify member list
# abcdef1234567890, started, controller, https://10.10.0.2:2380, https://127.0.0.1:2379, false
# deadcafe12345678, started, controller-to-be-removed, https://10.10.1.2:2380, https://127.0.0.1:2379, false
```

**And remove it**:

```shell title="root@controller"
etcdctl --endpoints=https://127.0.0.1:2379 --key=/var/lib/k0s/pki/etcd/server.key --cert=/var/lib/k0s/pki/etcd/server.crt --insecure-skip-tls-verify member remove <id>
```

5. On the node to be removed, you can delete the `/etc/cni` and `/opt/cni` directories.

```shell title="root@controller-to-be-removed"
rm -rf /etc/cni /opt/cni
```

6. On the node to be removed, you can uninstall k0s:

```shell title="root@controller-to-be-removed
systemctl stop k0scontroller.service
k0s reset
```
