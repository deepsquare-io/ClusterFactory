#!/bin/sh

s3cmd --acl-public put output-cloud-gpu/packer-cloud-gpu put s3://compute-custom-template-de-fra/cn-template-gpu.qcow2
s3cmd --acl-public put output-cloud-light/packer-cloud-light put s3://compute-custom-template-de-fra/cn-template-light.qcow2
