"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[8403],{755:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>p,frontMatter:()=>c,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"main-concepts/gitops/sealed-secrets","title":"Sealed Secrets, the Secret Manager for Kubernetes","description":"Sealed Secrets encrypt the Secret resources into a SealedSecret using asymmetric encryption.","source":"@site/docs/main-concepts/03-gitops/05-sealed-secrets.md","sourceDirName":"main-concepts/03-gitops","slug":"/main-concepts/gitops/sealed-secrets","permalink":"/docs/main-concepts/gitops/sealed-secrets","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/main-concepts/03-gitops/05-sealed-secrets.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{},"sidebar":"docs","previous":{"title":"cert-manager, the Certificate Manager","permalink":"/docs/main-concepts/gitops/cert-manager"},"next":{"title":"dmsquash-live and SystemD, GitOps for compute nodes","permalink":"/docs/main-concepts/gitops/stateless-os"}}');var r=s(6070),a=s(4306);const c={},o="Sealed Secrets, the Secret Manager for Kubernetes",i={},l=[];function d(e){const t={a:"a",code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"sealed-secrets-the-secret-manager-for-kubernetes",children:"Sealed Secrets, the Secret Manager for Kubernetes"})}),"\n",(0,r.jsx)(t.p,{children:"Sealed Secrets encrypt the Secret resources into a SealedSecret using asymmetric encryption."}),"\n",(0,r.jsx)(t.p,{children:"A secret could look like this:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",metastring:'title="secret.yaml"',children:"apiVersion: v1\nkind: Secret\nmetadata:\n  name: mysecret\n  namespace: mynamespace\nstringData:\n  password: my-super-password\n"})}),"\n",(0,r.jsx)(t.p,{children:"And you want to store this secret in Git so that it is versioned. Storing a plain-text secret is always bad practice as the git repository can get shared everywhere in the world."}),"\n",(0,r.jsx)(t.p,{children:"Sealed Secrets encrypt the secret and only the Sealed Secrets controller can decrypt the SealedSecret."}),"\n",(0,r.jsx)(t.p,{children:"A SealedSecret looks like this:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",metastring:'title="sealed-secret.yaml"',children:"apiVersion: bitnami.com/v1alpha1\nkind: SealedSecret\nmetadata:\n  creationTimestamp: null\n  name: mysecret\n  namespace: mynamespace\nspec:\n  encryptedData:\n    password: AgDZWhe0dUqXNOE2TNxN5z3...\n  template:\n    data: null\n    metadata:\n      creationTimestamp: null\n      name: mysecret\n      namespace: mynamespace\n"})}),"\n",(0,r.jsx)(t.p,{children:"Sealed Secrets allows secrets to be stored inside Git, which means it allows\nGitOps to be used. Git becomes the source of truth, but only the Kubernetes\ncluster canread the secrets."}),"\n",(0,r.jsxs)(t.p,{children:["Another solution for managing secrets is ",(0,r.jsx)(t.a,{href:"https://www.vaultproject.io",children:"Hashicorp Vault"}),".\nHowever, the source of truth for secrets is moved to Hashicorp Vault, which is\nnot GitOps friendly."]}),"\n",(0,r.jsx)(t.p,{children:"Depending on the use case, you may prefer Hashicorp Vault for multi-clusters\nand to support multiple application types."})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},4306:(e,t,s)=>{s.d(t,{R:()=>c,x:()=>o});var n=s(758);const r={},a=n.createContext(r);function c(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);