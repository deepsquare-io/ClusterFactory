#!/bin/sh -ex

script_path="$(dirname "$0")"
project_path="$script_path/../"

TOKEN="$1"

# Core Versions
argocd_version=$(curl -fsSL https://argoproj.github.io/argo-helm/index.yaml | yq '.entries.argo-cd.[0].version')
sed -Ei "s/argocd_version=.*\$/argocd_version=${argocd_version}/g" "$script_path/version-lock"
sed -Ei "s/version .*\$/version ${argocd_version} \\\\/g" "$project_path/core.example/argo-cd/install.sh"

sealed_secrets_version=$(curl -fsSL https://bitnami-labs.github.io/sealed-secrets/index.yaml | yq '.entries.sealed-secrets.[0].version')
sed -Ei "s/sealed_secrets_version=.*\$/sealed_secrets_version=${sealed_secrets_version}/g" "$script_path/version-lock"
sed -Ei "s/version .*\$/version ${sealed_secrets_version} \\\\/g" "$project_path/core.example/sealed-secrets/install.sh"

kubevirt_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/kubevirt/kubevirt/tags | jq -r '.[0].name')
sed -Ei "s|kubevirt_version=.*\$|kubevirt_version=${kubevirt_version}|g" "$script_path/version-lock"
sed -Ei "s|(.*)/v.*/(.*)\$|\1/${kubevirt_version}/\2|g" "$project_path/core.example/kubevirt/base/kustomization.yaml"

coredns_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/coredns/coredns/releases/latest | jq -r '.tag_name' | tr -d 'v')
sed -Ei "s|coredns_version=.*\$|coredns_version=${coredns_version}|g" "$script_path/version-lock"
sed -Ei "s|image: docker.io/coredns/coredns:.*|image: docker.io/coredns/coredns:${coredns_version}|g" "$project_path/core.example/coredns/base/deployment.yaml"

# Utils version
k0sctl_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/k0sproject/k0sctl/releases/latest | jq -r '.tag_name')
sed -Ei "s|k0sctl_version=.*\$|k0sctl_version=${k0sctl_version}|g" "$script_path/version-lock"
sed -Ei "s|K0SCTL_VERSION=.*|K0SCTL_VERSION=${k0sctl_version}|g" "$project_path/scripts/common.sh"

kubeseal_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/bitnami-labs/sealed-secrets/releases/latest | jq -r '.tag_name' | tr -d 'v')
sed -Ei "s|kubeseal_version=.*\$|kubeseal_version=${kubeseal_version}|g" "$script_path/version-lock"
sed -Ei "s|KUBESEAL_VERSION=.*|KUBESEAL_VERSION=${kubeseal_version}|g" "$project_path/scripts/common.sh"

helm_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/helm/helm/releases/latest | jq -r '.tag_name')
sed -Ei "s|helm_version=.*\$|helm_version=${helm_version}|g" "$script_path/version-lock"
sed -Ei "s|HELM_VERSION=.*|HELM_VERSION=${helm_version}|g" "$project_path/scripts/common.sh"

etdctl_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/etcd-io/etcd/releases/latest | jq -r '.tag_name')
sed -Ei "s|etdctl_version=.*\$|etdctl_version=${etdctl_version}|g" "$script_path/version-lock"
sed -Ei "s|ETCDCTL_VERSION=.*|ETCDCTL_VERSION=${etdctl_version}|g" "$project_path/scripts/common.sh"

# Apps
local_path_provisioner_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/rancher/local-path-provisioner/tags | jq -r '.[0].name')
sed -Ei "s/local_path_provisioner_version=.*\$/local_path_provisioner_version=${local_path_provisioner_version}/g" "$script_path/version-lock"
sed -Ei "s/targetRevision: .*\$/targetRevision: ${local_path_provisioner_version}/g" "$project_path/argo.example/default/apps/local-path-provisioner-app.yml"

