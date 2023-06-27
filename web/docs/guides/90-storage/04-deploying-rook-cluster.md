# Deploying a Rook Cluster

## Configuration

1. Deploy the ArgoCD AppProject and namespace first:

   ```title="user@local:/ClusterFactory"
   kubectl apply -f argo/rook-ceph-cluster
   ```

2. Create a values file based on the example in the `helm-subcharts/rook-ceph-cluster` directory:

   ```shell title="user@local:/ClusterFactory"
   cp helm-subcharts/rook-ceph-cluster/values-example.yaml helm-subcharts/rook-ceph-cluster/values-production.yaml
   ```

3. Edit the values file.

   1. If your storage plane is less than 3 nodes, enable the `allowMultiplePerNode` for MONs and MGRs, or reduce the number of replicas.

   2. **Configure the `rook-ceph-cluster.cephClusterSpec.storage` to filter the disk**:

      ```yaml
      storage:
        useAllNodes: false
        useAllDevices: false
        deviceFilter: '' # You can filter using regex, like this: `^vdb$` will use /dev/vdb
        # config:
        #   crushRoot: "custom-root" # specify a non-default root label for the CRUSH map
        #   metadataDevice: "md0" # specify a non-rotational storage so ceph-volume will use it as block db device of bluestore.
        #   databaseSizeMB: "1024" # uncomment if the disks are smaller than 100 GB
        #   osdsPerDevice: "1" # this value can be overridden at the node or device level
        #   encryptedDevice: "true" # the default value for this option is "false"
        # # Individual nodes and their config can be specified as well, but 'useAllNodes' above must be set to false. Then, only the named
        # # nodes below will be used as storage resources. Each node's 'name' field should match their 'kubernetes.io/hostname' label.
        # nodes:
        #   - name: "172.17.4.201"
        #     devices: # specific devices to use for storage can be specified for each node
        #       - name: "sdb"
        #       - name: "nvme01" # multiple osds can be created on high performance devices
        #         config:
        #           osdsPerDevice: "5"
        #       - name: "/dev/disk/by-id/ata-ST4000DM004-XXXX" # devices can be specified using full udev paths
        #     config: # configuration can be specified at the node level which overrides the cluster level config
        #   - name: "172.17.4.301"
        #     deviceFilter: "^sd."
      ```

   3. You can configure the `ingress` and CoreDNS if you wish to access the dashboard.

   4. **If you wish for a Rados Block Device (RBD)**, which is used for `ReadWriteOnce` volumes, uncomment the `cephBlockPools` fields. Refer to the official [Rook documentation](https://rook.io/docs/rook/latest/Storage-Configuration/Block-Storage-RBD/block-storage/) for configuration details.

   5. **If you wish for a CephFS**, which is used for `ReadWriteMany` or `ReadWriteOnce` volumes, uncomment the `cephFileSystems` fields. Refer to the official [Rook documentation](https://rook.io/docs/rook/latest/Storage-Configuration/Shared-Filesystem-CephFS/filesystem-storage/) for configuration details.

   6. **If you wish for a Object Storage (Rados GateWay, RGW)**, uncomment the `cephObjectStores` fields. Refer to the official [Rook documentation](https://rook.io/docs/rook/latest/Storage-Configuration/Object-Storage-RGW/object-storage/) for configuration details. You can expose the RGW by filling the `ingress` field. Beware of the `erasureCoded` field which may require you to have at least 3 OSDs. If you are lacking in OSDs, you can enable the `osdsPerDevice` in the storage configuration fields.

## Exposing to the external network using Multus (experimental)

Rook offers these solutions to expose Rook to the external:

- Using `LoadBalancer` Services or Ingresses.
- Using the `host` network by setting the value of `rook-ceph-cluster.cephClusterSpec.network.provider` to `host`.
- Using Multus CNI by setting the value of `rook-ceph-cluster.cephClusterSpec.network.provider` to `multus` (which is experimental). (You can follow more details here: [CNCF video](https://www.youtube.com/watch?v=zIS5qaG_HRw), [design](https://github.com/rook/rook/blob/master/design/ceph/multus-network.md))

We will focus on the **Multus** solution as it offers the least of packet encapsulation and gives the best performance:

1. Install the [Whereabouts IPAM plugin](https://github.com/k8snetworkplumbingwg/whereabouts) (this is an alternative to the [`host-local` IPAM plugin](https://www.cni.dev/plugins/current/ipam/host-local/)) by applying:

   ```shell title="user@local:/ClusterFactory"
   kubectl -k core/whereabouts
   ```

   You can add these lines to the `scripts/deploy-core` script if you want to keep track of these deployments.

   :::info

   To add further detail: `host-local` is used to give IPs to pods within a certain range. It's very similar to DHCP, without the need to use a DHCP server. One difficulty with `host-local` is that the IP allocation state is stored in a file, which is not extensible and does not work on multiple nodes.

   The `whereabouts` IPAM plugin uses the etcd database instead of files. And by using CRDs, it can integrate with the Kubernetes database.

   :::

2. Create two `NetworkAttachmentDefinition` in the `argo.example/rook-ceph-cluster/network` directory:

   ```yaml title="argo/rook-ceph-cluster/network/rook-public-net.yaml"
   apiVersion: 'k8s.cni.cncf.io/v1'
   kind: NetworkAttachmentDefinition
   metadata:
     name: rook-public-net
     namespace: rook-ceph-cluster
   spec:
     config: |
       {
         "cniVersion": "0.3.0",
         "type": "ipvlan",
         "master": "eth0",
         "ipam":{
           "type":"whereabouts",
           "range": "192.168.0.0/24",
           "exclude": [
             "192.168.0.0/30"
           ]
         }
       }
   ```

   This network is used by the clients. Clients in the `192.168.0.0/24` will be able to communicate with the Ceph cluster.

   ```yaml title="argo/rook-ceph-cluster/network/rook-cluster-net.yaml"
   apiVersion: 'k8s.cni.cncf.io/v1'
   kind: NetworkAttachmentDefinition
   metadata:
     name: rook-cluster-net
     namespace: rook-ceph-cluster
   spec:
     config: |
       {
         "cniVersion": "0.3.0",
         "type": "ipvlan",
         "master": "eth0",
         "ipam":{
           "type":"whereabouts",
           "range": "10.11.0.0/24"
         }
       }
   ```

   **Change the IPAM `range` and `excludes` accordingly. Also set the `master` interface with a host interface. You can use two network interfaces to separate the public and cluster network.**

   The `rook-cluster-net` is used internally by the daemons to communicate. While you could use `rook-public-net`, the Rook developers reported that using two networks is more performant.

   And apply them:

   ```shell title="user@local:/ClusterFactory"
   kubectl -k argo/rook-ceph-cluster/network/
   ```

3. Uncomment the `provider: multus` field and set the selectors to:

   ```yaml
   network:
     # ...
     provider: multus
     selectors:
       public: rook-ceph-cluster/rook-public-net
       cluster: rook-ceph-cluster/rook-cluster-net
   ```

## Deploy the cluster

Configure the Argo CD Application:

```yaml title="argo.example/rook-ceph-cluster/apps/app.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: rook-ceph-cluster-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: rook-ceph-cluster
  source:
    # You should have forked this repo. Change the URL to your fork.
    repoURL: git@github.com:<your account>/<your repo>.git
    # You should use your branch too.
    targetRevision: HEAD
    path: helm/rook-ceph-cluster
    helm:
      releaseName: rook-ceph-cluster

      # Create a values file inside your fork and change the values.
      valueFiles:
        - values-production.yaml

  destination:
    server: 'https://kubernetes.default.svc'
    namespace: rook-ceph-cluster

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

And apply it:

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/rook-ceph-cluster/apps
```

You should monitor the deployment with Lens.
