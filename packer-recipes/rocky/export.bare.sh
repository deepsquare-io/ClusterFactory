#!/bin/bash -ex

export MOUNT=10.10.2.11:/mnt/pool1/k8s/xcat
export EXPORT_PATH=/install/netboot/rocky8.4/x86_64/compute/rootimg/

source ./scripts-local/setup-nbd
source ./scripts-local/rsync-to-nfs
source ./scripts-local/teardown-nbd
