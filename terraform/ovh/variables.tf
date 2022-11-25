# -----------------------------------
# OVH instance common parameters
# -----------------------------------

variable "service_name" {
  description = "Project ID"
  type        = string
}

variable "region" {
  description = "Region"
  type        = string
  default     = "GRA9"
}

variable "ssh_keys" {
  description = "Default SSH Keys"
  type        = list(string)
}

variable "network" {
  description = "Connected Private Network"
  type        = string
}

variable "subnet" {
  description = "subnet"
  type        = string
  default     = "172.26.0.0/28"
}

variable "gw" {
  description = "Gateway"
  type        = string
  default     = "172.26.0.2"
}

variable "allocation_pool" {
  description = "IP Allocation Pool"
  type = object({
    start = string
    end   = string
  })
}

# --------------------------------
# OVH k0s instance parameters
# --------------------------------

variable "k0s_instances" {
  description = "Instances definition"
  type = list(object({
    server_name = string
    image_name  = string
    ostype      = string
    flavor_name = string
    tags        = optional(set(string))
    addresses   = string
    dns         = optional(string)
    search      = optional(string)
  }))

  validation {
    condition = alltrue([
      for instance in var.k0s_instances : contains(["ubuntu", "rhel8", "rhel9"], instance.ostype)
    ])
    error_message = "The ostype should be one of ['ubuntu', 'rhel8', 'rhel9']"
  }
}

# ----------------------------
# OVH storage parameters
# ---------------------------

variable "enable_storage" {
  description = "Enable storage"
  default     = false
}

variable "storage" {
  description = "Storage definition"
  type = object({
    server_name  = string
    image_name   = optional(string)
    flavor_name  = string
    tags         = optional(set(string))
    storage_size = number
    addresses    = string
    dns          = optional(string)
    search       = optional(string)
    shares = list(object({
      path  = string
      owner = optional(string)
      mode  = optional(string)
    }))
  })
  default = null
}

# --------------------------
# OVH router parameters
# --------------------------

variable "enable_router" {
  description = "Enable router"
  default     = false
}

variable "router" {
  description = "Router definition"
  type = object({
    server_name = string
    image_name  = string
    flavor_name = string
    tags        = optional(set(string))
    public_ip   = string
    addresses   = string
    bgp_asn     = number
    wireguard_vpns = list(object({
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
    ipsec_vpns = list(object({
      address = string
      peer = object({
        name       = string
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
    netmaker_vpns = list(object({
      token = string
    }))
    tailscale_vpns = list(object({
      address           = string
      key               = string
      advertised_routes = string
    }))
  })
  default = null
}
