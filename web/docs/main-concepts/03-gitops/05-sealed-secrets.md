# Sealed Secrets

Sealed Secrets encrypt the Secret resources into a SealedSecret using asymmetric encryption.

A secret could look like this:

```yaml title="secret.yaml"
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
  namespace: mynamespace
stringData:
  password: my-super-password
```

And you want to store this secret in Git so that it is versioned. Storing a plain-text secret is always bad practice as the git repository can get shared everywhere in the world.

Sealed Secrets encrypt the secret and only the Sealed Secrets controller is able to decrypt the SealedSecret.

A SealedSecret looks like this:

```yaml title="sealed-secret.yaml"
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  creationTimestamp: null
  name: mysecret
  namespace: mynamespace
spec:
  encryptedData:
    password: AgDZWhe0dUqXNOE2TNxN5z3...
  template:
    data: null
    metadata:
      creationTimestamp: null
      name: mysecret
      namespace: mynamespace
```

Sealed Secrets allows secrets to be stored inside Git, which means it allows GitOps to be used. Git becomes the source of truth, but only the Kubernetes cluster is able to read the secrets.
