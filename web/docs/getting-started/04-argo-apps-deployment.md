# 4. Argo Apps Deployment

Time to play with ArgoCD!

Let's deploy the [Kube-Prometheus-Stack](https://github.com/prometheus-community/helm-charts/blob/c16dc809e4f8fce9eee4e5093c59a08008c9dcb3/charts/kube-prometheus-stack/values.yaml) since we will need it to monitor the nodes.

A complete example is written in `argo/monitoring/`, but we will start from scratch to learn the process of writing an argo application.

Start by creating the `argo/my-monitoring`, this will be our working directory.

Some object shouldn't be handled by ArgoCD, such as volumes, secrets and namespaces. These object must be created before the deployment of an Argo application.

## 1. Namespace and AppProject

Start with a namespace:

```yaml title="argo/my-monitoring/namespace.yml"
apiVersion: v1
kind: Namespace
metadata:
  name: my-monitoring
  labels:
    app.kubernetes.io/name: my-monitoring
```

and apply (`kubectl apply -f namespace.yml`).

And create an `AppProject`:

```yaml title="argo/my-monitoring/app-project.yml"
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: my-monitoring
  namespace: argocd
  # Finalizer that ensures that project is not deleted until it is not referenced by any application
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  description: My monitoring stack
  # Allow manifests to deploy from any Git repos
  sourceRepos:
    - '*'
  # Only permit applications to deploy to the namespace in the same cluster
  destinations:
    - namespace: my-monitoring
      server: https://kubernetes.default.svc

  namespaceResourceWhitelist:
    - kind: '*'
      group: '*'

  clusterResourceWhitelist:
    - kind: '*'
      group: '*'
```

