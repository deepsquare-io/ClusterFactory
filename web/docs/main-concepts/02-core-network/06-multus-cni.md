# Multus CNI, the Swiss army knife of networking

Multus CNI allows us to attach multiple network interfaces to pods, similarly to Docker and Virtual Machines.

![multus-pod-image](06-multus-cni.assets/multus-pod-image.svg#white-bg)

The first reason we use Multus is so that KubeVirt supports multiple network interfaces.

The second and most important reason is that it allows us to use CNI plugins, and thus use ipvlan or macvlan, just like with Docker.

The experience becomes similar to Docker where you can allocate an IP address to a container. This solves a lot of problems for pods that need to use the host network, like xCAT, the bare-metal provisioner.

While Multus solves a lot of problems, it also creates some issues related to routing.

For example, the internal pod network conflicts with other networks since it is impossible to customize Calico's default routes.

The issue is open [here](https://github.com/projectcalico/calico/issues/5199).
