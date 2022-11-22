# -----------------------------------
# OVH instance common parameters
# -----------------------------------

variable "zone" {
  description = "Zone"
  type        = string
  default     = "de-fra-1"
}

variable "ssh_keys" {
  description = "Default SSH Keys"
  type        = list(string)
}

variable "network_id" {
  description = "Private Network ID"
  type        = string
}

# ---------------------------
# OVH router parameters
# ---------------------------

variable "server_name" {
  description = "Server Name"
  type        = string
}

variable "service_offering" {
  description = "Service Offering (instance type)"
  type        = string
}

variable "labels" {
  description = "Labels"
  type        = map(string)
  default     = {}
}

variable "root_disk_size" {
  description = "Disk size (GB)"
  type        = number
}

variable "addresses" {
  description = "Addresses CIDR (ex: 192.168.0.1/24)"
  type        = string
}

variable "bgp_asn" {
  description = "BGP ASN"
  type        = number
}

variable "wireguard_vpns" {
  description = "Wireguard PTP definitions"
  type = list(object({
    interface   = string
    port        = number
    private_key = string
    address     = string
    peer = object({
      name          = string
      endpoint      = string
      public_key    = string
      preshared_key = string
    })
    bgp = object({
      exports = list(string)
      peer = object({
        address = string
        asn     = number
      })
    })
  }))
  sensitive = true
}

variable "ipsec_vpns" {
  description = "IPsec PTP definitions"
  type = list(object({
    address = string
    peer = object({
      address    = string
      shared_key = string
    })
    bgp = object({
      exports = list(string)
      peer = object({
        address = string
        asn     = number
      })
    })
  }))
  sensitive = true
}

variable "netmaker_vpns" {
  description = "Netmaker definitions"
  type = list(object({
    token = string
  }))
  sensitive = true
}

variable "tailscale_vpns" {
  description = "Tailscale definitions"
  type = list(object({
    address           = string
    key               = string
    advertised_routes = string
  }))
  sensitive = true
}
