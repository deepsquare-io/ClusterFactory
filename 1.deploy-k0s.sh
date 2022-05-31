#!/bin/sh

. "./scripts/common.sh"

set -e

section "Setup the whole cluster"
k0sctl apply --config ./k0sctl.yaml

section "Fetch the config"
k0sctl kubeconfig --config ./k0sctl.yaml >./kubeconfig
chmod 600 ./kubeconfig

export KUBECONFIG="$WORKDIR/kubeconfig"

section "Wait for all node to be ready"
sleep 30
kubectl wait nodes --timeout=3600s --all --for condition=Ready

section "Remove Master NoSchedule Taint"
kubectl taint nodes --kubeconfig kubeconfig --all node-role.kubernetes.io/master:NoSchedule- || echo "taint removal failed: error ignored"

section "Wait for all deployments to be Available"
sleep 10
kubectl wait deployments --timeout=3600s --all --all-namespaces --for condition=Available

cat <<EOF
---Step 1 finished---
EOF
