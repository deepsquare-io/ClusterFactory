locals {
  tags = setunion(var.tags != null ? var.tags : [], [
    "by Terraform",
    replace(var.addresses, "/", "_"),
    "router",
  ])
  user_data = templatefile("${path.module}/templates/user_data.tftpl", {
    ssh_keys       = var.ssh_keys
    addresses      = var.addresses
    network_cidr   = data.cidr_network.addresses.network
    bgp_asn        = var.bgp_asn
    ipsec_vpns     = var.ipsec_vpns
    wireguard_vpns = var.wireguard_vpns
    netmaker_vpns  = var.netmaker_vpns
    tailscale_vpns = var.tailscale_vpns
    public_ip      = var.public_ip
    bgp            = var.bgp
  })
}

output "user_data" {
  value = local.user_data
}

data "cidr_network" "addresses" {
  prefix = var.addresses
}

data "openstack_images_image_v2" "image" {
  region      = var.region
  name        = var.image_name
  most_recent = true
}

resource "openstack_compute_secgroup_v2" "router_secgroup" {
  name        = "router_secgroup"
  description = "Router Security Group"

  rule {
    from_port   = 500
    to_port     = 500
    ip_protocol = "udp"
    cidr        = "::/0"
  }

  rule {
    from_port   = 500
    to_port     = 500
    ip_protocol = "udp"
    cidr        = "0.0.0.0/0"
  }

  rule {
    from_port   = 51820
    to_port     = 51820
    ip_protocol = "udp"
    cidr        = "::/0"
  }

  rule {
    from_port   = 51820
    to_port     = 51820
    ip_protocol = "udp"
    cidr        = "0.0.0.0/0"
  }

  rule {
    from_port   = 51820
    to_port     = 51820
    ip_protocol = "udp"
    cidr        = "::/0"
  }

  rule {
    from_port   = 51820
    to_port     = 51820
    ip_protocol = "udp"
    cidr        = "0.0.0.0/0"
  }

  rule {
    from_port   = -1
    to_port     = -1
    ip_protocol = "icmp"
    cidr        = "0.0.0.0/0"
  }

  rule {
    from_port   = -1
    to_port     = -1
    ip_protocol = "icmp"
    cidr        = "::/0"
  }
}



resource "openstack_networking_port_v2" "port" {
  network_id            = var.network_id
  admin_state_up        = true
  no_security_groups    = true
  port_security_enabled = false
  fixed_ip {
    ip_address = data.cidr_network.addresses.ip
    subnet_id  = var.subnet_id
  }
}

data "openstack_networking_network_v2" "ext_network" {
  name = "Ext-Net"
}

resource "openstack_networking_port_v2" "ext_port" {
  network_id         = data.openstack_networking_network_v2.ext_network.id
  admin_state_up     = true
  security_group_ids = [openstack_compute_secgroup_v2.router_secgroup.id]
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
    boot_index            = 0
    delete_on_termination = true
  }
  tags         = local.tags
  config_drive = true

  network {
    port = openstack_networking_port_v2.ext_port.id
  }

  network {
    port = openstack_networking_port_v2.port.id
  }

  user_data = local.user_data
}

resource "ovh_cloud_project_failover_ip_attach" "failoverip" {
  service_name = var.service_name
  ip           = var.public_ip
  routed_to    = openstack_compute_instance_v2.router.id

  lifecycle {
    replace_triggered_by = [
      openstack_compute_instance_v2.router.id
    ]
  }
}
