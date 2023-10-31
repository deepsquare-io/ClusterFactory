#!/bin/bash -ex

teardown() {
  source ./scripts-local/teardown-nbd
}

trap teardown EXIT

export IMAGE_PATH=output-compute_bare/packer-compute_bare

source ./scripts-local/setup-nbd
./scripts-local/exec-dracut
OUTPUT=squareos-9.2.squashfs ./scripts-local/squash-root

chmod -R 777 ./output-boot
chmod -R 777 ./output-squash
