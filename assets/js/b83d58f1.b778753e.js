"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[8928],{7247:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"getting-started/requirements-recommendations","title":"1. Requirements and recommendations","description":"Requirements","source":"@site/docs/getting-started/01-requirements-recommendations.md","sourceDirName":"getting-started","slug":"/getting-started/requirements-recommendations","permalink":"/docs/getting-started/requirements-recommendations","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/getting-started/01-requirements-recommendations.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{},"sidebar":"docs","previous":{"title":"Overview","permalink":"/docs/getting-started/overview"},"next":{"title":"2. Setting up your repository for GitOps","permalink":"/docs/getting-started/setting-up-repository"}}');var r=t(6070),i=t(4306);const o={},d="1. Requirements and recommendations",c={},l=[{value:"Requirements",id:"requirements",level:2},{value:"Node requirements",id:"node-requirements",level:3},{value:"Required utilities",id:"required-utilities",level:3},{value:"Recommended tools",id:"recommended-tools",level:2},{value:"Recommended documentation",id:"recommended-documentation",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"1-requirements-and-recommendations",children:"1. Requirements and recommendations"})}),"\n",(0,r.jsx)(n.h2,{id:"requirements",children:"Requirements"}),"\n",(0,r.jsx)(n.h3,{id:"node-requirements",children:"Node requirements"}),"\n",(0,r.jsx)(n.p,{children:"All nodes should be accessible via SSH."}),"\n",(0,r.jsx)(n.p,{children:"All nodes should have a Linux distribution with:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"The Linux kernel version higher than 3.10."}),"\n",(0,r.jsx)(n.li,{children:"An init system based on SystemD or OpenRC."}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"ClusterFactory has been fully tested on Rocky Linux which is our recommended OS."}),"\n",(0,r.jsx)(n.h3,{id:"required-utilities",children:"Required utilities"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/SquareFactory/cfctl/releases",children:(0,r.jsx)(n.code,{children:"cfctl"})}),", for deployment, backing up, and upgrading of the Kubernetes cluster."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://kubernetes.io/docs/tasks/tools/#kubectl",children:(0,r.jsx)(n.code,{children:"kubectl"})}),", for managing your Kubernetes cluster."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/bitnami-labs/sealed-secrets/releases/",children:(0,r.jsx)(n.code,{children:"kubeseal"})}),", for encrypting the secrets."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/helm/helm/releases/",children:(0,r.jsx)(n.code,{children:"helm"})}),", for Helm chart template."]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["There is a script inside the ",(0,r.jsx)(n.a,{href:"https://github.com/deepsquare-io/ClusterFactory/tree/main/scripts",children:(0,r.jsx)(n.code,{children:"scripts"})})," directory to install and set up a working environment."]}),"\n",(0,r.jsx)(n.p,{children:"Just run:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:". ./scripts/setup-env\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The binaries are stored inside the ",(0,r.jsx)(n.code,{children:"bin"})," directory and the ",(0,r.jsx)(n.code,{children:"PATH"})," is automatically set."]}),"\n",(0,r.jsx)(n.h2,{id:"recommended-tools",children:"Recommended tools"}),"\n",(0,r.jsx)(n.p,{children:"We recommend:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://code.visualstudio.com",children:"VSCode"}),". Any IDE with YAML support is a good alternative."]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.a,{href:"https://k8slens.dev",children:"Lens"})," to manage your Kubernetes cluster."]})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"recommended-documentation",children:"Recommended documentation"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://kubernetes.io/docs/concepts/",children:"Kubernetes documentation"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/docs/reference/cfctl.yaml",children:"cfctl.yaml API reference"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/",children:"Argo CD declarative setup"})}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:'Before using ClusterFactory, it is strongly advised to have a comprehensive understanding of how Kubernetes operates, specifically with regard to storage and network management using features such as PersistentVolume, StorageClass, Service, Ingresses, LoadBalancer, and more."'})}),"\n",(0,r.jsx)(n.p,{children:'To try a "mini" version of Kubernetes we recommend k0s or minikube.'})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},4306:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>d});var s=t(758);const r={},i=s.createContext(r);function o(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);