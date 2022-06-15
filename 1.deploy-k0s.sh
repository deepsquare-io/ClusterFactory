#!/bin/sh

. "./scripts/common.sh"

set -e

section "Setup the whole cluster"
cfctl apply --debug --config ./cfctl.yaml

section "Fetch the config"
cfctl kubeconfig --config ./cfctl.yaml >./kubeconfig
chmod 600 ./kubeconfig

export KUBECONFIG="$WORKDIR/kubeconfig"

section "Wait for all node to be ready"
sleep 30
kubectl wait nodes --timeout=3600s --all --for condition=Ready

section "Wait for all deployments to be Available"
sleep 10
kubectl wait deployments --timeout=3600s --all --all-namespaces --for condition=Available

cat <<EOF
---Step 1 finished---
EOF
