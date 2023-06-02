#!/bin/bash

. "./scripts/setup-env"

set -e

if [ ! -f "kubeseal.crt" ]; then
  cat <<EOF
kubeseal.crt doesn't exists!

Fetch the public key with for offline encryption:

  kubeseal --fetch-cert --controller-namespace sealed-secrets --controller-name sealed-secrets > kubeseal.crt

EOF
  exit 1
fi

find . -name '*secret.*.local' -exec sh -c "SEALED_FILE=\$(echo \"\$1\" | sed -E 's|(.*)-secret.(.*).local$|\1-sealed-secret.\2|g') \
&& if ! [ -f \$SEALED_FILE ]; then \
  kubeseal \
    --cert kubeseal.crt \
    -o yaml -f \"\$1\" > \$SEALED_FILE; \
  echo \$SEALED_FILE
fi" shell {} \;
