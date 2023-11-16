# `dmsquash-live` and SystemD, GitOps for compute nodes

## `dmsquash-live`, the dracut module for statless images

Dracut is a tool used for creating the initial ramdisk (initramfs). The initramfs is a file system that is invoked during the early stage of the Linux boot process to load essential drivers, modules and tools to mount the root file system and complete the boot procedure.

With dracut, one of its key capabilities is the dmsquash-live dracut module, which allows the integration of compressed squashfs file systems into initramfs images. Combined with the livenet dracut module, it is possible to boot an OS by fetching the squashfs file system from the network, via HTTP, HTTPS, FTP, Torrent, or TFTP.

Moreover, if we use OverlayFS, the same technologies used for containers, we can have a stateless image with a writable layer on top of it.

## SystemD, the main init system

SystemD is the default init system of Rockylinux and many popular Linux distributions. By using SystemD, we can use a SystemD service that pulls a Git repository and configure the node similarly to ArgoCD.

We can achieve a pull-based configuration without the need to use Ansible and/or Terraform, which are push-based.
