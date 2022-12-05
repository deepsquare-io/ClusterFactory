#!/bin/sh

set -ex

BASEDIR="$(dirname "$(realpath "$0")")"
PROJECTDIR="$BASEDIR/../"
export CONFIGPATH="${BASEDIR}/cfctl.yaml"

cfctl apply --debug --config "${CONFIGPATH}"

cfctl kubeconfig --config "${CONFIGPATH}" >"${BASEDIR}/kubeconfig"
chmod 600 ./kubeconfig
export KUBECONFIG="${BASEDIR}/kubeconfig"

cd "${PROJECTDIR}"

export COREDIR="core.example"
./scripts/deploy-core
