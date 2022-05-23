# Cluster Factory Community Edition Kubernetes Stack

## Overview

This repository Cluster Factory CE is where SquareFactory develops the k8s-based infrastructure orchestration tool together with the community. A tool combines all the standard tools of the last 30 years to be able to manage a HPC cluster in a declarative way in combination with the practice of GitOps.

## Deployment process

This project will deploy in the following order:

- A k0s cluster with helm extensions (MetalLB, Traefik, Cert-Manager, CSI Drivers). Also with KubeVirt (VM workloads) and Multus (multiple network interfaces).
- Core certs issuers, traefik routes and dashboards.
- Apps with Argo CD
  - xCAT (bare-metal provisioning)
  - Packer OS images recipes
  - Slurm controller, database and login nodes
  - LDAP (for global users/groups management)
  - CVMFS stratum1 mirror of Deepsquare's software library (end user software)
  - Open Ondemand, a web-based HPC user portal
  - Monitoring stack (Grafana, Prometheus with ready-to-use exporters)

## Getting started

If you'd like to try Cluster Factory CE, you should start by reading our [Quick Start Guide](https://docs.clusterfactory.io/docs/getting-started/requirements-recommendations) and our [documentation](https://docs.clusterfactory.io/docs/overview/welcome)!

## Join the Community

- Community Discord - Request for support and helm from the Cluster Factory community.
- [Github Issues](https://github.com/SquareFactory/cluster-factory-ce/issues) - Submit your issues and feature requests via Github.

We welcome your help in building Cluster Factory CE! If you are interested, we invite you to check
out the [Contributing Guide](/docs/see-also/contributing).

## Motivation

At SquareFactory, we wish to develop applications for the DeepSquare Grid. Because of that, our infrastructure uses a lot of HPC technologies, 
which makes it difficult to scale. We believe that **flexibity**, **repeatability**, **availability** and **ease of use** should be prioritized
for managing and scaling HPC clusters.

This is why we are developing Cluster Factory CE:

- **Highly configurable**: With Helm, all configuration is done in a single `values.yaml` file.
- **Repeatable**: With Argo CD following GitOps practices, all states are specified declaratively and saved in a Git repository.
- **Highly available**: With Kubernetes, container scheduling is automatically ensured and easy to set up.
- **Simple**: A single descriptive YAML per application, with Argo CD to automatically updates the application.
- **Long-term maintainability**: Easy to deploy, update, backup and restore with K0s.

## Documentations to help you deploy

To be able to configure this stack you should be proficient in:

- Kubernetes
- Helm templating
- CNIs (Multus, Calico and plugins...)

There are other stuffs to learn, but you can learn it during the deployment.

- [Kubernetes Documentation (not going to lie, you're gonna need it)](https://kubernetes.io/docs/concepts/)
- [Helm Values Files](https://helm.sh/docs/chart_template_guide/values_files/)
- [K0s Configuration](https://docs.k0sproject.io/v1.23.5+k0s.0/configuration/)
- [Cert-Manager Issuers Configuration](https://cert-manager.io/docs/configuration/)
- [Multus CNI Quickstart](https://github.com/k8snetworkplumbingwg/multus-cni/blob/master/docs/quickstart.md)
- [CNI Plugins Overview](https://www.cni.dev/plugins/current/)
- [KubeVirt User Guide](https://kubevirt.io/user-guide/)
- [Argo CD Application YAML](https://github.com/argoproj/argo-cd/blob/master/docs/operator-manual/application.yaml)
- [Traefik Ingress Routes](https://doc.traefik.io/traefik/routing/providers/kubernetes-crd/)
- [Traefik Ingress](https://doc.traefik.io/traefik/routing/providers/kubernetes-ingress/)
