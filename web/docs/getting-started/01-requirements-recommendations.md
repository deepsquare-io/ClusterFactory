# 1. Requirements and recommendations

## Requirements

### Node requirements

All nodes should be accessible via SSH.

All nodes should have a Linux distribution with:

- The Linux kernel version higher than 3.10.
- An init system based on SystemD or OpenRC.

Cluster Factory has been fully tested on Rocky Linux, and is our recommended OS.

### Required utilities

- [`k0sctl`](https://github.com/k0sproject/k0sctl/releases), for deployment, backup, and upgrading of the Kubernetes cluster.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl), for managing your Kubernetes cluster.
- [`kubeseal`](https://github.com/bitnami-labs/sealed-secrets/releases/), for encrypting the secrets.
- [`helm`](https://github.com/helm/helm/releases/), for Helm chart template.

We have a script inside the [`scripts`](https://github.com/SquareFactory/cluster-factory-ce/tree/main/scripts) directory to install and set up a working environment.

Just run:

```shell
. ./scripts/common.sh
```

The binaries are stored inside the `bin` directory and the `PATH` is automatically set.

## Recommended tooling

- [VSCode](https://code.visualstudio.com) is our favorite IDE. But just use one with good YAML support.
- **Use [Lens](https://k8slens.dev) to manage your Kubernetes cluster.**

## Recommended documentations

- [Kubernetes documentation](https://kubernetes.io/docs/concepts/)
- [Kubernetes API reference](https://kubernetes.io/docs/reference/kubernetes-api/)
- [k0sctl.yaml specs file](https://github.com/k0sproject/k0sctl#spec-fields)
- [Argo CD declarative setup](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/)
