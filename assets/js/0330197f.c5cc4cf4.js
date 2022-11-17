"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[5002],{9613:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var o=n(9496);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(n),d=r,g=m["".concat(l,".").concat(d)]||m[d]||u[d]||a;return n?o.createElement(g,i(i({ref:t},p),{},{components:n})):o.createElement(g,i({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1735:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return u}});var o=n(665),r=n(151),a=(n(9496),n(9613)),i=["components"],s={},l="Configure xCAT to provision the nodes",c={unversionedId:"guides/provisioning/configure-xcat",id:"guides/provisioning/configure-xcat",title:"Configure xCAT to provision the nodes",description:"In the next version of ClusterFactory, xCAT will be a Kubernetes operator.",source:"@site/docs/guides/50-provisioning/03-configure-xcat.md",sourceDirName:"guides/50-provisioning",slug:"/guides/provisioning/configure-xcat",permalink:"/docs/guides/provisioning/configure-xcat",draft:!1,editUrl:"https://github.com/SquareFactory/ClusterFactory/tree/main/web/docs/guides/50-provisioning/03-configure-xcat.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{},sidebar:"docs",previous:{title:"Build an OS Image with Packer",permalink:"/docs/guides/provisioning/packer-build"},next:{title:"GitOps with xCAT",permalink:"/docs/guides/provisioning/gitops-with-xcat"}},p={},u=[{value:"Network Configuration",id:"network-configuration",level:2},{value:"OS Image configuration",id:"os-image-configuration",level:2},{value:"Node configuration",id:"node-configuration",level:2},{value:"Deploy",id:"deploy",level:2}],m={toc:u};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"configure-xcat-to-provision-the-nodes"},"Configure xCAT to provision the nodes"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"In the next version of ClusterFactory, xCAT will be a Kubernetes operator."),(0,a.kt)("p",{parentName:"admonition"},"This means that the stanza file for the definition of the cluster can be written in YAML, and there will be no need to SSH to xCAT.")),(0,a.kt)("h2",{id:"network-configuration"},"Network Configuration"),(0,a.kt)("p",null,"The name of the object is precise. You can SSH to xCAT and type\n",(0,a.kt)("inlineCode",{parentName:"p"},"lsdef -t network")," to look for the name of the network. Otherwise, the name of\nthe network looks like this ",(0,a.kt)("inlineCode",{parentName:"p"},"192_168_0_0-255_255_255_0"),", which is the one configured with Multus CNI."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="network.stanza"',title:'"network.stanza"'},"192_168_0_0-255_255_255_0:\n    objtype=network\n    domain=example.com\n    gateway=192.168.0.1\n    mask=255.255.255.0\n    mgtifname=ens18\n    mtu=1500\n    nameservers=192.168.1.100\n    net=192.168.0.0\n    tftpserver=<xcatmaster>\n")),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Don't replace ",(0,a.kt)("inlineCode",{parentName:"p"},"<xcatmaster>"),".")),(0,a.kt)("p",null,"Edit the file accordingly."),(0,a.kt)("p",null,"Apply the stanza:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="ssh root@xcat"',title:'"ssh','root@xcat"':!0},"cat mystanzafile | mkdef -z\n")),(0,a.kt)("p",null,"And regenerate the DNS and DHCP configuration:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="ssh root@xcat"',title:'"ssh','root@xcat"':!0},'echo "reconfiguring hosts..."\nmakehosts\necho "reconfiguring dns..."\nmakedns\necho "reconfiguring dhcpd config..."\nmakedhcp -n\necho "reconfiguring dhcpd leases..."\nmakedhcp -a\n')),(0,a.kt)("p",null,"More details ",(0,a.kt)("a",{parentName:"p",href:"https://xcat-docs.readthedocs.io/en/latest/guides/admin-guides/references/man5/networks.5.html"},"here"),"."),(0,a.kt)("p",null,"For Infiniband, follow ",(0,a.kt)("a",{parentName:"p",href:"https://xcat-docs.readthedocs.io/en/stable/advanced/networks/infiniband/network_configuration.html"},"this guide"),"."),(0,a.kt)("h2",{id:"os-image-configuration"},"OS Image configuration"),(0,a.kt)("p",null,"Use Packer to build OS images."),(0,a.kt)("p",null,"You can build the SquareFactory OS image using the recipes stored in ",(0,a.kt)("inlineCode",{parentName:"p"},"packer-recipes"),". Basically, it runs RedHat Kickstart and install all the software needed for ",(0,a.kt)("a",{parentName:"p",href:"https://deepsquare.io"},"DeepSquare"),"."),(0,a.kt)("p",null,"After building the image, you should copy the root filesystem via ",(0,a.kt)("inlineCode",{parentName:"p"},"rsync")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"scp"),". Follow ",(0,a.kt)("a",{parentName:"p",href:"/docs/guides/provisioning/packer-build"},"this guide for more information"),"."),(0,a.kt)("p",null,"Create the stanza:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="osimage.stanza"',title:'"osimage.stanza"'},"rocky8.4-x86_64-netboot-compute:\n    objtype=osimage\n    exlist=/install/rocky8.4/x86_64/Packages/compute.rocky8.x86_64.exlist\n    imagetype=linux\n    osarch=x86_64\n    osname=Linux\n    osvers=rocky8.4\n    permission=755\n    profile=compute\n    provmethod=netboot\n    pkgdir=/tmp\n    pkglist=/dev/null\n    rootimgdir=/install/netboot/rocky8.4/x86_64/compute\n")),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Since we are doing GitOps, we do not need to use the xCAT provisioning system. Therefore, we set ",(0,a.kt)("inlineCode",{parentName:"p"},"pkgdir=/tmp")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"pkglist=/dev/null"),".")),(0,a.kt)("p",null,"Edit accordingly, and apply it:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="ssh root@xcat"',title:'"ssh','root@xcat"':!0},"cat osimage.stanza | mkdef -z\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"/install/netboot/rocky8.4/x86_64/compute/rootimg")," should contains the root file-system."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"/install/rocky8.4/x86_64/Packages/compute.rocky8.x86_64.exlist")," contains a list files/directories that are trimmed before packing the image."),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="/install/rocky8.4/x86_64/Packages/compute.rocky8.x86_64.exlist"',title:'"/install/rocky8.4/x86_64/Packages/compute.rocky8.x86_64.exlist"'},"./boot*\n./usr/include*\n./usr/lib/locale*\n./usr/lib64/perl5/Encode/CN*\n./usr/lib64/perl5/Encode/JP*\n./usr/lib64/perl5/Encode/TW*\n./usr/lib64/perl5/Encode/KR*\n./lib/kbd/keymaps/i386*\n./lib/kbd/keymaps/mac*\n./lib/kdb/keymaps/include*\n./usr/local/include*\n./usr/local/share/man*\n./usr/share/man*\n./usr/share/cracklib*\n./usr/share/doc*\n./usr/share/gnome*\n./usr/share/i18n*\n+./usr/share/i18n/en_US*\n./usr/share/info*\n./usr/share/locale/*\n+./usr/share/locale/en_US*\n+./usr/share/locale/C*\n+./usr/share/locale/locale.alias\n+./usr/lib/locale/locale-archive\n+./usr/lib/locale/en*\n./usr/share/man*\n./usr/share/omf*\n./usr/share/vim/site/doc*\n./usr/share/vim/vim74/doc*\n./usr/share/zoneinfo*\n./var/cache/man*\n./var/lib/yum*\n./tmp*\n")),(0,a.kt)("p",null,"Generate the kernel and initrd for the netboot:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="ssh root@xcat"',title:'"ssh','root@xcat"':!0},"geninitrd rocky8.4-x86_64-netboot-compute\n")),(0,a.kt)("p",null,"To pack the image as SquashFS, call:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="ssh root@xcat"',title:'"ssh','root@xcat"':!0},"packimage -m squashfs -c pigz rocky8.4-x86_64-netboot-compute\n")),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Even if no logs are shown, the process is running. You should wait until the end of the command."),(0,a.kt)("p",{parentName:"admonition"},"You must allocate enough ",(0,a.kt)("inlineCode",{parentName:"p"},"tmp")," for the process to work. Inside the xCAT Helm ",(0,a.kt)("inlineCode",{parentName:"p"},"values"),", you can use:"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"tmp:\n  medium: 'Memory'\n  size: 50Gi\n")),(0,a.kt)("p",{parentName:"admonition"},"If you wish to build inside the RAM.")),(0,a.kt)("h2",{id:"node-configuration"},"Node configuration"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="cn1.stanza"',title:'"cn1.stanza"'},"cn1:\n    objtype=node\n    addkcmdline=modprobe.blacklist=nouveau crashkernel=256M\n    arch=x86_64\n    bmc=10.10.3.51\n    bmcpassword=password\n    bmcusername=admin\n    cons=ipmi\n    consoleenabled=1\n    currstate=netboot rocky8.4-x86_64-compute\n    groups=compute,all\n    ip=192.168.0.51\n    mac=18:c0:4d:b7:88:5f\n    mgt=ipmi\n    netboot=xnba\n    os=rocky8.4\n    profile=compute\n    provmethod=rocky8.4-x86_64-netboot-compute\n    serialport=1\n    serialspeed=115200\n")),(0,a.kt)("p",null,"Edit accordingly and apply the stanza:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="ssh root@xcat"',title:'"ssh','root@xcat"':!0},"cat cn1.stanza | mkdef -z\n")),(0,a.kt)("p",null,"Regenerate the DNS and DHCP configuration:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="ssh root@xcat"',title:'"ssh','root@xcat"':!0},'echo "reconfiguring hosts..."\nmakehosts\necho "reconfiguring dns..."\nmakedns\necho "reconfiguring dhcpd config..."\nmakedhcp -n\necho "reconfiguring dhcpd leases..."\nmakedhcp -a\n')),(0,a.kt)("p",null,"And regenerate the PXE boot configuration:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="ssh root@xcat"',title:'"ssh','root@xcat"':!0},"nodeset <node/noderange> osimage=rocky8.4-x86_64-netboot-compute\n")),(0,a.kt)("p",null,"More details ",(0,a.kt)("a",{parentName:"p",href:"https://xcat-docs.readthedocs.io/en/stable/guides/admin-guides/references/man7/node.7.html"},"here"),"."),(0,a.kt)("h2",{id:"deploy"},"Deploy"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="ssh root@xcat"',title:'"ssh','root@xcat"':!0},"rpower cn1 on # or rpower cn1 reset\n")))}d.isMDXComponent=!0}}]);