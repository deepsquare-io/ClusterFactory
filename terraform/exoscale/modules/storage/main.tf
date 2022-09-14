locals {
  template        = "Rocky Linux 9 (Blue Onyx) 64-bit"
  template_filter = "featured"
  labels = merge(var.labels != null ? var.labels : {}, {
    provided  = "by Terraform"
    addresses = var.addresses
    type      = "storage"
  })
  user_data = templatefile("${path.module}/templates/user_data.tftpl", {
    ssh_keys  = var.ssh_keys
    addresses = var.addresses
    gw        = var.gw
    dns       = var.dns != null ? var.dns : "8.8.8.8"
    search    = var.search != null ? var.search : ""
    shares    = var.shares != null ? var.shares : []
  })
}

data "exoscale_compute_template" "storage" {
  zone   = var.zone
  name   = local.template
  filter = local.template_filter
}

resource "exoscale_compute_instance" "storage" {
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
}
