#!/bin/sh

section() {
  echo
  echo "---$1---"
}

WORKDIR=$(pwd)
export WORKDIR
export KUBECONFIG="$WORKDIR/kubeconfig"

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
  KUBESEAL="$(command -v kubeseal)"
fi
export KUBESEAL

K0SCTL="$(command -v k0sctl)"
if ! [ -x "${K0SCTL}" ]; then
  K0SCTL_VERSION=v0.13.0-rc.1
  echo "k0sctl could not be found. Downloading it locally in ./bin"
  rm -f ./bin/k0sctl
  curl -fsSL -o ./bin/k0sctl https://github.com/k0sproject/k0sctl/releases/download/${K0SCTL_VERSION}/k0sctl-linux-x64
  chmod +x ./bin/k0sctl
  K0SCTL="$(command -v k0sctl)"
fi
export K0SCTL

KUBECTL="$(command -v kubectl)"
if ! [ -x "${KUBECTL}" ]; then
  echo "kubectl could not be found. Downloading it locally in ./bin"
  rm -f ./bin/kubectl
  curl -fsSL -o ./bin/kubectl "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  chmod +x ./bin/kubectl
  KUBECTL="$(command -v kubectl)"
fi
export KUBECTL
