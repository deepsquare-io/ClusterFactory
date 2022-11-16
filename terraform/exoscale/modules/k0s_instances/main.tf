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
  labels = [
    for instance in var.k0s_instances : merge(instance.labels != null ? instance.labels : {}, {
      provided  = "by Terraform"
      addresses = instance.addresses
      type      = "k0s"
    })
  ]
}

data "exoscale_compute_template" "template" {
  count  = length(var.k0s_instances)
  zone   = var.zone
  name   = var.k0s_instances[count.index].template
  filter = var.k0s_instances[count.index].template_filter
}

resource "exoscale_compute_instance" "k0s_instance" {
  count = length(var.k0s_instances)

  zone = var.zone
  name = var.k0s_instances[count.index].server_name

  template_id = data.exoscale_compute_template.template[count.index].id
  type        = var.k0s_instances[count.index].service_offering
  disk_size   = var.k0s_instances[count.index].root_disk_size
  labels      = local.labels[count.index]
  network_interface {
    network_id = var.network_id
  }

  user_data = local.user_datas[count.index]
}
