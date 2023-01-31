#!/bin/sh

openstack image create --disk-format qcow2 --container-format bare --file "$(pwd)/output-cloud-light-deepsquare/packer-cloud-light-deepsquare" --private --property distribution=rockylinux --property hw_disk_bus=scsi --property hw_scsi_model=virtio-scsi --property hw_qemu_guest_agent=yes "cn-template-light"
openstack image create --disk-format qcow2 --container-format bare --file "$(pwd)/output-cloud-gpu-deepsquare/packer-cloud-gpu-deepsquare" --private --property distribution=rockylinux --property hw_disk_bus=scsi --property hw_scsi_model=virtio-scsi --property hw_qemu_guest_agent=yes "cn-template-gpu"
