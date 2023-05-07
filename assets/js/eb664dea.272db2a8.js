"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[4129],{9613:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>f});var n=r(9496);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),m=l(r),f=o,d=m["".concat(c,".").concat(f)]||m[f]||p[f]||s;return r?n.createElement(d,i(i({ref:t},u),{},{components:r})):n.createElement(d,i({ref:t},u))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=r.length,i=new Array(s);i[0]=m;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:o,i[1]=a;for(var l=2;l<s;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8815:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var n=r(665),o=(r(9496),r(9613));const s={},i="Multus CNI, the Swiss army knife of networking",a={unversionedId:"main-concepts/core-network/multus-cni",id:"main-concepts/core-network/multus-cni",title:"Multus CNI, the Swiss army knife of networking",description:"Multus CNI allows us to attach multiple network interfaces to pods, similarly to Docker and Virtual Machines.",source:"@site/docs/main-concepts/02-core-network/06-multus-cni.md",sourceDirName:"main-concepts/02-core-network",slug:"/main-concepts/core-network/multus-cni",permalink:"/docs/main-concepts/core-network/multus-cni",draft:!1,editUrl:"https://github.com/SquareFactory/ClusterFactory/tree/main/web/docs/main-concepts/02-core-network/06-multus-cni.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{},sidebar:"docs",previous:{title:"Traefik, the All-in-One L7 Load Balancer and Ingress",permalink:"/docs/main-concepts/core-network/traefik"},next:{title:"Argo CD",permalink:"/docs/main-concepts/gitops/argocd"}},c={},l=[],u={toc:l};function p(e){let{components:t,...s}=e;return(0,o.kt)("wrapper",(0,n.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"multus-cni-the-swiss-army-knife-of-networking"},"Multus CNI, the Swiss army knife of networking"),(0,o.kt)("p",null,"Multus CNI allows us to attach multiple network interfaces to pods, similarly to Docker and Virtual Machines."),(0,o.kt)("div",{style:{textAlign:"center"}},(0,o.kt)("p",null,(0,o.kt)("img",{alt:"multus-pod-image",src:r(3208).Z+"#white-bg",width:"489",height:"136"}))),(0,o.kt)("p",null,"The first reason we use Multus is so that KubeVirt supports multiple network interfaces."),(0,o.kt)("p",null,"The second and most important reason is that it allows us to use CNI plugins, and thus use ipvlan or macvlan, just like with Docker."),(0,o.kt)("p",null,"The experience becomes similar to Docker where you can allocate an IP address to a container. This solves a lot of problems for pods that need to use the host network, like Grenddel, the bare-metal provisioner."),(0,o.kt)("p",null,"While Multus solves a lot of problems, it also creates some issues related to routing."),(0,o.kt)("p",null,"For example, the internal pod network conflicts with other networks since it is impossible to customize Calico's default routes."),(0,o.kt)("p",null,"The issue is open ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/projectcalico/calico/issues/5199"},"here"),"."))}p.isMDXComponent=!0},3208:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/multus.drawio-fd8368dca31a4213406809f1d7ff187a.svg"}}]);