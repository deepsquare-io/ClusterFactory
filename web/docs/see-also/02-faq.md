# Frequently Asked Questions

## Kubernetes is quite complex compared to Virtual Machines. How do I learn about Kubernetes? about Cluster Factory?

Docker is young and Kubernetes is even younger. You can watch the [documentary made by Honeypot about Kubernetes](https://www.youtube.com/watch?v=BE77h7dmoQU) to learn the context of the creation of Kubernetes.

There is no graphical user interface for Kubernetes, so it is difficult to tie all the concepts together. We always recommend using [Lens](https://k8slens.dev) for debugging and learning. The Argo CD dashboard can also help you understand some of the concepts.

Here are our recommended resources to learn Kubernetes:

- Start with [Docker](https://docs.docker.com/compose/gettingstarted/) and [docker-compose](https://docs.docker.com/compose/gettingstarted/)
- After learning docker-compose, you should understand that Kubernetes is about scheduling containers on multiple computers. You should read the [Kubernetes Main Concepts](https://kubernetes.io/docs/concepts/) (don't skip any chapter even if it's complex).
- Start directly by creating [Kustomized Workloads](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/) on MiniKube or KinD. Use [Lens](https://k8slens.dev) for debugging. Our suggestion is to at least try to [set up a Web Server](https://kubernetes.io/docs/tutorials/stateless-application/guestbook/) with its [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/).

Congratulations! You know how to use Kubernetes! Now, what about Cluster Factory?

You should read our [main concepts](/docs/main-concepts/k0s), then try the [getting started](/docs/getting-started/requirements-recommendations).

Here are some other resources you can read:

- Learn quickly [Argo CD](https://argo-cd.readthedocs.io/en/stable/getting_started/)
- Learn about templating with [Helm](https://helm.sh/docs/intro/quickstart/)
- Learn about [MetalLB](https://metallb.universe.tf)

Then, if you are interested in bare-metal provisioning, you should read our [guides](/docs/guides/provisioning/deploy-xcat).

If you've got all this figured out, you will now know that putting Kubernetes into practice is less complicated than setting up a virtual machine.

## Why Kubernetes over Virtual Machines?

Before Cluster Factory, we used Proxmox to manage our applications. One application
per Virtual Machine. We used NFS, Ansible and Git to centralize our configuration.
With this setup, we had many problems:

- It's heavy. Obviously, with one application per VM, the resources were quickly depleted. You may want to put all the applications in one VM and use Ansible to configure the VM. However, this means we lose the isolation benefit of having one application per VM. We had to **containerize**.
- High availability is also heavy because we need to copy the disk to the other hosts. The Kubernetes HA setup is less complex thanks to `etcd`.
- No health check, which means the VM or the application doesn't restart automatically.

Kubernetes has also these benefits:

- **Easy to deploy, easy to join a cluster.** (Via kubeadm, K0s or k3s. All of them had a good experience deployment experience.)
- **Easy to maintain** thanks to K0s, Helm and Dockerfiles
- **Easy to scale** thanks to the Kubernetes Scheduler and Horizontal Pod Auto-scheduling
- All **declarative** and **GitOps friendly**
- **Custom Resources** with Kubernetes Operators
- **Easy networking and routing** with the Ingresses

While Kubernetes seems complex because of all the features, it's the one with the most explicit syntax. Everything is inside a YAML and everything is sorted and well-defined thanks to the "Groups, Versions and Kinds" syntax.

## Why Cluster Factory over Vanilla Kubernetes ?
It is possible to use your own Kubernetes to administer your clusters! The main difference between
the vanilla Kubernetes and Cluster Factory is that we integrate a battle-tested stack that we use in our HPC clusters.

While you can do some research and development to see which stack you could use to manage your HPC clusters. Cluster Factory is the solution we built and chose as the core of our clusters at [SquareFactory](https://www.squarefactory.io).

## Why K0s at its core ? Why not kubeadm or k3s ? or an immutable OS like CoreOS ?

We were looking for two things:

- **Ease of deployment**
- **Ease of maintainance**

While the Cluster API looked pretty interesting with kubeadm, we thought K0s had everything we needed:

- **Declarative deployment**
- **Easy update, backup, restore and reset**
- And a bonus: **only one binary is deployed**, without any dependencies

If we had to use an immutable operating system, we'd rather build our own. Using an immutable operating system means being vendor-locked and not allowing "mutability". This means that for the sake of security and easy maintainability, it is impossible to edit the OS.

Since we do a lot of research and development, not having the flexibility of our OSes would stop us. However, the idea could be interesting in the future.

More information on [their website](https://K0sproject.io).