`AppProject` configure the permissions of the `Application`. This is to avoid a supply chain attacks (like for example malicious resources get injected in the git repositories). You can learn more [here](https://argo-cd.readthedocs.io/en/stable/user-guide/projects/).

## 2. Prepare Volumes, Secrets, ConfigMaps and Ingresses

It is best to know the configuration you need before deploying.

You can read the `values.yaml` file inside the [git repository of kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/blob/c16dc809e4f8fce9eee4e5093c59a08008c9dcb3/charts/kube-prometheus-stack/values.yaml).

We won't be deploying AlertManager, but we will deploy Grafana, Prometheus and the Prometheus Operator.

Therefore, we need:

- A persistent volume for Grafana
- A persistent volume for Prometheus
- A secret with the initial admin password for Grafana
- An Ingress for Grafana
- An Ingress for Prometheus

However, we are lucky that the Helm Chart of Kube-Prometheus-Stack already handles ingresses. So we only need to add two PVs and a secret.

### 2.1. Volumes

We are going the create 2 storage classes with the NFS CSI driver.
The deployment of k0s should have the [NFS CSI driver](https://github.com/kubernetes-csi/csi-driver-nfs) pre-deployed.

You could use other type of storage like [Rook](https://rook.io) or [Longhorn](https://longhorn.io).

```yaml title="argo/my-monitoring/storageclasses.yaml"
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: grafana-nfs
  namespace: my-monitoring
  labels:
    app: grafana-nfs
    topology.kubernetes.io/region: my-home
    topology.kubernetes.io/zone: my-home-1
provisioner: nfs.csi.k8s.io
parameters:
  server: nfs.my.home
  share: /srv/nfs/k8s/grafana
  mountPermissions: '0775'
mountOptions:
  - hard
  - nfsvers=4.1
  - noatime
  - nodiratime
volumeBindingMode: Immediate
reclaimPolicy: Retain
allowedTopologies:
  - matchLabelExpressions:
      - key: topology.kubernetes.io/zone
        values:
          - my-home
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: prometheus-nfs
  namespace: my-monitoring
  labels:
    app: prometheus-nfs
    topology.kubernetes.io/region: my-home
    topology.kubernetes.io/zone: my-home-1
provisioner: nfs.csi.k8s.io
parameters:
  server: nfs.my.home
  share: /srv/nfs/k8s/prometheus
  mountPermissions: '0775'
mountOptions:
  - hard
  - nfsvers=4.1
  - noatime
  - nodiratime
volumeBindingMode: Immediate
reclaimPolicy: Retain
allowedTopologies:
  - matchLabelExpressions:
      - key: topology.kubernetes.io/zone
        values:
          - my-home
```

Apply it: `kubectl apply -f argo/my-monitoring/storageclasses.yaml`

You could also create a StorageClass mounted on `/srv/nfs/k8s` for all the applications. However, this would mix all the volumes into a single directory and for the sake of the NFS server, we won't do that.

You may notice that we have been using `topology.kubernetes.io/zone` since the beginning of the getting-started.
It's a good practice to always annotate your nodes as some resources are not available in other zones.

You can learn more [here](https://kubernetes.io/docs/reference/labels-annotations-taints/#topologykubernetesiozone).

You could also creates a PersistentVolume and a PersistentVolumeClaim instead of a StorageClass (which is what we've done at SquareFactory).

The official example of static provisioning is written [here](https://github.com/kubernetes-csi/csi-driver-nfs/tree/master/deploy/example). Both methods are good, but dynamic provisioning is more suitable for StatefulSet since it avoids creating a PV for each replica.

### 2.2. Secret

Since we are doing GitOps, we will be storing a sealed secret in the git repository.

Basically, SealedSecrets encrypt secrets using asymmetric encryption. Right now, a SealedSecrets controller is running on the Kubernetes Cluster with a unique private key. This private key is the master key and should be only stored on the Kubernetes Cluster.

If you wish to backup the key (because you want to do some migration, or to prepare for a disaster), you can follow [this guide](https://github.com/bitnami-labs/sealed-secrets#how-can-i-do-a-backup-of-my-sealedsecrets). You can also [backup the whole cluster using k0sctl](https://docs.k0sproject.io/v1.23.6+k0s.0/backup/).

:::warning
The SealedSecrets keys and backups made by k0s are sensitive data! You should either delete them after a certain period of time or make sure that they are strongly protected.
:::

Create a secret named `grafana-admin-secret.yaml.local`. It is important to add `.local` at the end so it get filtered by Git.

```yaml title="argo/my-monitoring/grafana-admin-secret.yaml.local"
apiVersion: v1
kind: Secret
metadata:
  name: grafana-admin-secret
  namespace: monitoring
stringData:
  admin-password: <FILL ME>
  admin-user: <FILL ME>
type: Opaque
```

DON'T APPLY IT. First, we will encrypt it.

Just run the `kubeseal-every-local-files.sh`, this script will generate a `grafana-admin-sealed-secret.yaml`. This file can be put inside the git repository.

Apply this file: `kubectl apply -f argo/my-monitoring/grafana-admin-sealed-secret.yaml`.

## 3. Configure the Argo Application

Let's start with the configration of the behavior of ArgoCD.

Basically:

```yaml title="argo/my-monitoring/prometheus-app.yml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: prometheus-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: my-monitoring
  source:
    chart: kube-prometheus-stack
    repoURL: https://prometheus-community.github.io/helm-charts
    targetRevision: 34.0.0
    helm:
      releaseName: prometheus

      values: '' # ! We are going to FILL HERE later

  destination:
    server: 'https://kubernetes.default.svc'
    namespace: my-monitoring

  syncPolicy:
    automated:
      prune: true # Specifies if resources should be pruned during auto-syncing ( false by default ).
      selfHeal: true # Specifies if partial app sync should be executed when resources are changed only in target Kubernetes cluster and no git change detected ( false by default ).
      allowEmpty: false # Allows deleting all application resources during automatic syncing ( false by default ).
    syncOptions: []
    retry:
      limit: 5 # number of failed sync attempt retries; unlimited number of attempts if less than 0
      backoff:
        duration: 5s # the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")
        factor: 2 # a factor to multiply the base duration after each failed retry
        maxDuration: 3m # the maximum amount of time allowed for the backoff strategy
```

More details [here](https://github.com/argoproj/argo-cd/blob/master/docs/operator-manual/application.yaml).

Since [Kube-Prometheus-Stack](https://github.com/prometheus-community/helm-charts/blob/c16dc809e4f8fce9eee4e5093c59a08008c9dcb3/charts/kube-prometheus-stack/values.yaml) is a Helm application, we are going to override some values in the `values` field.

We are also going to configure the Ingresses here.

```yaml title="values-custom.yaml"
alertmanager:
  enabled: false

## Using default values from https://github.com/grafana/helm-charts/blob/main/charts/grafana/values.yaml
##
grafana:
  enabled: true

  image:
    repository: grafana/grafana-oss
    tag: 8.5.1

  persistence:
    type: pvc
    enabled: true
    storageClassName: grafana-nfs

  securityContext:
    runAsUser: 472
    runAsGroup: 472
    fsGroup: 472

  admin:
    existingSecret: 'grafana-admin-secret'
    userKey: admin-user
    passwordKey: admin-password

  initChownData:
    enabled: false

  ingress:
    enabled: true
    ingressClassName: traefik

    annotations:
      cert-manager.io/cluster-issuer: selfsigned-cluster-issuer
      traefik.ingress.kubernetes.io/router.entrypoints: websecure
      traefik.ingress.kubernetes.io/router.tls: 'true'

    hosts:
      - grafana.my.home

    path: /

    tls:
      - secretName: grafana.my.home-secret
        hosts:
          - grafana.my.home

## Component scraping the kube controller manager
##
kubeControllerManager:
  enabled: false

## Component scraping coreDns. Use either this or kubeDns
##
coreDns:
  enabled: false

## Component scraping kubeDns. Use either this or coreDns
##
kubeDns:
  enabled: false

## Component scraping etcd
##
kubeEtcd:
  enabled: false

## Component scraping kube scheduler
##
kubeScheduler:
  enabled: false

## Component scraping kube proxy
##
kubeProxy:
  enabled: false

## Component scraping kube state metrics
##
kubeStateMetrics:
  enabled: true

## Configuration for kube-state-metrics subchart
##
kube-state-metrics:
  prometheus:
    monitor:
      enabled: true

## Deploy node exporter as a daemonset to all nodes
##
nodeExporter:
  enabled: true

## Configuration for prometheus-node-exporter subchart
##
prometheus-node-exporter:
  prometheus:
    monitor:
      enabled: true

## Manages Prometheus and Alertmanager components
##
prometheusOperator:
  enabled: true

  ## Resource limits & requests
  ##
  resources:
    limits:
      cpu: 200m
      memory: 200Mi
    requests:
      cpu: 100m
      memory: 100Mi

## Deploy a Prometheus instance
##
prometheus:
  enabled: true

  ingress:
    enabled: true

    annotations:
      cert-manager.io/cluster-issuer: selfsigned-cluster-issuer
      traefik.ingress.kubernetes.io/router.entrypoints: websecure
      traefik.ingress.kubernetes.io/router.tls: 'true'

    hosts:
      - prometheus.my.home

    paths:
      - /

    tls:
      - secretName: prometheus.my.home-secret
        hosts:
          - prometheus.my.home

  prometheusSpec:
    ruleSelectorNilUsesHelmValues: false
    serviceMonitorSelectorNilUsesHelmValues: false
    podMonitorSelectorNilUsesHelmValues: false
    probeSelectorNilUsesHelmValues: false

    resources:
      limits:
        cpu: 1
        memory: 2Gi
      requests:
        cpu: 200m
        memory: 2Gi

    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: 'prometheus-nfs'
          accessModes: ['ReadWriteOnce']
          resources:
            requests:
              storage: 50Gi
```

All the content should go inside the `prometheus-app.yaml`:

```yaml title="argo/my-monitoring/prometheus-app.yml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: prometheus-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: my-monitoring
  source:
    chart: kube-prometheus-stack
    repoURL: https://prometheus-community.github.io/helm-charts
    targetRevision: 34.0.0
    helm:
      releaseName: prometheus

      # (put the content of values-custom.yaml here)
      values: |

        alertmanager:
          enabled: false

        ## Using default values from https://github.com/grafana/helm-charts/blob/main/charts/grafana/values.yaml
        ##
        grafana:
          enabled: true

        ...
```

Now, just deploy the argoCD app: `kubectl apply -f argo/my-monitoring/prometheus-app.yml`

Congratulation, you have deployed an ArgoCD app!

You can observe the deployment in the ArgoCD dashboard by following the URL [argocd.my.home](https://argocd.my.home).

:::note

To fetch the ArgoCD password:

```shell
kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode)
```

:::

![image-20220503170825336](04-argo-apps-deployment.assets/image-20220503170825336.png)

![image-20220503171011051](04-argo-apps-deployment.assets/image-20220503171011051.png)

Pretty cool, huh?

However, ClusterFactory isn't just a Kubernetes Cluster. It contains all the apps necessary to create an HPC cluster.

See the [guides](../guides/) to deploy each application. Otherwise, let's deploy xCAT, our tool to deploy and manage bare metal servers!
