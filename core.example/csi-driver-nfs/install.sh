#!/bin/sh

BASEDIR="$(dirname "$(realpath "$0")")"

helm repo add csi-driver-nfs https://raw.githubusercontent.com/kubernetes-csi/csi-driver-nfs/master/charts
helm repo update

helm upgrade --install \
  -n csi-driver-nfs \
  --version v4.5.0 \
  csi-driver-nfs \
  -f "${BASEDIR}/values.yaml" \
  csi-driver-nfs/csi-driver-nfs \
  --create-namespace
