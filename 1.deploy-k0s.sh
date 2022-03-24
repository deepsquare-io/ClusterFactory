#!/bin/sh

section() {
  echo
  echo "---$1---"
}

section "Checking prerequisites"

mkdir -p ./bin
PATH="$(pwd)/bin:${PATH}"
export PATH

K0SCTL="$(command -v k0sctl)"
if ! [ -x "${K0SCTL}" ]; then
  if ! [ -f ./bin/k0sctl ]; then
    echo "k0sctl could not be found. Downloading it locally in ./bin"
    rm -f ./bin/k0sctl
    curl -fsSL -o ./bin/k0sctl https://github.com/k0sproject/k0sctl/releases/download/v0.13.0-rc.1/k0sctl-linux-x64
    chmod +x ./bin/k0sctl
  fi
  K0SCTL="$(pwd)/bin/k0sctl"
fi

KUBECTL="$(command -v kubectl)"
if ! [ -x "${KUBECTL}" ]; then
  if ! [ -f ./bin/kubectl ]; then
    echo "kubectl could not be found. Downloading it locally in ./bin"
    rm -f ./bin/kubectl
    curl -fsSL -o ./bin/kubectl "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    chmod +x ./bin/kubectl
  fi
  K0SCTL="$(pwd)/bin/kubectl"
fi

set -e

section "Setup the whole cluster"
$K0SCTL apply --config ./k0sctl.yaml

section "Wait for all node to be ready"
kubectl wait nodes --all --for condition=Ready

section "Fetch the config"
$K0SCTL kubeconfig --config ./k0sctl.yaml >./kubeconfig
chmod 600 ./kubeconfig

section "Remove Master NoSchedule Taint"
$KUBECTL taint nodes --kubeconfig kubeconfig --all node-role.kubernetes.io/master:NoSchedule-

section "Wait for all deployments to be Available"
kubectl wait deployments --all --all-namespaces --for condition=Available

section "Deploy kubevirt"
# Updating is only supported to n-1 to n. Be warned.
# https://kubevirt.io/user-guide/operations/updating_and_deletion/
#RELEASE=v0.51.0
kubectl apply -k core/kubevirt

section "Wait for all deployments to be Available"
kubectl wait deployments --all --all-namespaces --for condition=Available

cat <<EOF
---Step 1 finished---
EOF
