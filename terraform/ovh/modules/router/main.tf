locals {
  image_name = "vyOS"
  tags = merge(var.tags != null ? var.tags : {}, {
    provided  = "by Terraform"
    addresses = var.addresses
    type      = "router"
  })
  user_data = templatefile("${path.module}/templates/user_data.tftpl", {
    ssh_keys  = var.ssh_keys
    addresses = var.addresses
    dns       = var.dns != null ? var.dns : "8.8.8.8"
    search    = var.search != null ? var.search : ""
  })
}

data "openstack_images_image_v2" "image" {
  region      = var.region
  name        = local.image_name
  most_recent = true
}

resource "openstack_compute_instance_v2" "router" {
  region = var.region
  name   = var.server_name

  image_id    = data.openstack_images_image_v2.image.id
  flavor_name = var.flavor_name
  block_device {
    uuid                  = data.openstack_images_image_v2.image.id
    source_type           = "image"
    destination_type      = "local"
    volume_size           = var.root_disk_size
    boot_index            = 0
    delete_on_termination = true
  }
  tags = local.tags
  network {
    name = var.network
  }

  user_data = local.user_data
}
