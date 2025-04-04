"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[6926],{8356:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>d});var a=s(6672);const r={},t=a.createContext(r);function l(e){const n=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),a.createElement(t.Provider,{value:n},e.children)}},8518:(e,n,s)=>{s.d(n,{A:()=>l});s(6672);var a=s(3526);const r={tabItem:"tabItem_BVPk"};var t=s(3420);function l(e){let{children:n,hidden:s,className:l}=e;return(0,t.jsx)("div",{role:"tabpanel",className:(0,a.A)(r.tabItem,l),hidden:s,children:n})}},9816:(e,n,s)=>{s.d(n,{A:()=>k});var a=s(6672),r=s(3526),t=s(2384),l=s(5291),d=s(2053),i=s(2285),c=s(98),o=s(5346);function u(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:s}=e;return(0,a.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:s,attributes:a,default:r}}=e;return{value:n,label:s,attributes:a,default:r}}))}(s);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,s])}function h(e){let{value:n,tabValues:s}=e;return s.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:s}=e;const r=(0,l.W6)(),t=function(e){let{queryString:n=!1,groupId:s}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:n,groupId:s});return[(0,i.aZ)(t),(0,a.useCallback)((e=>{if(!t)return;const n=new URLSearchParams(r.location.search);n.set(t,e),r.replace({...r.location,search:n.toString()})}),[t,r])]}function g(e){const{defaultValue:n,queryString:s=!1,groupId:r}=e,t=p(e),[l,i]=(0,a.useState)((()=>function(e){let{defaultValue:n,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=s.find((e=>e.default))??s[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:t}))),[c,u]=m({queryString:s,groupId:r}),[g,x]=function(e){let{groupId:n}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,t]=(0,o.Dv)(s);return[r,(0,a.useCallback)((e=>{s&&t.set(e)}),[s,t])]}({groupId:r}),b=(()=>{const e=c??g;return h({value:e,tabValues:t})?e:null})();(0,d.A)((()=>{b&&i(b)}),[b]);return{selectedValue:l,selectValue:(0,a.useCallback)((e=>{if(!h({value:e,tabValues:t}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),x(e)}),[u,x,t]),tabValues:t}}var x=s(1191);const b={tabList:"tabList_tDBO",tabItem:"tabItem_mD53"};var f=s(3420);function j(e){let{className:n,block:s,selectedValue:a,selectValue:l,tabValues:d}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,t.a_)(),o=e=>{const n=e.currentTarget,s=i.indexOf(n),r=d[s].value;r!==a&&(c(n),l(r))},u=e=>{let n=null;switch(e.key){case"Enter":o(e);break;case"ArrowRight":{const s=i.indexOf(e.currentTarget)+1;n=i[s]??i[0];break}case"ArrowLeft":{const s=i.indexOf(e.currentTarget)-1;n=i[s]??i[i.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":s},n),children:d.map((e=>{let{value:n,label:s,attributes:t}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:a===n?0:-1,"aria-selected":a===n,ref:e=>{i.push(e)},onKeyDown:u,onClick:o,...t,className:(0,r.A)("tabs__item",b.tabItem,t?.className,{"tabs__item--active":a===n}),children:s??n},n)}))})}function v(e){let{lazy:n,children:s,selectedValue:t}=e;const l=(Array.isArray(s)?s:[s]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===t));return e?(0,a.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==t})))})}function y(e){const n=g(e);return(0,f.jsxs)("div",{className:(0,r.A)("tabs-container",b.tabList),children:[(0,f.jsx)(j,{...n,...e}),(0,f.jsx)(v,{...n,...e})]})}function k(e){const n=(0,x.A)();return(0,f.jsx)(y,{...e,children:u(e.children)},String(n))}},9900:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>i,contentTitle:()=>d,default:()=>u,frontMatter:()=>l,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"guides/deploy-ldap","title":"Deploy a LDAP server","description":"Helm and Docker resources","source":"@site/docs/guides/800-deploy-ldap.md","sourceDirName":"guides","slug":"/guides/deploy-ldap","permalink":"/docs/guides/deploy-ldap","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/guides/800-deploy-ldap.md","tags":[],"version":"current","sidebarPosition":800,"frontMatter":{},"sidebar":"docs","previous":{"title":"Claiming a volume","permalink":"/docs/guides/storage/claiming-volume"},"next":{"title":"cfctl","permalink":"/docs/reference/cfctl"}}');var r=s(3420),t=s(8356);s(9816),s(8518);const l={},d="Deploy a LDAP server",i={},c=[{value:"Helm and Docker resources",id:"helm-and-docker-resources",level:2},{value:"1. Deploy Namespace and AppProject",id:"1-deploy-namespace-and-appproject",level:2},{value:"2. Secrets and Ingresses",id:"2-secrets-and-ingresses",level:2},{value:"2.a. Editing the environment variables with secrets",id:"2a-editing-the-environment-variables-with-secrets",level:3},{value:"2.b. Creating an <code>IngressRouteTCP</code> to expose the LDAP server",id:"2b-creating-an-ingressroutetcp-to-expose-the-ldap-server",level:3},{value:"2.d. Creating a <code>Certificate</code> for LDAPS (TLS)",id:"2d-creating-a-certificate-for-ldaps-tls",level:3},{value:"3. Editing <code>389ds-app.yaml</code> to use the fork",id:"3-editing-389ds-appyaml-to-use-the-fork",level:2},{value:"4. Adding custom values to the chart",id:"4-adding-custom-values-to-the-chart",level:2},{value:"4.a. Create the values file",id:"4a-create-the-values-file",level:3},{value:"4.b. Configure the 389ds",id:"4b-configure-the-389ds",level:3},{value:"4.c. Mount the volume",id:"4c-mount-the-volume",level:3},{value:"4. Deploy the app",id:"4-deploy-the-app",level:2},{value:"5. Post deployment settings",id:"5-post-deployment-settings",level:2},{value:"Snippets",id:"snippets",level:2}];function o(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"deploy-a-ldap-server",children:"Deploy a LDAP server"})}),"\n","\n",(0,r.jsx)(n.h2,{id:"helm-and-docker-resources",children:"Helm and Docker resources"}),"\n",(0,r.jsxs)(n.p,{children:["The Helm resources are stored on ",(0,r.jsx)(n.a,{href:"https://github.com/deepsquare-io/ClusterFactory/tree/main/helm/389ds",children:"ClusterFactory Git Repository"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["The Dockerfile is described in the git repository ",(0,r.jsx)(n.a,{href:"https://github.com/389ds/389-ds-base",children:"389ds/dirsrv"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"An Docker image can be pulled with:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"docker pull docker.io/389ds/dirsrv:latest\n"})}),"\n",(0,r.jsx)(n.h2,{id:"1-deploy-namespace-and-appproject",children:"1. Deploy Namespace and AppProject"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/ldap/\n"})}),"\n",(0,r.jsx)(n.h2,{id:"2-secrets-and-ingresses",children:"2. Secrets and Ingresses"}),"\n",(0,r.jsx)(n.h3,{id:"2a-editing-the-environment-variables-with-secrets",children:"2.a. Editing the environment variables with secrets"}),"\n",(0,r.jsxs)(n.p,{children:["Take a look at the README of ",(0,r.jsx)(n.a,{href:"https://hub.docker.com/r/389ds/dirsrv",children:"389ds/dirsrv"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Some of the environment variables are sensitive:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"DS_DM_PASSWORD"}),": The password of the ",(0,r.jsx)(n.code,{children:"cn=Directory Manager"})," user."]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"We must store these value inside a secret."}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["Create a ",(0,r.jsx)(n.code,{children:"-secret.yaml.local"})," file:"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="argo/ldap/secrets/389ds-secret.yaml.local"',children:"apiVersion: v1\nkind: Secret\nmetadata:\n  name: 389ds-secret\n  namespace: ldap\nstringData:\n  dm-password: <a password>\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsx)(n.li,{children:"Seal the secret:"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"cfctl kubeseal\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsx)(n.li,{children:"Apply the SealedSecret:"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/ldap/secrets/389ds-sealed-secret.yaml\n"})}),"\n",(0,r.jsxs)(n.p,{children:["You can track ",(0,r.jsx)(n.code,{children:"389ds-env-sealed-secret.yaml"})," in Git, but not the ",(0,r.jsx)(n.code,{children:"-secret.yaml.local"})," file."]}),"\n",(0,r.jsxs)(n.h3,{id:"2b-creating-an-ingressroutetcp-to-expose-the-ldap-server",children:["2.b. Creating an ",(0,r.jsx)(n.code,{children:"IngressRouteTCP"})," to expose the LDAP server"]}),"\n",(0,r.jsxs)(n.p,{children:["You can expose the LDAP using Traefik ",(0,r.jsx)(n.code,{children:"IngressRouteTCP"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Create a ",(0,r.jsx)(n.code,{children:"argo/ldap/ingresses/ingress-route-tcp.yaml"})," file and add:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="argo/ldap/ingresses/ingress-routes-tcp.yaml"',children:"apiVersion: traefik.io/v1alpha1\nkind: IngressRouteTCP\nmetadata:\n  name: ldap-ingress-tcp\n  namespace: ldap\n  labels:\n    app.kubernetes.io/name: ldap\n    app.kubernetes.io/component: ingress-route-tcp\nspec:\n  entryPoints:\n    - ldap\n  routes:\n    - match: HostSNI(`*`)\n      services:\n        - name: dirsrv-389ds\n          port: 3389\n---\napiVersion: traefik.io/v1alpha1\nkind: IngressRouteTCP\nmetadata:\n  name: ldaps\n  namespace: ldap\n  labels:\n    app.kubernetes.io/name: ldaps\n    app.kubernetes.io/component: ingress-route-tcp\n\nspec:\n  entryPoints:\n    - ldaps\n  routes:\n    - match: HostSNI(`*`)\n      services:\n        - name: dirsrv-389ds\n          namespace: ldap\n          port: 3636\n  tls:\n    passthrough: true\n"})}),"\n",(0,r.jsxs)(n.p,{children:["You must open ports 636 and 389 on the load balancer of Traefik by configuring the Traefik ",(0,r.jsx)(n.code,{children:"values.yaml"}),":"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="core/traefik/values.yaml"',children:"ports:\n  ldap:\n    port: 1389\n    expose: yes\n    exposedPort: 389\n    protocol: TCP\n  ldaps:\n    port: 1636\n    expose: yes\n    exposedPort: 636\n    protocol: TCP\n"})}),"\n",(0,r.jsx)(n.p,{children:"Apply:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"./scripts/deploy-core\nkubectl apply -f argo/ldap/ingresses/ingress-routes-tcp.yaml\n"})}),"\n",(0,r.jsxs)(n.h3,{id:"2d-creating-a-certificate-for-ldaps-tls",children:["2.d. Creating a ",(0,r.jsx)(n.code,{children:"Certificate"})," for LDAPS (TLS)"]}),"\n",(0,r.jsxs)(n.p,{children:["Create a ",(0,r.jsx)(n.code,{children:"argo/ldap/certificates/ldap.example.com-cert.yaml"})," file and add:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="argo/ldap/certificates/ldap.example.com-cert.yaml"',children:"apiVersion: cert-manager.io/v1\nkind: Certificate\nmetadata:\n  name: ldap.example.com-cert\n  namespace: ldap\nspec:\n  secretName: ldap.example.com-secret\n  issuerRef:\n    name: private-cluster-issuer\n    kind: ClusterIssuer\n  commonName: ldap.example.com\n  subject:\n    countries: [CH]\n    localities: [Lonay]\n    organizationalUnits: []\n    organizations: [Example Org]\n    postalCodes: ['1027']\n    provinces: [Laud]\n    streetAddresses: [Chemin des Mouettes 1]\n  duration: 8760h\n  dnsNames:\n    - ldap.example.com\n    - dirsrv-389ds.ldap.svc.cluster.local\n  privateKey:\n    size: 4096\n    algorithm: RSA\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.p,{children:["Do not use ",(0,r.jsx)(n.code,{children:"selfsigned-cluster-issuer"})," as self signed certificates are not accepted by 389ds."]})}),"\n",(0,r.jsx)(n.p,{children:"You want your LDAP server to be secure inside and outside the cluster. Therefore, you need to add 2 DNS names:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"ldap.example.com"})," which is used to access to the Ingress Controller which will forward to the LDAP service."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"dirsrv-389ds.ldap.svc.cluster.local"})," which is used to access to the LDAP service."]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["You should edit all of the fields of the certificate, especially the ",(0,r.jsx)(n.code,{children:"subject"})," field."]}),"\n",(0,r.jsx)(n.p,{children:"Apply it:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"./scripts/deploy-core\nkubectl apply -f argo/ldap/certificates/ldap.example.com-cert.yaml\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"3-editing-389ds-appyaml-to-use-the-fork",children:["3. Editing ",(0,r.jsx)(n.code,{children:"389ds-app.yaml"})," to use the fork"]}),"\n",(0,r.jsxs)(n.p,{children:["Change the ",(0,r.jsx)(n.code,{children:"repoURL"})," to the URL used to pull the fork. Also add the ",(0,r.jsx)(n.code,{children:"values-production.yaml"})," file to customize the values."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="argo.example/ldap/apps/389ds-app.yaml > spec > source"',children:"source:\n  # You should have forked this repo. Change the URL to your fork.\n  repoURL: git@github.com:<your account>/ClusterFactory.git\n  # You should use your branch too.\n  targetRevision: HEAD\n  path: helm/389ds\n  helm:\n    releaseName: 389ds\n\n    # Create a values file inside your fork and change the values.\n    valueFiles:\n      - values-production.yaml\n"})}),"\n",(0,r.jsx)(n.h2,{id:"4-adding-custom-values-to-the-chart",children:"4. Adding custom values to the chart"}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["Read the ",(0,r.jsx)(n.a,{href:"https://github.com/deepsquare-io/ClusterFactory/blob/main/helm/389ds/values.yaml",children:(0,r.jsx)(n.code,{children:"values.yaml"})})," to see all the default values."]})}),"\n",(0,r.jsx)(n.h3,{id:"4a-create-the-values-file",children:"4.a. Create the values file"}),"\n",(0,r.jsxs)(n.p,{children:["Create the values file ",(0,r.jsx)(n.code,{children:"values-production.yaml"})," inside the ",(0,r.jsx)(n.code,{children:"helm/389ds/"})," directory."]}),"\n",(0,r.jsx)(n.h3,{id:"4b-configure-the-389ds",children:"4.b. Configure the 389ds"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="helm/389ds/values-production.yaml"',children:"tls:\n  secretName: ldap.example.com-secret\n\nconfig:\n  dmPassword:\n    secretName: '389ds-secret'\n    key: 'dm-password'\n  suffixName: 'dc=example,dc=com'\n\ninitChownData:\n  enabled: true\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Edit the ",(0,r.jsx)(n.code,{children:"suffixName"})," according to your need. This is the path in LDAP where the organizational units will be stored. For example: ",(0,r.jsx)(n.code,{children:"ou=people,dc=example,dc=com"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"4c-mount-the-volume",children:"4.c. Mount the volume"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",metastring:'title="helm/389ds/values-production.yaml"',children:"# ...\npersistence:\n  storageClassName: 'dynamic-nfs'\n"})}),"\n",(0,r.jsx)(n.h2,{id:"4-deploy-the-app",children:"4. Deploy the app"}),"\n",(0,r.jsx)(n.p,{children:"Commit and push:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:'git add .\ngit commit -m "Added 389ds service"\ngit push\n'})}),"\n",(0,r.jsx)(n.p,{children:"And deploy the Argo CD application:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/ldap/apps/389ds-app.yaml\n"})}),"\n",(0,r.jsx)(n.p,{children:"If the Ingress is configured, the LDAP server should be available on the IP specified by MetalLB."}),"\n",(0,r.jsxs)(n.p,{children:["The deployment of 389ds might be slow. Watch the logs and look for ",(0,r.jsx)(n.code,{children:"INFO: 389-ds-container started."})," which indicates a successful deployment."]}),"\n",(0,r.jsxs)(n.p,{children:["If the server is crashing, it may be caused by the permissions inside the NFS. Check the content inside NFS, the owner should be ",(0,r.jsx)(n.code,{children:"499:499"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"5-post-deployment-settings",children:"5. Post deployment settings"}),"\n",(0,r.jsx)(n.p,{children:"After deploying the LDAP server, the database is empty."}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"kubectl exec"})," inside the container:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:'kubectl exec -i -t -n ldap dirsrv-389ds-0 -c dirsrv-389ds -- sh -c "clear; (bash || ash || sh)"\n'})}),"\n",(0,r.jsx)(n.p,{children:"You can also use Lens to open a shell inside the container."}),"\n",(0,r.jsx)(n.p,{children:"To initialize the database, run:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:"dsconf localhost backend create --suffix dc=example,dc=com --be-name example_backend\ndsidm localhost initialise\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Adapt the suffix based on the ",(0,r.jsx)(n.code,{children:"suffixName"})," in the values file. You can also change the backend name ",(0,r.jsx)(n.code,{children:"example_backend"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Based on what you want, you can add ",(0,r.jsx)(n.code,{children:"uniqueness"})," attributes to some fields:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'# Unique mail\ndsconf localhost plugin attr-uniq add "mail attribute uniqueness" --attr-name mail --subtree "opu=people,dc=example,dc=com"\n# Unique uid\ndsconf localhost plugin attr-uniq add "uid attribute uniqueness" --attr-name uid --subtree "ou=people,dc=example,dc=com"\n# Unique uid number\ndsconf localhost plugin attr-uniq add "uidNumber attribute uniqueness" --attr-name uidNumber --subtree "dc=example,dc=com"\n# Unique gid number\ndsconf localhost plugin attr-uniq add "gidNumber attribute uniqueness" --attr-name gidNumber --subtree "ou=groups,dc=example,dc=com"\n\n# Enable the plugins\ndsconf localhost plugin attr-uniq enable "mail attribute uniqueness"\ndsconf localhost plugin attr-uniq enable "uid attribute uniqueness"\ndsconf localhost plugin attr-uniq enable "uidNumber attribute uniqueness"\ndsconf localhost plugin attr-uniq enable "gidNumber attribute uniqueness"\n'})}),"\n",(0,r.jsx)(n.p,{children:"You may also want uid/gid number auto assignment:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'dsconf localhost plugin dna config "UID and GID numbers" add \\\n  --type gidNumber uidNumber \\\n  --filter "(|(objectclass=posixAccount)(objectclass=posixGroup))" \\\n  --scope dc=example,dc=run\\\n  --next-value 1601 \\\n  --magic-regen -1\ndsconf localhost plugin dna enable\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Change ",(0,r.jsx)(n.code,{children:"next-value"})," to the wishing starting uid/gid number. Select a magic value which will indicates to use a new value for the user."]}),"\n",(0,r.jsx)(n.p,{children:"Example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'dsidm -b "dc=example,dc=com" localhost user create \\\n  --uid example-user \\\n  --cn example-user \\\n  --displayName example-user \\\n  --homeDirectory "/dev/shm" \\\n  --uidNumber -1 \\\n  --gidNumber 1600\n'})}),"\n",(0,r.jsx)(n.p,{children:"The created user will have 1601 as UID and 1600 as GID."}),"\n",(0,r.jsxs)(n.p,{children:["If you want to have a seperate DNA plugin for ",(0,r.jsx)(n.code,{children:"gidNumber"})," and ",(0,r.jsx)(n.code,{children:"uidNumber"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'dsconf localhost plugin dna config "UID numbers" add \\\n  --type uidNumber \\\n  --filter "(objectclass=posixAccount)" \\\n  --scope ou=people,dc=example,dc=run\\\n  --next-value 1601 \\\n  --magic-regen -1\ndsconf localhost plugin dna config "GID numbers" add \\\n  --type gidNumber \\\n  --filter "(objectclass=posixGroup)" \\\n  --scope ou=groups,dc=example,dc=run\\\n  --next-value 1601 \\\n  --magic-regen -1\ndsconf localhost plugin dna enable\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Full documentation about distributed numeric assignment ",(0,r.jsx)(n.a,{href:"https://directory.fedoraproject.org/docs/389ds/design/dna-plugin.html",children:"here"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Restart the server after the changes:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl delete pod -n ldap dirsrv-389ds-0\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The database may have been destroyed because of the plugin, ",(0,r.jsx)(n.code,{children:"kubectl exec"})," in the container and run again:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:"dsconf localhost backend create --suffix dc=example,dc=com --be-name example_backend\ndsidm localhost initialise\n"})}),"\n",(0,r.jsx)(n.h2,{id:"snippets",children:"Snippets"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Add user:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'dsidm -b "dc=example,dc=com" localhost user create \\\n  --uid example-user \\\n  --cn example-user \\\n  --displayName example-user \\\n  --homeDirectory "/dev/shm" \\\n  --uidNumber -1 \\\n  --gidNumber 1600\n'})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Create group:"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'dsidm -b "dc=example,dc=com" localhost group create \\\n  --cn cluster-users\n'})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Add posixGroup property and gidNumber"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'dsidm -b "dc=example,dc=com" localhost group modify cluster-users \\\n "add:objectClass:posixGroup" \\\n "add:gidNumber:1600"\n'})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Add user to the group"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'dsidm -b "dc=example,dc=com" localhost group add_member \\\n  cluster-users \\\n  uid=example-user,ou=people,dc=example,dc=com\n'})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Add a public ssh key to a user"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'dsidm -b "dc=example,dc=com" localhost user modify \\\n  example-user add:nsSshPublicKey:"...."\n'})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Set user password"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:'dsidm -b "dc=example,dc=com" localhost user modify \\\n  example-user add:userPassword:"...."\n'})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Adding indexes"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",metastring:'title="pod: dirsrv-389ds-0 (namespace: ldap)"',children:"dsconf localhost backend index add --index-type eq --attr uidNumber example_backend\ndsconf localhost backend index add --index-type eq --attr gidNumber example_backend\ndsconf localhost backend index add --index-type eq --attr nsSshPublicKey example_backend\ndsconf localhost backend index reindex example_backend\n"})})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}}}]);