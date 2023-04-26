# 3. K0s Configuration

## Specifying the hosts

Specify the nodes that will be included in the Kubernetes Cluster, which will function as the control plane for managing compute nodes.

A node designated as a **controller** will run the following components:

- An **etcd server**, which serves as the Kubernetes database.
- An **API server**, which serves as the entry point for `kubectl` commands.
- A **Pod scheduler**.
- A **controller-manager**, which acts as the central decision-making component of Kubernetes.
- A **Konnectivity-server**, responsible for facilitating communication between Kubernetes controller and worker nodes.
- A **k0s API**, which serves as the entry point for `k0s` commands.

A node designated as a **worker** will solely run the following components:

- A **kubelet**, which acts as an agent to communicate with the Konnectivity server
- **Containerd** containers, which refer to Pods running on the worker node.

It is crucial to always have an odd number of controllers (1, 3, 5, ...) to prevent the cluster from getting stuck in a deadlock.

Edit the `cfctl.yaml` file. Start with the `hosts` field :

```yaml title=cfctl.yaml
apiVersion: cfctl.clusterfactory.io/v1beta1
kind: Cluster
metadata:
  name: k8s.example.com-cluster
spec:
  hosts:
    - ssh:
        address: 192.168.0.2
        user: root
        port: 22
        keyPath: ~/.ssh/id_ed25519
      role: controller+worker
      noTaints: true
      privateInterface: eno1
      privateAddress: 192.168.0.2
      installFlags:
        - --debug
        - --labels="topology.kubernetes.io/region=ch-sion,topology.kubernetes.io/zone=ch-sion-1"
        - --disable-components coredns
      hooks:
        apply:
          before:
            # Set SELinux Permissive
            - sh -c 'if [ "$(getenforce)" != "Permissive" ] && [ "$(getenforce)" != "Disabled" ]; then sed -i s/^SELINUX=.*$/SELINUX=permissive/ /etc/selinux/config; fi'
            - sh -c 'if [ "$(getenforce)" != "Permissive" ] && [ "$(getenforce)" != "Disabled" ]; then setenforce 0; fi'

  ...
```

Provide each host with a valid IP address that is reachable by k0ctl, and the connection details for an SSH connection. Edit the labels for multi-zone usage.

[See `cfctl.yaml` specification](/docs/reference/cfctl.yaml).

## Configuring the k0s architecture

After you set the `hosts` field, you must configure the k0s architecture by editing the `k0s` field:

```yaml title="cfctl.yaml > spec > k0s"
k0s:
  version: '1.27.1+k0s.0'
  dynamicConfig: false
  config:
    apiVersion: k0s.k0sproject.io/v1beta1
    kind: ClusterConfig
    metadata:
      name: k8s.example.com
    spec:
      api:
        k0sApiPort: 9443
        port: 6443
      installConfig:
        users:
          etcdUser: etcd
          kineUser: kube-apiserver
          konnectivityUser: konnectivity-server
          kubeAPIserverUser: kube-apiserver
          kubeSchedulerUser: kube-scheduler
      konnectivity:
        adminPort: 8133
        agentPort: 8132
      network:
        calico:
          mode: 'vxlan'
          overlay: Always
          mtu: 0
          wireguard: false
        kubeProxy:
          disabled: false
          mode: iptables
        kuberouter:
          autoMTU: true
          mtu: 0
          peerRouterASNs: ''
          peerRouterIPs: ''
        podCIDR: 10.244.0.0/16
        provider: calico
        serviceCIDR: 10.96.0.0/12
      podSecurityPolicy:
        defaultPolicy: 00-k0s-privileged
      storage:
        type: etcd
      telemetry:
        enabled: false
```

Most of the values are already sane but you should check if the CIDR doesn't conflict with any IP range of your network. It is also recommended to tune manually the MTU and match it to your switch and router values.

If you wish to use a HA setup, please follow [this guide](/docs/guides/maintenance/high-availability).

## Initial Deployment

:::tip

If you forgot to install the utilities, just run:

```shell title="user@local:/ClusterFactory"
. ./scripts/setup-env
```

:::

Deploy the cluster with:

```shell title="user@local:/ClusterFactory"
# Deploy the cluster
cfctl apply --debug --config ./cfctl.yaml

# Fetch the kubeconfig
cfctl kubeconfig --config ./cfctl.yaml >./kubeconfig
chmod 600 ./kubeconfig
```

You can store the kubeconfig inside `~/.kube/config`. Our recommendation is to set the `KUBECONFIG` environment variable to avoid mixing the Kubernetes contexts. Just like this:

```shell title="user@local:/ClusterFactory"
cfctl kubeconfig --config ./cfctl.yaml >./kubeconfig
chmod 600 ./kubeconfig
export KUBECONFIG=$(pwd)/kubeconfig
```

Just make sure to verify which configuration you are using with `kubectl config current-context`. You can add an alias to your favorite shell:

```shell
alias kubectx="kubectl config current-context"
```

Congratulation, you have deployed your Kubernetes cluster! However, it's still missing a few core features:

- MetalLB advertisements, for Load Balancing
- CoreDNS, which is the internal DNS for Kubernetes
- KubeVirt, to deploy VM workloads
- Multus CNI, to support multiple network interfaces
- Sealed Secrets, secret management optimized for GitOps
- Cert-manager issuers, to generate your SSL certificates and enable, for free, TLS configuration.
- Argo CD, to enable GitOps.
- Traefik, as an Ingress Controller
