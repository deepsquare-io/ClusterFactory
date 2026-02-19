# cfctl.yaml

`apiVersion: cfctl.clusterfactory.io/v1beta1`

<details>
  <summary>Example</summary>

```yaml
apiVersion: cfctl.clusterfactory.io/v1beta1
kind: Cluster
metadata:
  name: k8s.example.com-cluster
spec:
  hosts:
    - ssh:
        address: 192.168.0.2
        user: root
        port: 22
        keyPath: ~/.ssh/id_ed25519
      role: controller+worker
      noTaints: true
      privateInterface: eno1
      privateAddress: 192.168.0.2
      installFlags:
        - --debug
        - --labels="topology.kubernetes.io/region=ch-sion,topology.kubernetes.io/zone=ch-sion-1"
        - --disable-components coredns
      hooks:
        apply:
          before:
            # Set SELinux Permissive
            - sh -c 'if [ "$(getenforce)" != "Permissive" ] && [ "$(getenforce)" != "Disabled" ]; then sed -i s/^SELINUX=.*$/SELINUX=permissive/ /etc/selinux/config; fi'
            - sh -c 'if [ "$(getenforce)" != "Permissive" ] && [ "$(getenforce)" != "Disabled" ]; then setenforce 0; fi'

  k0s:
    version: '1.34.3+k0s.0'
    dynamicConfig: false
    config:
      apiVersion: k0s.k0sproject.io/v1beta1
      kind: ClusterConfig
      metadata:
        name: k8s.example.com
      spec:
        api:
          k0sApiPort: 9443
          port: 6443
        installConfig:
          users:
            etcdUser: etcd
            kineUser: kube-apiserver
            konnectivityUser: konnectivity-server
            kubeAPIserverUser: kube-apiserver
            kubeSchedulerUser: kube-scheduler
        konnectivity:
          adminPort: 8133
          agentPort: 8132
        network:
          calico:
            mode: 'vxlan'
            overlay: Always
            mtu: 0
            wireguard: false
          kubeProxy:
            disabled: false
            mode: iptables
          kuberouter:
            autoMTU: true
            mtu: 0
            peerRouterASNs: ''
            peerRouterIPs: ''
          podCIDR: 10.244.0.0/16
          provider: calico
          serviceCIDR: 10.96.0.0/12
        podSecurityPolicy:
          defaultPolicy: 00-k0s-privileged
        storage:
          type: etcd
        telemetry:
          enabled: false
```

</details>

## Cluster

Cluster is the configuration for a k0s cluster. It configures k0s on the listed hosts.

---

