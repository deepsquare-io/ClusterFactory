# Updating the K0s cluster

Updating the k0s cluster is super easy!

1. Edit the `k0sctl.yaml`:

```diff title="k0sctl.yaml > spec > k0s"
    k0s:
-     version: 1.23.5+k0s.0
+     version: 1.23.6+k0s.1

```

2. And apply it:

```shell
k0sctl apply --config k0sctl.yaml

# OR

./1.deploy-k0s.sh
```
