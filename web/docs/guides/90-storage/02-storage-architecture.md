# Storage Architecture

![Rook Components on Kubernetes](./02-storage-architecture.assets/Rook-High-Level-Architecture.png)

You can read more [here](https://rook.io/docs/rook/latest/Getting-Started/storage-architecture/#shared-filesystem).

Rook uses a distributed and modular storage architecture to provide robust storage solutions within Kubernetes:

- **Ceph OSD (Object Storage Daemon)**:

  - The Ceph OSD is a critical component in Rook's architecture. It manages the storage devices or partitions attached to each worker node in the cluster.
  - OSDs are responsible for data storage, replication, recovery, and balancing within the Ceph storage cluster.
  - Rook leverages Ceph OSDs to provide scalable and distributed storage resources to applications running in the Kubernetes cluster.

- **Ceph MON (Monitor)**:

  - The Ceph MON is responsible for maintaining the overall health and status of the Ceph storage cluster.
  - MONs store the cluster's metadata, monitor cluster membership changes, and participate in leader election.
  - Rook utilizes Ceph MONs to provide monitoring, management, and coordination for the Ceph storage cluster.

- **Ceph MGR (Manager)**:

  - The Ceph MGR acts as the central management and monitoring daemon within the Ceph storage cluster.
  - MGRs handle cluster-wide tasks, performance monitoring, and provide a RESTful API endpoint for external interactions.
  - Rook utilizes Ceph MGRs to facilitate management, monitoring, and control plane operations for the storage cluster.

- **Ceph MDS (Metadata Server)**:

  - The Ceph MDS is responsible for handling metadata operations in a Ceph file system (CephFS).
  - MDS servers maintain file system metadata, handle file directory operations, and ensure data consistency.
  - Rook utilizes Ceph MDS to enable the deployment of scalable and distributed file systems within the Kubernetes cluster, offering features such as POSIX semantics and dynamic provisioning of file storage.

- **CSI (Container Storage Interface)**:

  - Rook integrates with the Kubernetes CSI framework to provide storage orchestration and dynamic provisioning for persistent volumes.
  - The Rook CSI driver allows Kubernetes workloads to consume storage resources provisioned by Rook.
  - It enables seamless integration with various storage backends, allowing Rook to support different storage technologies, including Ceph, EdgeFS, NFS, and more.

- **Rook Operator**:

  - The Rook Operator is a Kubernetes operator responsible for managing the lifecycle of Rook storage components.
  - It handles the deployment, scaling, upgrading, and monitoring of the Rook storage cluster.
  - The Rook Operator ensures that the desired state of the storage cluster is maintained and handles automated tasks, such as creating OSDs and managing Ceph configuration.
