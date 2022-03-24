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

if ! [ -x "$(command -v helm)" ]; then
  echo "helm could not be found. Downloading it and installing it."
  curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
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

section "Deploy sealed secrets"
cd ./core/sealed-secrets
./install.sh

cd "$WORKDIR"

section "Setup cert-manager issuers"
$KUBECTL apply -f ./core/cert-manager/selfsigned-cluster-issuer.yml

section "Setup Traefik dashboard and routes"
$KUBECTL apply -k ./core/traefik-dashboard/

section "Deploy ArgoCD and setup argo-cd routes"
cd ./core/argo-cd
./install.sh
$KUBECTL apply -k .

cd "$WORKDIR"

echo "Credentials for ArgoCD are admin $($KUBECTL get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode)"

section "Wait for all deployments to be Available"
$KUBECTL wait deployments --all --all-namespaces --for condition=Available

cat <<EOF
---Step 2 finished---
You can now deploy our stack or deploy your own apps with ArgoCD !

Prepare the secrets in the argo/initial/secrets directory!
EOF
