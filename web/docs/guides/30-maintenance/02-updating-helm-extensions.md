# Updating the K0s Helm extensions

:::caution

Updating and applying `k0sctl.yaml` will create downtime!

:::

There are two ways to update the K0s Helm extensions:

- Updating directly the `k0sctl.yaml` and deploying with `k0sctl`
- Updating the CRD `helm.k0sproject.io` and deploying with `kubectl`

We recommend updating the `k0sctl.yaml`, editing and applying the CRD to avoid downtime. For example, if you wish to update Traefik:

1. Update `k0sctl.yaml`

```diff title="k0sctl.yaml > spec > k0s > config > spec > extensions > helm > charts[]"
                - name: traefik
                  chartname: traefik/traefik
-                 version: '10.15.0'
+                 version: '10.19.5'
                  namespace: traefik
```

2. Update the CRD:

```shell
kubectl get Chart k0s-addon-chart-traefik -n kube-system -o yaml > chart.yaml
```

Edit the `chart.yaml`. Remove the metadata and update the Traefik version:

```diff
  apiVersion: helm.k0sproject.io/v1beta1
  kind: Chart
  metadata:
    finalizers:
      - helm.k0sproject.io/uninstall-helm-release
    labels:
      k0s.k0sproject.io/stack: helm
    name: k0s-addon-chart-traefik
    namespace: kube-system
  spec:
    chartName: traefik/traefik
    namespace: traefik
    releaseName: traefik
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
        oidc:
          port: 5556
          expose: true
          exposedPort: 5556
          protocol: TCP
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
-   version: 10.15.0
+   version: 10.19.5
```

3. Apply the `chart.yaml`

```shell
kubectl apply -f chart.yaml -n kube-system
```

:::caution

If nothing is happening, delete the chart and reapply it again.

```shell
kubectl delete -f chart.yaml -n kube-system

# OR

kubectl delete Chart k0s-addon-chart-traefik -n kube-system
```

:::
