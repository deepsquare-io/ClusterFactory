# Build an OS Image with Packer

## Rocky Linux OS Image

### Configuring and Launching Packer

The [`packer-recipes` directory inside the git repository](https://github.com/SquareFactory/ClusterFactory/tree/main/packer-recipes) contains examples of Packer configuration files.

```json title="rocky.nothing.json"
{
  "variables": {
    "boot_wait": "3s",
    "disk_size": "10G",
    "iso_checksum": "5a0dc65d1308e47b51a49e23f1030b5ee0f0ece3702483a8a6554382e893333c",
    "iso_url": "https://download.rockylinux.org/pub/rocky/8/isos/x86_64/Rocky-8.5-x86_64-boot.iso",
    "memsize": "8192",
    "numvcpus": "4"
  },
  "builders": [
    {
      "type": "qemu",
      "accelerator": "kvm",
      "communicator": "none",
      "boot_command": [
        "<up><tab><bs><bs><bs><bs><bs> ",
        "inst.ks=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ks.nothing.cfg ",
        "inst.cmdline",
        "<enter><wait>"
      ],
      "boot_wait": "{{ user `boot_wait` }}",
      "disk_size": "{{ user `disk_size` }}",
      "iso_url": "{{ user `iso_url` }}",
      "iso_checksum": "{{ user `iso_checksum` }}",
      "headless": true,
      "cpus": "{{ user `numvcpus` }}",
      "memory": "{{ user `memsize` }}",
      "vnc_bind_address": "0.0.0.0",
      "http_directory": "http",
      "shutdown_timeout": "3h",
      "qemuargs": [["-serial", "stdio"]]
    }
  ]
}
```

When running Packer, the process is the following:

- Launch a HTTP server that serves the `http` directory.
- Launch a VM and a VNC session.
- Boot on the ISO and enter the `boot_command` to load the RedHat Kickstart file from HTTP.
- Run the Kickstart RedHat file. This file automates the installation process of the OS.
- Shut down the VM.

Configure the installation process by editing the `http/ks.nothing.cfg`:

```shell title="http/ks.nothing.cfg"
url --url="https://dl.rockylinux.org/vault/rocky/8.4/BaseOS/x86_64/os/"
# License agreement
eula --agreed
# Disable Initial Setup on first boot
firstboot --disable
# Poweroff after the install is finished
poweroff
# Firewall
firewall --enabled --service=ssh
# Disable Initial Setup on first boot
firstboot --disable
ignoredisk --only-use=vda
# System language
lang en_US.UTF-8
# Keyboard layout
keyboard us
# Network information
network --bootproto=dhcp --device=eth0
# SELinux configuration
selinux --disabled
# System timezone
timezone UTC --utc
# System bootloader configuration
bootloader --location=mbr --driveorder="vda" --timeout=1
# Root password
rootpw --plaintext an_example_of_default_password
# System services
services --enabled="chronyd"

repo --name="AppStream" --baseurl=https://dl.rockylinux.org/vault/rocky/8.4/AppStream/x86_64/os/
repo --name="Extras" --baseurl=https://dl.rockylinux.org/vault/rocky/8.4/extras/x86_64/os/
repo --name="PowerTools" --baseurl=https://dl.rockylinux.org/vault/rocky/8.4/PowerTools/x86_64/os/
repo --name="epel" --baseurl=https://mirror.init7.net/fedora/epel/8/Everything/x86_64/

# Clear the Master Boot Record
zerombr
# Remove partitions
clearpart --all --initlabel
# Automatically create partition
part / --size=1 --grow --asprimary --fstype=xfs

# Postinstall
%post --erroronfail
set -ex

# Postinstall
#-- No firewall
systemctl disable firewalld

# Install xCat provisioning service
curl -fsSL "https://raw.githubusercontent.com/xcat2/xcat-core/master/xCAT/postscripts/xcatpostinit1.netboot" -o /opt/xcat/xcatpostinit1
chmod 755 /opt/xcat/xcatpostinit1

curl -fsSL "https://raw.githubusercontent.com/xcat2/xcat-core/master/xCAT/postscripts/xcatpostinit1.service" -o /etc/systemd/system/xcatpostinit1.service
ln -s "../xcatpostinit1.service" "/etc/systemd/system/multi-user.target.wants/xcatpostinit1.service"

# Kickstart copies install boot options. Serial is turned on for logging with
# Packer which disables console output. Disable it so console output is shown
# during deployments
sed -i 's/^GRUB_TERMINAL=.*/GRUB_TERMINAL_OUTPUT="console"/g' /etc/default/grub
sed -i '/GRUB_SERIAL_COMMAND="serial"/d' /etc/default/grub
sed -ri 's/(GRUB_CMDLINE_LINUX=".*)\s+console=ttyS0(.*")/\1\2/' /etc/default/grub

# Clean up install config not applicable to deployed environments.
for f in resolv.conf fstab; do
    rm -f /etc/$f
    touch /etc/$f
    chown root:root /etc/$f
    chmod 644 /etc/$f
done

cat << EOF >>/etc/fstab
devpts  /dev/pts devpts   gid=5,mode=620 0 0
tmpfs   /dev/shm tmpfs    defaults       0 0
proc    /proc    proc     defaults       0 0
sysfs   /sys     sysfs    defaults       0 0
EOF

rm -f /etc/sysconfig/network-scripts/ifcfg-[^lo]*

dnf clean all
%end

%packages --excludedocs --excludedocs
@minimal-environment
chrony

bash-completion
cloud-init
# cloud-init only requires python3-oauthlib with MAAS. As such upstream
# removed this dependency.
python3-oauthlib
rsync
tar
# grub2-efi-x64 ships grub signed for UEFI secure boot. If grub2-efi-x64-modules
# is installed grub will be generated on deployment and unsigned which breaks
# UEFI secure boot.
grub2-efi-x64
efibootmgr
shim-x64
dosfstools
lvm2
mdadm
device-mapper-multipath
iscsi-initiator-utils

-plymouth
# Remove Intel wireless firmware
-i*-firmware
%end
```

The `packages` and `post` blocks are probably what you are interested in.

Run packer with:

```shell title="user@local:/ClusterFactory/packer-recipes/rocky"
packer build -ver "numvcpus=12" -var "memsize=23609" rocky.nothing.json
```

The next steps is to export to xCAT, which can be a little tricky.

### Exporting to xCAT

After building the OS image, a qcow2 file is generated inside a `output-qemu` directory.

Mount the qcow with the script `setup-nbd`.

```shell title="root@local:/ClusterFactory/packer-recipes/rocky"
# Do it as root!
export IMAGE_PATH=output-qemu/packer-qemu
./scripts-local/setup-nbd

export TMP_DIR=$(mktemp -d /tmp/packer-XXXX)
mount "${NBD}p1" "$TMP_DIR"
```

Then, copy the root filesystem via rsync:

```shell title="root@local:/ClusterFactory/packer-recipes/rocky"
rsync -avzP "$TMP_DIR/" "root@<xcat server>:/<path to os image>/rootimg/"
# Example: rsync -avzP "$TMP_DIR/" "root@192.168.0.3:/install/netboot/rocky8.4/x86_64/compute/rootimg/"
```

And unmount and tear down:

```shell title="root@local:/ClusterFactory/packer-recipes/rocky"
umount -f "$TMP_DIR"
rmdir --ignore-fail-on-non-empty "$TMP_DIR"
./scripts-local/teardown-nbd
```

### Configure the OS Image on xCAT

SSH to the xCAT server (`ssh root@192.168.0.3 -p 2200`).

Create a stanza:

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
    pkgdir=/tmp
    pkglist=/dev/null
```

:::note

Since we are doing GitOps, we do not need to use the xCAT provisioning system. Therefore, we set `pkgdir=/tmp` and `pkglist=/dev/null`.

:::

````

And apply it:

```shell title="ssh root@xcat"
cat osimage.stanza | mkdef -z
````

### Generate the initramfs and pack the image as squashfs

Generate the kernel and initrd for the netboot:

```shell title="ssh root@xcat"
geninitrd rocky8.4-x86_64-netboot-compute
```

To pack the image as SquashFS, call:

```shell title="ssh root@xcat"
packimage -m squashfs -c pigz rocky8.4-x86_64-netboot-compute
```
