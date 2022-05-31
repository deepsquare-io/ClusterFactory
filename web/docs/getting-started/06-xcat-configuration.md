# 6. xCAT Configuration

:::note

This part of the documentation is mostly a draft.

The best way to get started is to follow [the xCAT official quick start](https://xcat-docs.readthedocs.io/en/stable/guides/get-started/quick_start.html).

:::

The configuration of xCAT doesn't follow the GitOps ways and certainly doesn't follow the declarative way since we need to SSH to the pod.

In the future, we plan to develop and integrate this feature. For now, let's just SSH to the container.

In this guide, we will try to get as close as possible to the "declarative" method. xCAT works with stanza files. The whole xCAT cluster can be configured with one big stanza file.

It looks like this:

```shell
compute01:
      objtype=node
      arch=x86_64
      mgt=ipmi
      cons=ipmi
      bmc=10.1.0.12
      nictypes.etn0=ethernet
      nicips.eth0=11.10.1.3
      nichostnamesuffixes.eth0=-eth0
      nicnetworks.eth0=clstrnet1
      nictypes.eth1=ethernet
      nicips.eth1=60.0.0.7|70.0.0.7
      nichostnamesuffixes.eth1=-eth1|-eth1-lab
      nicnetworks.eth1=clstrnet2|clstrnet3
      nicaliases.eth0="alias1 alias2"
      nicaliases.eth1="alias3|alias4"
```

A full cluster looks like this:

```shell
# <xCAT data object stanza file>

montbhandler.pm:
    objtype=notification
    tableops=a,u,d
    tables=monsetting

192_168_0_0-255_255_255_0:
    objtype=network
    domain=ch1.deepsquare.run
    gateway=192.168.0.1
    mask=255.255.255.0
    mgtifname=ens18
    mtu=1500
    nameservers=192.168.1.100
    net=192.168.0.0
    tftpserver=<xcatmaster>

ib0ipv41:
    objtype=network
    mask=255.255.255.0
    mgtifname=ib0
    net=192.168.1.0

rocky8.4-x86_64-netboot-compute:
    objtype=osimage
    exlist=/xcatdata/install/rocky8.4/x86_64/Packages/compute.rocky8.x86_64.exlist
    imagetype=linux
    kernelver=4.18.0-305.17.1.el8_4.x86_64
    osarch=x86_64
    osname=Linux
    osvers=rocky8.4
    permission=755
    postbootscripts=git-configs-execute its-a-fake-password-dont-worry compute
    profile=compute
    provmethod=netboot
    rootimgdir=/install/netboot/rocky8.4/x86_64/compute

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
    ip=192.168.0.51
    mac=ab:cd:ef:12:34:56
    mgt=ipmi
    netboot=xnba
    nicips.ib0=192.168.1.51
    nicnetworks.ib0=ib0ipv41
    nictypes.ib0=Infiniband
    os=rocky8.4
    postbootscripts=nvidia-xorg
    profile=compute
    provmethod=rocky8.4-x86_64-netboot-compute
    serialport=1
    serialspeed=115200
    status=booted
    statustime=05-03-2022 10:23:10
    updatestatus=synced
    updatestatustime=03-23-2022 10:27:05

1:
    objtype=policy
    name=root
    rule=allow

1.2:
    objtype=policy
    name=xcatmn
    rule=trusted

2:
    objtype=policy
    commands=getbmcconfig
    rule=allow

2.1:
    objtype=policy
    commands=remoteimmsetup
    rule=allow

2.3:
    objtype=policy
    commands=lsxcatd
    rule=allow

3:
    objtype=policy
    commands=nextdestiny
    rule=allow

4:
    objtype=policy
    commands=getdestiny
    rule=allow

4.4:
    objtype=policy
    commands=getpostscript
    rule=allow

4.5:
    objtype=policy
    commands=getcredentials
    rule=allow

4.6:
    objtype=policy
    commands=syncfiles
    rule=allow

4.7:
    objtype=policy
    commands=litefile
    rule=allow

4.8:
    objtype=policy
    commands=litetree
    rule=allow

4.9:
    objtype=policy
    commands=getadapter
    rule=allow

all:
    objtype=group
    members=cn1

compute:
    objtype=group
    members=cn1

clustersite:
    objtype=site
    SNsyncfiledir=/var/xcat/syncfiles
    auditnosyslog=0
    auditskipcmds=ALL
    blademaxp=64
    cleanupdiskfullxcatpost=no
    cleanupxcatpost=no
    consoleondemand=no
    databaseloc=/var/lib
    db2installloc=/mntdb2
    dhcplease=43200
    dnshandler=ddns
    domain=xcat.provisioning.svc.cluster.local
    enableASMI=no
    forwarders=10.96.0.10
    fsptimeout=0
    installdir=/install
    ipmimaxp=64
    ipmiretries=3
    ipmitimeout=2
    master=192.168.0.3
    maxssh=8
    nameservers=192.168.0.3
    nodesyncfiledir=/var/xcat/node/syncfiles
    powerinterval=0
    ppcmaxp=64
    ppcretry=3
    ppctimeout=0
    sharedtftp=1
    sshbetweennodes=ALLGROUPS
    syspowerinterval=0
    tftpdir=/tftpboot
    timezone=Etc/UCT
    useNmapfromMN=no
    vsftp=n
    xcatconfdir=/etc/xcat
    xcatdport=3001
    xcatiport=3002

rocky8.4-x86_64:
    objtype=osdistro
    arch=x86_64
    basename=rocky
    dirpaths=/install/rocky8.4/x86_64
    majorversion=8
    minorversion=4
    type=Linux
```

Some fields are auto-generated. So let's just configure the network, the OS Image and the nodes.

## Network configuration

```shell title="mystanzafile"
192_168_0_0-255_255_255_0:
    objtype=network
    domain=example.com
    gateway=192.168.0.1
    mask=255.255.255.0
    mgtifname=ens18
    mtu=1500
    nameservers=192.168.1.100
    net=192.168.0.0
    tftpserver=<xcatmaster>
```

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

You can build the SquareFactory OS image using the recipes stored in `packer-recipes`. It runs RedHat Kickstart and installs all the dependencies.

The root filesystem is then copied to xCAT using rsync.

You can use the xCAT OS image builder, but we highly recommend using Packer to create OS images for cloud and bare metal.

```shell title="mystanzafile"
rocky8.4-x86_64-netboot-compute:
    objtype=osimage
    exlist=/install/rocky8.4/x86_64/Packages/compute.rocky8.x86_64.exlist
    imagetype=linux
    kernelver=4.18.0-305.17.1.el8_4.x86_64
    osarch=x86_64
    osname=Linux
    osvers=rocky8.4
    permission=755
    postbootscripts=git-configs-execute its-a-fake-password-dont-worry compute
    profile=compute
    provmethod=netboot
    rootimgdir=/install/netboot/rocky8.4/x86_64/compute
```

Our root filesystem is stored inside `/install/netboot/rocky8.4/x86_64/compute/rootimg`.

Create one post-boot script inside `/install/postscripts` called `git-configs-execute`, which `git clone` and executes scripts from a git repository.

For example:

```shell title="/install/postscripts/git-configs-execute"
#!/bin/sh
# Params:
#  1: password for the ssh key
#  2: node type (compute or private)

set -x

mkdir -p /configs
cat << EOF > /key.enc
# An encrypted private key using:
# openssl enc -aes-256-cbc -a -salt -pbkdf2  -in id_ed25519_api -out id_ed25519_api.enc
EOF
chmod 600 /key.enc
echo "$1" | openssl aes-256-cbc -d -a -pbkdf2 -in /key.enc -out /key -pass stdin
chmod 600 /key
GIT_SSH_COMMAND='ssh -i /key -o IdentitiesOnly=yes' git clone git@github.com:SquareFactory/compute-configs.git /configs
if [ -f /configs/post.sh ] && [ -x /configs/post.sh ]; then
  cd /configs || exit 1
  ./post.sh "$2"
fi
rm -f /key /key.env

# Security
chmod -R g-rwx,o-rwx .
```

This script clones `git@github.com:SquareFactory/compute-configs.git` and executes `post.sh` inside the git repository.

This script enables us to use Git as the source of truth instead of xCAT.

To apply the stanza:

```shell title="ssh root@xcat"
cat mystanzafile | mkdef -z
```

To generate the kernel and initrd for the netboot, call:

```shell title="ssh root@xcat"
geninitrd rocky8.4-x86_64-netboot-compute
```

To pack the image as SquashFS, call:

```shell title="ssh root@xcat"
packimage -m squashfs -c pigz rocky8.4-x86_64-netboot-compute
```

More details [here](https://xcat-docs.readthedocs.io/en/stable/guides/admin-guides/references/man5/osimage.5.html).

## Node configuration

```shell title="mystanzafile"
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
    ip=192.168.0.51
    mac=ab:cd:ef:12:34:56
    mgt=ipmi
    netboot=xnba
    os=rocky8.4
    profile=compute
    provmethod=rocky8.4-x86_64-netboot-compute
    serialport=1
    serialspeed=115200
```

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

More details [here](https://xcat-docs.readthedocs.io/en/stable/guides/admin-guides/references/man7/node.7.html).

## Deploy

```shell title="ssh root@xcat"
rpower cn1 on # or rpower cn1 reset
```

Congratulations, you've deployed a bare-metal server! xCAT is a heavy beast, but a complete bare metal provisioner. We recommend that you familiarize yourself with the software very quickly by reading the [xCAT documentation](https://xcat-docs.readthedocs.io/en/stable/overview/index.html).

The next steps should be to configure your compute nodes and install a job scheduler like Slurm so you can run parallel jobs!
