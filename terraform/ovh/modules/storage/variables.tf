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

variable "network" {
  description = "Private Network"
  type        = string
}

variable "gw" {
  description = "Gateway"
  type        = string
  default     = "172.26.0.2"
}

# ---------------------------
# OVH storage parameters
# ---------------------------

variable "server_name" {
  description = "Server Name"
  type        = string
}

variable "image_name" {
  description = "Image Name"
  type        = string
}

variable "flavor_name" {
  description = "Flavor (instance type)"
  type        = string
}

variable "tags" {
  description = "Tags"
  type        = set(string)
  default     = []
}

variable "root_disk_size" {
  description = "Disk size (GB)"
  type        = number
}

variable "addresses" {
  description = "Addresses CIDR (ex: 192.168.0.1/24)"
  type        = string
}

variable "dns" {
  description = "DNS IP address"
  type        = string
  default     = "8.8.8.8"
}

variable "search" {
  description = "Search names"
  type        = string
  default     = ""
}

variable "shares" {
  description = <<EOD
NFS Shares, will be prefixed with /srv/nfs, only use relative path.
EOD
  type = list(object({
    path  = string
    owner = optional(string)
    mode  = optional(string)
  }))
  default = []
}
