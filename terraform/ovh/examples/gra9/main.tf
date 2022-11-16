locals {
  storage = merge(var.storage, {
    image_name = "Rocky Linux 9"
  })
}

resource "openstack_images_image_v2" "rocky" {
  name             = local.storage.image_name
  image_source_url = "https://dl.rockylinux.org/pub/rocky/9/images/x86_64/Rocky-9-GenericCloud-9.0-20220830.0.x86_64.qcow2"
  container_format = "bare"
  disk_format      = "qcow2"
  visibility       = "private"
  region           = var.region

  properties = {
    distribution        = "debian"
    hw_disk_bus         = "scsi"
    hw_scsi_model       = "virtio-scsi"
    hw_qemu_guest_agent = "yes"
    image_original_user = "rocky"
  }
}

module "cf_cluster" {
  source = "../../"

  service_name = var.service_name
  network      = var.network
  ssh_keys     = var.ssh_keys
  region       = var.region
  gw           = var.gw
  allocation_pool = var.allocation_pool
  subnet = var.subnet

  enable_storage = var.enable_storage
  storage        = local.storage
  enable_router  = var.enable_router
  router         = var.router
  k0s_instances  = var.k0s_instances

  depends_on = [
    openstack_images_image_v2.rocky,
  ]
}

output "user_data" {
  value = module.cf_cluster.user_data
}
