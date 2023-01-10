#!/bin/sh

helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm upgrade --install \
  -n metallb \
  --version 4.1.13 \
  bitnami/metallb \
  --create-namespace
