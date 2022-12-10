# 4. Core Apps Deployment

We will deploy:

- Traefik, the Ingress Controller
- MetalLB advertisements, for Load Balancing
- CoreDNS, the internal DNS for Kubernetes
- Sealed Secrets, secret management optimized for GitOps
- Cert-manager issuers, to generate your SSL certificates and enable, for free, TLS configuration.
- Argo CD, to enable GitOps.
- Multus CNI, to support multiple network interfaces
- KubeVirt, to deploy VM workloads

## Configuring MetalLB

MetalLB is a L2/L3 load balancer designed for bare metal Kubernetes clusters. It exposes the kubernetes `Services` to the external network. It uses either L2 (ARP) or BGP to advertise routes. It is possible to make "zoned" advertisements with L2, but we heavily recommend to use BGP for multi-zone clusters.

<div style={{textAlign: 'center'}}>

![metallb_concepts](02-k0s-configuration.assets/metallb_concepts.png#white-bg)

</div>

### Multi-zone (BGP)

This is the most stable solution, the router must be capable of using BGP. If not, you should use an appliance with BGP capabilities (like OPNsense, OpenWRT, vyOS, or Linux with BIRD) which can act like a router.

Let's start configuring the main `IPAddressPool`:

```yaml title="core/metallb/address-pools.yaml"
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: main-pool
  namespace: metallb
spec:
  addresses:
    - 192.168.1.100/32
```

The indicated IP address will be allocated to the `LoadBalancer` Kubernetes Services, which is Traefik.

We should now advertise the IP address by configuring a `BGPAdvertisement` and its peers:

```yaml title="core/metallb/peers.yaml"
apiVersion: metallb.io/v1beta2
kind: BGPPeer
metadata:
  name: main-router
  namespace: metallb
spec:
  myASN: 65001 # MetalLB Speaker ASN (Autonomous System Number)
  peerASN: 65000 # The router ASN
  peerAddress: 192.168.0.1 # The router address
```

```yaml title="core/metallb/advertisements.yaml"
apiVersion: metallb.io/v1beta1
kind: BGPAdvertisement
metadata:
  name: bgp-advertisement
  namespace: metallb
spec:
  ipAddressPools:
    - main-pool
```

With this configuration, the MetalLB speakers on all the nodes will advertise the IP address `192.168.1.100/32` to the router, which is at `192.168.0.1`. By receiving the advertisement, the router will create a BGP route `192.168.1.100/32 via <ip of the node>`.

### Single zone (L2/ARP)

Let's start configuring the main `IPAddressPool`:

```yaml title="core/metallb/address-pools.yaml"
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: main-pool
  namespace: metallb
spec:
  addresses:
    - 192.168.1.100/32
```

The indicated IP address will be allocated to the `LoadBalancer` Kubernetes Services, which is Traefik.

We should now advertise the IP address by configuring a `L2Advertisement`:

```yaml title="core/metallb/advertisements.yaml"
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: l2-advertisement
  namespace: metallb
spec:
  ipAddressPools:
    - main-pool
```

That's all! The MetalLB speakers on all the nodes will advertise the IP address `192.168.1.100/32` to the router via ARP. By receiving the advertisement, the router will create a BGP route `192.168.1.100/32 via <ip of the node>`.

## Configuring Traefik

You should configure Traefik, which is the main Ingress and L7 load balancer. `core/traefik/values.yaml` is the main configuration file.

You should look for `loadBalancerIP` and the `metallb.universe.tf` annotations:

```yaml title="core/traefik/values.yaml"
service:
  enabled: true
  annotations:
    metallb.universe.tf/address-pool: main-pool
    metallb.universe.tf/allow-shared-ip: traefik-lb-key
  spec:
    externalTrafficPolicy: Cluster
    loadBalancerIP: 192.168.1.100
```

Since we are using MetalLB, we select our `IPAddressPool` by using the `metallb.universe.tf/address-pool` annotation.

The value of the `loadBalancerIP` correspond to an IP address included in the `IPAddressPool`. **This IP address will be exposed to the external network.**

After that, you can add or remove ports:

```yaml title="core/traefik/values.yaml"
ports:
  traefik:
    port: 9000
    expose: true
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
    http3:
      enabled: true
    tls:
      enabled: true
  metrics:
    port: 9100
    expose: false
    exposedPort: 9100
    protocol: TCP
```

Since Traefik will be used as the main Ingress, these ports will be exposed to the external network if `expose` is set to true.

You can also configure the dashboard route:

```yaml
ingressRoute:
  dashboard:
    enabled: true
    # See your DNS configuration
    matchRule: Host(`traefik.internal`)
    entryPoints: ['traefik']
```

This means that the Traefik dashboard is accessible to `traefik.internel` on the `traefik` entry point, which is the 9000/tcp port. In short: [http://traefik.internal:9000/dashboard/](http://traefik.internal:9000/dashboard/) (the trailing slash is important).

Your DNS should be configured to redirect `traefik.internal` to the load balancer at `192.168.1.100`. Fortunately, we can configure and expose our own DNS.

## CoreDNS configuration

The CoreDNS given by k0s does not meet our needs, so we added `--disable-components coredns` in the `installFlags` of `cfctl.yaml`. We will deploy our own.

CoreDNS will be exposed to the external network thanks to the `IngressRoute` objects in the [`core/coredns/overlays/prod/ingress-route.yaml`](https://github.com/SquareFactory/ClusterFactory/blob/main/core.example/coredns/overlays/prod/ingress-route.yaml). **It is also exposed using `hostPort` ([`core/coredns/overlays/prod/daemonset.yaml`](https://github.com/SquareFactory/ClusterFactory/blob/main/core.example/coredns/overlays/prod/daemonset.yaml)).**

:::caution

Since `hostPort` will be used, make sure the host does not have port 53/udp busy. On most systems with SystemD, this port is occupied by a stub listener. Open the `/etc/systemd/resolved.conf` configuration file on the host and disable the stub listener by setting `DNSStubListener` to `no`. Finally, restart the service with `systemctl restart systemd-resolved.service`.

If this is an unwanted feature (because you are using an other DNS for example), feel free to remove the routes and close the ports in the Traefik configuration.

```shell title="user@local:/ClusterFactory"
rm core/coredns/overlays/prod/ingress-route.yaml
```

```diff title="core/traefik/values.yaml"
ports:
  traefik:
    port: 9000
    expose: false
    exposedPort: 9000
    protocol: TCP
- dns-tcp:
-   port: 8053
-   expose: true
-   exposedPort: 53
-   protocol: TCP
- dns-udp:
-   port: 8054
-   expose: true
-   exposedPort: 53
-   protocol: UDP
```

```diff title="core/coredns/overlays/prod/daemonset.yaml"
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: coredns
spec:
  template:
    spec:
      containers:
        - name: coredns
-         ports:
-           - name: dns
-             containerPort: 53
-             hostPort: 53
-             protocol: UDP
-           - name: dns-tcp
-             containerPort: 53
-             hostPort: 53
-             protocol: TCP
      volumes:
        - name: config-volume
          configMap:
            name: coredns
            items:
              - key: Corefile
                path: Corefile
              - key: example.com.db
                path: example.com.db
              - key: internal.db
                path: internal.db
            defaultMode: 420

```

```shell title="user@local:/ClusterFactory"
./scripts/deploy-core
```

:::

The files that you should look for are [`core/coredns/overlays/prod/configmap.yaml`](https://github.com/SquareFactory/ClusterFactory/blob/main/core.example/coredns/overlays/prod/configmap.yaml) and [`core/coredns/overlays/prod/deployment.yaml`](https://github.com/SquareFactory/ClusterFactory/blob/main/core.example/coredns/overlays/prod/deployment.yaml).

Inside the `ConfigMap`, you'll find:

```yaml title="core/coredns/overlays/prod/configmap.yaml"
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
  labels:
    k0s.k0sproject.io/stack: coredns
data:
  Corefile: |
    .:53 {
      errors
      health {
        lameduck 5s
      }
      ready
      kubernetes cluster.local in-addr.arpa ip6.arpa {
        pods insecure
        fallthrough in-addr.arpa ip6.arpa
        ttl 30
      }
      prometheus :9153
      forward . 8.8.8.8
      cache 30
      loop
      reload
      loadbalance
      }
      internal:53 {
        log
        errors
        ready
        hosts /etc/coredns/internal.db
        reload
      }
      example.com:53 {
        log
        errors
        ready
        hosts /etc/coredns/example.com.db
        reload
      }

  internal.db: |
    192.168.1.100 traefik.internal
    192.168.1.100 argocd.internal

  example.com.db: |
    # Examples of external services
    192.168.0.1 gateway.example.com
    192.168.0.2 mn1.example.com
    192.168.0.3 xcatmn.example.com
    192.168.0.5 cvmfs.example.com
    192.168.0.6 nfs.example.com
    192.168.0.7 mysql.example.com
    192.168.0.8 ldap.example.com

    192.168.0.10 slurm-cluster-example-controller-0.example.com
    192.168.0.20 slurm-cluster-example-login-0.example.com
    192.168.0.21 slurm-cluster-example-login-1.example.com
    192.168.0.51 cn1.example.com

    # Internal services
    192.168.1.100 prometheus.example.com
    192.168.1.100 grafana.example.com
```

Change the zones with your own and eventually change the `forward` field with your preferred DNS.
Change, add or remove service names as you wish. The `example.com.db` is only an example.

You should configure the DNS of the machines to use CoreDNS.

```conf title="resolv.conf"
nameserver 192.168.1.100
search example.com
```

:::note

If some files were added and removed, you must change the `deployment.yaml`:

```diff title="core/coredns/overlays/prod/deployment.yaml > spec > template > spec > volumes"
        volumes:
          - name: config-volume
            configMap:
              name: coredns
              items:
                - key: Corefile
                  path: Corefile
                - key: example.com.db
                  path: example.com.db
                - key: internal.db
                  path: internal.db
+               - key: your.new.file.db
+                 path: your.new.file.db
              defaultMode: 420
```

:::note

## Configure the cert-manager issuers

Specify new certificate issuers in the `core/cert-manager` directory.

If you wish to add your private certificate authority, follow the [official guide of cert-manager](https://cert-manager.io/docs/configuration/ca/).

```yaml title="private-cluster-issuer.yaml"
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: private-cluster-issuer
  namespace: cert-manager
spec:
  ca:
    secretName: ca-key-pair
```

If you wish to use ACME HTTP-01, follow [this guide](https://cert-manager.io/docs/configuration/acme/http01/). This will create an Ingress by using the `ingress` field.

```yaml title="public-cluster-issuer.yaml"
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: public-cluster-issuer
  namespace: cert-manager
spec:
  acme:
    email: john.smith@example.com
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: public-cluster-issuer-account-key
    solvers:
      - http01:
          ingress:
            class: traefik
```

## Configure the route and certificate for the ArgoCD dashboard

ArgoCD has a dashboard. To change the address and certificate, modify the `ingress-route.yaml` file and `certificate.yaml` in the `core/argo-cd` directory.

**Make sure the addresses correspond to the ones defined in the CoreDNS (or in your private DNS).**

```yaml title="Example of ingress-route.yaml for ArgoCD"
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: argocd-server-https
  namespace: argocd
  labels:
    app.kubernetes.io/name: argocd-server-https
    app.kubernetes.io/component: ingress-route
spec:
  entryPoints:
    - websecure
  routes:
    - kind: Rule
      match: Host(`argocd.internal`)
      priority: 10
      services:
        - name: argocd-server
          port: 80
    - kind: Rule
      match: Host(`argocd.internal`) && HeadersRegexp(`Content-Type`, `^application/grpc.*$`)
      priority: 11
      services:
        - name: argocd-server
          port: 80
          scheme: h2c
  tls:
    secretName: argocd.internal-secret
```

IngressRoute allows us to create more complex routing rules than the classic Ingress. However, Ingress can automatically generate a TLS certificate by using annotations, without the need to create a Certificate resource.

Example:

```yaml title="ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: grafana-ingress
  labels:
    app.kubernetes.io/name: grafana-ingress
    app.kubernetes.io/component: ingress
  annotations:
    cert-manager.io/cluster-issuer: selfsigned-cluster-issuer
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
    traefik.ingress.kubernetes.io/router.tls: 'true'
spec:
  ingressClassName: traefik
  rules:
    - host: grafana.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: grafana
                port:
                  number: 80
  tls:
    - hosts:
        - grafana.example.com
      secretName: grafana.example.com-secret
```

Our recommendation is to use Ingress for simple routes with HTTP. Otherwise, IngressRoute is the best solution for all the cases.

## Deploying the core apps

Run the `./scripts/deploy-core` script to deploy the core applications. This should deploy:

- Traefik
- CoreDNS
- MetalLB
- MultusCNI
- sealed-secrets
- cert-manager
- ArgoCD

If the script fails, you can run it again without harming the cluster.

If CoreDNS and the IngressRoutes are configured, you should be able to access the ArgoCD dashboard and Traefik dashboard.

Congratulations! You have successfully deployed a Kubernetes Cluster with the minimum requirements. We still recommend to deploy the Monitoring stack to monitor the RAM and CPU usage of the containers. Nevertheless, you can follow the [guides](/docs/guides), learn the [main concepts of ClusterFactory](/docs/main-concepts/k0s), or continue the [Getting Started](./argo-apps-deployment).
