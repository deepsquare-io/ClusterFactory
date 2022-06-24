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
      hooks:
        apply:
          before:
            # Set SELinux Permissive
            - sh -c 'if [ "$(getenforce)" = "Permissive" ]; then sed -i s/^SELINUX=.*$/SELINUX=permissive/ /etc/selinux/config; fi'
            - sh -c 'if [ "$(getenforce)" = "Permissive" ]; then setenforce 0; fi'

  ...
```

Provide each host with a valid IP address that is reachable by k0ctl, and the connection details for an SSH connection. Edit the labels for multi-zone usage.

[The `cfctl.yaml` specification is written in the repository of cfctl](https://github.com/SquareFactory/cfctl#spec-fields).

**You should read the specification carefully as the modification of one the host field won't be allowed in the future**.

If you wish to use a HA setup, please follow [this guide](https://docs.k0sproject.io/v1.23.6+k0s.0/high-availability/).

## Configuring the k0s architecture

After you set the `hosts` field, you must configure the k0s architecture by editing the `k0s` field:

```yaml title="cfctl.yaml > spec > k0s"
k0s:
  version: '1.23.8+k0s.0'
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

Again, **You should read the specification carefully as the modification of one the k0s field won't be allowed in the future**.

If you wish to use a HA setup, please follow [this guide](https://docs.k0sproject.io/v1.23.6+k0s.0/high-availability/).

After setting up k0s, you can change the `extensions` field. This field can be changed at any time. You can add or change extensions. However, removing an extension is permanent.

## Configuring MetalLB

Start with `metallb`. MetalLB is a L2/L3 load balancer designed for bare metal Kubernetes clusters. It exposes the kubernetes `Services` to the external network. It uses either L2 or BGP to advertise routes. The network indicated by `metallb` must be outside the network when using BGP. Otherwise, when using L2, the network must be the same as your private network. For multi-zone clusters, you MUST use BGP.

<div style={{textAlign: 'center'}}>

![metallb_concepts](02-k0s-configuration.assets/metallb_concepts.png#white-bg)

</div>

:::note

MetalLB 0.13.0 will allow you to create "zoned" L2 announcements, which means you can make ARP calls by zone.

More precisely, this means that you can allow `192.168.0.100` in the network `192.168.0.0/24` in one zone, and `172.24.0.100` in the network `172.24.0.0/18` in an another zone, which means that you wouldn't need BGP anymore.

However, MetalLB 0.13.0 is not yet available at the time of writing.

:::

Your router must be capable of using BGP. If not, you should use an appliance with BGP capabilities (like pfSense, or just a Linux machine with BIRD).

```yaml title="cfctl.yaml > spec > k0s > spec > extensions > helm > charts[]"
- name: metallb
  chartname: bitnami/metallb
  version: '3.0.9'
  namespace: metallb
  values: |

    configInline:
      peers:
        - peer-address: 192.168.0.1
          peer-asn: 65000
          my-asn: 65001
          source-address: 192.168.0.2
          node-selectors:
            - match-labels:
                kubernetes.io/hostname: mn1.at1.example.com
        - peer-address: 10.10.2.1
          peer-asn: 65002
          my-asn: 65001
          source-address: 10.10.2.2
          node-selectors:
            - match-labels:
                kubernetes.io/hostname: mn1.ch1.example.com

      address-pools:
        - name: main-pool
          protocol: bgp
          addresses:
            - 192.168.1.100/32
```

[Use L2 if you have only one zone](https://metallb.universe.tf/configuration/#layer-2-configuration).

```yaml title="cfctl.yaml > spec > k0s > spec > extensions > helm > charts[]"
- name: metallb
  chartname: bitnami/metallb
  version: '3.0.9'
  namespace: metallb
  values: |

    configInline:
      address-pools:
        - name: main-pool
          protocol: layer2
          addresses:
            - 192.168.1.100/32
```

## Configuring Traefik

After configuring the Load Balancer, you should configure Traefik, the main Ingress and L7 load balancer.

```yaml title="cfctl.yaml > spec > k0s > spec > extensions > helm > charts[]"
- name: traefik
  chartname: traefik/traefik
  version: '10.22.0'
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
        # NOTE: use cert-manager.
        tls:
          enabled: false
      metrics:
        port: 9100
        expose: false
        exposedPort: 9100
        protocol: TCP

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

Look for `loadBalancerIP` and use the IPs from the MetalLB.

Add or remove ports. Since Traefik will be used as the main Ingress, these ports will be exposed to the external network.

The IngressClass is `traefik`. If you don't want to use Traefik, feel free to add another extension.

We use Traefik because it can do a lot of complex route operations while still being able to do basic HTTP routing.

## Initial Deployment

Run the `1.deploy-k0s.sh` script to deploy the cluster. This script will also download the utilities `cfctl`, `kubectl` and `kubeseal` if not found in `PATH`.

You can re-run the scripts if you modify the `cfctl.yaml` file.

Or, you can run `cfctl` manually:

```shell title="user@local:/ClusterFactory-CE"
PATH="$(pwd)/bin:${PATH}"
cfctl apply --debug --config ./cfctl.yaml

# Fetch the kubeconfig
cfctl kubeconfig --config ./cfctl.yaml >./kubeconfig
```

Store the kubeconfig inside `~/.kube/config`, or just `export KUBECONFIG=$(pwd)/kubeconfig`.

Just make sure to verify which configuration you are using with `kubectl config view`.

Congratulation, you have deployed your Kubernetes cluster! However, it's still missing a few core features:

- KubeVirt, to deploy VM workloads
- Multus CNI, to support multiple network interfaces
- Sealed Secrets, secret management optimized for GitOps
- Cert-manager issuers, to generate your SSL certificates and enable, for free, TLS configuration.
- Argo CD, to enable GitOps.
- CoreDNS configurations
