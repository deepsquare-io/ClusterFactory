# 3. Core Apps Deployment

We will deploy:

- A new CoreDNS configuration
- Sealed Secrets, secret management optimized for GitOps
- Cert-manager issuers, to generate your SSL certificates and enable, for free, TLS configuration.
- Argo CD, to enable GitOps.
- Multus CNI, to support multiple network interfaces
- KubeVirt, to deploy VM workloads

## CoreDNS configuration

The initial configuration of CoreDNS given by k0s does not fulfil our needs. This is why we are applying a new configuration.

CoreDNS is exposed to the external network thanks to the `IngressRoute` objects in the [`core/coredns/overlays/prod/ingress-route.yml`](https://github.com/SquareFactory/cluster-factory-ce/blob/main/core.example/coredns/overlays/prod/ingress-route.yml).

If this is an unwanted feature (because you are using an other DNS for example), feel free to remove the routes and close the ports in the Traefik extension specification inside `k0sctl.yaml`.

The files that you should look for are [`core/coredns/overlays/prod/configmap.yml`](https://github.com/SquareFactory/cluster-factory-ce/blob/main/core.example/coredns/overlays/prod/configmap.yml) and [`core/coredns/overlays/prod/deployment.yml`](https://github.com/SquareFactory/cluster-factory-ce/blob/main/core.example/coredns/overlays/prod/deployment.yml).

Inside the `ConfigMap`, you'll find:

```yaml title="core/coredns/overlays/prod/configmap.yml"
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
        ttl 30
        fallthrough in-addr.arpa ip6.arpa
      }
      prometheus :9153
      forward . tls://9.9.9.9
      reload
    }
    example.com:53 {
      log
      errors
      ready
      hosts /etc/coredns/example.com.db
      reload
    }

  example.com.db: |
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

    192.168.1.100 metallb-0.example.com
    192.168.1.100 argocd.example.com
    192.168.1.100 traefik.example.com
    192.168.1.100 prometheus.example.com
    192.168.1.100 grafana.example.com
```

Change the zones with yours and, eventually, change the `forward` field to your favorite DNS.

You should configure the DNS of the machines to use CoreDNS.

```conf title="resolv.conf"
nameserver 192.168.1.100
search example.com
```

:::note

If some files were added and removed, you must change the `deployment.yml`:

```diff title="core/coredns/overlays/prod/deployment.yml > spec > template > spec > volumes"
        volumes:
          - name: config-volume
            configMap:
              name: coredns
              items:
                - key: Corefile
                  path: Corefile
                - key: example.com.db
                  path: example.com.db
+               - key: ch1.example.com.db
+                 path: ch1.example.com.db
              defaultMode: 420
```

:::note

### Configure the cert-manager issuers

Specify new certificate issuers in the `core/cert-manager` directory.

If you wish to add your private certificate authority, follow the [official guide of cert-manager](https://cert-manager.io/docs/configuration/ca/).

```yaml title="private-cluster-issuer.yml"
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

```yaml title="public-cluster-issuer.yml"
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

## Configure the routes and certificates for the dashboards

Argo CD and Traefik have dashboards. To change the addresses and certificates, modify the `ingress-route.yml` file and `certificate.yml` in the directories `core/argo-cd` and `core/traefik`.

Make sure the addresses correspond to the ones defined in the CoreDNS (or in your private DNS).

```yaml title="Example of ingress-route.yml for Traefik"
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-dashboard-https
  labels:
    app.kubernetes.io/name: traefik-dashboard-https
    app.kubernetes.io/component: ingress-route
spec:
  entryPoints:
    - websecure
  routes:
    - match: 'Host(`traefik.example.com`)'
      kind: Rule
      middlewares:
        - name: redirect-dashboard
      services:
        - name: api@internal
          kind: TraefikService
  tls:
    secretName: traefik.example.com-secret
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-dashboard-http
  labels:
    app.kubernetes.io/name: traefik-dashboard-http
    app.kubernetes.io/component: ingress-route
spec:
  entryPoints:
    - web
  routes:
    - match: 'Host(`traefik.example.com`)'
      kind: Rule
      middlewares:
        - name: redirect-https
      services:
        - name: noop@internal
          kind: TraefikService
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

### (optional) Configure KubeVirt

If you do not want to deploy KubeVirt in all zones, you can edit [`core/kubevirt/overlays/prod/kubevirt-cr.yaml`](https://github.dev/SquareFactory/cluster-factory-ce/blob/main/core.example/kubevirt/overlays/prod/kubevirt-cr.yaml).

```yaml title="core/kubevirt/overlays/prod/kubevirt-cr.yaml"
apiVersion: kubevirt.io/v1
kind: KubeVirt
metadata:
  name: kubevirt
  namespace: kubevirt
spec:
  infra:
    nodePlacement:
      nodeSelector:
        node-role.kubernetes.io/control-plane: 'true' # Restrict virt-controller and virt-api pods to only run on the control-plane nodes.
  workloads:
    nodePlacement:
      nodeSelector: {} # Allow the virt-handler pods to only on all nodes
```

## Deploying the core apps

Run the `2.deploy-core-apps.sh` script to deploy the cluster.

Congratulations! You have successfully deployed a Kubernetes Cluster with the minimum requirements. We still recommend to deploy the Monitoring stack to monitor the RAM and CPU usage of the containers. Nevertheless, you can follow the [guides](/docs/guides), learn the [main concepts of ClusterFactory](/docs/main-concepts/k0s), or continue the [Getting Started](./argo-apps-deployment).

:::note

You may notice that the installation of Argo CD and Sealed Secrets could have been done using `k0sctl.yaml`.

However, we found that this would cause coupling problems with `k0sctl` (for example, you would have to redeploy the k0s cluster every time you need to update Argo CD, which means downtime).

We believe that the `extensions` field in `k0sctl.yaml` should only be used for network applications, or should not be used at all.

:::
