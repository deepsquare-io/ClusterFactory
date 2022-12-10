#!/bin/sh

set -ex

script_path="$(dirname "$0")"
project_path="$script_path/../"

verlte() {
  printf '%s\n%s' "$1" "$2" | sort -C -V
}
verlt() {
  ! verlte "$2" "$1"
}

TOKEN="$1"

# Core Versions
current_argocd_version=$(sed -En "s/argocd_version=(.*)/\1/p" ".ci/version-lock")
argocd_version=$(curl -fsSL https://argoproj.github.io/argo-helm/index.yaml | yq '.entries.argo-cd.[0].version')
if verlt "$current_argocd_version" "$argocd_version"; then
  sed -Ei "s/argocd_version=.*\$/argocd_version=${argocd_version}/g" "$script_path/version-lock"
  sed -Ei "s/version .*\$/version ${argocd_version} \\\\/g" "$project_path/core.example/argo-cd/install.sh"
fi

current_sealed_secrets_version=$(sed -En "s/sealed_secrets_version=(.*)/\1/p" ".ci/version-lock")
sealed_secrets_version=$(curl -fsSL https://bitnami-labs.github.io/sealed-secrets/index.yaml | yq '.entries.sealed-secrets.[0].version')
if verlt "$current_sealed_secrets_version" "$sealed_secrets_version"; then
  sed -Ei "s/sealed_secrets_version=.*\$/sealed_secrets_version=${sealed_secrets_version}/g" "$script_path/version-lock"
  sed -Ei "s/version .*\$/version ${sealed_secrets_version} \\\\/g" "$project_path/core.example/sealed-secrets/install.sh"
fi

current_kubevirt_version=$(sed -En "s/kubevirt_version=(.*)/\1/p" ".ci/version-lock")
kubevirt_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/kubevirt/kubevirt/tags | jq -r '.[0].name')
if verlt "$current_kubevirt_version" "$kubevirt_version"; then
  sed -Ei "s|kubevirt_version=.*\$|kubevirt_version=${kubevirt_version}|g" "$script_path/version-lock"
  sed -Ei "s|(.*)/v.*/(.*)\$|\1/${kubevirt_version}/\2|g" "$project_path/core.example/kubevirt/base/kustomization.yaml"
fi

current_coredns_version=$(sed -En "s/coredns_version=(.*)/\1/p" ".ci/version-lock")
coredns_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/coredns/coredns/releases/latest | jq -r '.tag_name' | tr -d 'v')
if verlt "$current_coredns_version" "$coredns_version"; then
  sed -Ei "s|coredns_version=.*\$|coredns_version=${coredns_version}|g" "$script_path/version-lock"
  sed -Ei "s|image: docker.io/coredns/coredns:.*|image: docker.io/coredns/coredns:${coredns_version}|g" "$project_path/core.example/coredns/base/daemonset.yaml"
fi

# Utils version
current_cfctl_version=$(sed -En "s/cfctl_version=(.*)/\1/p" ".ci/version-lock")
cfctl_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/SquareFactory/cfctl/releases/latest | jq -r '.tag_name')
if verlt "$current_cfctl_version" "$cfctl_version"; then
  sed -Ei "s|cfctl_version=.*\$|cfctl_version=${cfctl_version}|g" "$script_path/version-lock"
  sed -Ei "s|CFCTL_VERSION=.*|CFCTL_VERSION=${cfctl_version}|g" "$project_path/scripts/setup-env"
fi

current_kubeseal_version=$(sed -En "s/kubeseal_version=(.*)/\1/p" ".ci/version-lock")
kubeseal_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/bitnami-labs/sealed-secrets/releases/latest | jq -r '.tag_name' | tr -d 'v')
if verlt "$current_kubeseal_version" "$kubeseal_version"; then
  sed -Ei "s|kubeseal_version=.*\$|kubeseal_version=${kubeseal_version}|g" "$script_path/version-lock"
  sed -Ei "s|KUBESEAL_VERSION=.*|KUBESEAL_VERSION=${kubeseal_version}|g" "$project_path/scripts/setup-env"
fi

current_helm_version=$(sed -En "s/helm_version=(.*)/\1/p" ".ci/version-lock")
helm_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/helm/helm/releases/latest | jq -r '.tag_name')
if verlt "$current_helm_version" "$helm_version"; then
  sed -Ei "s|helm_version=.*\$|helm_version=${helm_version}|g" "$script_path/version-lock"
  sed -Ei "s|HELM_VERSION=.*|HELM_VERSION=${helm_version}|g" "$project_path/scripts/setup-env"
fi

current_etcdctl_version=$(sed -En "s/etcdctl_version=(.*)/\1/p" ".ci/version-lock")
etcdctl_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/etcd-io/etcd/releases/latest | jq -r '.tag_name')
if verlt "$current_etcdctl_version" "$etcdctl_version"; then
  sed -Ei "s|etcdctl_version=.*\$|etcdctl_version=${etcdctl_version}|g" "$script_path/version-lock"
  sed -Ei "s|ETCDCTL_VERSION=.*|ETCDCTL_VERSION=${etcdctl_version}|g" "$project_path/scripts/setup-env"
fi

