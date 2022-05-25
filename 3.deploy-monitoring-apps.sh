#!/bin/sh

PROJECT=monitoring

. "./scripts/common.sh"

set -e

section "Fetch the config"
k0sctl kubeconfig --config ./k0sctl.yaml >"$KUBECONFIG"
chmod 600 ./kubeconfig

section "Deploy initial namespace"
kubectl apply -f ./argo/${PROJECT}/namespace.yml

section "Deploy initial volumes"
kubectl apply -f ./argo/${PROJECT}/volumes

section "Deploy initial secrets"
if ! [ -f ./argo/${PROJECT}/secrets/grafana-admin-sealed-secret.yml ]; then
  echo "Grafana Sealed Secret not found."
  exit 1
fi

kubectl apply -f ./argo/${PROJECT}/secrets

section "Deploy ${PROJECT} project"
kubectl apply -f ./argo/${PROJECT}/app-project.yml

# TODO: Wait for fix : https://github.com/prometheus-community/helm-charts/issues/1500
# For now, let's do it manually.
# skipCrd has also been enabled in the prometheus argo app.
# If the issue is closed, remove skipCrd from the argo app and the lines below.
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-alertmanagerconfigs.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-alertmanagers.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-podmonitors.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-probes.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-prometheuses.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-prometheusrules.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-servicemonitors.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-thanosrulers.yaml --force-conflicts=true --server-side

kubectl apply -f ./argo/${PROJECT}/apps

section "Wait for all pods to be Ready"
sleep 10
kubectl wait pods --timeout=3600s --all -n ${PROJECT} --for condition=Ready
