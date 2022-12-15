# Deploy a LDAP server

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Helm and Docker resources

The Helm resources are stored on [ClusterFactory Git Repository](https://github.com/SquareFactory/ClusterFactory/tree/main/helm/389ds).

The Dockerfile is described in the git repository [389ds/dirsrv](https://github.com/389ds/389-ds-base).

An Docker image can be pulled with:

```sh
docker pull docker.io/389ds/dirsrv:latest
```

## 1. Deploy Namespace and AppProject

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/ldap/
```

## 2. Persistent Volumes, Secrets and Ingresses

### 2.a. Creating a `StorageClass` or `PersistentVolume`

We will use NFS. Feel free to use another type of storage. We recommend at least 100 GB since the storage is used to store the root file system of the operating system images.

<Tabs groupId="volume">
  <TabItem value="storage-class" label="StorageClass (dynamic)" default>

```yaml title="argo/ldap/volumes/storage-class.yaml"
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: 389ds-nfs
  namespace: ldap
  labels:
    app: 389ds
    topology.kubernetes.io/region: <FILL ME> # <country code>-<city>
    topology.kubernetes.io/zone: <FILL ME> # <country code>-<city>-<index>
provisioner: nfs.csi.k8s.io
parameters:
  server: <FILL ME> # IP or host
  share: <FILL ME> # /srv/nfs/k8s/389ds
  mountPermissions: '0775'
mountOptions:
  - hard
  - nfsvers=4.1
  - noatime
  - nodiratime
volumeBindingMode: Immediate
reclaimPolicy: Retain
allowedTopologies:
  - matchLabelExpressions:
      - key: topology.kubernetes.io/zone
        values:
          - <FILL ME> # <country code>-<city>-<index>
```

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/ldap/volumes/storage-class.yaml
```

  </TabItem>
  <TabItem value="persistent-volume" label="PersistentVolume (static)">

```yaml title="argo/ldap/volumes/persistent-volume.yaml"
apiVersion: v1
kind: PersistentVolume
metadata:
  name: 389ds-pv
  namespace: ldap
  labels:
    app: 389ds
    topology.kubernetes.io/region: <FILL ME> # <country code>-<city>
    topology.kubernetes.io/zone: <FILL ME> # <country code>-<city>-<index>
spec:
  capacity:
    storage: 100Gi
  mountOptions:
    - hard
    - nfsvers=4.1
    - noatime
    - nodiratime
  csi:
    driver: nfs.csi.k8s.io
    readOnly: false
    volumeHandle: <unique id> # uuidgen
    volumeAttributes:
      server: <FILL ME> # IP or host
      share: <FILL ME> # /srv/nfs/k8s/389ds
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
```

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/ldap/volumes/persistent-volume.yaml
```

The label `app=ldap` will be used by the PersistentVolumeClaim.

  </TabItem>
</Tabs>

### 2.b. Editing the environment variables with secrets

Take a look at the README of [389ds/dirsrv](https://hub.docker.com/r/389ds/dirsrv).

Some of the environment variables are sensitive:

- `DS_DM_PASSWORD`: The password of the `cn=Directory Manager` user.

We must store these value inside a secret.

1. Create a `-secret.yaml.local` file:

```yaml title="argo/ldap/secrets/389ds-secret.yaml.local"
apiVersion: v1
kind: Secret
metadata:
  name: 389ds-secret
  namespace: ldap
stringData:
  dm-password: <a password>
```

2. Seal the secret:

```shell title="user@local:/ClusterFactory"
cfctl kubeseal
```

3. Apply the SealedSecret:

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/ldap/secrets/389ds-sealed-secret.yaml
```

You can track `389ds-env-sealed-secret.yaml` in Git, but not the `-secret.yaml.local` file.

### 2.c. Creating an `IngressRouteTCP` to expose the LDAP server

You can expose the LDAP using Traefik `IngressRouteTCP`.

Create a `argo/ldap/ingresses/ingress-route-tcp.yaml` file and add:

```yaml title="argo/ldap/ingresses/ingress-routes-tcp.yaml"
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRouteTCP
metadata:
  name: ldap-ingress-tcp
  namespace: ldap
  labels:
    app.kubernetes.io/name: ldap
    app.kubernetes.io/component: ingress-route-tcp
spec:
  entryPoints:
    - ldap
  routes:
    - match: HostSNI(`*`)
      services:
        - name: dirsrv-389ds
          port: 3389
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRouteTCP
metadata:
  name: ldaps
  namespace: ldap
  labels:
    app.kubernetes.io/name: ldaps
    app.kubernetes.io/component: ingress-route-tcp

spec:
  entryPoints:
    - ldaps
  routes:
    - match: HostSNI(`*`)
      services:
        - name: dirsrv-389ds
          namespace: ldap
          port: 3636
  tls:
    passthrough: true
```

You must open ports 636 and 389 on the load balancer of Traefik by configuring the Traefik `values.yaml`:

```yaml title="core/traefik/values.yaml"
ports:
  ldap:
    port: 1389
    expose: yes
    exposedPort: 389
    protocol: TCP
  ldaps:
    port: 1636
    expose: yes
    exposedPort: 636
    protocol: TCP
```

Apply:

```shell title="user@local:/ClusterFactory"
./scripts/deploy-core
kubectl apply -f argo/ldap/ingresses/ingress-routes-tcp.yaml
```

### 2.d. Creating a `Certificate` for LDAPS (TLS)

Create a `argo/ldap/certificates/ldap.example.com-cert.yaml` file and add:

```yaml title="argo/ldap/certificates/ldap.example.com-cert.yaml"
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ldap.example.com-cert
  namespace: ldap
spec:
  secretName: ldap.example.com-secret
  issuerRef:
    name: private-cluster-issuer
    kind: ClusterIssuer
  commonName: ldap.example.com
  subject:
    countries: [CH]
    localities: [Lonay]
    organizationalUnits: []
    organizations: [Example Org]
    postalCodes: ['1027']
    provinces: [Laud]
    streetAddresses: [Chemin des Mouettes 1]
  duration: 1y
  dnsNames:
    - ldap.example.com
    - dirsrv-389ds.ldap.svc.cluster.local
  privateKey:
    size: 4096
    algorithm: RSA
```

You want your LDAP server to be secure inside and outside the cluster. Therefore, you need to add 2 DNS names:

- `ldap.example.com` which is used to access to the Ingress Controller which will forward to the LDAP service.
- `dirsrv-389ds.ldap.svc.cluster.local` which is used to access to the LDAP service.

You should edit all of the fields of the certificate, especially the `subject` field.

Apply it:

```shell title="user@local:/ClusterFactory"
./scripts/deploy-core
kubectl apply -f argo/ldap/certificates/ldap.example.com-cert.yaml
```

## 3. Editing `389ds-app.yaml` to use the fork

Change the `repoURL` to the URL used to pull the fork. Also add the `values-production.yaml` file to customize the values.

```yaml title="argo.example/ldap/apps/389ds-app.yaml > spec > source"
source:
  # You should have forked this repo. Change the URL to your fork.
  repoURL: git@github.com:<your account>/ClusterFactory.git
  # You should use your branch too.
  targetRevision: HEAD
  path: helm/389ds
  helm:
    releaseName: 389ds

    # Create a values file inside your fork and change the values.
    valueFiles:
      - values-production.yaml
```

## 4. Adding custom values to the chart

:::tip

Read the [`values.yaml`](https://github.com/SquareFactory/ClusterFactory/blob/main/helm/389ds/values.yaml) to see all the default values.

:::

### 4.a. Create the values file

Create the values file `values-production.yaml` inside the `helm/389ds/` directory.

### 4.b. Configure the 389ds

```yaml title="helm/389ds/values-production.yaml"
tls:
  secretName: ldap.example.com-secret

config:
  dmPassword:
    secretName: '389ds-secret'
    key: 'dm-password'
  suffixName: 'dc=example,dc=com'

initChownData:
  enabled: true
```

Edit the `suffixName` according to your need. This is the path in LDAP where the organizational units will be stored. For example: `ou=people,dc=example,dc=com`.

### 4.c. Mount the volume

<Tabs groupId="volume">
  <TabItem value="storage-class" label="StorageClass (dynamic)" default>

```yaml title="helm/389ds/values-production.yaml"
# ...
persistence:
  storageClassName: '389ds-nfs'
```

  </TabItem>
  <TabItem value="persistent-volume" label="PersistentVolume (static)">

```yaml title="helm/389ds/values-production.yaml"
# ...
persistence:
  selectorLabels:
    app: 389ds
```

  </TabItem>
</Tabs>

## 4. Deploy the app

Commit and push:

```shell title="user@local:/ClusterFactory"
git add .
git commit -m "Added 389ds service"
git push
```

And deploy the Argo CD application:

```shell title="user@local:/ClusterFactory"
kubectl apply -f argo/ldap/apps/389ds-app.yaml
```

If the Ingress is configured, the LDAP server should be available on the IP specified by MetalLB.

The deployment of 389ds might be slow. Watch the logs and look for `INFO: 389-ds-container started.` which indicates a successful deployment.

If the server is crashing, it may be caused by the permissions inside the NFS. Check the content inside NFS, the owner should be `499:499`.

## 5. Post deployment settings

After deploying the LDAP server, the database is empty.

`kubectl exec` inside the container:

```shell title="user@local:/ClusterFactory"
kubectl exec -i -t -n ldap dirsrv-389ds-0 -c dirsrv-389ds -- sh -c "clear; (bash || ash || sh)"
```

You can also use Lens to open a shell inside the container.

To initialize the database, run:

```shell title="pod: dirsrv-389ds-0 (namespace: ldap)"
dsconf localhost backend create --suffix dc=example,dc=com --be-name example_backend
dsidm localhost initialise
```

Adapt the suffix based on the `suffixName` in the values file. You can also change the backend name `example_backend`.

Based on what you want, you can add `uniqueness` attributes to some fields:

```shell title="pod: dirsrv-389ds-0 (namespace: ldap)"
# Unique mail
dsconf localhost plugin attr-uniq add "mail attribute uniqueness" --attr-name mail --subtree "dc=people,dc=example,dc=com"
# Unique uid
dsconf localhost plugin attr-uniq add "uid attribute uniqueness" --attr-name uid --subtree "dc=people,dc=example,dc=com"
# Unique uid number
dsconf localhost plugin attr-uniq add "uidNumber attribute uniqueness" --attr-name uidNumber --subtree "dc=example,dc=com"
# Unique gid number
dsconf localhost plugin attr-uniq add "gidNumber attribute uniqueness" --attr-name gidNumber --subtree "ou=groups,dc=example,dc=com"

# Enable the plugins
dsconf localhost plugin attr-uniq enable "mail attribute uniqueness"
dsconf localhost plugin attr-uniq enable "uid attribute uniqueness"
dsconf localhost plugin attr-uniq enable "uidNumber attribute uniqueness"
dsconf localhost plugin attr-uniq enable "gidNumber attribute uniqueness"
```

You may also want uid/gid number auto assignment:

```shell title="pod: dirsrv-389ds-0 (namespace: ldap)"
dsconf localhost plugin dna config "UID and GID numbers" add \
  --type gidNumber uidNumber \
  --filter "(|(objectclass=posixAccount)(objectclass=posixGroup))" \
  --scope dc=example,dc=run\
  --next-value 1601 \
  --magic-regen -1
dsconf localhost plugin dna enable
```

Change `next-value` to the wishing starting uid/gid number. Select a magic value which will indicates to use a new value for the user.

Example:

```shell title="pod: dirsrv-389ds-0 (namespace: ldap)"
dsidm -b "dc=example,dc=com" localhost user create \
  --uid example-user \
  --cn example-user \
  --displayName example-user \
  --homeDirectory "/dev/shm" \
  --uidNumber -1 \
  --gidNumber 1600
```

The created user will have 1601 as UID and 1600 as GID.

If you want to have a seperate DNA plugin for `gidNumber` and `uidNumber`.

```shell title="pod: dirsrv-389ds-0 (namespace: ldap)"
dsconf localhost plugin dna config "UID numbers" add \
  --type uidNumber \
  --filter "(objectclass=posixAccount)" \
  --scope ou=people,dc=example,dc=run\
  --next-value 1601 \
  --magic-regen -1
dsconf localhost plugin dna config "GID numbers" add \
  --type gidNumber \
  --filter "(objectclass=posixGroup)" \
  --scope ou=groups,dc=example,dc=run\
  --next-value 1601 \
  --magic-regen -1
dsconf localhost plugin dna enable
```

Full documentation about distributed numeric assignment [here](https://directory.fedoraproject.org/docs/389ds/design/dna-plugin.html).

Restart the server after the changes:

```shell title="user@local:/ClusterFactory"
kubectl delete pod -n ldap dirsrv-389ds-0
```

The database may have been destroyed because of the plugin, `kubectl exec` in the container and run again:

```shell title="pod: dirsrv-389ds-0 (namespace: ldap)"
dsconf localhost backend create --suffix dc=example,dc=com --be-name example_backend
dsidm localhost initialise
```
