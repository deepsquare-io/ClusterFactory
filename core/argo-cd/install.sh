#!/bin/sh

helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

helm upgrade --install \
  -n argocd \
  -f values.yml \
  --version 3.35.4 \
  argocd \
  argo/argo-cd \
  --create-namespace
