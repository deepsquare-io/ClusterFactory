# Ejecting a controller

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
