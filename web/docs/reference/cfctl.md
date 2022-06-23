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

## backup

Take backup of existing clusters state.

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

## config

Configuration related sub-commands.

**USAGE**

```shell
cfctl config [arguments...]
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
