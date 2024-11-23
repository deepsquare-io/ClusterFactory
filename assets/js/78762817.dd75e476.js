"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[831],{4880:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"main-concepts/apps/cvmfs","title":"CernVM-FS, A Scalable, Distributed Read-Only File-System","description":"HPC clusters often use environment modules to share software between compute nodes.","source":"@site/docs/main-concepts/04-apps/09-cvmfs.md","sourceDirName":"main-concepts/04-apps","slug":"/main-concepts/apps/cvmfs","permalink":"/docs/main-concepts/apps/cvmfs","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/main-concepts/04-apps/09-cvmfs.md","tags":[],"version":"current","sidebarPosition":9,"frontMatter":{},"sidebar":"docs","previous":{"title":"SLURM, A Highly Scalable Workload Manager","permalink":"/docs/main-concepts/apps/slurm"},"next":{"title":"Exposing your Kubernetes Workload","permalink":"/docs/guides/exposing-k8s-workloads"}}');var r=t(6070),o=t(4306);const a={},i="CernVM-FS, A Scalable, Distributed Read-Only File-System",c={},l=[];function d(e){const s={a:"a",code:"code",h1:"h1",header:"header",img:"img",p:"p",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"cernvm-fs-a-scalable-distributed-read-only-file-system",children:"CernVM-FS, A Scalable, Distributed Read-Only File-System"})}),"\n",(0,r.jsxs)(s.p,{children:["HPC clusters often use ",(0,r.jsx)(s.a,{href:"http://modules.sourceforge.net",children:"environment modules"})," to share software between compute nodes.\nEnvironment modules are software compiled in a different root (for example ",(0,r.jsx)(s.code,{children:"gcc"})," can be compiled to be installed inside ",(0,r.jsx)(s.code,{children:"/cvmfs/software/2022.1/modules/gcc"}),"), and because of this, the environment variables must be modified (like ",(0,r.jsx)(s.code,{children:"PATH=/cvmfs/software/2022.1/modules/gcc/bin"}),")."]}),"\n",(0,r.jsxs)(s.p,{children:["The problem that environment modules solve is that if we had to manually install each software, the environment would be easily polluted. Using ",(0,r.jsx)(s.code,{children:"module load"}),", it is possible to modify dynamically the environment easily. Moreover, with the environment modules, it is possible to install several versions of the same software."]}),"\n",(0,r.jsx)(s.p,{children:"These environment modules are shared using a distributed, cache-aggressive file-system called CernVM-FS."}),"\n",(0,r.jsx)(s.p,{children:"The architecture is very similar to a database where the changes are done using the main database (Stratum 0) and the clients are using read-only replicas (Stratum 1). These Stratum 1 are load balanced using Geo API."}),"\n",(0,r.jsx)(s.p,{children:"Each site is also equipped with a squid proxy, which is a full-featured caching proxy."}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.img,{alt:"Concept overview of the CernVM-FS Content Delivery Network",src:t(411).A+"#white-bg",width:"650",height:"350"})}),"\n",(0,r.jsx)(s.p,{children:"An equivalent software could be S3 Fuse."}),"\n",(0,r.jsxs)(s.p,{children:["However, CVMFS is unique because it serves its files via HTTP. The aggressive caching of CVMFS and Squid Proxy makes the data extremely well distributed. It is also possible to use ",(0,r.jsx)(s.a,{href:"https://cvmfs.readthedocs.io/en/stable/cpt-repo.html#sct-s3storagesetup",children:"S3 as a backend for CVMFS"}),"."]}),"\n",(0,r.jsx)(s.p,{children:"ClusterFactory distributes a CVMFS server container image made to create Stratum 1 CVMFS servers on Kubernetes, so our customers get our software by replicating our CVMFS server."})]})}function u(e={}){const{wrapper:s}={...(0,o.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},411:(e,s,t)=>{t.d(s,{A:()=>n});const n=t.p+"assets/images/stratum1-f3db354c2f5ef8757263105b6eb553fe.png"},4306:(e,s,t)=>{t.d(s,{R:()=>a,x:()=>i});var n=t(758);const r={},o=n.createContext(r);function a(e){const s=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(o.Provider,{value:s},e.children)}}}]);