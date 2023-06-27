# Deploying the Rook Operator

## Configuration

The rook operator is configured in the file [`helm-subcharts/values.yaml`](https://github.com/deepsquare-io/ClusterFactory/tree/main/helm-subcharts/rook-ceph/values.yaml).

Most of the values are configured and have the default values of the Helm application [`rook-ceph`](https://github.com/rook/rook/tree/master/deploy/charts/rook-ceph). The only differences are that container resources use the **BestEffort** quality of service.

## Deploying the operator

The ArgoCD application is already configured so just:

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/rook-ceph -f argo/rook-ceph/apps
```

**No Rook clusters have yet been deployed, only the operator, which is used to manage several Rook clusters**.
