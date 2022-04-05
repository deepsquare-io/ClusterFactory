# Cluster Factory Community Edition Kubernetes Stack

## Deployment process

This project will deploy in the following order:

* A k0s cluster with helm extensions (MetalLB, Traefik, Cert-Manager, CSI Drivers). Also with KubeVirt (VM workloads) and Multus (multiple network interfaces).
* Core certs issuers, traefik routes and dashboards.
* Apps with argocd
  * xCAT (bare-metal provisioning)
  * Slurm controller, database and login nodes
  * CVMFS for cluster software distribution
  * BeeGFS for fast parallel storage
  * Open Ondemand, a web-based HPC portal for users
  * Monitoring stack (Grafana, Prometheus with ready-to-use exporters)

## Preparation

For kubevirt, your hosts must have SELinux permissive and libvirt, qemu and eventually kvm installed.

Since k0s is an "outlier", you should create a symbolic link for `/var/lib/kubelet` to `/var/lib/k0s/kubelet` (`ln -s /var/lib/kubelet /var/lib/k0s/kubelet`) in all of the hosts to avoid incompatibilities with official k8s solutions.

## Customize for your cluster

You can already edit the values of the helm charts in `k0sctl.yaml` !

Start with the `hosts` and then verify the solutions used for the cluster in the `k0s` block. Changing these options might be difficult in the future!

Edit the parameters of the extension `metallb` and make sure that the addresses range correspond to your external network. These IPs correspond to the entrypoints to youy k8s cluster !

Example: `10.10.2.100-10.10.2.105` means that MetalLB will use these IPs. The first `LoadBalancer` service will be assigned the ip 10.10.2.100 on the external network, but you should use `loadBalancerIP` to allocate the right IP.

You can then edit the `traefik` values and put the right ports for your apps.

Then, add/modify the cluster issuers to have the right TLS config in the `core/cert-manager` directory. **Search and replace** is your friend.

Finally check for every `values.yml` in the `core` directory.

You must have a DNS for the best experience. TLS is enabled by default and use a self signed cluster issuer.

You can then launch `1.deploy-k0s.sh` and `2.deploy-core-apps.sh`.

## Customize the ArgoCD Apps

Before we start, the `helm` directory is just a helm repository for deploying our stack, so you should never edit these files directly.

The exception being `slurm-cluster` as this application has been taylored for our cluster and you may be interested in editing the slurm stack (e.g. changing the default prologs and epilogs).

Otherwise, to edit the argoCD applications, go to the `argo` directory. You need to edit and check all the files in this directory.

You also need to **regenerate all the sealed secrets** as they are for our cluster. There are some examples, but you can also add secrets to pull from git repositories and docker images.

Use the `kubeseal-every-local-files.sh` file to convert each `-secret.yml.local` to `-sealed-secret.yml`.

Once all the configurations are done (values, secrets, volumes), you should be able to run the `3.deploy*.sh` scripts. We recommend that you do not use these scripts as they may be taylored for our cluster and that you should deploy the applications yourself.

## About deleting a k0s helm extension

First, remove the extension in the k0sctl.yaml.

Then, try to remove the resource:

```sh
# List with kubectl get Chart -n kube-system
kubectl delete Chart <k0s-addon-chart> -n kube-system
```

If it gets stuck (because you have already `helm uninstall`), remove the `finalizers`.

```sh
kubectl patch Chart <k0s-addon-chart> -n kube-system \
  --type json \
  --patch='[{"op": "remove", "path": "/metadata/finalizers"}]'
```

Finally, on the controller node, make sure that the `/var/lib/k0s/manifests/helm/<addon_crd_manifest>` doesn't exists.

Apply k0s one last time and you are done !

Note: If you need to reinstall the chart via `k0sctl.yaml`, you will have to apply manually `/var/lib/k0s/manifests/helm/<addon_crd_manifest>` after applying `k0sctl.yaml`.

Issue related: https://github.com/k0sproject/k0s/issues/1456

## Documentations to help you deploy

To be able to configure this stack you should be proficient in:

- Kubernetes
- Helm templating
- CNIs (Multus, Calico and plugins...)

There are other stuffs to learn, but you can learn it during the deployment.

- [Kubernetes Documentation (not going to lie, you're gonna need it)](https://kubernetes.io/docs/concepts/)
- [Helm Values Files](https://helm.sh/docs/chart_template_guide/values_files/)
- [K0s Configuration](https://docs.k0sproject.io/v1.23.5+k0s.0/configuration/)
- [Cert-Manager Issuers Configuration](https://cert-manager.io/docs/configuration/)
- [Multus CNI Quickstart](https://github.com/k8snetworkplumbingwg/multus-cni/blob/master/docs/quickstart.md)
- [CNI Plugins Overview](https://www.cni.dev/plugins/current/)
- [KubeVirt User Guide](https://kubevirt.io/user-guide/)
- [ArgoCD Application YAML](https://github.com/argoproj/argo-cd/blob/master/docs/operator-manual/application.yaml)
- [Traefik Ingress Routes](https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/)
- [Traefik Ingress](https://doc.traefik.io/traefik/routing/providers/kubernetes-ingress/)
