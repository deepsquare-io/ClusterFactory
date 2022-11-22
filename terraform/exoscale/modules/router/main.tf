resource "exoscale_elastic_ip" "storage_ip" {
  zone = var.zone
}

locals {
  template        = "VyOS 1.4 Rolling"
  template_filter = "featured"
  labels = merge(var.labels != null ? var.labels : {}, {
    provided  = "by Terraform"
    addresses = var.addresses
    type      = "router"
  })
  user_data = templatefile("${path.module}/templates/user_data.tftpl", {
    ssh_keys       = var.ssh_keys
    addresses      = var.addresses
    bgp_asn        = var.bgp_asn
    ipsec_vpns     = var.ipsec_vpns
    wireguard_vpns = var.wireguard_vpns
    netmaker_vpns  = var.netmaker_vpns
    tailscale_vpns = var.tailscale_vpns
    public_ip      = exoscale_elastic_ip.storage_ip.ip_address
  })
}

data "exoscale_compute_template" "storage" {
  zone   = var.zone
  name   = local.template
  filter = local.template_filter
}

resource "exoscale_compute_instance" "router" {
  zone = var.zone
  name = var.server_name

  template_id = data.exoscale_compute_template.storage.id
  type        = var.service_offering
  disk_size   = var.root_disk_size
  labels      = local.labels
  network_interface {
    network_id = var.network_id
  }

  user_data = local.user_data

  elastic_ip_ids = [
    exoscale_elastic_ip.storage_ip.id
  ]

  depends_on = [
    exoscale_elastic_ip.storage_ip
  ]
}
