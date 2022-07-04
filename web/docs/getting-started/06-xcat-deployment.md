# 6. xCAT Deployment

The `argo/provisioning` directory deploys the xCAT application.

This time, we won't start from scratch.

However, the order is the same.

## 1. Namespace and AppProject

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/provisioning
```

## 2. Volumes

Start with the xCAT volume. This is where xCAT will be storing SQLite databases, os images and more.

```yaml title="argo/provisioning/volumes/xcat-pv.yml"
apiVersion: v1
kind: PersistentVolume
metadata:
  name: xcat-pv
  namespace: provisioning
  labels:
    app: xcat
spec:
  capacity:
    storage: 50Gi
  mountOptions:
    - hard
    - nfsvers=4.1
    - noatime
    - nodiratime
  csi:
    driver: nfs.csi.k8s.io
    readOnly: false
    volumeHandle: 0993a28c-4c2f-4edb-94ee-ec0e8a20efff
    volumeAttributes:
      server: nfs.example.com
      share: '/srv/nfs/k8s/xcat'
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
```

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/provisioning/volumes/xcat-pv.yml
```

The label `app=xcat` will be used by the `PersistentVolumeClaim` of the `StatefulSet` to locate the `PersistentVolume`.

You can use a StorageClass if you want. We won't be running multiple xCAT replicas anyway.

## 3. Apps

Because, xCAT MUST use the host network for provisioning the bare metal servers, we will use Multus CNI to expose the pod to the external network.

xCAT will deploy a lot of services including:

- A DHCP Server
- A TFTP Server
- A RSync Server
- A DNS Server
- xCAT Services
- And [more](https://xcat-docs.readthedocs.io/en/stable/advanced/ports/xcat_ports.html)

That's why we will use the Multus and CNI plugins to solve this particular problem.

Let's start with the obvious:

```yaml title="argo/provisioning/apps/xcat-app.yml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: xcat-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: provisioning
  source:
    # You should have forked this repo. Change the URL to your fork.
    repoURL: git@github.com:<your account>/ClusterFactory-CE.git
    targetRevision: HEAD
    path: helm/xcat
    helm:
      releaseName: xcat

      # We will create a values file inside the fork and change the values.
      valueFiles:
        - values-production.yaml

  destination:
    server: 'https://kubernetes.default.svc'
    namespace: provisioning

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

To edit the values, we won't need to use the subchart pattern because xCat is already defined inside the git repository. Add the `values-production.yaml` file directly inside the helm application:

```yaml title="helm/xcat/values-production.yaml"
nodeSelector:
  topology.kubernetes.io/region: ch-sion
  topology.kubernetes.io/zone: ch-sion-1

resources:
  requests:
    cpu: '250m'
    memory: '8Gi'
  limits:
    cpu: '8'
    memory: '8Gi'

persistence:
  storageClassName: ''
  accessModes: ['ReadWriteOnce']
  size: 50Gi
  selectorLabels:
    app: xcat

net:
  # Kubernetes host interface
  masterInterface: eno2
  mode: l2
  type: ipvlan

  # https://www.cni.dev/plugins/current/ipam/static/
  ipam:
    type: static
    addresses:
      - address: 192.168.0.3/24
        gateway: 192.168.0.1
    routes:
      - dst: 0.0.0.0/0

  dns:
    nameservers:
      - 127.0.0.1
    searches:
      - example.com
```

`nodeSelector` is very useful to make sure that xCAT stays in the right zone.

If you are using a StorageClass, remove the `persistence.selectorLabels` field.

Let's focus on the `net` field. To expose xCAT to the external network, instead of using `LoadBalancers`, we use [Multus](https://github.com/k8snetworkplumbingwg/multus-cni). Multus is a CNI plugin to attach multiple network interfaces on Pods.

However, we will use Multus CNI to replace the default network interface with a IPVLAN interface.

IPVLAN allows us to directly expose the pod to the host network. To do that, you must specify the network interface of the node with the `masterInterface` field. Then, you should allocate an address using the `ipam` field.

More details on IPAM [here](https://www.cni.dev/plugins/current/ipam/static/) and for IPVLAN [here](https://www.cni.dev/plugins/current/main/ipvlan/).

This way, instead of using a Virtual Machine to deploy xCAT, you can use a container!

Commit and push:

```shell
git add .
git commit -m "Added xCAT application and values"
git push
```

Deploy the app:

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/provisioning/apps/xcat-app.yml
```

Login to xCAT using the indicated IP address `ssh root@192.168.0.3 -p 2200` (the password is `cluster`).
