# Packer recipes repositories for xCAT and other...

## TL;DR with Rocky

```sh
# Post provisionners need sudo
sudo packer build rocky.json
```

## Deploy to xCAT

**Via NFS** :

```bash
# xCAT nfs mount
export MOUNT=10.10.2.11:/mnt/pool1/k8s/xcat
# xCAT root img
export EXPORT_PATH=/install/netboot/rocky8.4/x86_64/compute/rootimg/

source ./scripts-local/setup-nbd
source ./scripts-local/rsync-to-nfs
source ./scripts-local/teardown-nbd
```

**Via rsync(sftp/scp)** :

```bash
# xCAT ssh address
export XCAT_SERVER=root@10.10.2.160
# xCAT root img
export EXPORT_PATH=/install/netboot/rocky8.4/x86_64/compute/rootimg/

source ./scripts-local/setup-nbd
source ./scripts-local/rsync-to-xcat
source ./scripts-local/teardown-nbd
```

## Notes

`compute.bare.json` creates bare metal image with all the stuff required to run on our infrastructure (NVIDIA, Infiniband, ...).

`compute.cloud.json` creates 2 cloud images, one with NVIDIA, and one without.
