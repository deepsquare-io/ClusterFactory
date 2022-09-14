# ----------------------
# Exoscale k0s instances
# ----------------------

module "k0s_instances" {
  source = "./modules/k0s_instances"

  network  = var.network
  ssh_keys = var.ssh_keys
  region   = var.region
  gw       = var.gw

  k0s_instances = var.k0s_instances
}

# -------------------------
# Exoscale NFS storage node
# -------------------------

module "storage" {
  source = "./modules/storage"

  network  = var.network
  ssh_keys = var.ssh_keys
  region   = var.region
  gw       = var.gw

  server_name    = var.storage.server_name
  flavor_name    = var.storage.flavor_name
  tags           = var.storage.tags
  root_disk_size = var.storage.root_disk_size
  addresses      = var.storage.addresses
  dns            = var.storage.dns
  search         = var.storage.search
  shares         = var.storage.shares
}
