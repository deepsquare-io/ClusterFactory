# Mount CVMFS repositories on Kubernetes

![image-20220509154116581](01-mount-cvmfs.assets/image-20220509154116581.png)

:::warning

The CVMFS CSI Plugin isn't stable yet, so we have to do it the old way: using `hostPath`.

:::

## Helm and Docker resources

The Helm resources are stored on [ClusterFactory Git Repository](https://github.com/SquareFactory/ClusterFactory-CE/tree/main/helm/cvmfs-service).

The Dockerfile is described in the git repository [cvmfs/cvmfs](https://github.dev/cvmfs/cvmfs/blob/devel/packaging/container/Dockerfile).

A Docker image can be pulled with:

```sh
docker pull docker.io/cvmfs/cvmfs:latest
```

## 1. AppProject

Apply the AppProject:

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/cvmfs/app-project.yml
```

## 2. Secrets

Create a SealedSecret which contains the keys of the repositories:

1. Create a `-secret.yml.local` file:

```yaml title="argo/cvmfs/secrets/cvmfs-keys-secret.yml.local"
apiVersion: v1
kind: Secret
metadata:
  name: cvmfs-keys-secret
  namespace: cvmfs
type: Opaque
stringData:
  software.sion.csquare.run.pub: |
    -----BEGIN PUBLIC KEY-----
    ...
    -----END PUBLIC KEY-----
```

2. Seal the secret:

```shell title="user@local:/ClusterFactory-CE"
./kubeseal-every-local-files.sh
```

3. Apply the SealedSecret:

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/cvmfs/secrets/cvmfs-keys-sealed-secret.yml
```

## 3. Editing `cvmfs-service-app.yml` values

### 3.a. Select the CVMFS repositories

```yaml title="argo/provisioning/apps/cvmfs-service-app.yml > spec > source > helm > values > repositories"
repositories:
  - name: software-sion-csquare-run
    repository: software.sion.csquare.run
```

### 3.b. Configure the CVMFS client

```yaml title="argo/provisioning/apps/cvmfs-service-app.yml > spec > source > helm > values > configs"
configs:
  default.local:
    mountPath: default.local
    contents: |
      CVMFS_QUOTA_LIMIT=-1
      CVMFS_USE_GEOAPI=no
      CVMFS_HTTP_PROXY="DIRECT"
      CVMFS_KEYS_DIR="/etc/cvmfs/keys"
      CVMFS_SERVER_URL="http://cvmfs.ch1.deepsquare.run/cvmfs/@fqrn@"
      CVMFS_USER=root
```

### 3.c. Configure the keys

```yaml title="argo/provisioning/apps/cvmfs-service-app.yml > spec > source > helm > values > keys"
keys:
  secretName: 'cvmfs-keys-secret'
```

The keys will be mounted on the `/etc/cvmfs/keys` directory. If you wish to change the path of each key:

```yaml title="argo/provisioning/apps/cvmfs-service-app.yml > spec > source > helm > values > keys"
keys:
  secretName: 'cvmfs-keys-secret'
  items:
    - key: software.sion.csquare.run.pub
      path: sion.csquare.run/software.sion.csquare.run.pub
```

The key will be moved to the path `/etc/cvmfs/keys/sion.csquare.run/software.sion.csquare.run.pub`.

### 3.d. Verify the default values.

Verify the default value inside the [git repository](https://github.com/SquareFactory/ClusterFactory-CE/tree/main/helm/cvmfs-service/values.yaml).

You can change the `hostPath` if needed:

```yaml title="argo/provisioning/apps/cvmfs-service-app.yml > spec > source > helm > values > persistence"
persistence:
  hostPath: /cvmfs
```

## 4. Deploy the CVMFS service

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/provisioning/apps/cvmfs-service-app.yml
```

## 5. Mount the repositories to a container

```yaml title="job.yaml"
apiVersion: batch/v1
kind: Job
metadata:
  name: list-cvmfs
spec:
  template:
    spec:
      containers:
        - name: list-cvmfs
          image: busybox
          command: ['ls', '/cvmfs/software.sion.csquare.run']
          volumeMounts:
            - mountPath: /cvmfs/software.sion.csquare.run
              name: software-sion-csquare-run
              readOnly: true
      restartPolicy: Never
      volumes:
        - name: software-sion-csquare-run
          hostPath:
            path: /cvmfs/cvmfs-k8s/mounts/software.sion.csquare.run
            type: Directory
  backoffLimit: 0
```
