# Build an OS Image with Packer

## SquareOS Image

### Download

The OS image, kernel and initramfs can be downloaded:

- [OS Image](https://sos-ch-dk-2.exo.io/osimages/squareos-9.2/squareos-9.2.squashfs)
- [Initramfs](https://sos-ch-dk-2.exo.io/osimages/squareos-9.2/initramfs-5.14.0-284.30.1.el9_2.x86_64.img)
- [Kernel](https://sos-ch-dk-2.exo.io/osimages/squareos-9.2/vmlinuz-5.14.0-284.30.1.el9_2.x86_64)

### Build from scratch

The [`packer-recipes` directory inside the git repository](https://github.com/deepsquare-io/ClusterFactory/tree/main/packer-recipes) contains examples of Packer configuration files.

```hcl title="compute.bare.pkr.hcl"
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

```

When running Packer, the process is the following:

- Launch an HTTP server that serves the `http` directory.
- Launch a VM and a VNC session.
- Boot on the ISO and enter the `boot_command` to load the RedHat Kickstart file from HTTP.
- Run the Kickstart RedHat file. This file automates the installation process of the OS.
- Shut down the VM.

Configure the installation process by editing the `http/ks.bare.cfg`.

The `packages` and `post` blocks are probably what you are interested in.

Run packer with:

```shell title="user@local:/ClusterFactory/packer-recipes/rocky9.2"
packer build -var "numvcpus=6" -var "memsize=8000" compute.bare.pkr.hcl
```

### Extracting the kernel, initramfs and create a squashfs for Grendel

There the script `export.bare.sh` which can help you extract the kernel, initramfs and create a squashfs.

You must run it by root.

```shell title="export.bare.sh"
# Mount the disk
source ./scripts-local/setup-nbd

# Extract initramfs and kernel
./scripts-local/exec-dracut

# Squash the image
OUTPUT=squareos-9.2.squashfs ./scripts-local/squash-root

# Unmount the disk
source ./scripts-local/teardown-nbd
```
