# 1. Requirements and recommendations

## Requirements

### Node requirements

All nodes should be accessible via SSH.

All nodes should have a Linux distribution with:

- The Linux kernel version higher than 3.10.
- An init system based on SystemD or OpenRC.

ClusterFactory has been fully tested on Rocky Linux which is our recommended OS.

### Required utilities

- [`cfctl`](https://github.com/SquareFactory/cfctl/releases), for deployment, backing up, and upgrading of the Kubernetes cluster.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl), for managing your Kubernetes cluster.
- [`kubeseal`](https://github.com/bitnami-labs/sealed-secrets/releases/), for encrypting the secrets.
- [`helm`](https://github.com/helm/helm/releases/), for Helm chart template.

There is a script inside the [`scripts`](https://github.com/deepsquare-io/ClusterFactory/tree/main/scripts) directory to install and set up a working environment.

Just run:

```shell
. ./scripts/setup-env
```

The binaries are stored inside the `bin` directory and the `PATH` is automatically set.

## Recommended tools

We recommend:

- [VSCode](https://code.visualstudio.com). Any IDE with YAML support is a good alternative.
- **[Lens](https://k8slens.dev) to manage your Kubernetes cluster.**

## Recommended documentation

- [Kubernetes documentation](https://kubernetes.io/docs/concepts/)
- [cfctl.yaml API reference](/docs/reference/cfctl.yaml)
- [Argo CD declarative setup](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/)

**Before using ClusterFactory, it is strongly advised to have a comprehensive understanding of how Kubernetes operates, specifically with regard to storage and network management using features such as PersistentVolume, StorageClass, Service, Ingresses, LoadBalancer, and more."**

To try a "mini" version of Kubernetes we recommend k0s or minikube.
