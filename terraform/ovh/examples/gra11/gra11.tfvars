service_name = "93ed3764135141acb90d6eae4d841462"
region       = "DE1"
ssh_keys = [
  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPd+X08wpIGwKZ0FsJu1nkR3o1CzlXF3OkgQd/WYB2fX nguyen@csquare",
  "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIK2MIrrisugtbMeoDbJJntMBbZno56Zwmc4LKYxeZh7k kiwi@mba"
]
network = "cf-net"
gw      = "172.30.0.2"
subnet  = "172.30.0.0/20"
allocation_pool = {
  start = "172.30.0.3"
  end   = "172.30.0.254"
}

k0s_instances = [
  {
    server_name = "k0s-ovh-de-fra-1-1"
    image_name  = "Rocky Linux 9"
    ostype      = "rhel9"
    addresses   = "172.30.0.4/20"
    flavor_name = "b2-15"
  },
]

enable_storage = true
storage = {
  addresses    = "172.30.0.3/20"
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
  addresses      = "172.30.0.2/20"
  image_name     = "VyOS with Netmaker and Tailscale"
  bgp_asn        = 65010
  flavor_name    = "s1-2"
  root_disk_size = 10
  server_name    = "vyos"
  wireguard_vpns = []
  netmaker_vpns  = []
  tailscale_vpns = []
  bgp = [
    {
      exports = []
      peer = {
        name    = "k0s"
        address = "172.30.0.4"
        asn     = "65009"
      }
    }
  ]
  extra_configs = [
    "set firewall interface eth0 in name 'OUTSIDE-IN'",
    "set firewall interface eth0 local name 'OUTSIDE-LOCAL'",
    "set firewall name OUTSIDE-IN default-action 'drop'",
    "set firewall name OUTSIDE-IN rule 10 action 'accept'",
    "set firewall name OUTSIDE-IN rule 10 description 'Allow established/related'",
    "set firewall name OUTSIDE-IN rule 10 state established 'enable'",
    "set firewall name OUTSIDE-IN rule 10 state related 'enable'",
    "set firewall name OUTSIDE-IN rule 20 action 'accept'",
    "set firewall name OUTSIDE-IN rule 20 description 'Allow HTTP'",
    "set firewall name OUTSIDE-IN rule 20 destination port '80'",
    "set firewall name OUTSIDE-IN rule 20 log 'enable'",
    "set firewall name OUTSIDE-IN rule 20 protocol 'tcp'",
    "set firewall name OUTSIDE-IN rule 20 state new 'enable'",
    "set firewall name OUTSIDE-IN rule 21 action 'accept'",
    "set firewall name OUTSIDE-IN rule 21 description 'Allow HTTPS/tcp'",
    "set firewall name OUTSIDE-IN rule 21 destination port '443'",
    "set firewall name OUTSIDE-IN rule 21 log 'enable'",
    "set firewall name OUTSIDE-IN rule 21 protocol 'tcp'",
    "set firewall name OUTSIDE-IN rule 21 state new 'enable'",
    "set firewall name OUTSIDE-IN rule 22 action 'accept'",
    "set firewall name OUTSIDE-IN rule 22 description 'Allow HTTPS/udp'",
    "set firewall name OUTSIDE-IN rule 22 destination port '443'",
    "set firewall name OUTSIDE-IN rule 22 log 'enable'",
    "set firewall name OUTSIDE-IN rule 22 protocol 'udp'",
    "set firewall name OUTSIDE-IN rule 22 state new 'enable'",
    "set firewall name OUTSIDE-LOCAL default-action 'drop'",
    "set firewall name OUTSIDE-LOCAL rule 10 action 'accept'",
    "set firewall name OUTSIDE-LOCAL rule 10 description 'Allow established/related'",
    "set firewall name OUTSIDE-LOCAL rule 10 state established 'enable'",
    "set firewall name OUTSIDE-LOCAL rule 10 state related 'enable'",
    "set firewall name OUTSIDE-LOCAL rule 20 action 'accept'",
    "set firewall name OUTSIDE-LOCAL rule 20 description 'Allow ICMP'",
    "set firewall name OUTSIDE-LOCAL rule 20 icmp type-name 'echo-request'",
    "set firewall name OUTSIDE-LOCAL rule 20 protocol 'icmp'",
    "set firewall name OUTSIDE-LOCAL rule 20 state new 'enable'",
    "set firewall name OUTSIDE-LOCAL rule 30 action 'accept'",
    "set firewall name OUTSIDE-LOCAL rule 30 description 'Allow SSH'",
    "set firewall name OUTSIDE-LOCAL rule 30 destination port '22'",
    "set firewall name OUTSIDE-LOCAL rule 30 protocol 'tcp'",
    "set firewall name OUTSIDE-LOCAL rule 30 state new 'enable'",
    "set firewall name OUTSIDE-LOCAL rule 50 action 'accept'",
    "set firewall name OUTSIDE-LOCAL rule 50 description 'Allow IKE-IN'",
    "set firewall name OUTSIDE-LOCAL rule 50 destination port '500'",
    "set firewall name OUTSIDE-LOCAL rule 50 log 'enable'",
    "set firewall name OUTSIDE-LOCAL rule 50 protocol 'udp'",
    "set firewall name OUTSIDE-LOCAL rule 50 source",
    "set firewall name OUTSIDE-LOCAL rule 100 action 'accept'",
    "set firewall name OUTSIDE-LOCAL rule 100 description 'Allow Wireguard'",
    "set firewall name OUTSIDE-LOCAL rule 100 destination port '51822'",
    "set firewall name OUTSIDE-LOCAL rule 100 log 'enable'",
    "set firewall name OUTSIDE-LOCAL rule 100 protocol 'udp'",
    "set firewall name OUTSIDE-LOCAL rule 100 source",
    "set interfaces wireguard wg0 address '169.254.18.2/24'",
    "set interfaces wireguard wg0 description 'Wireguard Network'",
    "set interfaces wireguard wg0 peer gcp-ch-zur-6 address '12.23.45.67'",
    "set interfaces wireguard wg0 peer gcp-ch-zur-6 allowed-ips '10.68.0.0/24'",
    "set interfaces wireguard wg0 peer gcp-ch-zur-6 allowed-ips '10.172.10.0/24'",
    "set interfaces wireguard wg0 peer gcp-ch-zur-6 allowed-ips '10.94.0.0/28'",
    "set interfaces wireguard wg0 peer gcp-ch-zur-6 allowed-ips '169.254.18.1/32'",
    "set interfaces wireguard wg0 peer gcp-ch-zur-6 persistent-keepalive '21'",
    "set interfaces wireguard wg0 peer gcp-ch-zur-6 port '51822'",
    "set interfaces wireguard wg0 peer gcp-ch-zur-6 preshared-key ''",
    "set interfaces wireguard wg0 peer gcp-ch-zur-6 public-key ''",
    "set interfaces wireguard wg0 port '51822'",
    "set interfaces wireguard wg0 private-key ''",
    "set nat destination rule 201 description 'http-forward'",
    "set nat destination rule 201 destination port '80'",
    "set nat destination rule 201 inbound-interface 'eth0'",
    "set nat destination rule 201 protocol 'tcp'",
    "set nat destination rule 201 translation address '10.10.4.100'",
    "set nat destination rule 201 translation port '80'",
    "set nat destination rule 202 description 'https-tcp-redirect'",
    "set nat destination rule 202 destination port '443'",
    "set nat destination rule 202 inbound-interface 'eth0'",
    "set nat destination rule 202 protocol 'tcp'",
    "set nat destination rule 202 translation address '10.10.4.100'",
    "set nat destination rule 202 translation port '443'",
    "set nat destination rule 203 description 'https-udp-redirect'",
    "set nat destination rule 203 destination port '443'",
    "set nat destination rule 203 inbound-interface 'eth0'",
    "set nat destination rule 203 protocol 'udp'",
    "set nat destination rule 203 translation address '10.10.4.100'",
    "set nat destination rule 203 translation port '443'",
    "set nat source rule 100 outbound-interface 'eth0'",
    "set nat source rule 100 source address '172.30.0.0/20'",
    "set nat source rule 100 translation address 'masquerade'",
    "set protocols bgp address-family ipv4-unicast redistribute connected metric '100'",
    "set protocols bgp neighbor 172.30.0.4 address-family ipv4-unicast route-map export 'BGP-k0s-OUT'",
    "set protocols bgp neighbor 172.30.0.4 description 'BGP-with-k0s'",
    "set protocols bgp neighbor 172.30.0.4 remote-as '65009'",
    "set protocols static route 10.68.0.0/24 interface wg0",
    "set protocols static route 10.94.0.0/28 interface wg0",
    "set protocols static route 10.172.10.0/24 interface wg0",
  ]
}
