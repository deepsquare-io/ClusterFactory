# 5. Adding the Git repository to ArgoCD

Argo CD can retrieve your repository from your Git hosting server, synchronize changes and deploy your Kubernetes manifests.

1. Create a local secret containing [an SSH deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#set-up-deploy-keys) and the git URL:

```yaml title="argo/default/secrets/my-repository-secret.yaml.local"
apiVersion: v1
kind: Secret
metadata:
  name: my-repository-secret
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repository
type: Opaque
stringData:
  sshPrivateKey: |
    -----BEGIN RSA PRIVATE KEY-----
    -----END RSA PRIVATE KEY-----
  type: git
  url: git@github.com:<your account>/<your repo>.git
```

2. Seal it and apply it:

```shell
cfctl kubeseal
kubectl apply -f argo/default/secrets/my-repository-sealed-secret.yaml
```
