service_name = "9adc45ea0a4e4d84a5acff1d829613e0"
region       = "GRA11"
ssh_keys = [
  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPd+X08wpIGwKZ0FsJu1nkR3o1CzlXF3OkgQd/WYB2fX nguyen@csquare",
  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK2MIrrisugtbMeoDbJJntMBbZno56Zwmc4LKYxeZh7k kiwi@mba"
]
network = "cf-net"
gw      = "172.28.0.2"
subnet  = "172.28.0.0/20"
allocation_pool = {
  start = "172.28.0.3"
  end   = "172.28.0.254"
}

k0s_instances = [
  {
    server_name = "k0s-ovh-fr-gra-11-1"
    image_name  = "Rocky Linux 9"
    ostype      = "rhel9"
    addresses   = "172.28.0.4/20"
    flavor_name = "d2-4"
  },
]

enable_storage = true
storage = {
  addresses    = "172.28.0.3/20"
  storage_size = 400
  server_name  = "nfs-server"
  flavor_name  = "d2-2"
  shares = [
    {
      path = "ldap-users"
    },
    {
      path  = "compute-nodes/enroot-cache"
      mode  = 775
      owner = "1501:1600"
    },
    {
      path  = "compute-nodes/jobs-logs"
      mode  = 775
      owner = "1501:1600"
    },
    {
      path  = "compute-nodes/experiments"
      mode  = 775
      owner = "1501:1600"
    },
    {
      path  = "compute-nodes/datasets-cache"
      mode  = 775
      owner = "1501:1600"
    },
    {
      path  = "compute-nodes/images"
      mode  = 775
      owner = "1501:1600"
    },
    {
      path  = "pyxis-cache"
      mode  = 775
      owner = "1501:1600"
    },
    {
      path = "k8s/slurmctl"
    },
    {
      path = "k8s/prometheus"
    },
    {
      path = "k8s/grafana"
    },
  ]
}

enable_router = true
router = {
  addresses      = "172.28.0.2/20"
  image_name     = "VyOS with Netmaker and Tailscale"
  public_ip      = "54.37.162.235"
  bgp_asn        = 65009
  flavor_name    = "s1-2"
  ipsec_vpns     = []
  root_disk_size = 10
  server_name    = "vyos"
  wireguard_vpns = []
  netmaker_vpns  = []
  tailscale_vpns = [
    {
      address           = "https://headscale.deepsquare.run"
      key               = "a5b2748c7306fc9b0cfa0a9b173c3c87c5d53087c3217e6e"
      advertised_routes = "172.28.0.0/20"
    }
  ]
  bgp = [
    {
      exports = [
        "172.28.0.0/20"
      ]
      peer = {
        name    = "k8s"
        address = "172.28.0.4"
        asn     = "64503"
      }
    }
  ]
  extra_configs = [
    "set firewall name OUTSIDE-LOCAL rule 100 destination port '51821'",
    "set firewall name OUTSIDE-LOCAL rule 100 description 'Allow Wireguard'",
    "set firewall name OUTSIDE-LOCAL rule 100 protocol 'udp'",
    "set firewall name OUTSIDE-LOCAL rule 100 action 'accept'",
    "set firewall name OUTSIDE-LOCAL rule 100 log 'enable'",
    "set firewall name OUTSIDE-LOCAL rule 100 source",
    "set interfaces wireguard 'wg0' private-key 'pk",
    "set interfaces wireguard 'wg0' address '169.254.17.4/24'",
    "set interfaces wireguard 'wg0' port '51821'",
    "set interfaces wireguard 'wg0' description 'Wireguard Network'",
  ]
}