# Apps
current_local_path_provisioner_version=$(sed -En "s/local_path_provisioner_version=(.*)/\1/p" ".ci/version-lock")
local_path_provisioner_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/rancher/local-path-provisioner/tags | jq -r '.[0].name')
if verlt "$current_local_path_provisioner_version" "$local_path_provisioner_version"; then
  sed -Ei "s/local_path_provisioner_version=.*\$/local_path_provisioner_version=${local_path_provisioner_version}/g" "$script_path/version-lock"
  sed -Ei "s/targetRevision: .*\$/targetRevision: ${local_path_provisioner_version}/g" "$project_path/argo.example/default/apps/local-path-provisioner-app.yaml"
fi

current_kube_prometheus_stack_version=$(sed -En "s/kube_prometheus_stack_version=(.*)/\1/p" ".ci/version-lock")
kube_prometheus_stack_version=$(curl -fsSL https://prometheus-community.github.io/helm-charts/index.yaml | yq '.entries.kube-prometheus-stack.[0].version')
if verlt "$current_kube_prometheus_stack_version" "$kube_prometheus_stack_version"; then
  sed -Ei "s/kube_prometheus_stack_version=.*\$/kube_prometheus_stack_version=${kube_prometheus_stack_version}/g" "$script_path/version-lock"
  sed -Ei "s/version: .*\$/version: ${kube_prometheus_stack_version}/g" "$project_path/helm-subcharts/kube-prometheus-stack/Chart.yaml"
  sed -Ei "s/targetRevision: .*\$/targetRevision: kube-prometheus-stack-${kube_prometheus_stack_version}/g" "$project_path/argo.example/monitoring/apps/prometheus-crd-app.yaml"
  sed -Ei "s/version: .*\$/version: ${kube_prometheus_stack_version}/g" "$project_path/web/docs/getting-started/05-argo-apps-deployment.md"
  sed -Ei "s/targetRevision: kube-prometheus-stack-.*\$/targetRevision: kube-prometheus-stack-${kube_prometheus_stack_version}/g" "$project_path/web/docs/getting-started/05-argo-apps-deployment.md"
fi

# cfctl.yaml
current_k0s_version=$(sed -En "s/k0s_version=(.*)/\1/p" ".ci/version-lock")
k0s_version=$(curl -H "Authorization: token ${TOKEN}" -fsSL https://api.github.com/repos/k0sproject/k0s/releases/latest | jq -r '.tag_name' | tr -d 'v')
if verlt "$current_k0s_version" "$k0s_version"; then
  sed -Ei "s/k0s_version=.*\$/k0s_version=${k0s_version}/g" "$script_path/version-lock"
  perl -i -0777 -pe "s/k0s:\n(.*)version: .*/k0s:\n\1version: '${k0s_version}'/g" "$project_path/cfctl.yaml.example"
  perl -i -0777 -pe "s/k0s:\n(.*)version: .*/k0s:\n\1version: '${k0s_version}'/g" "$project_path/web/docs/getting-started/03-k0s-configuration.md"
  perl -i -0777 -pe "s/k0s:\n(.*)version: .*/k0s:\n\1version: '${k0s_version}'/g" "$project_path/web/docs/reference/cfctl.yaml.md"
fi

current_metallb_version=$(sed -En "s/metallb_version=(.*)/\1/p" ".ci/version-lock")
metallb_version=$(curl -fsSL https://charts.bitnami.com/bitnami/index.yaml | yq '.entries.metallb.[0].version')
if verlt "$current_metallb_version" "$metallb_version"; then
  sed -Ei "s/metallb_version=.*\$/metallb_version=${metallb_version}/g" "$script_path/version-lock"
  sed -Ei "s/version .*\$/version ${metallb_version} \\\\/g" "$project_path/core.example/metallb/install.sh"
fi

current_traefik_version=$(sed -En "s/traefik_version=(.*)/\1/p" ".ci/version-lock")
traefik_version=$(curl -fsSL https://helm.traefik.io/traefik/index.yaml | yq '.entries.traefik.[0].version')
if verlt "$current_traefik_version" "$traefik_version"; then
  sed -Ei "s/traefik_version=.*\$/traefik_version=${traefik_version}/g" "$script_path/version-lock"
  sed -Ei "s/version .*\$/version ${traefik_version} \\\\/g" "$project_path/core.example/traefik/install.sh"
fi

current_cert_manager_version=$(sed -En "s/cert_manager_version=(.*)/\1/p" ".ci/version-lock")
cert_manager_version=$(curl -fsSL https://charts.jetstack.io/index.yaml | yq '.entries.cert-manager.[0].version')
if verlt "$current_cert_manager_version" "$cert_manager_version"; then
  sed -Ei "s/cert_manager_version=.*\$/cert_manager_version=${cert_manager_version}/g" "$script_path/version-lock"
  sed -Ei "s/version .*\$/version ${cert_manager_version} \\\\/g" "$project_path/core.example/cert-manager/install.sh"
fi

current_csi_driver_nfs_version=$(sed -En "s/csi_driver_nfs_version=(.*)/\1/p" ".ci/version-lock")
csi_driver_nfs_version=$(curl -fsSL https://raw.githubusercontent.com/kubernetes-csi/csi-driver-nfs/master/charts/index.yaml | yq '.entries.csi-driver-nfs.[0].version')
if verlt "$current_csi_driver_nfs_version" "$csi_driver_nfs_version"; then
  sed -Ei "s/csi_driver_nfs_version=.*\$/csi_driver_nfs_version=${csi_driver_nfs_version}/g" "$script_path/version-lock"
  sed -Ei "s/version .*\$/version ${csi_driver_nfs_version} \\\\/g" "$project_path/core.example/csi-driver-nfs/install.sh"
fi
