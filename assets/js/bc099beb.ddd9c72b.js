"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[1683],{8762:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var i=s(1527),t=s(8422);const r={},o="Grendel, the Bare-Metal Provisioner",a={id:"main-concepts/apps/grendel",title:"Grendel, the Bare-Metal Provisioner",description:"Grendel is a solution used to deploy and manage HPC (High Performance Computing) clusters. It is designed to automate the process of configuring and installing software on compute nodes using a custom DHCP, DNS, TFTP, and HTTP server written in Go.",source:"@site/docs/main-concepts/04-apps/07-grendel.mdx",sourceDirName:"main-concepts/04-apps",slug:"/main-concepts/apps/grendel",permalink:"/docs/main-concepts/apps/grendel",draft:!1,unlisted:!1,editUrl:"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/main-concepts/04-apps/07-grendel.mdx",tags:[],version:"current",sidebarPosition:7,frontMatter:{},sidebar:"docs",previous:{title:"dmsquash-live and SystemD, GitOps for compute nodes",permalink:"/docs/main-concepts/gitops/stateless-os"},next:{title:"SLURM, A Highly Scalable Workload Manager",permalink:"/docs/main-concepts/apps/slurm"}},l={},d=[{value:"Architecture",id:"architecture",level:2},{value:"Why Grendel ?",id:"why-grendel-",level:2},{value:"How does it work ?",id:"how-does-it-work-",level:2},{value:"OS Image Building",id:"os-image-building",level:3},{value:"Provisioning",id:"provisioning",level:3},{value:"Postscript",id:"postscript",level:3}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"grendel-the-bare-metal-provisioner",children:"Grendel, the Bare-Metal Provisioner"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://github.com/SquareFactory/grendel",children:"Grendel"})," is a solution used to deploy and manage HPC (High Performance Computing) clusters. It is designed to automate the process of configuring and installing software on compute nodes using a custom DHCP, DNS, TFTP, and HTTP server written in Go."]}),"\n",(0,i.jsx)(n.h2,{id:"architecture",children:"Architecture"}),"\n",(0,i.jsx)(n.p,{children:"The architecture is the following:"}),"\n",(0,i.jsx)("div",{style:{textAlign:"center"},children:(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"grendel-arch",src:s(948).Z+"#invert-on-dark",width:"520",height:"259"})})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Grendel"})," is deployed as a container and runs multiple network services responsible for the provisioning of bare-metal systems."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"The Service Processor (SP)"})," controls the hardware and is used to perform out-of-band hardware control (e.g. Integrated Management Module (IMM), Flexible Service Processor (FSP), Baseboard Management Controller (BMC), etc)."]}),"\n",(0,i.jsxs)(n.p,{children:["The Service Processor is connected to Grendel via ",(0,i.jsx)(n.strong,{children:"the Service Network."})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"The Management Network"})," is used for OS provisioning (via PXE)."]}),"\n",(0,i.jsx)(n.h2,{id:"why-grendel-",children:"Why Grendel ?"}),"\n",(0,i.jsx)(n.p,{children:"Our main criteria for choosing a bare metal provisioning solution is:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Operating system image management: provisioning methods, supported operating systems, ease of use."}),"\n",(0,i.jsx)(n.li,{children:"BMC configuration (IPMI, ...)"}),"\n",(0,i.jsx)(n.li,{children:"Configuration management (declarative, post-boot scripts, backups, ...)"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["While a lot of solutions exist for bare-metal provisioning like ",(0,i.jsx)(n.a,{href:"https://wiki.openstack.org/wiki/Ironic",children:"OpenStack Ironic"})," or ",(0,i.jsx)(n.a,{href:"https://maas.io/",children:"MAAS"}),", only a few can do ",(0,i.jsx)(n.strong,{children:"disk-less provisioning"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Disk-less (or Stateless) provisioning is based on an OverlayFS root, with the OS being loaded from a SquashFS image. The OverlayFS is mounted as a ",(0,i.jsx)(n.code,{children:"tmpfs"}),", that is, in the RAM."]}),"\n",(0,i.jsx)("div",{style:{textAlign:"center"},children:(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"upper-lower",src:s(5161).Z+"#invert-on-dark",width:"513",height:"297"})})}),"\n",(0,i.jsx)(n.p,{children:'Since the root is mounted in RAM, restarting a node will "clean it up", similar to a Docker container.'}),"\n",(0,i.jsx)(n.p,{children:"With OverlayFS, we follow a proper DevOps practice where the architecture is immutable and mutable data is stored on disks."}),"\n",(0,i.jsx)(n.h2,{id:"how-does-it-work-",children:"How does it work ?"}),"\n",(0,i.jsx)(n.h3,{id:"os-image-building",children:"OS Image Building"}),"\n",(0,i.jsx)(n.p,{children:"Grendel doesn't have an OS image builder. This is because we do not want the users to use a non-standard tool to build their OS images."}),"\n",(0,i.jsxs)(n.p,{children:["Instead, we prefer to use ",(0,i.jsx)(n.a,{href:"https://www.packer.io",children:"Packer"}),", mksquashfs and ",(0,i.jsx)(n.a,{href:"https://github.com/dracutdevs/dracut",children:"Dracut"})," to automate the building of OS images, linux kernels and linux initramfs."]}),"\n",(0,i.jsx)(n.p,{children:"The steps to build disklessn OS image are the following:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Use Packer to build an image that includes the operating system and any additional packages or customizations you require. This image will serve as the base for the diskless OS."}),"\n",(0,i.jsx)(n.li,{children:"Mount the OS image, chroot in the OS image and execute dracut to generate initramfs."}),"\n",(0,i.jsx)(n.li,{children:"Extract the kernel and initramfs"}),"\n",(0,i.jsx)(n.li,{children:"Use mksquashfs to create a squashfs filesystem image that will serve as the base layer of the overlayfs. The squashfs image should include any read-only files that will be shared across multiple diskless nodes."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"provisioning",children:"Provisioning"}),"\n",(0,i.jsx)(n.p,{children:"The steps to provision an OS image are the following:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Enable network boot on the BIOS of the nodes. This will cause the node to broadcast a DHCP request for an IP address and PXE server."}),"\n",(0,i.jsx)(n.li,{children:"The Grendel DHCP server will respond with an IP address based on the node's MAC address, and send the Network Boot Program (NBP) - in this case, the iPXE firmware."}),"\n",(0,i.jsx)(n.li,{children:"The iPXE firmware will then download the Linux kernel and initramfs."}),"\n",(0,i.jsxs)(n.li,{children:["The Linux kernel options ",(0,i.jsx)(n.code,{children:"rd.live.*"})," will be used to download the squashfs file from the Grendel server and mount the OS image as a /dev/loop device."]}),"\n",(0,i.jsx)(n.li,{children:"Once the base image is mounted, an overlayfs will be created using the loop device as the base image and an upper layer created using a tmpfs (RAM). This will provide a writeable layer for temporary files and system changes."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"postscript",children:"Postscript"}),"\n",(0,i.jsx)(n.p,{children:"After initializing the operating system image, a SystemD service can be utilized to retrieve the postscript file stored on the Grendel HTTP server and execute it."})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},948:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/grendel.drawio-ebb317bdb751a6ca23b8de33547d525b.svg"},5161:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/overlayfs.drawio-5477db393dfbf84a86cf6ba1e4d59130.svg"},8422:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>o});var i=s(959);const t={},r=i.createContext(t);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);