# cfctl

:::info

`cfctl` is still in development. `cfctl` will simplify the setup and deployment of core applications.

:::

The command line bootstrap and management tool `cfctl` is a fork of [`k0sctl`](https://github.com/k0sproject/k0sctl). The main differences between `cfctl` and `k0sctl` are additions for easy deployment of ClusterFactory.

`cfctl` will also be our tool to help bootstrap ClusterFactory.

**USAGE**

```shell
cfctl [global options] command [command options] [arguments...]
```

**GLOBAL OPTIONS**

```shell
   --debug, -d  Enable debug logging (default: false) [$DEBUG]
   --trace      Enable trace logging (default: false) [$TRACE]
   --no-redact  Do not hide sensitive information in the output (default: false)
   --help, -h   show help (default: false)
```

## apply

Apply a cfctl configuration.

**USAGE**

```shell
cfctl apply [command options] [arguments...]
```

**OPTIONS**

```shell
   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: "cfctl.yaml")
   --no-wait                 Do not wait for worker nodes to join (default: false)
   --no-drain                Do not drain worker nodes when upgrading (default: false)
   --restore-from value      Path to cluster backup archive to restore the state from
   --debug, -d               Enable debug logging (default: false) [$DEBUG]
   --trace                   Enable trace logging (default: false) [$TRACE]
   --no-redact               Do not hide sensitive information in the output (default: false)
   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]
   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]
```

**EXAMPLES**

The main function of `cfctl` is the `cfctl apply` subcommand. `cfctl` will connect via SSH to the hosts listed in the `cfctl.yaml` configuration file. `cfctl` will determine the current state of the hosts and configure them according to the configuration file.

```shell
cfctl apply --config path/to/cfctl.yaml
```

If the cluster version of the `spec.k0s.version` configuration is higher than the version detected on the cluster, a cluster upgrade will be performed.
If the configuration lists hosts that are not part of the cluster, they will be configured to run k0s and will be joined to the cluster.

## init

Create a configuration template.

Outputs a new cfctl configuration. When a list of addresses are provided, hosts are generated into the configuration. The list of addresses can also be provided via stdin.

**USAGE**

```shell
cfctl init [command options] [[user@]address[:port] ...]
```

**OPTIONS**

```shell
   --k0s                               Include a skeleton k0s config section (default: false)
   --cluster-name value, -n value      Cluster name (default: "k0s-cluster")
   --controller-count value, -C value  The number of controllers to create when addresses are given (default: 1)
   --user value, -u value              Host user when addresses given
   --key-path value, -i value          Host key path when addresses given
```

**EXAMPLES**

Use `--k0s` to include an example `spec.k0s.config` k0s configuration block. You can also supply a list of host addresses via arguments or stdin.

Output a minimal configuration template:

```sh
cfctl init > cfctl.yaml
```

Output an example configuration with a default k0s config:

```sh
cfctl init --k0s > cfctl.yaml
```

Create a configuration from a list of host addresses and pipe it to `cfctl apply`:

```sh
cfctl init 10.0.0.1 10.0.0.2 ubuntu@10.0.0.3:8022 | cfctl apply --config -
```

## backup

Take backup of existing clusters state.

**KNOWN LIMITATIONS**

When restoring, the control plane address (`externalAddress`) needs to remain the same between backup and restore. This is caused by the fact that all worker node components connect to this address and cannot currently be re-configured.

**USAGE**

```shell
cfctl backup [command options] [arguments...]
```

**OPTIONS**

```shell
   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: "cfctl.yaml")
   --debug, -d               Enable debug logging (default: false) [$DEBUG]
   --trace                   Enable trace logging (default: false) [$TRACE]
   --no-redact               Do not hide sensitive information in the output (default: false)
   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]
   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]
```

**EXAMPLES**

```sh
cfctl backup
```

The files are currently named with a running (unix epoch) timestamp, e.g. `k0s_backup_1623220591.tar.gz`.

Restoring a backup can be done as part of the [cfctl apply](#apply) command using `--restore-from k0s_backup_1623220591.tar.gz` flag.

Restoring the cluster state is a full restoration of the cluster control plane state, including:

- Etcd datastore content
- Certificates
- Keys

In general restore is intended to be used as a disaster recovery mechanism and thus it expects that no k0s components actually exist on the controllers.

## reset

Remove traces of k0s from all of the hosts.

**USAGE**

```shell
cfctl reset [command options] [arguments...]
```

**OPTIONS**

```shell
   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: "cfctl.yaml")
   --debug, -d               Enable debug logging (default: false) [$DEBUG]
   --trace                   Enable trace logging (default: false) [$TRACE]
   --no-redact               Do not hide sensitive information in the output (default: false)
   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]
   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]
   --force, -f               Don't ask for confirmation (default: false)
```

## kubeconfig

Output the admin kubeconfig of the cluster.

**USAGE**

```shell
cfctl kubeconfig [command options] [arguments...]
```

**OPTIONS**

```shell
   --address value           Set kubernetes API address (default: auto-detect)
   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: "cfctl.yaml")
   --debug, -d               Enable debug logging (default: false) [$DEBUG]
   --trace                   Enable trace logging (default: false) [$TRACE]
   --no-redact               Do not hide sensitive information in the output (default: false)
   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]
```

**EXAMPLES**

Connects to the cluster and outputs a kubeconfig file that can be used with `kubectl` or `kubeadm` to manage the kubernetes cluster.

```shell
$ cfctl kubeconfig --config path/to/cfctl.yaml > k0s.config
$ kubectl get node --kubeconfig k0s.config
NAME      STATUS     ROLES    AGE   VERSION
worker0   NotReady   <none>   10s   v1.20.2-k0s1
```

## version

Output cfctl version.

**USAGE**

```shell
cfctl version [command options] [arguments...]
```

**OPTIONS**

```shell
   --k0s  Retrieve the latest k0s version number (default: false)
   --pre  When used in conjunction with --k0s, a pre release is accepted as the latest version (default: false)
```

## config

Configuration related sub-commands.

**USAGE**

```shell
cfctl config command [command options] [arguments...]
```

### edit

Edit k0s dynamic config in SHELL's default editor.

**USAGE**

```shell
cfctl config edit [command options] [arguments...]
```

**OPTIONS**

```shell
   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: "cfctl.yaml")
   --debug, -d               Enable debug logging (default: false) [$DEBUG]
   --trace                   Enable trace logging (default: false) [$TRACE]
   --no-redact               Do not hide sensitive information in the output (default: false)
   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]
   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]
```

### status

Show k0s dynamic config reconciliation events.

**USAGE**

```shell
cfctl config status [command options] [arguments...]
```

**OPTIONS**

```shell
   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: "cfctl.yaml")
   --debug, -d               Enable debug logging (default: false) [$DEBUG]
   --trace                   Enable trace logging (default: false) [$TRACE]
   --no-redact               Do not hide sensitive information in the output (default: false)
   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]
   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]
   --output value, -o value  kubectl output formatting
```

### kubeseal

Kubeseal every '-secret.yaml.local' files recursively.

**USAGE**

```shell
cfctl kubeseal [command options] [arguments...]
```

**OPTIONS**

```shell
   --controller-namespace value  The namespace where the sealed secrets controller resides. (default: "sealed-secrets") [$SEALED_SECRETS_CONTROLLER_NAMESPACE]
   --controller-name value       The name of the sealed secrets controller. (default: "sealed-secrets")
```

## completion

Generates a shell auto-completion script.

Typical locations for the generated output are:

- Bash: /etc/bash_completion.d/cfctl
- Zsh: /usr/local/share/zsh/site-functions/\_cfctl
- Fish: ~/.config/fish/completions/cfctl.fish

**USAGE**

```shell
cfctl completion [command options] [arguments...]
```

**OPTIONS**

```shell
   --shell value, -s value  Shell to generate the script for (default: "bash") [$SHELL]
```

## help

Shows a list of commands or help for one command.

```shell
cfctl help [command]
```
