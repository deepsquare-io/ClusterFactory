# Setting up the Git repository for GitOps

To enable GitOps and be able to follow the updates of the ClusterFactory CE repository, you should [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the [ClusterFactory CE repository](https://github.com/SquareFactory/ClusterFactory-CE) or create a private copy, so you could use Argo CD on your own repository.

## Setting up the Git repository

### 1. Fork the repository

#### Method 1: Create a public fork

1. Use the "Fork" button on Github and create the fork on your favorite account.

<div style={{textAlign: 'center'}}>

![Fork button](01-setting-up-repository.assets/fork_button.png)

</div>

2. After setting up the fork, `git clone` the fork. Example:

   ```shell title="user@local:/"
   # SSH
   git clone git@github.com:<your account>/ClusterFactory-CE.git
   ```

#### Method 2: Create a private fork

1. Create a bare clone of the repository.

   ```shell title="user@local:/"
   git clone --bare https://github.com/SquareFactory/ClusterFactory-CE.git
   ```

2. Create [a new private repository on your favorite Git hosting website](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) and name it `ClusterFactory-CE`.

3. Mirror-push your bare clone to your new `ClusterFactory-CE` repository.

   ```shell title="user@local:/"
   cd ClusterFactory-CE.git
   # SSH
   git push --mirror git@github.com:<your account>/ClusterFactory-CE.git
   ```

4. Remove the bare clone.

   ```shell title="user@local:/ClusterFactory-CE.git"
   cd ..
   rm -rf ./ClusterFactory-CE.git

   ```

5. You can now clone your `ClusterFactory-CE` repository on your machine.

   ```shell title="user@local:/"
   # SSH
   git clone git@github.com:<your account>/ClusterFactory-CE.git
   ```

### 2. Setup the upstream remote for git

Git is capable of managing multiple remote repositories. By default, `origin` is linked to the `<your account>/ClusterFactory-CE` repository. To be able to fetch updates from the upstream `SquareFactory/ClusterFactory-CE` repository, we need to add a remote repository that we call `upstream`.

1. Add the upstream and disable push on the remote `upstream`:

   ```shell title="user@local:/ClusterFactory-CE"
   git remote add upstream https://github.com/SquareFactory/ClusterFactory-CE.git
   git remote set-url --push upstream DISABLE
   ```

2. You can list all your remotes with `git remote -v`:

   ```shell title="user@local:/ClusterFactory-CE"
   git remote -v
   # origin	git@github.com:<your account>/ClusterFactory-CE.git (fetch)
   # origin	git@github.com:<your account>/ClusterFactory-CE.git (push)
   # upstream	https://github.com/SquareFactory/ClusterFactory-CE.git (fetch)
   # upstream	DISABLE (push)
   ```

### 3. Checkout to a stable version and create a new branch

You can checkout to a stable version:

```shell title="user@local:/ClusterFactory-CE"
git checkout -b v0.7.0 configs
# You can delete the local main branch
git branch -D main
```

### 4. Rename the examples and commit

Copy `argo.example`, `core.example`, `cfctl.yaml.example`, and remove the `.example`:

```shell title="user@local:/ClusterFactory-CE"
cp -R argo.example/ argo/
cp -R core.example/ core/
cp cfctl.yaml.example cfctl.yaml
```

You can track these files on Git:

```shell title="user@local:/ClusterFactory-CE"
git add .
git commit -m "Initialized my config"
git push -u origin configs
# You can also delete the remote main branch
```

## Use `git fetch` and `git merge` to merge the upstream main into the local branch

Because ClusterFactory CE will be updated regularly, you can fetch the updates with git fetch:

```shell title="user@local:/ClusterFactory-CE"
git fetch --tags upstream
```

<div style={{textAlign: 'center'}}>

![git-fetch](01-setting-up-repository.assets/image-20220624193812004.png)

</div>

To merge the upstream changes, either rebase or create a merge commit.

```shell title="user@local:/ClusterFactory-CE"
git merge v0.8.0
```

<div style={{textAlign: 'center'}}>

![git-merge](01-setting-up-repository.assets/image-20220624194957531.png)

</div>

```shell title="user@local:/ClusterFactory-CE"
git push
```

<div style={{textAlign: 'center'}}>

![git-push](01-setting-up-repository.assets/image-20220624195047988.png)

</div>

---

If you wish to follow the upstream main branch:

```shell title="user@local:/ClusterFactory-CE"
git merge upstream/main
git push
```

If everything goes well, your git graph should always look like this:

<div style={{textAlign: 'center'}}>

![git-graph-example](01-setting-up-repository.assets/image-20220624204605963.png)

</div>

## Use Argo CD to pull, synchronize and deploy the manifests

If you want to deploy your applications, you should write your manifests and commit these files to your repository, like this:

```text
./
├── argo/
├── bin/
├── core/
├── helm/
│   ├── csi-driver-cvmfs/
│   ├── cvmfs-server/
│   ├── cvmfs-service/
│   ├── ipmi-exporter/
│   ├── my-helm-application/  <----- HERE if it's a helm application
│   │   ├── templates/
│   │   ├── Chart.yaml
│   │   └── values.yaml
│   ├── openldap/
│   ├── slurm-cluster/
│   └── xcat/
├── manifests/                <----- Or HERE if it's a kustomized/vanilla Kubernetes application
│   └── my-application/       <-----
│       └── statefulset.yaml  <-----
└── ...
```

Argo CD is able to retrieve your repository from your Git hosting server, synchronize changes and deploy your Kubernetes manifests.

1. Create a local secret containing a SSH deploy key and the git url:

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

3. Configure an Argo CD Application:

```yaml title="argo/default/apps/my-application.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-application
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: git@github.com:<your account>/<your repo>.git
    targetRevision: HEAD
    path: manifests/my-application
    directory:
      recurse: true

  destination:
    server: 'https://kubernetes.default.svc'
    namespace: default

  syncPolicy:
    automated:
      prune: true # Specifies if resources should be pruned during auto-syncing ( false by default ).
      selfHeal: true # Specifies if partial app sync should be executed when resources are changed only in target Kubernetes cluster and no git change detected ( false by default ).
      allowEmpty: false # Allows deleting all application resources during automatic syncing ( false by default ).
    syncOptions: []
    retry:
      limit: 5 # number of failed sync attempt retries; unlimited number of attempts if less than 0
      backoff:
        duration: 5s # the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")
        factor: 2 # a factor to multiply the base duration after each failed retry
        maxDuration: 3m # the maximum amount of time allowed for the backoff strategy
```

4. And apply it:

```shell
kubectl apply -f argo/default/apps/my-application.yaml
```

Argo CD will deploy and synchroize automatically by following the HEAD commit. You can also specify the branch instead of `HEAD`.