kube_prometheus_stack_version=$(curl -fsSL https://prometheus-community.github.io/helm-charts/index.yaml | yq '.entries.kube-prometheus-stack.[0].version')
sed -Ei "s/kube_prometheus_stack_version=.*\$/kube_prometheus_stack_version=${kube_prometheus_stack_version}/g" "$script_path/version-lock"
sed -Ei "s/targetRevision: .*\$/targetRevision: ${kube_prometheus_stack_version}/g" "$project_path/argo.example/monitoring/apps/prometheus-app.yml"
sed -Ei "s/targetRevision: .*\$/targetRevision: kube-prometheus-stack-${kube_prometheus_stack_version}/g" "$project_path/argo.example/monitoring/apps/prometheus-crd-app.yml"
sed -Ei "s/targetRevision: kube-prometheus-stack-.*\$/targetRevision: kube-prometheus-stack-${kube_prometheus_stack_version}/g" "$project_path/web/docs/getting-started/04-argo-apps-deployment.md"
sed -Ei "s/targetRevision: [0-9].*\$/targetRevision: ${kube_prometheus_stack_version}/g" "$project_path/web/docs/getting-started/04-argo-apps-deployment.md"

# k0sctl.yaml
k0s_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/k0sproject/k0s/releases/latest | jq -r '.tag_name' | tr -d 'v')
sed -Ei "s/k0s_version=.*\$/k0s_version=${k0s_version}/g" "$script_path/version-lock"
perl -i -0777 -pe "s/k0s:\n(.*)version: .*/k0s:\n\1version: '${k0s_version}'/g" "$project_path/k0sctl.yaml.example"
perl -i -0777 -pe "s/k0s:\n(.*)version: .*/k0s:\n\1version: '${k0s_version}'/g" "$project_path/web/docs/getting-started/02-k0s-configuration.md"

metallb_version=$(curl -fsSL https://charts.bitnami.com/bitnami/index.yaml | yq '.entries.metallb.[0].version')
sed -Ei "s/metallb_version=.*\$/metallb_version=${metallb_version}/g" "$script_path/version-lock"
perl -i -0777 -pe "s/name: metallb\n(.*)\n(.*)version: .*/name: metallb\n\1\n\2version: '${metallb_version}'/g" "$project_path/k0sctl.yaml.example"
perl -i -0777 -pe "s/name: metallb\n(.*)\n(.*)version: .*/name: metallb\n\1\n\2version: '${metallb_version}'/g" "$project_path/web/docs/getting-started/02-k0s-configuration.md"

traefik_version=$(curl -fsSL https://helm.traefik.io/traefik/index.yaml | yq '.entries.traefik.[0].version')
sed -Ei "s/traefik_version=.*\$/traefik_version=${traefik_version}/g" "$script_path/version-lock"
perl -i -0777 -pe "s/name: traefik\n(.*)\n(.*)version: .*/name: traefik\n\1\n\2version: '${traefik_version}'/g" "$project_path/k0sctl.yaml.example"
perl -i -0777 -pe "s/name: traefik\n(.*)\n(.*)version: .*/name: traefik\n\1\n\2version: '${traefik_version}'/g" "$project_path/web/docs/getting-started/02-k0s-configuration.md"
perl -i -0777 -pe "s/name: traefik\n(.*)\n(.*)version: .*/name: traefik\n\1\n\2version: '${traefik_version}'/g" "$project_path/web/docs/guides/800-deploy-ldap.md"

cert_manager_version=$(curl -fsSL https://charts.jetstack.io/index.yaml | yq '.entries.cert-manager.[0].version')
sed -Ei "s/cert_manager_version=.*\$/cert_manager_version=${cert_manager_version}/g" "$script_path/version-lock"
perl -i -0777 -pe "s/name: cert-manager\n(.*)\n(.*)version: .*/name: cert-manager\n\1\n\2version: '${cert_manager_version}'/g" "$project_path/k0sctl.yaml.example"

csi_driver_nfs_version=$(curl -fsSL https://raw.githubusercontent.com/kubernetes-csi/csi-driver-nfs/master/charts/index.yaml | yq '.entries.csi-driver-nfs.[0].version')
sed -Ei "s/csi_driver_nfs_version=.*\$/csi_driver_nfs_version=${csi_driver_nfs_version}/g" "$script_path/version-lock"
perl -i -0777 -pe "s/name: csi-driver-nfs\n(.*)\n(.*)version: .*/name: csi-driver-nfs\n\1\n\2version: '${csi_driver_nfs_version}'/g" "$project_path/k0sctl.yaml.example"
