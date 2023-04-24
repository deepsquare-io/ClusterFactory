# Overview

The purpose of this guide is to achieve the following objectives:

- Install the Kubernetes Cluster along with its essential components such as:
  - CoreDNS, which provides domain name resolution services
  - MetalLB, which exposes Kubernetes Services to the local network
  - Traefik, which offers HTTP/TCP/UDP L7 routing and load balancing functionality
  - Multus, which uses IPVLAN to expose Grendel
  - cert-manager and sealed-secrets, which provide secrets management capabilities
- Deploy ArgoCD for implementing GitOps practices.
- Utilize ArgoCD to deploy Grendel, which is a bare-metal provisioning system.
- Provision bare-metal nodes using Grendel.

## Architecture

![getting-started.drawio](./00-overview.assets/getting-started.drawio.svg#invert-on-dark)

The Kubernetes Cluster functions as the control plane for managing compute nodes. **Therefore, the compute nodes are not considered as part of the Kubernetes Cluster and do not run any Kubernetes workloads.**

ClusterFactory is designed to prioritize bare-metal performance and thus leverages Slurm as the bare-metal batch job scheduler.

If you intend to run Kubernetes workloads on compute nodes, you may install k0s using k0sctl. However, this approach may not be compatible with the ClusterFactory strategy.
