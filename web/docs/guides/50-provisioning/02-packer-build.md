# Build an OS Image with Packer

## SquareOS Image

### Configuring and Launching Packer

The [`packer-recipes` directory inside the git repository](https://github.com/deepsquare-io/ClusterFactory/tree/main/packer-recipes) contains examples of Packer configuration files.

```json title="compute.bare.json"
{
  "variables": {
    "boot_wait": "3s",
    "disk_size": "50G",
    "iso_checksum": "fe77cc293a2f2fe6ddbf5d4bc2b5c820024869bc7ea274c9e55416d215db0cc5",
    "iso_url": "https://download.rockylinux.org/vault/rocky/8.6/isos/x86_64/Rocky-8.6-x86_64-boot.iso",
    "memsize": "2048",
    "numvcpus": "4"
  },
  "builders": [
    {
      "type": "qemu",
      "accelerator": "kvm",
      "communicator": "none",
      "boot_command": [
        "<up><tab><bs><bs><bs><bs><bs> ",
        "inst.ks=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ks.bare.cfg ",
        "inst.cmdline",
        "<enter><wait>"
      ],
      "boot_wait": "{{ user `boot_wait` }}",
      "disk_size": "{{ user `disk_size` }}",
      "iso_url": "{{ user `iso_url` }}",
      "iso_checksum": "{{ user `iso_checksum` }}",
      "headless": true,
      "cpus": "{{ user `numvcpus` }}",
      "memory": "{{ user `memsize` }}",
      "vnc_bind_address": "0.0.0.0",
      "http_directory": "http",
      "shutdown_timeout": "3h",
      "qemuargs": [["-serial", "stdio"]]
    }
  ]
}
```

When running Packer, the process is the following:

- Launch a HTTP server that serves the `http` directory.
- Launch a VM and a VNC session.
- Boot on the ISO and enter the `boot_command` to load the RedHat Kickstart file from HTTP.
- Run the Kickstart RedHat file. This file automates the installation process of the OS.
- Shut down the VM.

Configure the installation process by editing the `http/ks.bare.cfg`.

The `packages` and `post` blocks are probably what you are interested in.

Run packer with:

```shell title="user@local:/ClusterFactory/packer-recipes/rocky"
packer build -var "numvcpus=12" -var "memsize=23609" compute.bare.json
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
OUTPUT=squareos-8.6.squashfs ./scripts-local/squash-root

# Unmount the disk
source ./scripts-local/teardown-nbd
```
