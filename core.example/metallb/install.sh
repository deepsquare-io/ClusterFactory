#!/bin/sh

BASEDIR="$(dirname "$(realpath "$0")")"

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm upgrade --install \
  -n metallb \
  metallb \
  -f "${BASEDIR}/values.yaml" \
  --version 5.0.2 \
  bitnami/metallb \
  --create-namespace
