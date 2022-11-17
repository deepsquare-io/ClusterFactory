# Deploy rapidly a ClusterFactory cluster on OVH

## Preparation

Make sure to upload the os images for vyOS (router).

```shell
git clone https://github.com/vyos/vyos-vm-images.git
cd vyos-vm-images

sudo apt install -y python3 python3-pip
pip install -U ansible

ansible-playbook \
  --ask-become-pass qemu.yml \
  -e cloud_init=true \
  -e guest_agent=qemu \
  -e enable_dhcp=true \
  -e enable_ssh=true \
  -e vyos_iso_url=https://s3-us.vyos.io/rolling/current/vyos-rolling-latest.iso \
  -e vyos_version=rolling-latest \
  -e keep_user=true

openstack image create \
  --disk-format qcow2 \
  --container-format bare \
  --file /tmp/vyos-rolling-latest-cloud-init-10G-qemu.qcow2 \
  --private \
  --property distribution=debian \
  --property hw_disk_bus=scsi \
  --property hw_scsi_model=virtio-scsi \
  --property hw_qemu_guest_agent=yes \
  --property image_original_user=vyos \
  "vyos-rolling-latest"
```

## Usage

See [examples](./examples/) directory for sample usages.

See below for a simple inclusion within your own terraform project.

```hcl
module "slurm_cluster" {
  source = "github.com/SquareFactory/ClusterFactory/terraform/exoscale?ref=v0.8.0"

  # ... omitted ...
}
```
