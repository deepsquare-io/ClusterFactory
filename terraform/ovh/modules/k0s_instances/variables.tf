# -----------------------------------
# OVH instance common parameters
# -----------------------------------

variable "region" {
  description = "Region"
  type        = string
  default     = "GRA9"
}

variable "ssh_keys" {
  description = "Default SSH Keys"
  type        = list(string)
}

variable "network_id" {
  description = "Private Network ID"
  type        = string
}

variable "subnet_id" {
  description = "Subnet ID"
  type        = string
}

variable "gw" {
  description = "Gateway"
  type        = string
  default     = "172.26.0.2"
}

# --------------------------------
# OVH k0s instance parameters
# --------------------------------

variable "k0s_instances" {
  description = "Instances definition"
  type = list(object({
    server_name    = string
    image_name     = string
    ostype         = string
    flavor_name    = string
    tags           = optional(set(string))
    root_disk_size = number
    addresses      = string
    dns            = optional(string)
    search         = optional(string)
  }))

  validation {
    condition = alltrue([
      for instance in var.k0s_instances : contains(["ubuntu", "rhel8", "rhel9"], instance.ostype)
    ])
    error_message = "The ostype should be one of ['ubuntu', 'rhel8', 'rhel9']"
  }
}
