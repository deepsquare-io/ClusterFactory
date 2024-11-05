"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[7278],{2619:(e,o,r)=>{r.r(o),r.d(o,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"guides/storage/deploying-rook","title":"Deploying the Rook Operator","description":"Configuration","source":"@site/docs/guides/90-storage/03-deploying-rook.md","sourceDirName":"guides/90-storage","slug":"/guides/storage/deploying-rook","permalink":"/docs/guides/storage/deploying-rook","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/guides/90-storage/03-deploying-rook.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{},"sidebar":"docs","previous":{"title":"Storage Architecture","permalink":"/docs/guides/storage/storage-architecture"},"next":{"title":"Deploying a Rook Cluster","permalink":"/docs/guides/storage/deploying-rook-cluster"}}');var s=r(6070),n=r(4306);const i={},a="Deploying the Rook Operator",c={},l=[{value:"Configuration",id:"configuration",level:2},{value:"Deploying the operator",id:"deploying-the-operator",level:2}];function d(e){const o={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",p:"p",pre:"pre",strong:"strong",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.header,{children:(0,s.jsx)(o.h1,{id:"deploying-the-rook-operator",children:"Deploying the Rook Operator"})}),"\n",(0,s.jsx)(o.h2,{id:"configuration",children:"Configuration"}),"\n",(0,s.jsxs)(o.p,{children:["The rook operator is configured in the file ",(0,s.jsx)(o.a,{href:"https://github.com/deepsquare-io/ClusterFactory/tree/main/helm-subcharts/rook-ceph/values.yaml",children:(0,s.jsx)(o.code,{children:"helm-subcharts/values.yaml"})}),"."]}),"\n",(0,s.jsxs)(o.p,{children:["Most of the values are configured and have the default values of the Helm application ",(0,s.jsx)(o.a,{href:"https://github.com/rook/rook/tree/master/deploy/charts/rook-ceph",children:(0,s.jsx)(o.code,{children:"rook-ceph"})}),". The only differences are that container resources use the ",(0,s.jsx)(o.strong,{children:"BestEffort"})," quality of service."]}),"\n",(0,s.jsx)(o.h2,{id:"deploying-the-operator",children:"Deploying the operator"}),"\n",(0,s.jsx)(o.p,{children:"The ArgoCD application is already configured so just:"}),"\n",(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/rook-ceph -f argo/rook-ceph/apps\n"})}),"\n",(0,s.jsxs)(o.p,{children:[(0,s.jsx)(o.strong,{children:"No Rook clusters have yet been deployed, only the operator, which is used to manage several Rook clusters"}),"."]})]})}function h(e={}){const{wrapper:o}={...(0,n.R)(),...e.components};return o?(0,s.jsx)(o,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},4306:(e,o,r)=>{r.d(o,{R:()=>i,x:()=>a});var t=r(758);const s={},n=t.createContext(s);function i(e){const o=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function a(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(n.Provider,{value:o},e.children)}}}]);