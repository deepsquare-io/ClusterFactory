# Deploy a LDAP server

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Helm and Docker resources

The Helm resources are stored on [ClusterFactory Git Repository](https://github.com/SquareFactory/ClusterFactory-CE/tree/main/helm/openldap).

The Dockerfile is described in the git repository [bitnami/bitnami-docker-openldap](https://github.com/bitnami/bitnami-docker-openldap).

An Docker image can be pulled with:

```sh
docker pull docker.io/bitnami/openldap:latest
```

## 1. Deploy Namespace and AppProject

```shell title="user@local:/ClusterFactory-CE"
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
  name: openldap-nfs
  namespace: ldap
  labels:
    app: openldap
    topology.kubernetes.io/region: <FILL ME> # <country code>-<city>
    topology.kubernetes.io/zone: <FILL ME> # <country code>-<city>-<index>
provisioner: nfs.csi.k8s.io
parameters:
  server: <FILL ME> # IP or host
  share: <FILL ME> # /srv/nfs/k8s/xcat
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

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/ldap/volumes/storage-class.yaml
```

  </TabItem>
  <TabItem value="persistent-volume" label="PersistentVolume (static)">

```yaml title="argo/ldap/volumes/persistent-volume.yaml"
apiVersion: v1
kind: PersistentVolume
metadata:
  name: openldap-pv
  namespace: ldap
  labels:
    app: openldap
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
      share: <FILL ME> # /srv/nfs/k8s/xcat
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
```

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/ldap/volumes/persistent-volume.yaml
```

The label `app=ldap` will be used by the PersistentVolumeClaim.

  </TabItem>
</Tabs>

## 2.b. Editing the environment variables with secrets

Take a look at the git repository of [bitnami-docker-openldap](https://github.com/bitnami/bitnami-docker-openldap#configuration).

Some of the environment variables are sensitive:

- `LDAP_ADMIN_USERNAME`: LDAP database admin user. Default: **admin**
- `LDAP_ADMIN_PASSWORD`: LDAP database admin password. Default: **adminpassword**
- `LDAP_CONFIG_ADMIN_ENABLED`: Whether to create a configuration admin user. Default: **no**.
- `LDAP_CONFIG_ADMIN_USERNAME`: LDAP configuration admin user. This is separate from `LDAP_ADMIN_USERNAME`. Default: **admin**.
- `LDAP_CONFIG_ADMIN_PASSWORD`: LDAP configuration admin password. Default: **configpassword**.
- `LDAP_USERS`: Comma separated list of LDAP users to create in the default LDAP tree. Default: **user01,user02**
- `LDAP_PASSWORDS`: Comma separated list of passwords to use for LDAP users. Default: **bitnami1,bitnami2**

If the default value isn't satisfying, you can override these variables by using a secret:

1. Create a `-secret.yaml.local` file:

```yaml title="argo/ldap/secrets/openldap-env-secret.yaml.local"
apiVersion: v1
kind: Secret
metadata:
  name: openldap-env-secret
  namespace: monitoring
stringData:
  LDAP_ADMIN_USERNAME: admin
  LDAP_ADMIN_PASSWORD: adminpassword
  LDAP_CONFIG_ADMIN_ENABLED: no
  LDAP_CONFIG_ADMIN_USERNAME: admin
  LDAP_CONFIG_ADMIN_PASSWORD: configpassword
  LDAP_USERS: user01,user02
  LDAP_PASSWORDS: bitnami1,bitnami2
```

2. Seal the secret:

```shell title="user@local:/ClusterFactory-CE"
./kubeseal-every-local-files.sh
```

3. Apply the SealedSecret:

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/ldap/secrets/openldap-env-sealed-secret.yaml
```

You can track `openldap-env-sealed-secret.yaml` in Git, but not the `-secret.yaml.local` file.

### 2.c. Creating an `IngressRouteTCP` to expose the LDAP server

You can expose the LDAP using Traefik `IngressRouteTCP`.

Create a `argo/ldap/ingresses/ingress-route-tcp.yaml` file and add:

```yaml title="argo/ldap/ingresses/ingress-routes-tcp.yaml"
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRouteTCP
metadata:
  name: ldap-ingress-tcp
spec:
  entryPoints:
    - ldap
  routes:
    - match: HostSNI(`*`)
      services:
        - name: openldap
          port: 1389
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRouteTCP
metadata:
  name: ldaps-ingress-tcp
spec:
  entryPoints:
    - ldaps
  routes:
    - match: HostSNI(`*`)
      services:
        - name: openldap
          port: 1636
```

You must open ports 636 and 389 on the load balancer of Traefik by configuring the `cfctl.yaml`:

```yaml title="cfctl.yaml > spec > k0s > config > spec > extensions > helm > chart[]
- name: traefik
  chartname: traefik/traefik
  version: '10.23.0'
  namespace: traefik
  values: |
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

```shell title="user@local:/ClusterFactory-CE"
cfctl apply --debug --config cfctl.yaml
kubectl apply -f argo/ldap/ingresses/ingress-routes-tcp.yaml
```

## 3. Editing `openldap-app.yml` to use the fork

Change the `repoURL` to the URL used to pull the fork. Also add the `values-production.yaml` file to customize the values.

```yaml title="argo.example/ldap/apps/openldap-app.yml > spec > source"
source:
  # You should have forked this repo. Change the URL to your fork.
  repoURL: git@github.com:<your account>/ClusterFactory-CE.git
  targetRevision: HEAD
  path: helm/openldap
  helm:
    releaseName: openldap

    # Create a values file inside your fork and change the values.
    valueFiles:
      - values-production.yaml
```

## 4. Adding custom values to the chart

:::tip

Read the [`values.yaml`](https://github.com/SquareFactory/ClusterFactory-CE/blob/main/helm/openldap/values.yaml) to see all the default values.

:::

### 4.a. Create the values file

Create the values file `values-production.yaml` inside the `helm/openldap/` directory.

### 4.b. Configure the OpenLDAP environment variables

Edit the `env` field according to you needs:

```yaml title="helm/openldap/values-production.yaml"
env:
  BITNAMI_DEBUG: 'true'
  LDAP_ROOT: 'dc=example,dc=org'
  LDAP_CONFIG_ADMIN_ENABLED: 'no'
  LDAP_USER_DC: 'users'
  LDAP_GROUP: 'readers'
  LDAP_ADD_SCHEMAS: 'yes'
  LDAP_EXTRA_SCHEMAS: 'cosine,inetorgperson,nis'
  LDAP_SKIP_DEFAULT_TREE: 'no'
  LDAP_CUSTOM_LDIF_DIR: '/ldifs'
  LDAP_CUSTOM_SCHEMA_FILE: '/schema/custom.ldif'
  LDAP_ULIMIT_NOFILES: '1024'
  LDAP_ALLOW_ANON_BINDING: 'yes'
  LDAP_LOGLEVEL: '256'
```

### 4.c. Mount the volume

<Tabs groupId="volume">
  <TabItem value="storage-class" label="StorageClass (dynamic)" default>

```yaml title="helm/openldap/values-production.yaml"
# ...
persistence:
  storageClassName: 'openldap-nfs'
```

  </TabItem>
  <TabItem value="persistent-volume" label="PersistentVolume (static)">

```yaml title="helm/openldap/values-production.yaml"
# ...
persistence:
  selectorLabels:
    app: ldap
```

  </TabItem>
</Tabs>

## 4. Deploy the app

Commit and push:

```shell title="user@local:/ClusterFactory-CE"
git add .
git commit -m "Added OpenLDAP service"
git push
```

And deploy the Argo CD application:

```shell title="user@local:/ClusterFactory-CE"
kubectl apply -f argo/ldap/apps/openldap-app.yml
```

If the Ingress is configured, the LDAP server should be available on the IP specified by MetalLB.
