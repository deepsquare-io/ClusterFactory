# Deploy a VM with KubeVirt

:::note

This guide is still a draft.

:::

The best guide is on the official documentation of [KubeVirt](https://kubevirt.io/user-guide/virtual_machines/virtual_machine_instances/), including the [guide about Multus](https://kubevirt.io/2018/attaching-to-multiple-networks.html).

You cannot use `macvlan` with `ipvlan`. Our recommendation is to use `openvswitch`.
