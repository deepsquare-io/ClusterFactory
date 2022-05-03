# Argo Apps deployment

Time to play with ArgoCD!

Let's deploy the Prometheus Stack since we will need it to monitor the nodes.

A complete example is written in `argo/monitoring/`, but we will start from scratch to learn the process of writing an argo application.

Start by creating the `argo/my-prometheus`, this will be our working directory.

Some object shoudn't be handled by ArgoCD, like volumes, secrets and namespaces. These object must be created before the deployment of an Argo application.

## Namespace and AppProject

Start with a namespace:

```yaml title="namespace.yml"
apiVersion: v1
kind: Namespace
metadata:
  name: my-prometheus
  labels:
    app.kubernetes.io/name: my-prometheus
```

and apply

And create an `AppProject`:

```yaml title="app-project.yml"
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: my-prometheus
  namespace: argocd
  # Finalizer that ensures that project is not deleted until it is not referenced by any application
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  description: My prometheus stack
  # Allow manifests to deploy from any Git repos
  sourceRepos:
    - '*'
  # Only permit applications to deploy to the namespace in the same cluster
  destinations:
    - namespace: my-prometheus
      server: https://kubernetes.default.svc

  namespaceResourceWhitelist:
    - kind: '*'
      group: '*'

  clusterResourceWhitelist:
    - kind: '*'
      group: '*'
```
