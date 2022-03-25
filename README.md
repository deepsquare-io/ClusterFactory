# Cluster Factory Community Edition Kubernetes Stack

## Deployment method

- Deploy a k0s cluster with helm extensions.
- Deploy core certs issuers, traefik routes and dashboards.
- Deploy apps with argocd

## Customize for your cluster

You can already edit the values of the helm charts in `k0sctl.yaml` !

Start with `metallb` and make sure that the addresses range correspond to your external network.

Example: `10.10.2.100-10.10.2.105` means that the first Traefik Ingress will be assigned the ip 10.10.2.100 on the external network.

You can then edit the `traefik` values and put the right ports for your apps.

Then, add/modify the cluster issuers to have the right TLS config.

Finally, edit the different URLs in the routes of the `core` directory.

You must have a DNS for the best experience. TLS is enabled by default and use a self signed cluster issuer.

The default urls are:

- `traefik.ch1.csquare.run`
- `argo.ch1.csquare.run`
