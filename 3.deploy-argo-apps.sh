#!/bin/sh

section() {
  echo
  echo "---$1---"
}

WORKDIR=$(pwd)
export KUBECONFIG="$WORKDIR/kubeconfig"

section "Checking prerequisites"

mkdir -p ./bin
PATH="$(pwd)/bin:${PATH}"
export PATH

KUBESEAL="$(command -v kubeseal)"
if ! [ -x "$KUBESEAL" ]; then
  if ! [ -f ./bin/kubeseal ]; then
    KUBESEAL_VERSION=0.17.3
    echo "kubeseal could not be found. Downloading it locally in ./bin."
    rm -f ./bin/kubeseal
    wget "https://github.com/bitnami-labs/sealed-secrets/releases/download/v${KUBESEAL_VERSION}/kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz"
  fi
  tar -zxvf kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz kubeseal
  mv kubeseal ./bin/kubeseal
  chmod +x ./bin/kubeseal
  rm -f kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz
fi

K0SCTL="$(command -v k0sctl)"
if ! [ -x "${K0SCTL}" ]; then
  if ! [ -f ./bin/k0sctl ]; then
    K0SCTL_VERSION=0.13.0-beta.5
    echo "k0sctl could not be found. Downloading it locally in ./bin"
    rm -f ./bin/k0sctl
    wget -qO ./bin/k0sctl https://github.com/k0sproject/k0sctl/releases/download/v${K0SCTL_VERSION}/k0sctl-linux-x64
    chmod +x ./bin/k0sctl
  fi
  K0SCTL="$(pwd)/bin/k0sctl"
fi

KUBECTL="$(command -v kubectl)"
if ! [ -x "${KUBECTL}" ]; then
  if ! [ -f ./bin/kubectl ]; then
    echo "kubectl could not be found. Downloading it locally in ./bin"
    rm -f ./bin/kubectl
    wget -qO ./bin/kubectl "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    chmod +x ./bin/kubectl
  fi
  K0SCTL="$(pwd)/bin/kubectl"
fi

set -e

section "Fetch the config"
$K0SCTL kubeconfig --config ./k0sctl.yaml >"$KUBECONFIG"
chmod 600 ./kubeconfig

section "Deploy initial namespaces"
$KUBECTL apply -f ./argo/initial/namespaces

section "Deploy initial volumes"
$KUBECTL apply -f ./argo/initial/volumes

section "Deploy initial secrets"
if ! [ -f ./argo/initial/secrets/grafana-admin-sealed-secret.yml ]; then
  echo "Grafana Sealed Secret not found. Generating Grafana Password..."
  cat <<EOF | $KUBESEAL \
    --controller-namespace sealed-secrets \
    --controller-name sealed-secrets \
    --format yaml \
    >./argo/initial/secrets/grafana-admin-sealed-secret.yml

apiVersion: v1
kind: Secret
metadata:
  name: grafana-admin-secret
  namespace: monitoring
type: Opaque
stringData:
  admin-user: admin
  admin-password: '$(tr </dev/urandom -dc 'a-zA-Z0-9' | head -c 32)'

EOF
fi

kubectl apply -f ./argo/initial/secrets

section "Deploy monitoring project"
kubectl apply -f ./argo/monitoring/app-project.yml

kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-alertmanagerconfigs.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-alertmanagers.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-podmonitors.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-probes.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-prometheuses.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-prometheusrules.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-servicemonitors.yaml --force-conflicts=true --server-side
kubectl apply -f https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/crds/crd-thanosrulers.yaml --force-conflicts=true --server-side

kubectl apply -f ./argo/monitoring/prometheus-app.yml
