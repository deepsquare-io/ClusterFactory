locals {
  storage = merge(var.storage, {
    image_name = "Rocky Linux 9"
  })
}

module "cf_cluster" {
  source = "../../"

  service_name    = var.service_name
  network         = var.network
  ssh_keys        = var.ssh_keys
  region          = var.region
  gw              = var.gw
  allocation_pool = var.allocation_pool
  subnet          = var.subnet

  enable_storage = var.enable_storage
  storage        = local.storage
  enable_router  = var.enable_router
  router         = var.router
  k0s_instances  = var.k0s_instances
}

output "user_data" {
  value = module.cf_cluster.user_data
}
