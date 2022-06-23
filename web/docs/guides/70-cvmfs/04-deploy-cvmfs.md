# Deploy a CVMFS Stratum 1

![image-20220509180348675](04-deploy-cvmfs.assets/image-20220509180348675.png)

Let's assume we plan to replicate `http://cvmfs.example.com/cvmfs/repo.example.com`.

## Helm and Docker resources

The Helm resources are stored on [ClusterFactory Git Repository](https://github.com/SquareFactory/ClusterFactory-CE/tree/main/helm/cvmfs-server).

The Dockerfile is described in the git repository [SquareFactory/cvmfs-server-docker](https://github.com/SquareFactory/cvmfs-server-docker).

A Docker image can be pulled with:

```sh
docker pull ghcr.io/squarefactory/cvmfs-server:latest
```

## 1. Deploy Namespace and AppProject

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/cvmfs/
```

## 2. Persistent Volumes, Secrets and PVC

### 2.a. Write the CVMFS public key

Create a SealedSecret which contains the keys of the repositories:

1. Create a `-secret.yml.local` file:

```yaml title="argo/cvmfs/secrets/keys-secret.yaml.local"
apiVersion: v1
kind: Secret
metadata:
  name: keys-secret
  namespace: cvmfs
type: Opaque
stringData:
  repo.example.com.pub: |
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
kubectl apply -f argo/cvmfs/secrets/keys-sealed-secret.yaml
```

### 2.b Deploy a `PersistentVolume` or `StorageClass`

While we could use _NFS_ to as persistent storage for the replica, let's deploy a [`local-path-provisioner`](https://github.com/rancher/local-path-provisioner).

Basically, `local-path-provisioner` creates the `/opt/local-path-provisioner` directory on the nodes. It allocates dynamically a volume in that directory using a StorageClass.

To deploy the provisioner:

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/default/apps/local-path-provisioner-app.yml
```

The `StorageClass` `local-path` should be deployed.

## 3. Editing `cvmfs-server-app.yml` values

### 3.a. Select the nodes

Because we are using `local-path`, you should select the nodes hosting the volumes.

```yaml title="argo/cvmfs/apps/cvmfs-server-app.yml > spec > source > helm > values > nodeSelector"
nodeSelector:
  kubernetes.io/hostname: my-node
```

### 3.b. Mount the keys

```yaml title="argo/cvmfs/apps/cvmfs-server-app.yml > spec > source > helm > values > config"
volumeMounts:
  - name: keys
    mountPath: /etc/cvmfs/keys/cvmfs.example.com/repo.example.com.pub
    subPath: repo.example.com.pub
    readOnly: true

volumes:
  - name: keys
    secret:
      secretName: keys-secret
      defaultMode: 256

state:
  storageClassName: 'local-path'

storage:
  storageClassName: 'local-path'
```

### 3.c. Add the replicas

```yaml title="argo/cvmfs/apps/cvmfs-server-app.yml > spec > source > helm > values > config"
config:
  replicas:
    - name: repo.example.com
      url: http://cvmfs.example.com/cvmfs/repo.example.com
      keys: /etc/cvmfs/keys/cvmfs.example.com/repo.example.com.pub
      options: '-o root'
```

Make sure the option `-o root` is present to avoid a deadlock.

`-o root` indicates the owner of the repository.

The `options` field is the arguments passed to `cvmfs_server add-replica`.

### 3.d. (Optional) Expose the application to the external network

If you want to expose your stratum 1 server, add these fields to the values:

```yaml
ingress:
  enabled: true
  annotations:
    cert-manager.io/cluster-issuer: selfsigned-cluster-issuer
    traefik.ingress.kubernetes.io/router.entrypoints: websecure
    traefik.ingress.kubernetes.io/router.tls: 'true'

  ingressClass: traefik

  hosts:
    - cvmfs.example.com

  tls:
    - secretName: cvmfs.example.com-secret
      hosts:
        - cvmfs.example.com
```

The service is already enabled.

In case you don't know how to use `Ingress` with `cert-manager` and Traefik. Use the annotations `traefik.ingress.kubernetes.io/router.entrypoints` and `traefik.ingress.kubernetes.io/router.tls` to indicates the port used by Traefik.

The `cfctl.yaml` indicates that the entrypoints `websecure` is the port 443.

More about Traefik with Kubernetes Ingresses in [their documentation](https://doc.traefik.io/traefik/routing/providers/kubernetes-ingress/).

Use the annotation `cert-manager.io/cluster-issuer` to indicates the certificate issuer and specify the generated certificate secret name in the `tls[].secretName` field. `cert-manager` will automatically search or generate the TLS certificates.

More about `cert-manager` in [their documentation](https://cert-manager.io/docs/usage/ingress/).

### 3.e. Verify the default values.

Verify the default value inside the [git repository](https://github.com/SquareFactory/ClusterFactory-CE/blob/main/helm/cvmfs-server/values.yaml).

## 4. Deploy the app

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/cvmfs/apps/cvmfs-server-app.yml
```

If the Ingress is enabled and configured, the CVMFS server should be available on the IP specified by MetalLB. Configure your DNS so it redirects to this IP.
