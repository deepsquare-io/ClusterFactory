#!/bin/sh

packer build -var "numvcpus=6" -var "memsize=8000" compute.bare.json
