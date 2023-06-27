# Overview

## Introduction

While ClusterFactory was mainly made for being a control plane for SLURM, this guide provides step-by-step instructions for deploying Rook, an open-source storage orchestrator for Kubernetes, with a focus on setting up a scalable and maintainable control plane. Rook enables the deployment and management of storage solutions such as CephFS volumes (shared storage), object storage and block storage within your Kubernetes cluster.

The following sections will walk you through the process of deploying Rook, starting from the prerequisites and requirements to the configuration of a resilient control plane. By following this guide, you will be able to provision storage resources and ensure high availability, scalability, and ease of maintenance for your storage plane.

## Requirements

Before you begin the deployment process, ensure you have the following prerequisites in place:

1. Label your nodes. This is used to identify which nodes contain which disk. Examples of labels are `storage/disktype=ssd` and `storage=true`. Apply these labels with:

   ```shell
   kubectl label nodes <node-name> storage=true
   ```

   Pods can select the node using a `nodeSelector` like this:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx
     labels:
       env: test
   spec:
     containers:
       - name: nginx
         image: nginx
         imagePullPolicy: IfNotPresent
     nodeSelector:
       storage/disktype: ssd
   ```

2. (optional) Taints your nodes. This avoids running compute workloads on the storage nodes. If you want to allow workloads on the storage node, you can ignore this requirement. You can taint a node with:

   ```shell
   kubectl taint nodes <node-name> storage=true:NoSchedule
   ```

   To allow pods to run on a node with a taint, the pods can use `tolerations` like this:

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx
     labels:
       env: test
   spec:
     containers:
       - name: nginx
         image: nginx
         imagePullPolicy: IfNotPresent
     tolerations:
       - key: 'storage'
         operator: 'Equal'
         value: 'true'
         effect: 'NoSchedule'
   ```

3. Node resources: **Nodes must either have one of these local storage: raw partitions, raw devices, LVM logical volumes or persistent volumes in `block` mode (no partition table, no data, no filesystem).** Rook will automatically format these disks/partitions. Confirm with the following command:

   ```shell
   lsblk -f

   # NAME                  FSTYPE      LABEL UUID                                   MOUNTPOINT
   # vda
   # └─vda1                LVM2_member       >eSO50t-GkUV-YKTH-WsGq-hNJY-eKNf-3i07IB
   #   ├─ubuntu--vg-root   ext4              c2366f76-6e21-4f10-a8f3-6776212e2fe4   /
   #   └─ubuntu--vg-swap_1 swap              9492a3dc-ad75-47cd-9596-678e8cf17ff9   [SWAP]
   # vdb
   ```

   The `FSTYPE` field should be empty. Here, only `vdb` is available since it is an empty device with no filesystem.

4. About LVM: LVM should be installed on the nodes using your favorite package manager:

   ```shell
   yum install -y lvm2
   # OR
   apt install -y lvm2
   ```

   The LVM version should be greater than **1.5.0**.

5. About Rados Block Devices (RBD): the `rbd` kernel module should be loaded.

   ```shell
   # Manually
   modprobe rbd
   # Automatically at each boot:
   echo "rbd" > /etc/modules-load.d/rbd.conf
   ```

   If the Kubernetes nodes are running a 5.4 or later kernel, additional feature flags can be enabled in the storage class. The `fast-diff` and `object-map` features are especially useful.

   ```yaml
   imageFeatures: layering,fast-diff,object-map,deep-flatten,exclusive-lock
   ```

6. About CephFS: the recommended minimum kernel version is **4.17** to support storage quotas.
