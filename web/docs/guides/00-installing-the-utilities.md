# Installing the utilities

You need 4 command line tools to be able to manage your Kubernetes cluster:

- [`cfctl`](https://github.com/SquareFactory/cfctl/releases), for deployment, backup, and upgrading of the Kubernetes cluster.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl), for managing your Kubernetes cluster.
- [`kubeseal`](https://github.com/bitnami-labs/sealed-secrets/releases/), for encrypting the secrets.
- [`helm`](https://github.com/helm/helm/releases/), for Helm chart template.

We have a script inside the [`scripts`](https://github.com/deepsquare-io/ClusterFactory/tree/main/scripts) directory to install and set up a working environment.

Just run:

```shell
. ./scripts/setup-env
```

The binaries is stored inside the `bin` directory and the `PATH` is automatically set.
