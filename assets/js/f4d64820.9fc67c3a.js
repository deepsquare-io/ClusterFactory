"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[973],{9613:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(9496);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=s(r),m=a,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},4861:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return p}});var n=r(2848),a=r(9213),o=(r(9496),r(9613)),i=["components"],c={},l="MetalLB, the bare-metal Load Balancer",s={unversionedId:"main-concepts/core-network/metallb",id:"main-concepts/core-network/metallb",title:"MetalLB, the bare-metal Load Balancer",description:"A good article is written here.",source:"@site/docs/main-concepts/02-core-network/02-metallb.md",sourceDirName:"main-concepts/02-core-network",slug:"/main-concepts/core-network/metallb",permalink:"/docs/main-concepts/core-network/metallb",draft:!1,editUrl:"https://github.com/SquareFactory/cluster-factory-ce/tree/main/web/docs/main-concepts/02-core-network/02-metallb.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"docs",previous:{title:"K0s, the Kubernetes distribution for bare-metal",permalink:"/docs/main-concepts/k0s"},next:{title:"Traefik, the All-in-One L7 Load Balancer and Ingress",permalink:"/docs/main-concepts/core-network/traefik"}},u={},p=[],d={toc:p};function m(e){var t=e.components,c=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},d,c,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"metallb-the-bare-metal-load-balancer"},"MetalLB, the bare-metal Load Balancer"),(0,o.kt)("p",null,"A good article is written ",(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.github.io/ingress-nginx/deploy/baremetal/"},"here"),"."),(0,o.kt)("p",null,"Kubernetes was primarily designed for the cloud. Most clouds have a ",(0,o.kt)("a",{parentName:"p",href:"https://cloud.google.com/load-balancing"},"Cloud Load Balancer"),". On bare-metal, that load balancer doesn't exist."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Cloud environment",src:r(5984).Z,width:"756",height:"567"})),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Bare-metal environment",src:r(4149).Z,width:"756",height:"484"})),(0,o.kt)("p",null,"A proper solution would have been to use a dedicated appliance or software (like ",(0,o.kt)("a",{parentName:"p",href:"https://www.haproxy.com/documentation/hapee/latest/high-availability/active-active/l4-load-balancing/"},"HAproxy"),") which is outside the Kubernetes cluster. The ingresses (like Traefik) would have been configured using ",(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport"},"NodePort services"),"."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"User edge",src:r(121).Z,width:"756",height:"597"})),(0,o.kt)("p",null,"However, MetalLB is inside the Kubernetes Cluster and permits the use of ",(0,o.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer"},"LoadBalancer services"),". The experience becomes extremely similar to the cloud and load balancing is resolved using L2 or L3 (BGP) solutions."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"MetalLB in L2 mode",src:r(9471).Z,width:"756",height:"447"})),(0,o.kt)("p",null,"Using a self-provisioned edge is surely the most stable and suitable solution since MetalLB is still young. However, MetalLB allows for a proper Kubernetes experience."))}m.isMDXComponent=!0},4149:function(e,t,r){t.Z=r.p+"assets/images/baremetal_overview-a72c7912cd4ae43b87c485f2b75f376a.jpg"},5984:function(e,t,r){t.Z=r.p+"assets/images/cloud_overview-8c42aec3a919cc2e71b1d0bd1c8776ff.jpg"},9471:function(e,t,r){t.Z=r.p+"assets/images/metallb-f197f4434df530d1c7b143e73b4eed3d.jpg"},121:function(e,t,r){t.Z=r.p+"assets/images/user_edge-bfd77b74b538423b55724a128eb95bfd.jpg"}}]);