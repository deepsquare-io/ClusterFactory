# ----------------------
# Exoscale k0s instances
# ----------------------

locals {
  user_datas = [
    for instance in var.k0s_instances : templatefile("${path.module}/templates/user_data.tftpl", {
      ssh_keys  = var.ssh_keys
      ostype    = instance.ostype
      addresses = instance.addresses
      gw        = var.gw
      dns       = instance.dns != null ? instance.dns : "8.8.8.8"
      search    = instance.search != null ? instance.search : ""
    })
  ]
  tags = [
    for instance in var.k0s_instances : setunion(instance.tags != null ? instance.tags : [], [
      "by Terraform",
      replace(instance.addresses, "/", "_"),
      "k0s",
    ])
  ]
}

data "cidr_network" "addresses" {
  count = length(var.k0s_instances)

  prefix = var.k0s_instances[count.index].addresses
}

data "openstack_images_image_v2" "image" {
  count = length(var.k0s_instances)

  region      = var.region
  name        = var.k0s_instances[count.index].image_name
  most_recent = true
}

resource "openstack_networking_port_v2" "port" {
  count = length(var.k0s_instances)

  network_id            = var.network_id
  admin_state_up        = true
  no_security_groups    = true
  port_security_enabled = false
  fixed_ip {
    ip_address = data.cidr_network.addresses[count.index].ip
    subnet_id  = var.subnet_id
  }
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
    boot_index            = 0
    delete_on_termination = true
  }
  tags         = local.tags[count.index]
  config_drive = true

  network {
    port = openstack_networking_port_v2.port[count.index].id
  }

  user_data = local.user_datas[count.index]
}
