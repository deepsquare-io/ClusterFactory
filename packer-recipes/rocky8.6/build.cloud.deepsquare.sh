#!/bin/sh

packer build -var "numvcpus=8" -var "memsize=8192" compute.cloud.deepsquare.json
