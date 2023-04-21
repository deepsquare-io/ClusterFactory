# 6. Grendel Deployment

The `argo/provisioning` directory deploys the Grendel application.

## 1. Namespace and AppProject

Create the Kubernetes namespace and ArgoCD AppProject.

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/provisioning
```

Kubernetes namespaces are used to isolate workloads and organize the Kubernetes cluster application.

ArgoCD AppProjects are used in the continuous deployment process to prevent unauthorized deployment of resources. The more restrictive this is, the better we can avoid a supply chain attack.

## 2. Preparing the dynamic provisioning of volumes

Grendel needs to store its OS images. We will use NFS for the storage in this guide but there are other solution like OpenEBS or local-path (see the local-path-storage ArgoCD application in the `argo/local-path-storage` directory).

We need to deploy a StorageClass so that Kubernetes can dynamically provision volumes.

Look at the `argo/volumes/dynamic-nfs.yaml`:

```yaml title="argo/volumes/dynamic-nfs.yaml"
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: dynamic-nfs
  labels:
    topology.kubernetes.io/region: ch-sion
    topology.kubernetes.io/zone: ch-sion-1
provisioner: nfs.csi.k8s.io
parameters:
  server: nfs.example.com
  share: /srv/nfs/dynamic
  mountPermissions: '0775'
mountOptions:
  - hard
  - nfsvers=4.1
  - noatime
  - nodiratime
volumeBindingMode: Immediate
reclaimPolicy: Retain
allowedTopologies:
  - matchLabelExpressions:
      - key: topology.kubernetes.io/region
        values:
          - ch-sion
```

Change the server address `nfs.example.com` to your NFS server and apply the resource.

```yaml
kubectl apply -f argo/volumes/dynamic-nfs.yaml
```

## 3. Apps

Since Grendel is using DHCP (and therefore L2 networking), we need to connect Grendel to the network connected to the compute nodes. To do that, we use Multus CNI with IPVLan.

Let's start with the ArgoCD application declaration:

```yaml title="argo/provisioning/apps/grendel-app.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: grendel-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: provisioning
  source:
    # You should have forked this repo. Change the URL to your fork.
    repoURL: git@github.com:<your account>/ClusterFactory.git
    # You should use your branch too.
    targetRevision: HEAD
    path: helm/grendel
    helm:
      releaseName: grendel

      # We will create a values file inside the fork and change the values.
      valueFiles:
        - values-production.yaml

  destination:
    server: 'https://kubernetes.default.svc'
    namespace: provisioning

  syncPolicy:
    automated:
      prune: true # Specifies if resources should be pruned during auto-syncing ( false by default ).
      selfHeal: true # Specifies if partial app sync should be executed when resources are changed only in target Kubernetes cluster and no git change detected ( false by default ).
      allowEmpty: false # Allows deleting all application resources during automatic syncing ( false by default ).
    syncOptions: []
    retry:
      limit: 5 # number of failed sync attempt retries; unlimited number of attempts if less than 0
      backoff:
        duration: 5s # the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")
        factor: 2 # a factor to multiply the base duration after each failed retry
        maxDuration: 3m # the maximum amount of time allowed for the backoff strategy
```

Most of the options don't need to change, so just add `values-production.yaml` to the `valueFiles` field because we will create a `values-production.yaml`.

If you've looked inside the `helm/grendel/` directory, you can see the default `values.yaml`. To change these values, add the `values-production.yaml` file directly inside the helm application.

## 4. Values configuration

### Sticking the Grendel Pod to the right zone

After adding the `values-production.yaml` file in the helm application directory. We can start by selecting where Grendel will be hosted:

```yaml title="helm/grendel/values-production.yaml"
nodeSelector:
  kubernetes.io/hostname: k0s-1.example.com
```

Since we are using IPVLAN, the pod needs to be stuck on a Kubernetes node with a known network interface.

### Grendel Configuration Secret

Grendel needs a configuration file which contains credentials. Therefore, you need to create a secret with the `grendel.toml` inside. Create a `grendel-secret.yaml.local` with the following content:

```yaml title="argo/provisioning/secrets/grendel-secret.yaml.local"
apiVersion: v1
kind: Secret
metadata:
  name: grendel-secret
  namespace: provisioning
