#!/bin/sh -ex

. "./scripts/common.sh"

find . -name '*secret.*.local' -exec sh -c "SEALED_FILE=\$(echo \"\$1\" | sed -E 's|(.*)-secret.(.*).local$|\1-sealed-secret.\2|g') \
&& if ! [ -f \$SEALED_FILE ]; then \
  cat \"\$1\" | kubeseal \
    --controller-namespace sealed-secrets \
    --controller-name sealed-secrets \
    --format yaml > \$SEALED_FILE; \
fi" shell {} \;
