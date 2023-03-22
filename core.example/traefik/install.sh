#!/bin/sh

BASEDIR="$(dirname "$(realpath "$0")")"

helm repo add traefik https://traefik.github.io/charts
helm repo update

helm upgrade --install \
  -n traefik \
  --version 21.2.0 \
  traefik \
  -f "${BASEDIR}/values.yaml" \
  traefik/traefik \
  --create-namespace