type: Opaque
stringData:
  grendel.toml: |
    dbpath = ":memory:"
    loggers = {cli="on", tftp="on", dhcp="on", dns="off", provision="on", api="on", pxe="on"}
    admin_ssh_pubkeys = []

    [provision]
    listen = "0.0.0.0:80"
    token_ttl = 3600
    root_password = ""
    default_image = ""
    repo_dir = "/var/lib/grendel"

    [dhcp]
    listen = "0.0.0.0:67"
    lease_time = "24h"
    dns_servers = []
    domain_search = []
    mtu = 1500
    proxy_only = false
    router_octet4 = 0
    subnets = [
        {gateway = "192.168.0.1/24", dns="192.168.0.100", domainSearch="example.com", mtu="1500"}
    ]

    [dns]
    listen = "0.0.0.0:53"
    ttl = 86400

    [tftp]
    listen = "0.0.0.0:69"

    [pxe]
    listen = "0.0.0.0:4011"

    [api]
    socket_path = "/var/run/grendel/grendel-api.socket"

    [client]
    api_endpoint = "/var/run/grendel/grendel-api.socket"
    insecure = false

    [bmc]
    user = "admin"
    password = "password"

    [discovery]
    user = ""
    password = ""
    domain = ""
```

**You need to change the `dhcp.subnets` configuration according to your network configuration.**

Seal the secret and apply it:

```shell title="user@local:/ClusterFactory"
cfctl kubeseal
kubectl apply -f argo/provisioning/secrets/grendel-sealed-secret.yaml
```

### Nodes configuration

After adding the `values-production.yaml` file in the helm application directory. We can start by adding the provisioning configuration:

```yaml title="helm/grendel/values-production.yaml"
config:
  ## Secret containing grendel.toml
  secretName: grendel-secret
  secretKey: grendel.toml

  hosts:
    - name: cn1
      provision: true
      boot_image: squareos-8.6
      interfaces:
        - ip: 10.10.2.51/24
          mac: aa:bb:cc:11:22:33
          bmc: false
        - ip: 10.10.3.51/32
          bmc: true

  images:
    - name: squareos-8.6
      kernel: '/var/lib/grendel/vmlinuz-4.18.0-372.19.1.el8_6.x86_64'
      initrd:
        - '/var/lib/grendel/initramfs-4.18.0-372.19.1.el8_6.x86_64.img'
      liveimg: '/var/lib/grendel/squareos-8.6.squashfs'
      cmdline: console=ttyS0 console=tty0 root=live:http://grendel.example.com/repo/squareos-8.6.squashfs BOOTIF=01-{{ $.nic.MAC | toString | replace ":" "-" }} grendel.hostname={{ $.host.Name }} grendel.address=http://grendel.example.com rd.live.overlay.readonly=1 rd.live.overlay.overlayfs=1 rd.neednet=1

  postscript: |
    #!/bin/sh
    touch /hello-world
```

The MAC address corresponds to the network interface connected to the network with Grendel.

Inside the image configuration, you can notice some kernel parameters:

- `console=ttyS0 console=tty0` means that the kernel messages will appear on both the first serial port and virtual terminal.
- `root=live:http://grendel.example.com/repo/squareos-8.6.squashfs` means that dracut will load the OS image as a live OS image. **Modify the URL based on the domain name you want to use.**
- `rd.live.overlay.readonly=1 rd.live.overlay.overlayfs=1 rd.neednet=1` are parameters relative to loading the live OS image. Here, we are mounting the OS image as a read-only base image for the OverlayFS. This is to create a stateless filesystem.
- `grendel.hostname={{ $.host.Name }} grendel.address=http://grendel.example.com` are parameters used to change the hostname of the OS and fetch the postscript. **Modify the URL based on the domain name you want to use.**

### Persistence

Remember the `dynamic-nfs` storage class we've just created? Let's use it now:

```yaml title="helm/grendel/values-production.yaml"
persistence:
  storageClassName: 'provisioning-nfs'
  accessModes: ['ReadWriteMany']
  size: 20Gi
  selectorLabels:
    app: grendel
```

This will create a PersistentStorageClaim asking for 20Gi to the NFS provisioner. The NFS provisioner will create a directory inside the NFS with the following path `/srv/nfs/dynamic/pvc-<UUID>`. The UUID in randomized.

### IPVLAN configuration

