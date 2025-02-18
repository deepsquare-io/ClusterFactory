"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[5428],{3881:(e,t,s)=>{s.d(t,{R:()=>i,x:()=>c});var n=s(8101);const o={},r=n.createContext(o);function i(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),n.createElement(r.Provider,{value:t},e.children)}},5320:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>d,frontMatter:()=>i,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"main-concepts/core-network/multus-cni","title":"Multus CNI, the Swiss army knife of networking","description":"Multus CNI allows us to attach multiple network interfaces to pods, similarly to Docker and Virtual Machines.","source":"@site/docs/main-concepts/02-core-network/06-multus-cni.md","sourceDirName":"main-concepts/02-core-network","slug":"/main-concepts/core-network/multus-cni","permalink":"/docs/main-concepts/core-network/multus-cni","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/main-concepts/02-core-network/06-multus-cni.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{},"sidebar":"docs","previous":{"title":"Traefik, the All-in-One L7 Load Balancer and Ingress","permalink":"/docs/main-concepts/core-network/traefik"},"next":{"title":"Argo CD, GitOps for Kubernetes","permalink":"/docs/main-concepts/gitops/argocd"}}');var o=s(5105),r=s(3881);const i={},c="Multus CNI, the Swiss army knife of networking",a={},l=[];function u(e){const t={a:"a",h1:"h1",header:"header",img:"img",p:"p",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"multus-cni-the-swiss-army-knife-of-networking",children:"Multus CNI, the Swiss army knife of networking"})}),"\n",(0,o.jsx)(t.p,{children:"Multus CNI allows us to attach multiple network interfaces to pods, similarly to Docker and Virtual Machines."}),"\n",(0,o.jsx)("div",{style:{textAlign:"center"},children:(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"multus-pod-image",src:s(7335).A+"#white-bg"})})}),"\n",(0,o.jsx)(t.p,{children:"The first reason we use Multus is so that KubeVirt supports multiple network interfaces."}),"\n",(0,o.jsx)(t.p,{children:"The second and most important reason is that it allows us to use CNI plugins, and thus use IPVLAN or MACVLAN, just like with Docker."}),"\n",(0,o.jsx)(t.p,{children:"The experience becomes similar to Docker where you can allocate an IP address to a container. This solves a lot of problems for pods that need to use the host network, like Grendel, the bare-metal provisioner."}),"\n",(0,o.jsx)(t.p,{children:"While Multus solves a lot of problems, it also creates some issues related to routing."}),"\n",(0,o.jsx)(t.p,{children:"For example, the internal pod network conflicts with other networks since it is impossible to customize Calico's default routes."}),"\n",(0,o.jsxs)(t.p,{children:["The issue is open ",(0,o.jsx)(t.a,{href:"https://github.com/projectcalico/calico/issues/5199",children:"here"}),"."]})]})}function d(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},7335:(e,t,s)=>{s.d(t,{A:()=>n});const n=s.p+"assets/images/multus.drawio-fd8368dca31a4213406809f1d7ff187a.svg"}}]);