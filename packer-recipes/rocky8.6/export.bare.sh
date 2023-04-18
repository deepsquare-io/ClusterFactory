#!/bin/bash -ex

teardown() {
  source ./scripts-local/teardown-nbd
}

trap teardown EXIT

source ./scripts-local/setup-nbd
./scripts-local/exec-dracut
OUTPUT=squareos-8.6.squashfs ./scripts-local/squash-root
