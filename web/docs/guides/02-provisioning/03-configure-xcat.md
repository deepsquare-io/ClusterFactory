# Configure xCAT to provision the nodes

:::info

In the next version of ClusterFactory, xCAT will be a Kubernetes operator.

This means that the stanza file for the definition of the cluster can be written in YAML, and there will be no need to SSH to xCAT.

:::

## Network Configuration

The name of the object is precise. You can SSH to xCAT and type
`lsdef -t network` to look for the name of the network. Otherwise, the name of
the network looks like this `10_10_2_0-255_255_255_0`, which is the one configured with Multus CNI.

```shell title="network.stanza"
10_10_2_0-255_255_255_0:
    objtype=network
    domain=my.home
    gateway=10.10.2.1
    mask=255.255.255.0
    mgtifname=ens18
    mtu=1500
    nameservers=10.10.4.100
    net=10.10.2.0
    tftpserver=<xcatmaster>
```

:::warning

Don't replace `<xcatmaster>`.

:::

Edit the file accordingly.

Apply the stanza:

```shell title="ssh root@xcat"
cat mystanzafile | mkdef -z
```

And regenerate the DNS and DHCP configuration:

```shell title="ssh root@xcat"
echo "reconfiguring hosts..."
makehosts
echo "reconfiguring dns..."
makedns
echo "reconfiguring dhcpd config..."
makedhcp -n
echo "reconfiguring dhcpd leases..."
makedhcp -a
```

More details [here](https://xcat-docs.readthedocs.io/en/latest/guides/admin-guides/references/man5/networks.5.html).

For Infiniband, follow [this guide](https://xcat-docs.readthedocs.io/en/stable/advanced/networks/infiniband/network_configuration.html).

## OS Image configuration

Use Packer to build OS images.

You can build the SquareFactory OS image using the recipes stored in `packer-recipes`. Basically, it runs RedHat Kickstart and install all the software needed for [DeepSquare](https://deepsquare.io).

After building the image, you should copy the root filesystem via `rsync` or `scp`. Follow [this guide for more information](/docs/guides/provisioning/packer-build).

Create the stanza:

```shell title="osimage.stanza"
rocky8.4-x86_64-netboot-compute:
    objtype=osimage
    exlist=/install/rocky8.4/x86_64/Packages/compute.rocky8.x86_64.exlist
    imagetype=linux
    osarch=x86_64
    osname=Linux
    osvers=rocky8.4
    permission=755
    profile=compute
    provmethod=netboot
    rootimgdir=/install/netboot/rocky8.4/x86_64/compute
```

Edit accordingly, and apply it:

```shell title="ssh root@xcat"
cat osimage.stanza | mkdef -z
```

`/install/netboot/rocky8.4/x86_64/compute/rootimg` should contains the root file-system.

`/install/rocky8.4/x86_64/Packages/compute.rocky8.x86_64.exlist` contains a list files/directories that are trimmed before packing the image.

Example:

```shell title="/install/rocky8.4/x86_64/Packages/compute.rocky8.x86_64.exlist"
./boot*
./usr/include*
./usr/lib/locale*
./usr/lib64/perl5/Encode/CN*
./usr/lib64/perl5/Encode/JP*
./usr/lib64/perl5/Encode/TW*
./usr/lib64/perl5/Encode/KR*
./lib/kbd/keymaps/i386*
./lib/kbd/keymaps/mac*
./lib/kdb/keymaps/include*
./usr/local/include*
./usr/local/share/man*
./usr/share/man*
./usr/share/cracklib*
./usr/share/doc*
./usr/share/gnome*
./usr/share/i18n*
+./usr/share/i18n/en_US*
./usr/share/info*
./usr/share/locale/*
+./usr/share/locale/en_US*
+./usr/share/locale/C*
+./usr/share/locale/locale.alias
+./usr/lib/locale/locale-archive
+./usr/lib/locale/en*
./usr/share/man*
./usr/share/omf*
./usr/share/vim/site/doc*
./usr/share/vim/vim74/doc*
./usr/share/zoneinfo*
./var/cache/man*
./var/lib/yum*
./tmp*
```

Generate the kernel and initrd for the netboot:

```shell title="ssh root@xcat"
geninitrd rocky8.4-x86_64-netboot-compute
```

To pack the image as SquashFS, call:

```shell title="ssh root@xcat"
packimage -m squashfs -c pigz rocky8.4-x86_64-netboot-compute
```

:::warning

Even if no logs are shown, the process is running. You should wait until the end of the command.

You must allocate enough `tmp` for the process to work. Inside the xCAT Helm `values`, you can use:

```yaml
tmp:
  medium: 'Memory'
  size: 50Gi
```

If you wish to build inside the RAM.

:::

## Node configuration

```shell title="cn1.stanza"
cn1:
    objtype=node
    addkcmdline=modprobe.blacklist=nouveau crashkernel=256M
    arch=x86_64
    bmc=10.10.3.51
    bmcpassword=password
    bmcusername=admin
    cons=ipmi
    consoleenabled=1
    currstate=netboot rocky8.4-x86_64-compute
    groups=compute,all
    ip=10.10.2.51
    mac=18:c0:4d:b7:88:5f
    mgt=ipmi
    netboot=xnba
    os=rocky8.4
    profile=compute
    provmethod=rocky8.4-x86_64-netboot-compute
    serialport=1
    serialspeed=115200
```

Edit accordingly and apply the stanza:

```shell title="ssh root@xcat"
cat cn1.stanza | mkdef -z
```

And regenerate the DNS and DHCP configuration:

```shell title="ssh root@xcat"
echo "reconfiguring hosts..."
makehosts
echo "reconfiguring dns..."
makedns
echo "reconfiguring dhcpd config..."
makedhcp -n
echo "reconfiguring dhcpd leases..."
makedhcp -a
```

More details [here](https://xcat-docs.readthedocs.io/en/stable/guides/admin-guides/references/man7/node.7.html).

## Deploy

```shell title="ssh root@xcat"
rpower cn1 on # or rpower cn1 reset
```