- **apiVersion**: cfctl.clusterfactory.io/v1beta1
- **kind**: Cluster
- **metadata**: ([ClusterMetadata](#clustermetadata))
- **spec** ([Spec](#spec))

## ClusterMetadata

ClusterMetadata is the metadata of the cluster.

---

- **name**: (string)

  Name of the cluster configuration.

## Spec

Spec is a description of a cluster configuration.

---

- **hosts**: ([][host](#host)), required

  List of hosts belonging to the cluster. There must be at least on host in a Cluster. Host requirements:

  - Currently only linux targets are supported
  - The user must either be root or have passwordless `sudo` access.
  - The host must fulfill the k0s system requirements

- **k0s**: ([K0s](#k0s)), optional

  K0s configuration for the hosts.

## Host

---

- **role**: (string)

  One of:

  - `controller` - a controller host
  - `controller+worker` - a controller host that will also run workloads
  - `single` - a single-node cluster host, the configuration can only contain one host
  - `worker` - a worker host

- **privateInterface**: (string), optional, default: ` `

  Override private network interface selected by host fact gathering.
  Useful in case fact gathering picks the wrong private network interface.

  ```yaml
  - role: worker
    os: debian
    privateInterface: eth1
  ```

- **privateAddress**: (string), optional, default: ` `

  Override private IP address selected by host fact gathering.
  Useful in case fact gathering picks the wrong IPAddress.

  ```yaml
  - role: worker
    os: debian
    privateAddress: 10.0.0.2
  ```

- **environment**: (map\[string\]string), optional

  List of key-value pairs to set to the target host's environment variables.

  Example:

  ```yaml
  environment:
    HTTP_PROXY: 10.0.0.1:443
  ```

- **uploadBinary**: (boolean), optional, default: `false`

  When `true`, the k0s binaries for target host will be downloaded and cached on the local host and uploaded to the target.
  When `false`, the k0s binary downloading is performed on the target host itself

- **k0sBinaryPath**: (string), optional

  A path to a file on the local host that contains a k0s binary to be uploaded to the host. Can be used to test drive a custom development build of k0s.

- **installFlags**: (\[\]string), optional

  Extra flags passed to the `k0s install` command on the target host. See `k0s install --help` for a list of options.

- **files**: (\[\][Uploadfile](#uploadfile)), optional

  List of files to be uploaded to the host.

  Example:

  ```yaml
  - name: image-bundle
    src: airgap-images.tgz
    dstDir: /var/lib/k0s/images/
    perm: 0600
  ```

  - `name`: name of the file "bundle", used only for logging purposes (optional)
  - `src`: File path, an URL or [Glob pattern](https://golang.org/pkg/path/filepath/#Match) to match files to be uploaded. URL sources will be directly downloaded using the target host (required)
  - `dstDir`: Destination directory for the file(s). `k0sctl` will create full directory structure if it does not already exist on the host (default: user home)
  - `dst`: Destination filename for the file. Only usable for single file uploads (default: basename of file)
  - `perm`: File permission mode for uploaded file(s) (default: same as local)
  - `dirPerm`: Directory permission mode for created directories (default: 0755)
  - `user`: User name of file/directory owner, must exist on the host (optional)
  - `group`: Group name of file/directory owner, must exist on the host (optional)

- **os**: (string), optional, default: ` `

  Override OS distribution auto-detection. By default `k0sctl` detects the OS by reading `/etc/os-release` or `/usr/lib/os-release` files. In case your system is based on e.g. Debian but the OS release info has something else configured you can override `k0sctl` to use Debian based functionality for the node with:

  ```yaml
  - role: worker
    os: debian
    ssh:
      address: 10.0.0.2
  ```

- **hostname**: (string), optional

  Override host's hostname. When not set, the hostname reported by the operating system is used.

- **noTaints**: (boolean), optional, default: ` false

  When `true` and used in conjuction with the `controller+worker` role, the default taints are disabled making regular workloads schedulable on the node. By default, k0s sets a node-role.kubernetes.io/master:NoSchedule taint on controller+worker nodes and only workloads with toleration for it will be scheduled.

- **hooks**: (Hooks, which is a map[string]map[string][]string, such as hooks["apply"]["before"] = ["ls -al", "rm foo.txt"]), optional

  Run a set of commands on the remote host during k0sctl operations.

  Example:

  ```yaml
  hooks:
    apply:
      before:
        - date >> k0sctl-apply.log
      after:
        - echo "apply success" >> k0sctl-apply.log
  ```

  The currently available "hook points" are:

  - `apply`: Runs during `k0sctl apply`
    - `before`: Runs after configuration and host validation, right before configuring k0s on the host
    - `after`: Runs before disconnecting from the host after a successful apply operation
  - `backup`: Runs during `k0s backup`
    - `before`: Runs before k0sctl runs the `k0s backup` command
    - `after`: Runs before disconnecting from the host after successfully taking a backup
  - `reset`: Runs during `k0sctl reset`
    - `before`: Runs after gathering information about the cluster, right before starting to remove the k0s installation.
    - `after`: Runs before disconnecting from the host after a successful reset operation

- **ssh**: ([SSH](#ssh)), optional

  SSH connection options.

  Example:

  ```yaml
  spec:
    hosts:
      - role: controller
        ssh:
          address: 10.0.0.2
          user: ubuntu
          keyPath: ~/.ssh/id_rsa
  ```

  It's also possible to tunnel connections through a bastion host. The bastion configuration has all the same fields as any SSH connection:

  ```yaml
  spec:
    hosts:
      - role: controller
        ssh:
          address: 10.0.0.2
          user: ubuntu
          keyPath: ~/.ssh/id_rsa
          bastion:
            address: 10.0.0.1
            user: root
            keyPath: ~/.ssh/id_rsa2
  ```

  SSH agent and auth forwarding are also supported, a host without a keyfile:

  ```yaml
  spec:
    hosts:
      - role: controller
        ssh:
          address: 10.0.0.2
          user: ubuntu
  ```

  ```shell
  $ ssh-add ~/.ssh/aws.pem
  $ ssh -A user@jumphost
  user@jumphost ~ $ k0sctl apply
  ```

- **localhost**: (Localhost), optional

  Localhost connection options. Can be used to use the local host running k0sctl as a node in the cluster.

  - **enabled** (boolean), optional, default: `false`

  This must be set `true` to enable the localhost connection.

## UploadFile

UploadFile describes a file to be uploaded for the host

---

- **name**: (string), optional

  Name of the file "bundle", used only for logging purposes.

- **src**: (string)

  File path, an URL or [Glob pattern](https://golang.org/pkg/path/filepath/#Match) to match files to be uploaded. URL sources will be directly
  downloaded using the target host.

- **dstDir**: (string), default: user home

  Destination directory for the file(s). `k0sctl` will create full directory structure if it does not already exist on the host.

- **dst**: (string), default: basename of file

  Destination filename for the file. Only usable for single file uploads.

- **perm**: (octal string), default: same as local

  File permission mode for uploaded file(s).

- **dirPerm**: (octal string), default: `0755`

  Directory permission mode for created directories.

- **user**: (string), optional

  User name of file/directory owner, must exist on the host.

- **group**: (string)

  Group name of file/directory owner, must exist on the host.

## SSH

SSH describe an SSH connection.

---

- **address**: (string)

  Address of the the remote SSH Host.

- **user**: (string), default: `root`

  User used to authenticate during the SSH connection.

- **port**: (integer), optional, default: `22`

  Port opened on the host which is accepting SSH connection.

- **keyPath**: (string), optional, default: `~/.ssh/id_rsa`

  Path of the SSH Key used to authenticate during the SSH connection.

- **hostKey**: (string), optional

  Key of the remote of for SSH host key verification.

- **bastion**: ([SSH](#ssh)), optional

  Bastion is used to configured SSH connection over an SSH bastion.

## K0s

K0s holds configuration for bootstraping a k0s cluster.

---

- **version**: (string), optional, default: auto-discovery

  The version of k0s to deploy. When left out, k0sctl will default to using the latest released version of k0s or the version already running on the cluster.

- **dynamicConfig**: (boolean), optional, default: `false`

  - Any controller node has `--enable-dynamic-config` in `installFlags`
  - Any existing controller node has `--enable-dynamic-config` in run arguments (`k0s status -o json`)

  **Note:** When running k0s in dynamic config mode, k0sctl will ONLY configure the cluster-wide configuration during the first time initialization, after that the configuration has to be managed via `k0s config edit` or `k0sctl config edit`. The node specific configuration will be updated on each apply.

  See also:

  - [k0s Dynamic Configuration](https://docs.k0sproject.io/main/dynamic-configuration/)

- **config**: ([K0sConfig](https://docs.k0sproject.io/head/configuration/)), optional, default: auto-generated

  Embedded k0s cluster configuration. See [k0s configuration documentation](https://docs.k0sproject.io/main/configuration/) for details.

  When left out, the output of `k0s config create` will be used.
