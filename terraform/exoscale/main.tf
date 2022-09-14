# --------------------
# Exoscale common data
# --------------------

data "exoscale_private_network" "private_network" {
  zone = var.zone
  name = var.network
}

# ----------------------
# Exoscale k0s instances
# ----------------------

module "k0s_instances" {
  source = "./modules/k0s_instances"

  network_id = data.exoscale_private_network.private_network.id
  ssh_keys   = var.ssh_keys
  zone       = var.zone
  gw         = var.gw

  k0s_instances = var.k0s_instances
}

# -------------------------
# Exoscale NFS storage node
# -------------------------

module "storage" {
  source = "./modules/storage"

  network_id = data.exoscale_private_network.private_network.id
  ssh_keys   = var.ssh_keys
  zone       = var.zone
  gw         = var.gw

  server_name      = var.storage.server_name
  service_offering = var.storage.service_offering
  labels           = var.storage.labels
  root_disk_size   = var.storage.root_disk_size
  addresses        = var.storage.addresses
  dns              = var.storage.dns
  search           = var.storage.search
  shares           = var.storage.shares
}
