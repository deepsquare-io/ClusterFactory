module "cf_cluster" {
  source = "../../"

  network  = var.network
  ssh_keys = var.ssh_keys
  region   = var.region
  gw       = var.gw

  storage       = var.storage
  k0s_instances = var.k0s_instances
}
