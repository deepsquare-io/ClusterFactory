# ----------------------
# Exoscale k0s instances
# ----------------------

locals {
  user_datas = [
    for instance in var.k0s_instances : templatefile("templates/user_data.tftpl", {
      ssh_keys  = var.ssh_keys
      ostype    = instance.ostype
      addresses = instance.addresses
      gw        = var.gw
      dns       = instance.dns != null ? instance.dns : "8.8.8.8"
      search    = instance.search != null ? instance.search : ""
    })
  ]
  tags = [
    for instance in var.k0s_instances : merge(instance.tags != null ? instance.tags : {}, {
      provided  = "by Terraform"
      addresses = instance.addresses
      type      = "k0s"
    })
  ]
}

data "openstack_images_image_v2" "image" {
  count = length(var.k0s_instances)

  region      = var.region
  name        = var.k0s_instances[count.index].image_name
  most_recent = true
}

resource "openstack_compute_instance_v2" "k0s_instance" {
  count = length(var.k0s_instances)

  region = var.region
  name   = var.k0s_instances[count.index].server_name

  image_id    = data.openstack_images_image_v2.image[count.index].id
  flavor_name = var.k0s_instances[count.index].flavor_name
  block_device {
    uuid                  = data.openstack_images_image_v2.image[count.index].id
    source_type           = "image"
    destination_type      = "local"
    volume_size           = var.k0s_instances[count.index].root_disk_size
    boot_index            = 0
    delete_on_termination = true
  }
  tags = local.tags[count.index]
  network {
    name = var.network
  }

  user_data = local.user_datas[count.index]
}
