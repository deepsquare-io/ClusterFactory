module "cf_cluster" {
  source = "../../"

  network      = var.network
  ssh_keys     = var.ssh_keys
  region       = var.region
  gw           = var.gw

  enable_storage = var.enable_storage
  storage        = var.storage
  enable_router  = var.enable_router
  router         = var.router
  k0s_instances  = var.k0s_instances
}
