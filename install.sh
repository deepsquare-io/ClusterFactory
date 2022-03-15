#!/bin/sh

echo "---Setup the whole cluster---"
k0sctl apply --config k0sctl.yaml

echo
echo "---Let's sleep a little (5 sec)---"
sleep 5

echo
echo "---Setup cert-manager---"
kubectl apply -f core/cert-manager/selfsigned-cluster-issuer.yml

echo
echo "---Setup Traefik dashboard and routes---"
kubectl apply -k core/traefik-dashboard/

echo
echo "---Setup argo-cd routes---"
kubectl apply -k core/argo-cd/
