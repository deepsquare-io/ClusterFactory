# 1. Requirements and recommendations

## Requirements

All nodes should be accessible via SSH.

Any Linux distribution with :

- The Linux kernel version higher than 3.10.
- An init system based on SystemD or OpenRC.

Cluster Factory has been fully tested on Rocky Linux, and is our recommended OS.

## Recommended toolings

- [VSCode](https://code.visualstudio.com) is our favorite IDE. But just use one with good YAML support.
- **Use [Lens](https://k8slens.dev) to manage your kubernetes cluster.**

## Recommended documentations

- [Kubernetes documentation](https://kubernetes.io/docs/concepts/)
- [Kubernetes API reference](https://kubernetes.io/docs/reference/kubernetes-api/)
- [k0sctl.yaml specs file](https://github.com/k0sproject/k0sctl#spec-fields)
- [ArgoCD declarative setup](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/)
