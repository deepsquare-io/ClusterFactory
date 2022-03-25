#!/bin/sh

section() {
  echo
  echo "---$1---"
}

PROJECT=monitoring

WORKDIR=$(pwd)
export KUBECONFIG="$WORKDIR/kubeconfig"

section "Checking prerequisites"

mkdir -p ./bin
PATH="$(pwd)/bin:${PATH}"
export PATH

KUBESEAL="$(command -v kubeseal)"
if ! [ -x "$KUBESEAL" ]; then
  KUBESEAL_VERSION=0.17.3
  echo "kubeseal could not be found. Downloading it locally in ./bin."
  rm -f ./bin/kubeseal
  curl -fsSL "https://github.com/bitnami-labs/sealed-secrets/releases/download/v${KUBESEAL_VERSION}/kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz" | tar -zxvf kubeseal
  mv kubeseal ./bin/kubeseal
  chmod +x ./bin/kubeseal
fi

K0SCTL="$(command -v k0sctl)"
if ! [ -x "${K0SCTL}" ]; then
  K0SCTL_VERSION=0.13.0-beta.5
  echo "k0sctl could not be found. Downloading it locally in ./bin"
  rm -f ./bin/k0sctl
  curl -fsSL -o ./bin/k0sctl https://github.com/k0sproject/k0sctl/releases/download/v${K0SCTL_VERSION}/k0sctl-linux-x64
  chmod +x ./bin/k0sctl
fi

KUBECTL="$(command -v kubectl)"
if ! [ -x "${KUBECTL}" ]; then
  echo "kubectl could not be found. Downloading it locally in ./bin"
  rm -f ./bin/kubectl
  curl -fsSL -o ./bin/kubectl "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  chmod +x ./bin/kubectl
fi

set -e

section "Fetch the config"
$K0SCTL kubeconfig --config ./k0sctl.yaml >"$KUBECONFIG"
chmod 600 ./kubeconfig

section "Deploy initial namespace"
$KUBECTL apply -f ./argo/${PROJECT}/namespace.yml

section "Deploy initial volumes"
$KUBECTL apply -f ./argo/${PROJECT}/volumes

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
kubectl wait pods --all -n ${PROJECT} --for condition=Ready
