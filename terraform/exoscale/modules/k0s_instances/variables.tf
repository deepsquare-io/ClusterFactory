# -----------------------------------
# Exoscale instance common parameters
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

variable "gw" {
  description = "Gateway"
  type        = string
  default     = "172.26.0.2"
}

# --------------------------------
# Exoscale k0s instance parameters
# --------------------------------

variable "k0s_instances" {
  description = "Instances definition"
  type = list(object({
    server_name      = string
    template         = string
    template_filter  = string
    ostype           = string
    service_offering = string
    labels           = optional(map(string))
    root_disk_size   = number
    addresses        = string
    dns              = optional(string)
    search           = optional(string)
  }))

  validation {
    condition = alltrue([
      for instance in var.k0s_instances : contains(["ubuntu", "rhel8", "rhel9"], instance.ostype)
    ])
    error_message = "The ostype should be one of ['ubuntu', 'rhel8', 'rhel9']"
  }

  validation {
    condition = alltrue([
      for instance in var.k0s_instances : contains(["featured", "community", "mine"], instance.template_filter)
    ])
    error_message = "The template_filter should be one of ['featured', 'community', 'mine']"
  }
}
