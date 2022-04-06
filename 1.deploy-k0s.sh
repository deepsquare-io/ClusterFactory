#!/bin/sh

section "Checking prerequisites"

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

section "Deploy kubevirt (virtual machines deployments)"
# Updating is only supported to n-1 to n. Be warned.
# https://kubevirt.io/user-guide/operations/updating_and_deletion/
RELEASE=v0.51.0
kubectl apply -f https://github.com/kubevirt/kubevirt/releases/download/${RELEASE}/kubevirt-operator.yaml
kubectl apply -k core/kubevirt/overlays/prod

section "Wait for all deployments to be Available"
sleep 10
kubectl wait deployments --timeout=3600s --all --all-namespaces --for condition=Available

section "Deploy multus (multiple network interfaces support)"
kubectl apply -f https://raw.githubusercontent.com/k8snetworkplumbingwg/multus-cni/master/deployments/multus-daemonset-thick-plugin.yml

section "Wait for all deployments to be Available"
sleep 10
kubectl wait deployments --timeout=3600s --all --all-namespaces --for condition=Available

cat <<EOF
---Step 1 finished---
EOF
