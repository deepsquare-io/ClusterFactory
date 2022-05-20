# 3. Core Apps Deployment

## CoreDNS configuration

The initial configuration of CoreDNS given by k0s is not satisfying our needs. This is why we are applying a new configuration.

CoreDNS is exposed to the external network thanks to the `IngressRoute` objects in the `core/coredns/ingress-route.yml`.

If this is an unwanted feature (because you are using an other DNS for example), feel free to remove the routes and close the ports in the Traefik extension specification inside `k0sctl.yaml`.

The files that you should look for are `configmap.yml` and `deployment.yml`.

Inside the ConfigMap, you'll find:

```yaml title="core/coredns/configmap.yml"
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
    at1.csquare.run:53 {
      log
      errors
      ready
      hosts /etc/coredns/at1.csquare.run.db
      reload
    }
    ch1.csquare.run:53 {
      log
      errors
      ready
      hosts /etc/coredns/ch1.csquare.run.db
      reload
    }
    csquare.gcloud:53 {
      log
      errors
      ready
      forward . 10.172.15.192 {
        max_concurrent 1000
        force_tcp
        expire 3600s
      }
      hosts /etc/coredns/csquare.gcloud.db {
        fallthrough
      }
      reload
    }
  ch1.csquare.run.db: |
    10.10.2.51 cn1.ch1.csquare.run
    10.10.2.52 cn2.ch1.csquare.run
    ...
```

Change the zones with yours (let's say `my.home`) and, eventually, change the `forward` field to your favorite DNS.

For example:

```yaml title="core/coredns/configmap.yml"
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
      forward . 8.8.8.8
      reload
    }
    my.home:53 {
      log
      errors
      ready
      hosts /etc/coredns/my.home.db
      reload
    }
  my.home.db: |
    10.10.4.100 metallb-0.my.home
    10.10.4.100 argocd.my.home
    10.10.4.100 traefik.my.home
    # Add other DNS configurations, for example your compute nodes
    10.10.2.51 cn1.my.home
    # ...
```

You should configure the DNS of the machines to use CoreDNS.

```conf title="resolv.conf"
nameserver 10.10.4.100
search my.home
```

Because some files were added and removed, you must change the `deployment.yml`:

```diff title="core/coredns/deployment.yml"
            terminationMessagePath: /dev/termination-log
            terminationMessagePolicy: File
        dnsPolicy: Default
        volumes:
          - name: config-volume
            configMap:
              name: coredns
              items:
                - key: Corefile
                  path: Corefile
+               - key: my.home.db
+                 path: my.home.db
-               - key: ch1.csquare.run.db
-                 path: ch1.csquare.run.db
-               - key: csquare.gcloud.db
-                 path: csquare.gcloud.db
-               - key: at1.csquare.run.db
-                 path: at1.csquare.run.db
              defaultMode: 420
```

### Configure the issuers

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

```yaml title="Example of Traefik ingress-route.yml"
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
    - match: 'Host(`traefik.my-home`)'
      kind: Rule
      middlewares:
        - name: redirect-dashboard
      services:
        - name: api@internal
          kind: TraefikService
  tls:
    secretName: traefik.my-home-secret
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
    - match: 'Host(`traefik.my-home`)'
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
    - host: grafana.my.home
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
        - grafana.my.home
      secretName: grafana.my.home-secret
```

Our recommendation is to use Ingress for simple routes with HTTP. Otherwise, IngressRoute is the best solution for all the cases.

## Deploying the core apps

Run the `2.deploy-core-apps.sh` script to deploy the cluster.

Congratulations! You have successfully deployed a Kubernetes Cluster with the minimum needs. We still recommend to deploy the Monitoring stack to monitor the RAM and CPU usage of the containers. Nevertheless, you can follow the [guides](/docs/guides), learn the [main concepts of Cluster Factory](/docs/main-concepts/k0s), or continue the [Getting Started](./argo-apps-deployment).

:::note

You may notice that the installation of Argo CD and Sealed Secrets could have been done using `k0sctl.yaml`.

However, we found that this would cause coupling problems with `k0sctl` (for example, you would have to redeploy the k0s cluster every time you need to update Argo CD, which means downtime).

We believe that the `extensions` field in `k0sctl.yaml` should only be used for network applications, or should not be used at all.

:::
