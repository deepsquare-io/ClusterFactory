# ----------------------
# OVH k0s instances
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
# OVH NFS storage node
# -------------------------

module "storage" {
  source = "./modules/storage"
  count  = var.enable_storage ? 1 : 0

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

# -------------------------
# OVH Router node
# -------------------------

module "router" {
  source = "./modules/router"
  count  = var.enable_router ? 1 : 0

  service_name = var.service_name
  network      = var.network
  ssh_keys     = var.ssh_keys
  region       = var.region

  server_name    = var.router.server_name
  flavor_name    = var.router.flavor_name
  tags           = var.router.tags
  root_disk_size = var.router.root_disk_size
  addresses      = var.router.addresses
  bgp_asn        = var.router.bgp_asn
  wireguard_vpns = var.router.wireguard_vpns
  ipsec_vpns     = var.router.ipsec_vpns
}
