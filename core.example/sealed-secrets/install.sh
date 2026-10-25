#!/bin/sh

helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm repo update

helm upgrade --install \
  -n sealed-secrets \
  --version null \
  sealed-secrets \
  sealed-secrets/sealed-secrets \
  --create-namespace
