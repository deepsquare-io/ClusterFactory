packer {
  required_plugins {
    qemu = {
      source  = "github.com/hashicorp/qemu"
      version = "~> 1"
    }
  }
}

variable "boot_wait" {
  type    = string
  default = "3s"
}

variable "disk_size" {
  type    = string
  default = "50G"
}

variable "iso_checksum" {
  type    = string
  default = "11e42da96a7b336de04e60d05e54a22999c4d7f3e92c19ebf31f9c71298f5b42"
}

variable "iso_url" {
  type    = string
  default = "https://download.rockylinux.org/pub/rocky/9.2/isos/x86_64/Rocky-9.2-x86_64-boot.iso"
}

variable "memsize" {
  type    = string
  default = "2048"
}

variable "numvcpus" {
  type    = string
  default = "4"
}

source "qemu" "compute_bare" {
  accelerator      = "kvm"
  boot_command     = ["<up><tab><bs><bs><bs><bs><bs> inst.ks=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ks.bare.cfg inst.cmdline<enter><wait>"]
  boot_wait        = "${var.boot_wait}"
  communicator     = "none"
  cpus             = "${var.numvcpus}"
  disk_size        = "${var.disk_size}"
  headless         = true
  http_directory   = "http"
  iso_checksum     = "${var.iso_checksum}"
  iso_url          = "${var.iso_url}"
  memory           = "${var.memsize}"
  cpu_model        = "host"
  qemuargs         = [["-serial", "stdio"]]
  shutdown_timeout = "3h"
  vnc_bind_address = "0.0.0.0"
}

build {
  sources = ["source.qemu.compute_bare"]
}
