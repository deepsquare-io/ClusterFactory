resource "openstack_compute_floatingip_v2" "floatip" {
  pool   = "public"
  region = var.region
}

locals {
  image_name = var.image_name != null ? var.image_name : "vyos-rolling-latest"
  tags = setunion(var.tags != null ? var.tags : [], [
    "by Terraform",
    var.addresses,
    "router",
  ])
  user_data = templatefile("${path.module}/templates/user_data.tftpl", {
    ssh_keys       = var.ssh_keys
    addresses      = var.addresses
    bgp_asn        = var.bgp_asn
    ipsec_vpns     = var.ipsec_vpns
    wireguard_vpns = var.wireguard_vpns
    public_ip      = openstack_compute_floatingip_v2.floatip.fixed_ip
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
  depends_on = [
    openstack_compute_floatingip_v2.floatip
  ]
}
