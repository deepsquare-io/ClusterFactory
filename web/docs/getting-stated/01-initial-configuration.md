# Initial Configuration

## Requirements

All nodes should be accessible via SSH.

Any Linux distribution with :

- The Linux kernel version higher than 3.10.
- An init system based on SystemD or OpenRC.

Cluster Factory has been fully tested on Rocky Linux, and is our recommended OS.

## Recommended tooling

- [VSCode](https://code.visualstudio.com) is our favorite IDE. But just use one with good YAML support.
- **Use [Lens](https://k8slens.dev) to manage your kubernetes cluster.**

## Nodes configuration

Until the release of version 1.0, the initial configuration of nodes must be done manually.

Cluster Factory will deploy [k0s](https://k0sproject.io) on the nodes, which is an extremely lightweight, yet comprehensive kubernetes distribution. Because it isn't the official kubernetes distribution, k0s will install the kubelet working directory to `/var/lib/k0s/kubelet`. We must create a symbolic link to `/var/lib/kubelet`.

Cluster Factory will also deploy [KubeVirt](https://kubevirt.io) for VM workloads and requires SE Linux to be permissive.

SSH to your nodes and executes these commands:

```shell title="ssh root@node"
# Create symlink /var/lib/kubelet -> /var/lib/k0s/kubelet
mkdir -p /var/lib/k0s/kubelet
ln -s /var/lib/kubelet /var/lib/k0s/kubelet

# Set SELinux to permissive
sed -i s/^SELINUX=.*$/SELINUX=permissive/ /etc/selinux/config
setenforce 0
```
