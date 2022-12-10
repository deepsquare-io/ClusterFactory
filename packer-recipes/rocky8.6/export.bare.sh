#!/bin/bash -ex

export IMAGE_PATH=output-qemu/packer-qemu
export XCAT_SERVER=root@10.10.2.160
export EXPORT_PATH=/install/netboot/rocky8.6/x86_64/compute/rootimg/

teardown() {
  source ./scripts-local/teardown-nbd
}

trap teardown EXIT

source ./scripts-local/setup-nbd
source ./scripts-local/rsync-to-xcat
