# Installing the utilities

You need 4 tools so that you can manage your Kubernetes cluster:

- [`k0sctl`](https://github.com/k0sproject/k0sctl/releases), for deployment, backup, and upgrading of the Kubernetes cluster.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl), for managing your Kubernetes cluster.
- [`kubeseal`](https://github.com/bitnami-labs/sealed-secrets/releases/), for encrypting the secrets.
- [`helm`](https://github.com/helm/helm/releases/), for Helm chart template.

We have a script inside the [`scripts`](https://github.com/SquareFactory/cluster-factory-ce/tree/main/scripts) directory to install and set up a working environment.

Just run:

```shell
. ./scripts/common.sh
```

The binaries is stored inside the `bin` directory and the `PATH` is automatically set.
