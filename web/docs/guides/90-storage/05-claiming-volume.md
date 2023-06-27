# Claiming a volume

What's great with Rook, is that the API integrates very well with Kubernetes.

## Block Storage (RBD)

If you successfully deployed an RBD pool, the storage class should be present.

Just claim a volume using a `PersistentVolumeClaim`:

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: my-data
spec:
  storageClassName: ceph-block
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

## CephFS

If you successfully deployed a CephFS, the storage class should be present.

Just claim a volume using a `PersistentVolumeClaim`:

```yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: my-data
spec:
  storageClassName: ceph-filesystem
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
```

## Object storage

If you successfully deployed an Object Store, the storage class should be present.

However, unlike the other, you need to claim a volume (bucket) using the `objectbucket.io/v1alpha1.ObjectBucketClaim` CRD:

```yaml
apiVersion: objectbucket.io/v1alpha1
kind: ObjectBucketClaim
metadata:
  name: my-bucket
spec:
  generateBucketName: ceph-bkt
  storageClassName: ceph-bucket
```

If you set up the `ingress`, you can access the bucket externally by fetching the values in the Secret, like this:

```shell
echo AWS_HOST=<ingress address>
echo PORT=<ingress port>
echo BUCKET_NAME=$(kubectl -n default get cm my-bucket -o jsonpath='{.data.BUCKET_NAME}')
echo AWS_ACCESS_KEY_ID=$(kubectl -n default get secret my-bucket -o jsonpath='{.data.AWS_ACCESS_KEY_ID}' | base64 --decode)
echo AWS_SECRET_ACCESS_KEY=$(kubectl -n default get secret my-bucket -o jsonpath='{.data.AWS_SECRET_ACCESS_KEY}' | base64 --decode)

```

which you can use with S5cmd. For example:

```shell
export AWS_HOST=objectstore.ceph-poc.internal
export PORT=80
export BUCKET_NAME=$(kubectl -n default get cm my-bucket -o jsonpath='{.data.BUCKET_NAME}')
export AWS_ACCESS_KEY_ID=$(kubectl -n default get secret my-bucket -o jsonpath='{.data.AWS_ACCESS_KEY_ID}' | base64 --decode)
export AWS_SECRET_ACCESS_KEY=$(kubectl -n default get secret my-bucket -o jsonpath='{.data.AWS_SECRET_ACCESS_KEY}' | base64 --decode)

s5cmd --endpoint-url http://$AWS_HOST:$PORT cp test s3://"$BUCKET_NAME"
s5cmd --endpoint-url http://$AWS_HOST:$PORT cp s3://"$BUCKET_NAME"/test /tmp/test
```
