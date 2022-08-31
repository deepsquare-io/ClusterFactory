#!/bin/sh

packer.io build -var "numvcpus=12" -var "memsize=32609" compute.bare.json
