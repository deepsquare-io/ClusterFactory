#!/bin/sh

BASEDIR="$(dirname "$(realpath "$0")")"

helm repo add traefik https://traefik.github.io/charts
helm repo update

kubectl apply --server-side --force-conflicts -k https://github.com/traefik/traefik-helm-chart/traefik/crds/
helm upgrade --install \
  -n traefik \
  --version 25.0.0 \
  traefik \
  -f "${BASEDIR}/values.yaml" \
  traefik/traefik \
  --create-namespace
