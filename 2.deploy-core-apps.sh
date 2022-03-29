#!/bin/sh

section() {
  echo
  echo "---$1---"
}

section "Checking prerequisites"

. "./scripts/common.sh"

set -e

section "Fetch the config"
k0sctl kubeconfig --config ./k0sctl.yaml >"$KUBECONFIG"
chmod 600 ./kubeconfig

section "Deploy sealed secrets"
cd ./core/sealed-secrets
./install.sh

cd "$WORKDIR"

section "Setup cert-manager issuers"
kubectl apply -f ./core/cert-manager/selfsigned-cluster-issuer.yml

section "Setup Traefik dashboard and routes"
kubectl apply -k ./core/traefik-dashboard/

section "Deploy ArgoCD and setup argo-cd routes"
cd ./core/argo-cd
./install.sh
kubectl apply -k .

cd "$WORKDIR"

echo "Credentials for ArgoCD are admin $(kubectl get secret -n argocd argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode)"

section "Wait for all deployments to be Available"
kubectl wait deployments --all --all-namespaces --for condition=Available

cat <<EOF
---Step 2 finished---
You can now deploy our stack or deploy your own apps with ArgoCD !

Prepare the secrets in the argo/initial/secrets directory!
EOF
