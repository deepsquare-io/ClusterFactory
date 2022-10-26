# 3. K0s Configuration

## Specifying the hosts

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
  version: '1.25.2+k0s.0'
  dynamicConfig: false
  config:
    apiVersion: k0s.k0sproject.io/v1beta1
    kind: Cluster
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

Check the CIDR and make sure it doesn't conflict with any IP range of your network.

Again, **you should read the specification carefully as the modification of one the k0s field won't be allowed in the future**.

If you wish to use a HA setup, please follow [this guide](/docs/guides/maintenance/high-availability).

After setting up k0s, you can change the `extensions` field. This field can be changed at any time. You can add or change extensions. However, removing an extension is permanent.

## Configuring Traefik

You should configure Traefik, which is the main Ingress and L7 load balancer.

```yaml title="cfctl.yaml > spec > k0s > spec > extensions > helm > charts[]"
- name: traefik
  chartname: traefik/traefik
  version: '17.0.5'
  namespace: traefik
  values: |

    ingressClass:
      enabled: true
      isDefaultClass: true

    service:
      enabled: true
      annotations:
        metallb.universe.tf/address-pool: main-pool
        metallb.universe.tf/allow-shared-ip: traefik-lb-key
      spec:
        externalTrafficPolicy: Cluster
        loadBalancerIP: 192.168.1.100

    providers:
      kubernetesCRD:
        enabled: true
        allowCrossNamespace: true
        allowExternalNameServices: true
        namespaces: []
      kubernetesIngress:
        enabled: true
        allowExternalNameServices: true
        namespaces: []
        ingressClass: traefik
        publishedService:
          enabled: true

    globalArguments:
      - '--global.checknewversion'
      - '--api.dashboard=true'

    additionalArguments:
      - '--entryPoints.websecure.proxyProtocol.insecure'
      - '--entryPoints.websecure.forwardedHeaders.insecure'

    ingressRoute:
      dashboard:
        enabled: false

    ports:
      traefik:
        port: 9000
        expose: false
        exposedPort: 9000
        protocol: TCP
      dns-tcp:
        port: 8053
        expose: true
        exposedPort: 53
        protocol: TCP
      dns-udp:
        port: 8054
        expose: true
        exposedPort: 53
        protocol: UDP
      web:
        port: 80
        expose: true
        exposedPort: 80
        protocol: TCP
      websecure:
        port: 443
        expose: true
        exposedPort: 443
        protocol: TCP
        # You MUST open port 443 UDP!
        # HTTP3 upgrades the connection from TCP to UDP.
        http3: true
        tls:
          enabled: true
      metrics:
        port: 9100
        expose: false
        exposedPort: 9100
        protocol: TCP

    experimental:
      http3:
        enabled: true

    securityContext:
      capabilities:
        drop: [ALL]
        add: [NET_BIND_SERVICE]
      readOnlyRootFilesystem: true
      runAsGroup: 0
      runAsNonRoot: false
      runAsUser: 0

    podSecurityContext:
      fsGroup: 65532
```

Since we are using MetalLB, we select our `IPAddressPool` by using the `metallb.universe.tf/address-pool` annotation. In the next chapter, we will deploy the `IPAddressPool`. For now, let's assume we only need one `IPAddressPool`, which is `main-pool`.

Look for `loadBalancerIP`, the value of that field correspond to an IP address included in the `IPAddressPool`. **This IP address will be exposed to the external network.**

After that, you can add or remove ports. Since Traefik will be used as the main Ingress, these ports will be exposed to the external network.

The IngressClass is `traefik`. If you don't want to use Traefik as the main Ingress, feel free to add an another extension.

We use Traefik because it can do a lot of complex route operations while still being able to do basic HTTP routing.

## Initial Deployment

If you forgot to install the utilities, just run:

```shell title="user@local:/ClusterFactory-CE"
. ./scripts/setup-env
```

Deploy the cluster with:

```shell title="user@local:/ClusterFactory-CE"
# Deploy the cluster
cfctl apply --debug --config ./cfctl.yaml

# Fetch the kubeconfig
cfctl kubeconfig --config ./cfctl.yaml >./kubeconfig
chmod 600 ./kubeconfig
```

You can store the kubeconfig inside `~/.kube/config`. Our recommendation is to set the `KUBECONFIG` environment variable to avoid mixing the Kubernetes contexts. Just like this:

```shell title="user@local:/ClusterFactory-CE"
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
