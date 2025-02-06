"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[7271],{370:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"main-concepts/apps/grendel","title":"Grendel, the Bare-Metal Provisioner","description":"Grendel is a solution used to deploy and manage HPC (High Performance Computing) clusters. It is designed to automate the process of configuring and installing software on compute nodes using a custom DHCP, DNS, TFTP, and HTTP server written in Go.","source":"@site/docs/main-concepts/04-apps/07-grendel.mdx","sourceDirName":"main-concepts/04-apps","slug":"/main-concepts/apps/grendel","permalink":"/docs/main-concepts/apps/grendel","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/main-concepts/04-apps/07-grendel.mdx","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{},"sidebar":"docs","previous":{"title":"dmsquash-live and SystemD, GitOps for compute nodes","permalink":"/docs/main-concepts/gitops/stateless-os"},"next":{"title":"SLURM, A Highly Scalable Workload Manager","permalink":"/docs/main-concepts/apps/slurm"}}');var r=n(5105),t=n(7890);const o={},a="Grendel, the Bare-Metal Provisioner",l={},d=[{value:"Architecture",id:"architecture",level:2},{value:"Why Grendel ?",id:"why-grendel-",level:2},{value:"How does it work ?",id:"how-does-it-work-",level:2},{value:"OS Image Building",id:"os-image-building",level:3},{value:"Provisioning",id:"provisioning",level:3},{value:"Postscript",id:"postscript",level:3}];function c(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"grendel-the-bare-metal-provisioner",children:"Grendel, the Bare-Metal Provisioner"})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.a,{href:"https://github.com/SquareFactory/grendel",children:"Grendel"})," is a solution used to deploy and manage HPC (High Performance Computing) clusters. It is designed to automate the process of configuring and installing software on compute nodes using a custom DHCP, DNS, TFTP, and HTTP server written in Go."]}),"\n",(0,r.jsx)(s.h2,{id:"architecture",children:"Architecture"}),"\n",(0,r.jsx)(s.p,{children:"The architecture is the following:"}),"\n",(0,r.jsx)("div",{style:{textAlign:"center"},children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.img,{alt:"grendel-arch",src:n(9513).A+"#invert-on-dark"})})}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"Grendel"})," is deployed as a container and runs multiple network services responsible for the provisioning of bare-metal systems."]}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"The Service Processor (SP)"})," controls the hardware and is used to perform out-of-band hardware control (e.g. Integrated Management Module (IMM), Flexible Service Processor (FSP), Baseboard Management Controller (BMC), etc)."]}),"\n",(0,r.jsxs)(s.p,{children:["The Service Processor is connected to Grendel via ",(0,r.jsx)(s.strong,{children:"the Service Network."})]}),"\n",(0,r.jsxs)(s.p,{children:[(0,r.jsx)(s.strong,{children:"The Management Network"})," is used for OS provisioning (via PXE)."]}),"\n",(0,r.jsx)(s.h2,{id:"why-grendel-",children:"Why Grendel ?"}),"\n",(0,r.jsx)(s.p,{children:"Our main criteria for choosing a bare metal provisioning solution is:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Operating system image management: provisioning methods, supported operating systems, ease of use."}),"\n",(0,r.jsx)(s.li,{children:"BMC configuration (IPMI, ...)"}),"\n",(0,r.jsx)(s.li,{children:"Configuration management (declarative, post-boot scripts, backups, ...)"}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["While a lot of solutions exist for bare-metal provisioning like ",(0,r.jsx)(s.a,{href:"https://wiki.openstack.org/wiki/Ironic",children:"OpenStack Ironic"})," or ",(0,r.jsx)(s.a,{href:"https://maas.io/",children:"MAAS"}),", only a few can do ",(0,r.jsx)(s.strong,{children:"disk-less provisioning"}),"."]}),"\n",(0,r.jsxs)(s.p,{children:["Disk-less (or Stateless) provisioning is based on an OverlayFS root, with the OS being loaded from a SquashFS image. The OverlayFS is mounted as a ",(0,r.jsx)(s.code,{children:"tmpfs"}),", that is, in the RAM."]}),"\n",(0,r.jsx)("div",{style:{textAlign:"center"},children:(0,r.jsx)(s.p,{children:(0,r.jsx)(s.img,{alt:"upper-lower",src:n(8513).A+"#invert-on-dark"})})}),"\n",(0,r.jsx)(s.p,{children:'Since the root is mounted in RAM, restarting a node will "clean it up", similar to a Docker container.'}),"\n",(0,r.jsx)(s.p,{children:"With OverlayFS, we follow a proper DevOps practice where the architecture is immutable and mutable data is stored on disks."}),"\n",(0,r.jsx)(s.h2,{id:"how-does-it-work-",children:"How does it work ?"}),"\n",(0,r.jsx)(s.h3,{id:"os-image-building",children:"OS Image Building"}),"\n",(0,r.jsx)(s.p,{children:"Grendel doesn't have an OS image builder. This is because we do not want the users to use a non-standard tool to build their OS images."}),"\n",(0,r.jsxs)(s.p,{children:["Instead, we prefer to use ",(0,r.jsx)(s.a,{href:"https://www.packer.io",children:"Packer"}),", mksquashfs and ",(0,r.jsx)(s.a,{href:"https://github.com/dracutdevs/dracut",children:"Dracut"})," to automate the building of OS images, linux kernels and linux initramfs."]}),"\n",(0,r.jsx)(s.p,{children:"The steps to build disklessn OS image are the following:"}),"\n",(0,r.jsxs)(s.ol,{children:["\n",(0,r.jsx)(s.li,{children:"Use Packer to build an image that includes the operating system and any additional packages or customizations you require. This image will serve as the base for the diskless OS."}),"\n",(0,r.jsx)(s.li,{children:"Mount the OS image, chroot in the OS image and execute dracut to generate initramfs."}),"\n",(0,r.jsx)(s.li,{children:"Extract the kernel and initramfs"}),"\n",(0,r.jsx)(s.li,{children:"Use mksquashfs to create a squashfs filesystem image that will serve as the base layer of the overlayfs. The squashfs image should include any read-only files that will be shared across multiple diskless nodes."}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"provisioning",children:"Provisioning"}),"\n",(0,r.jsx)(s.p,{children:"The steps to provision an OS image are the following:"}),"\n",(0,r.jsxs)(s.ol,{children:["\n",(0,r.jsx)(s.li,{children:"Enable network boot on the BIOS of the nodes. This will cause the node to broadcast a DHCP request for an IP address and PXE server."}),"\n",(0,r.jsx)(s.li,{children:"The Grendel DHCP server will respond with an IP address based on the node's MAC address, and send the Network Boot Program (NBP) - in this case, the iPXE firmware."}),"\n",(0,r.jsx)(s.li,{children:"The iPXE firmware will then download the Linux kernel and initramfs."}),"\n",(0,r.jsxs)(s.li,{children:["The Linux kernel options ",(0,r.jsx)(s.code,{children:"rd.live.*"})," will be used to download the squashfs file from the Grendel server and mount the OS image as a /dev/loop device."]}),"\n",(0,r.jsx)(s.li,{children:"Once the base image is mounted, an overlayfs will be created using the loop device as the base image and an upper layer created using a tmpfs (RAM). This will provide a writeable layer for temporary files and system changes."}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"postscript",children:"Postscript"}),"\n",(0,r.jsx)(s.p,{children:"After initializing the operating system image, a SystemD service can be utilized to retrieve the postscript file stored on the Grendel HTTP server and execute it."})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},9513:(e,s,n)=>{n.d(s,{A:()=>i});const i=n.p+"assets/images/grendel.drawio-ebb317bdb751a6ca23b8de33547d525b.svg"},8513:(e,s,n)=>{n.d(s,{A:()=>i});const i=n.p+"assets/images/overlayfs.drawio-5477db393dfbf84a86cf6ba1e4d59130.svg"},7890:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>a});var i=n(8101);const r={},t=i.createContext(r);function o(e){const s=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(t.Provider,{value:s},e.children)}}}]);