# Updating the K0s cluster

Updating the k0s cluster is super easy!

1. Edit the `cfctl.yaml`:

```diff title="cfctl.yaml > spec > k0s"
    k0s:
-     version: 1.23.5+k0s.0
+     version: 1.23.6+k0s.1

```

2. And apply it:

```shell
cfctl apply --debug --config cfctl.yaml
```
