# ----------------------
# OVH k0s instances
# ----------------------

module "k0s_instances" {
  source = "./modules/k0s_instances"

  network_id = openstack_networking_network_v2.net.id
  subnet_id  = openstack_networking_subnet_v2.subnet.id
  ssh_keys   = var.ssh_keys
  region     = var.region
  gw         = var.gw

  k0s_instances = var.k0s_instances
}

# -------------------------
# OVH Network settings
# -------------------------

resource "openstack_networking_network_v2" "net" {
  name           = var.network
  admin_state_up = "true"
  region         = var.region
}

resource "openstack_networking_subnet_v2" "subnet" {
  network_id = openstack_networking_network_v2.net.id
  region     = var.region
  cidr       = var.subnet
  gateway_ip = var.gw
  allocation_pool {
    start = var.allocation_pool.start
    end   = var.allocation_pool.end
  }
  enable_dhcp = false
}

# -------------------------
# OVH NFS storage node
# -------------------------

module "storage" {
  source = "./modules/storage"
  count  = var.enable_storage ? 1 : 0

  network_id = openstack_networking_network_v2.net.id
  subnet_id  = openstack_networking_subnet_v2.subnet.id
  ssh_keys   = var.ssh_keys
  region     = var.region
  gw         = var.gw

  server_name  = var.storage.server_name
  image_name   = var.storage.image_name
  flavor_name  = var.storage.flavor_name
  tags         = var.storage.tags
  storage_size = var.storage.storage_size
  addresses    = var.storage.addresses
  dns          = var.storage.dns
  search       = var.storage.search
  shares       = var.storage.shares
}

# -------------------------
# OVH Router node
# -------------------------

module "router" {
  source = "./modules/router"
  count  = var.enable_router ? 1 : 0

  service_name = var.service_name
  network_id   = openstack_networking_network_v2.net.id
  subnet_id    = openstack_networking_subnet_v2.subnet.id
  ssh_keys     = var.ssh_keys
  region       = var.region

  server_name    = var.router.server_name
  image_name     = var.router.image_name
  flavor_name    = var.router.flavor_name
  tags           = var.router.tags
  addresses      = var.router.addresses
  bgp_asn        = var.router.bgp_asn
  wireguard_vpns = var.router.wireguard_vpns
  netmaker_vpns  = var.router.netmaker_vpns
  tailscale_vpns = var.router.tailscale_vpns
  bgp            = var.router.bgp
  extra_configs  = var.router.extra_configs
}

output "user_data" {
  value = module.router[0].user_data
}
