# 5. xCAT Deployment

The `argo/provisioning` directory deploy the xCAT application.

This time, we won't start from scratch.

However, the order is the same.

## 1. Namespace and AppProject

```shell
kubectl apply -f argo/provisioning
```

## 2. Volumes

Start with the xCAT volume. This is where xCAT will be storing sqlite databases, os images and more.

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
      server: 10.10.2.11
      share: '/srv/nfs4/k8s/xcat'
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
```

You can use a StorageClass if you want.

## 3. Apps

There is a new concept for this application called. xCAT MUST use the host network to be able to provision the bare metal servers.

xCAT will deploy a lot of services including:

- A DHCP Server
- A TFTP Server
- A RSync Server
- A DNS Server
- xCAT Services
- And [more]https://xcat-docs.readthedocs.io/en/stable/advanced/ports/xcat_ports.html)

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
    repoURL: git@github.com:squarefactory/cluster-factory-ce.git
    targetRevision: HEAD
    path: helm/xcat
    helm:
      releaseName: xcat

      values: |
        ...

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

For the values:

```yaml title="values-custom.yaml"
nodeSelector:
  topology.kubernetes.io/region: ch-sion
  topology.kubernetes.io/zone: ch-sion-1

resources:
  requests:
    cpu: '2'
    memory: '8Gi'
  limits:
    cpu: '8'
    memory: '8Gi'

net:
  # Kubernetes host interface
  masterInterface: eno2
  mode: l2
  type: ipvlan

  # https://www.cni.dev/plugins/current/ipam/static/
  ipam:
    type: static
    addresses:
      - address: 10.10.2.160/24
        gateway: 10.10.2.1
    routes:
      - dst: 0.0.0.0/0

  dns:
    nameservers:
      - 127.0.0.1
    searches:
      - ch1.csquare.run
```

`nodeSelector` is very useful to make sure that xCAT stays in the right zone.

Let's focus on the `net` field. To expose xCAT to the external network, instead of using `LoadBalancers`, we use [Multus](https://github.com/k8snetworkplumbingwg/multus-cni). Multus is a CNI plugin to attach multiple network interfaces on Pods.

However, we will use Multus to replace the default network interface with a IPVLAN interface.

IPVLAN allows us to directly expose the pod to the host network. To do that, you must specify the network interface of the node with the `masterInterface` field. Then, you should allocate an address using the `ipam` field.

More details on IPAM [here](https://www.cni.dev/plugins/current/ipam/static/) and for IPVLAN [here](https://www.cni.dev/plugins/current/main/ipvlan/).

This way, instead of using a Virtual Machine to deploy xCAT, you can use a container!

Deploy the app with `kubectl apply -f argo/provisioning/apps/xcat-app.yml`

Login to xCAT using the indicated IP address `ssh root@10.10.2.160 -p 2200` (the password is `cluster`).
