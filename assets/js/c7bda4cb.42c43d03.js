"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[6751],{5449:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>i});const s=JSON.parse('{"id":"reference/cfctl","title":"cfctl","description":"cfctl is still in development. cfctl will simplify the setup and deployment of core applications.","source":"@site/docs/reference/cfctl.md","sourceDirName":"reference","slug":"/reference/cfctl","permalink":"/docs/reference/cfctl","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/reference/cfctl.md","tags":[],"version":"current","frontMatter":{},"sidebar":"docs","previous":{"title":"Deploy a LDAP server","permalink":"/docs/guides/deploy-ldap"},"next":{"title":"cfctl.yaml","permalink":"/docs/reference/cfctl.yaml"}}');var t=l(6070),c=l(4306);const a={},r="cfctl",o={},i=[{value:"apply",id:"apply",level:2},{value:"init",id:"init",level:2},{value:"backup",id:"backup",level:2},{value:"reset",id:"reset",level:2},{value:"kubeconfig",id:"kubeconfig",level:2},{value:"version",id:"version",level:2},{value:"config",id:"config",level:2},{value:"edit",id:"edit",level:3},{value:"status",id:"status",level:3},{value:"kubeseal",id:"kubeseal",level:2},{value:"completion",id:"completion",level:2},{value:"help",id:"help",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"cfctl",children:"cfctl"})}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"cfctl"})," is still in development. ",(0,t.jsx)(n.code,{children:"cfctl"})," will simplify the setup and deployment of core applications."]})}),"\n",(0,t.jsxs)(n.p,{children:["The command line bootstrap and management tool ",(0,t.jsx)(n.code,{children:"cfctl"})," is a fork of ",(0,t.jsx)(n.a,{href:"https://github.com/k0sproject/k0sctl",children:(0,t.jsx)(n.code,{children:"k0sctl"})}),". The main differences between ",(0,t.jsx)(n.code,{children:"cfctl"})," and ",(0,t.jsx)(n.code,{children:"k0sctl"})," are additions for easy deployment of ClusterFactory."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"cfctl"})," will also be our tool to help bootstrap ClusterFactory."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl [global options] command [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"GLOBAL OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"   --debug, -d  Enable debug logging (default: false) [$DEBUG]\n   --trace      Enable trace logging (default: false) [$TRACE]\n   --no-redact  Do not hide sensitive information in the output (default: false)\n   --help, -h   show help (default: false)\n"})}),"\n",(0,t.jsx)(n.h2,{id:"apply",children:"apply"}),"\n",(0,t.jsx)(n.p,{children:"Apply a cfctl configuration."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl apply [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: \"cfctl.yaml\")\n   --no-wait                 Do not wait for worker nodes to join (default: false)\n   --no-drain                Do not drain worker nodes when upgrading (default: false)\n   --restore-from value      Path to cluster backup archive to restore the state from\n   --debug, -d               Enable debug logging (default: false) [$DEBUG]\n   --trace                   Enable trace logging (default: false) [$TRACE]\n   --no-redact               Do not hide sensitive information in the output (default: false)\n   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]\n   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"EXAMPLES"})}),"\n",(0,t.jsxs)(n.p,{children:["The main function of ",(0,t.jsx)(n.code,{children:"cfctl"})," is the ",(0,t.jsx)(n.code,{children:"cfctl apply"})," subcommand. ",(0,t.jsx)(n.code,{children:"cfctl"})," will connect via SSH to the hosts listed in the ",(0,t.jsx)(n.code,{children:"cfctl.yaml"})," configuration file. ",(0,t.jsx)(n.code,{children:"cfctl"})," will determine the current state of the hosts and configure them according to the configuration file."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl apply --config path/to/cfctl.yaml\n"})}),"\n",(0,t.jsxs)(n.p,{children:["If the cluster version of the ",(0,t.jsx)(n.code,{children:"spec.k0s.version"})," configuration is higher than the version detected on the cluster, a cluster upgrade will be performed.\nIf the configuration lists hosts that are not part of the cluster, they will be configured to run k0s and will be joined to the cluster."]}),"\n",(0,t.jsx)(n.h2,{id:"init",children:"init"}),"\n",(0,t.jsx)(n.p,{children:"Create a configuration template."}),"\n",(0,t.jsx)(n.p,{children:"Outputs a new cfctl configuration. When a list of addresses are provided, hosts are generated into the configuration. The list of addresses can also be provided via stdin."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl init [command options] [[user@]address[:port] ...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:'   --k0s                               Include a skeleton k0s config section (default: false)\n   --cluster-name value, -n value      Cluster name (default: "k0s-cluster")\n   --controller-count value, -C value  The number of controllers to create when addresses are given (default: 1)\n   --user value, -u value              Host user when addresses given\n   --key-path value, -i value          Host key path when addresses given\n'})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"EXAMPLES"})}),"\n",(0,t.jsxs)(n.p,{children:["Use ",(0,t.jsx)(n.code,{children:"--k0s"})," to include an example ",(0,t.jsx)(n.code,{children:"spec.k0s.config"})," k0s configuration block. You can also supply a list of host addresses via arguments or stdin."]}),"\n",(0,t.jsx)(n.p,{children:"Output a minimal configuration template:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"cfctl init > cfctl.yaml\n"})}),"\n",(0,t.jsx)(n.p,{children:"Output an example configuration with a default k0s config:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"cfctl init --k0s > cfctl.yaml\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Create a configuration from a list of host addresses and pipe it to ",(0,t.jsx)(n.code,{children:"cfctl apply"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"cfctl init 10.0.0.1 10.0.0.2 ubuntu@10.0.0.3:8022 | cfctl apply --config -\n"})}),"\n",(0,t.jsx)(n.h2,{id:"backup",children:"backup"}),"\n",(0,t.jsx)(n.p,{children:"Take backup of existing clusters state."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"KNOWN LIMITATIONS"})}),"\n",(0,t.jsxs)(n.p,{children:["When restoring, the control plane address (",(0,t.jsx)(n.code,{children:"externalAddress"}),") needs to remain the same between backup and restore. This is caused by the fact that all worker node components connect to this address and cannot currently be re-configured."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl backup [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: \"cfctl.yaml\")\n   --debug, -d               Enable debug logging (default: false) [$DEBUG]\n   --trace                   Enable trace logging (default: false) [$TRACE]\n   --no-redact               Do not hide sensitive information in the output (default: false)\n   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]\n   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"EXAMPLES"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"cfctl backup\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The files are currently named with a running (unix epoch) timestamp, e.g. ",(0,t.jsx)(n.code,{children:"k0s_backup_1623220591.tar.gz"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Restoring a backup can be done as part of the ",(0,t.jsx)(n.a,{href:"#apply",children:"cfctl apply"})," command using ",(0,t.jsx)(n.code,{children:"--restore-from k0s_backup_1623220591.tar.gz"})," flag."]}),"\n",(0,t.jsx)(n.p,{children:"Restoring the cluster state is a full restoration of the cluster control plane state, including:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Etcd datastore content"}),"\n",(0,t.jsx)(n.li,{children:"Certificates"}),"\n",(0,t.jsx)(n.li,{children:"Keys"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"In general restore is intended to be used as a disaster recovery mechanism and thus it expects that no k0s components actually exist on the controllers."}),"\n",(0,t.jsx)(n.h2,{id:"reset",children:"reset"}),"\n",(0,t.jsx)(n.p,{children:"Remove traces of k0s from all of the hosts."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl reset [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: \"cfctl.yaml\")\n   --debug, -d               Enable debug logging (default: false) [$DEBUG]\n   --trace                   Enable trace logging (default: false) [$TRACE]\n   --no-redact               Do not hide sensitive information in the output (default: false)\n   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]\n   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]\n   --force, -f               Don't ask for confirmation (default: false)\n"})}),"\n",(0,t.jsx)(n.h2,{id:"kubeconfig",children:"kubeconfig"}),"\n",(0,t.jsx)(n.p,{children:"Output the admin kubeconfig of the cluster."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl kubeconfig [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"   --address value           Set kubernetes API address (default: auto-detect)\n   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: \"cfctl.yaml\")\n   --debug, -d               Enable debug logging (default: false) [$DEBUG]\n   --trace                   Enable trace logging (default: false) [$TRACE]\n   --no-redact               Do not hide sensitive information in the output (default: false)\n   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"EXAMPLES"})}),"\n",(0,t.jsxs)(n.p,{children:["Connects to the cluster and outputs a kubeconfig file that can be used with ",(0,t.jsx)(n.code,{children:"kubectl"})," or ",(0,t.jsx)(n.code,{children:"kubeadm"})," to manage the kubernetes cluster."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"$ cfctl kubeconfig --config path/to/cfctl.yaml > k0s.config\n$ kubectl get node --kubeconfig k0s.config\nNAME      STATUS     ROLES    AGE   VERSION\nworker0   NotReady   <none>   10s   v1.20.2-k0s1\n"})}),"\n",(0,t.jsx)(n.h2,{id:"version",children:"version"}),"\n",(0,t.jsx)(n.p,{children:"Output cfctl version."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl version [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"   --k0s  Retrieve the latest k0s version number (default: false)\n   --pre  When used in conjunction with --k0s, a pre release is accepted as the latest version (default: false)\n"})}),"\n",(0,t.jsx)(n.h2,{id:"config",children:"config"}),"\n",(0,t.jsx)(n.p,{children:"Configuration related sub-commands."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl config command [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.h3,{id:"edit",children:"edit"}),"\n",(0,t.jsx)(n.p,{children:"Edit k0s dynamic config in SHELL's default editor."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl config edit [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: \"cfctl.yaml\")\n   --debug, -d               Enable debug logging (default: false) [$DEBUG]\n   --trace                   Enable trace logging (default: false) [$TRACE]\n   --no-redact               Do not hide sensitive information in the output (default: false)\n   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]\n   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]\n"})}),"\n",(0,t.jsx)(n.h3,{id:"status",children:"status"}),"\n",(0,t.jsx)(n.p,{children:"Show k0s dynamic config reconciliation events."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl config status [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"   --config value, -c value  Path to cluster config yaml. Use '-' to read from stdin. (default: \"cfctl.yaml\")\n   --debug, -d               Enable debug logging (default: false) [$DEBUG]\n   --trace                   Enable trace logging (default: false) [$TRACE]\n   --no-redact               Do not hide sensitive information in the output (default: false)\n   --disable-telemetry       Do not send anonymous telemetry (default: false) [$DISABLE_TELEMETRY]\n   --disable-upgrade-check   Do not check for a cfctl upgrade (default: false) [$DISABLE_UPGRADE_CHECK]\n   --output value, -o value  kubectl output formatting\n"})}),"\n",(0,t.jsx)(n.h2,{id:"kubeseal",children:"kubeseal"}),"\n",(0,t.jsx)(n.p,{children:"Kubeseal every '-secret.yaml.local' files recursively."}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl kubeseal [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:'   --controller-namespace value  The namespace where the sealed secrets controller resides. (default: "sealed-secrets") [$SEALED_SECRETS_CONTROLLER_NAMESPACE]\n   --controller-name value       The name of the sealed secrets controller. (default: "sealed-secrets")\n'})}),"\n",(0,t.jsx)(n.h2,{id:"completion",children:"completion"}),"\n",(0,t.jsx)(n.p,{children:"Generates a shell auto-completion script."}),"\n",(0,t.jsx)(n.p,{children:"Typical locations for the generated output are:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Bash: /etc/bash_completion.d/cfctl"}),"\n",(0,t.jsx)(n.li,{children:"Zsh: /usr/local/share/zsh/site-functions/_cfctl"}),"\n",(0,t.jsx)(n.li,{children:"Fish: ~/.config/fish/completions/cfctl.fish"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"USAGE"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl completion [command options] [arguments...]\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"OPTIONS"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:'   --shell value, -s value  Shell to generate the script for (default: "bash") [$SHELL]\n'})}),"\n",(0,t.jsx)(n.h2,{id:"help",children:"help"}),"\n",(0,t.jsx)(n.p,{children:"Shows a list of commands or help for one command."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"cfctl help [command]\n"})})]})}function h(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},4306:(e,n,l)=>{l.d(n,{R:()=>a,x:()=>r});var s=l(758);const t={},c=s.createContext(t);function a(e){const n=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(c.Provider,{value:n},e.children)}}}]);