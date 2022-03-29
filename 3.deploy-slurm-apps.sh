#!/bin/sh

section() {
  echo
  echo "---$1---"
}

PROJECT=slurm-cluster

section "Checking prerequisites"

. "$(pwd)/scripts/common.sh"

set -e

section "Fetch the config"
k0sctl kubeconfig --config ./k0sctl.yaml >"$KUBECONFIG"
chmod 600 ./kubeconfig

section "Deploy initial namespace"
kubectl apply -f ./argo/${PROJECT}/namespace.yml

section "Deploy initial volumes"
kubectl apply -f ./argo/${PROJECT}/volumes

section "Deploy initial secrets"
kubectl apply -f ./argo/${PROJECT}/secrets

section "Deploy ${PROJECT} project"
kubectl apply -f ./argo/${PROJECT}/app-project.yml

kubectl apply -f ./argo/${PROJECT}/apps

section "Wait for all pods to be Ready"
kubectl wait pods --all -n ${PROJECT} --for condition=Ready