To expose Grendel to the external network, instead of using `LoadBalancers`, we use [Multus](https://github.com/k8snetworkplumbingwg/multus-cni). Generally, Multus is a CNI plugin to attach multiple network interfaces on Pods. However, we will use Multus CNI to replace the default network interface with an IPVLAN interface.

IPVLAN allows us to directly expose the pod to the host network by assigning an IP to the pod. To do that, you must specify the network interface of the node with the `masterInterface` field. Then, you should allocate an address using the `ipam` field.

```yaml title="helm/grendel/values-production.yaml"
net:
  # Kubernetes host interface
  masterInterface: eth0
  mode: l2
  type: ipvlan

  # https://www.cni.dev/plugins/current/ipam/static/
  ipam:
    type: static
    addresses:
      - address: 192.168.0.3/24
        gateway: 10.10.2.1
    routes:
      - dst: 0.0.0.0/0

  # https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
  dns:
    nameservers:
      - 1.1.1.1
```

More details on IPAM [here](https://www.cni.dev/plugins/current/ipam/static/) and for IPVLAN [here](https://www.cni.dev/plugins/current/main/ipvlan/).

### (Optional) IPMI API configuration

The helm application can also deploy an IPMI API. This API doesn't use L2, so we can expose that service through Traefik by using an Ingress:

```yaml title="helm/grendel/values-production.yaml"
ipmi:
  ingress:
    enabled: true
    ingressClass: 'traefik'

    annotations:
      cert-manager.io/cluster-issuer: private-cluster-issuer
      traefik.ingress.kubernetes.io/router.entrypoints: websecure
      traefik.ingress.kubernetes.io/router.tls: 'true'

    hosts:
      - ipmi.example.com

    path: /

    tls:
      - secretName: ipmi.example.com-secret
        hosts:
          - ipmi.example.com
```

With this, you can use `cfctl` to control your nodes.

## 5. CoreDNS configuration

Remember to add a DNS entry each time you want to expose an application:

```yaml title="core/coredns/overlays/prod/configmap.yaml"
data:
  example.com.db: |
    # ...
    192.168.0.3 grendel.example.com
    192.168.1.100 ipmi.example.com
```

## 6. Commit, Push, Deploy

Commit and push:

```shell
git add .
git commit -m "Added Grendel application and values"
git push
```

Deploy the app:

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/provisioning/apps/grendel-app.yaml
```

## 7. (Optional) Building the OS Image

This step is optional, you can download a pre-built SquareOS image:

- [initramfs](https://sos-ch-dk-2.exo.io/osimages/squareos-8.6/initramfs-4.18.0-372.19.1.el8_6.x86_64.img)
- [OS image](https://sos-ch-dk-2.exo.io/osimages/squareos-8.6/squareos-8.6.squashfs)
- [linux kernel](https://sos-ch-dk-2.exo.io/osimages/squareos-8.6/vmlinuz-4.18.0-372.19.1.el8_6.x86_64)

If you want to build it yourself, we use Packer to build the OS image. To build the OS image:

- 1. Install Packer and QEMU.
- 2. Go to the `packer-recipes/rocky8.6`.
- 3. Build the OS image using the `build.bare.sh` script.
- 4. Extract the kernel, initramfs and create the squashfs file using the `export.bare.sh` script.

## 8. Adding the OS Image to Grendel

After deploying Grendel, a file server is exposed for you to copy the OS images.

You can access using this URL: http://grendel.example.com:8080

Drag & Drop the OS image, linux kernel and initramfs there.

## 9. BIOS configuration

Make sure your nodes are configured with network boot as the first boot option. Grendel supports:

- x86 Legacy
- x86 UEFI
- x86_64 UEFI
- ARM64 UEFI

## 10. IPMI commands, rebooting and provision

If you've deployed the IPMI API, you can run:

```shell title="user@local:/ClusterFactory"
export IPMIUSER=<user>
export IPMIPASS=<password>
export IPMIADDRESS=https://ipmi.example.com
cfctl ipmi <nodename> <on/off/cycle/status/soft/reset>
```

Reboot the nodes with `cfctl ipmi cn1 reset`.

Read the logs of Grendel and the serial console of your node to see if the boot is successful.

## Congratulation!

You've finished the guide. However, there is still a lot of application we didn't deploy. Continue on these guides if you are interested:

- [Deploy SLURM, the bare-metal batch scheduler](/docs/guides/slurm/deploy-slurm)
- [Configure the postscript to follow the GitOps practices](/docs/guides/provisioning/gitops-with-grendel)
- [About maintenance](/docs/guides/maintenance/high-availability)
