module "cf_cluster" {
  source = "../../"

  network  = var.network
  ssh_keys = var.ssh_keys
  zone     = var.zone
  gw       = var.gw

  storage       = var.storage
  k0s_instances = var.k0s_instances
}
