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

architecture=""
case $(uname -m) in
x86_64) architecture="x64" ;;
arm) dpkg --print-architecture | grep -q "arm64" && architecture="arm64" || architecture="arm" ;;
*) echo "Unsupported architecture: $(uname -m)" && exit 1 ;;
esac

os=""
case "$(uname)" in
'Linux')
  os='linux'
  ;;
'Darwin')
  os='darwin'
  ;;
*) echo "Unsupported OS: $(uname)" ;;
esac

echo "Detected supported architecture: $(uname -m)"

K0SCTL="$(command -v k0sctl)"
if ! [ -x "${K0SCTL}" ]; then
  K0SCTL_VERSION=v0.13.0
  echo "k0sctl could not be found. Downloading it locally in ./bin"
  rm -f ./bin/k0sctl
  curl -fsSL -o ./bin/k0sctl "https://github.com/k0sproject/k0sctl/releases/download/${K0SCTL_VERSION}/k0sctl-${os}-${architecture}"
  chmod +x ./bin/k0sctl
  K0SCTL="$(command -v k0sctl)"
fi
echo "Found k0sctl: $(k0sctl version)"
echo
export K0SCTL

architecture=""
case $(uname -m) in
x86_64) architecture="amd64" ;;
arm) dpkg --print-architecture | grep -q "arm64" && architecture="arm64" || architecture="arm" ;;
*) echo "Unsupported architecture: $(uname -m)" && exit 1 ;;
esac

KUBECTL="$(command -v kubectl)"
if ! [ -x "${KUBECTL}" ]; then
  echo "kubectl could not be found. Downloading it locally in ./bin"
  rm -f ./bin/kubectl
  curl -fsSL -o ./bin/kubectl "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/${os}/${architecture}/kubectl"
  chmod +x ./bin/kubectl
  KUBECTL="$(command -v kubectl)"
fi
echo "Found kubectl: $(kubectl version --client)"
echo
export KUBECTL

KUBESEAL="$(command -v kubeseal)"
if ! [ -x "$KUBESEAL" ]; then
  KUBESEAL_VERSION=0.17.5
  echo "kubeseal could not be found. Downloading it locally in ./bin."
  rm -f ./bin/kubeseal
  curl -fsSL "https://github.com/bitnami-labs/sealed-secrets/releases/download/v${KUBESEAL_VERSION}/kubeseal-${KUBESEAL_VERSION}-${os}-${architecture}.tar.gz" | tar -zxvf - kubeseal
  mv kubeseal ./bin/kubeseal
  chmod +x ./bin/kubeseal
  KUBESEAL="$(command -v kubeseal)"
fi
echo "Found kubectl: $(kubeseal --version)"
echo
export KUBESEAL

HELM="$(command -v helm)"
if ! [ -x "$HELM" ]; then
  HELM_VERSION=3.9.0
  echo "helm could not be found. Downloading it locally in ./bin."
  rm -f ./bin/helm
  curl -fsSL "https://get.helm.sh/helm-v${HELM_VERSION}-${os}-${architecture}.tar.gz" | tar -zxvf - "${os}-${architecture}/helm"
  mv "${os}-${architecture}/helm" ./bin/helm
  rmdir "${os}-${architecture}"
  chmod +x ./bin/helm
  HELM="$(command -v helm)"
fi
echo "Found helm: $(helm version)"
echo
export HELM
