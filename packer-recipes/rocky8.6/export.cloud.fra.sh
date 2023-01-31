#!/bin/sh

s3cmd --acl-public put output-cloud-gpu-deepsquare/packer-cloud-gpu-deepsquare put s3://compute-custom-template-de-fra/cn-template-fra-gpu.qcow2
s3cmd --acl-public put output-cloud-light-deepsquare/packer-cloud-light-deepsquare put s3://compute-custom-template-de-fra/cn-template-fra-light.qcow2
