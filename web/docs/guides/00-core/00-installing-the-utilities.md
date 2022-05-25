# Installing the utilities

You need 3 tools so that you can manage your Kubernetes cluster:

- [`k0sctl`](https://github.com/k0sproject/k0sctl/releases), so you can deploy, backup, and upgrade the Kubernetes cluster.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl), so you can manage your Kubernetes cluster.
- [`kubeseal`](https://github.com/bitnami-labs/sealed-secrets/releases/), so you can seal the secrets.

We have a script inside the [`scripts`](https://github.com/SquareFactory/cluster-factory-ce/tree/main/scripts) directory to install and set up a working environment.

Just run:

```shell
. ./scripts/common.sh
```

The binaries is stored inside the `bin` directory and the `PATH` is automatically set.
