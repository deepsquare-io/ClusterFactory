#!/bin/sh

BASEDIR="$(dirname "$(realpath "$0")")"

helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

helm upgrade --install \
  -n argocd \
  -f "${BASEDIR}/values.yaml" \
  --version 8.3.0 \
  argocd \
  argo/argo-cd \
  --create-namespace
