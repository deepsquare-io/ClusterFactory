"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[3757],{2722:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var t=r(1527),s=r(3883);r(6245),r(538);const a={},o="Deploy the Kube Prometheus Stack",l={id:"guides/monitoring/deploy",title:"Deploy the Kube Prometheus Stack",description:"image-20220510142533326",source:"@site/docs/guides/40-monitoring/01-deploy.md",sourceDirName:"guides/40-monitoring",slug:"/guides/monitoring/deploy",permalink:"/docs/guides/monitoring/deploy",draft:!1,unlisted:!1,editUrl:"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/guides/40-monitoring/01-deploy.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"docs",previous:{title:"Ejecting a controller",permalink:"/docs/guides/maintenance/removing-controller"},next:{title:"Using ServiceMonitor to fetch metrics",permalink:"/docs/guides/monitoring/service-monitor"}},i={},c=[{value:"Helm and Docker resources",id:"helm-and-docker-resources",level:2},{value:"1. Deploy Namespace and AppProject",id:"1-deploy-namespace-and-appproject",level:2},{value:"2. Secrets",id:"2-secrets",level:2},{value:"3. Editing <code>prometheus-app.yaml</code> to use the fork",id:"3-editing-prometheus-appyaml-to-use-the-fork",level:2},{value:"4. Add the values file to the subchart",id:"4-add-the-values-file-to-the-subchart",level:2},{value:"5. Deploy the app",id:"5-deploy-the-app",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"deploy-the-kube-prometheus-stack",children:"Deploy the Kube Prometheus Stack"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"image-20220510142533326",src:r(1880).Z+"",width:"1349",height:"649"})}),"\n","\n","\n",(0,t.jsx)(n.h2,{id:"helm-and-docker-resources",children:"Helm and Docker resources"}),"\n",(0,t.jsxs)(n.p,{children:["The Helm resources are stored on ",(0,t.jsx)(n.a,{href:"https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack",children:"the Prometheus Community Git Repository"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"The docker images used are:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"quay.io/prometheus/alertmanager"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"quay.io/prometheus-operator/prometheus-operator"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"quay.io/prometheus/prometheus"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"quay.io/prometheus-operator/prometheus-config-reloader"})}),"\n",(0,t.jsxs)(n.li,{children:["(",(0,t.jsx)(n.code,{children:"quay.io/thanos/thanos"}),")"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"docker.io/grafana/grafana-oss"})}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Like in the Getting Started, we won't be deploying Thanos and AlertManager."}),"\n",(0,t.jsx)(n.h2,{id:"1-deploy-namespace-and-appproject",children:"1. Deploy Namespace and AppProject"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/monitoring/\n"})}),"\n",(0,t.jsx)(n.h2,{id:"2-secrets",children:"2. Secrets"}),"\n",(0,t.jsx)(n.p,{children:"Create a SealedSecret which contains the initial credentials for Grafana:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Create a ",(0,t.jsx)(n.code,{children:"-secret.yaml.local"})," file:"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="argo/monitoring/secrets/grafana-admin-secret.yaml.local"',children:"apiVersion: v1\nkind: Secret\nmetadata:\n  name: grafana-admin-secret\n  namespace: monitoring\nstringData:\n  admin-password: password\n  admin-user: admin\n"})}),"\n",(0,t.jsxs)(n.ol,{start:"2",children:["\n",(0,t.jsx)(n.li,{children:"Seal the secret:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"cfctl kubeseal\n"})}),"\n",(0,t.jsxs)(n.ol,{start:"3",children:["\n",(0,t.jsx)(n.li,{children:"Apply the SealedSecret:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/monitoring/secrets/grafana-admin-sealed-secret.yaml\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"3-editing-prometheus-appyaml-to-use-the-fork",children:["3. Editing ",(0,t.jsx)(n.code,{children:"prometheus-app.yaml"})," to use the fork"]}),"\n",(0,t.jsxs)(n.p,{children:["Replace the ",(0,t.jsx)(n.code,{children:"repoURL"})," with the url of your fork:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="argo/monitoring/apps/prometheus-app.yaml > spec > source"',children:"source:\n  # You should have forked this repo. Change the URL to your fork.\n  repoURL: git@github.com:<your account>/ClusterFactory.git\n  # You should use your branch too.\n  targetRevision: HEAD\n  path: helm-subcharts/kube-prometheus-stack\n  helm:\n    releaseName: prometheus\n\n    skipCrds: true\n\n    # If the values file is not `values.yaml`:\n    # valueFiles:\n    #   - values-example.yaml\n"})}),"\n",(0,t.jsx)(n.h2,{id:"4-add-the-values-file-to-the-subchart",children:"4. Add the values file to the subchart"}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.p,{children:["Read the ",(0,t.jsx)(n.a,{href:"https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml",children:(0,t.jsx)(n.code,{children:"values.yaml"})})," to see all the default values."]})}),"\n",(0,t.jsxs)(n.p,{children:["Create a ",(0,t.jsx)(n.code,{children:"values.yaml"})," inside the ",(0,t.jsx)(n.code,{children:"helm-subcharts/kube-prometheus-stack"})," directory."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="helm-subcharts/kube-prometheus-stack/values.yaml"',children:"kube-prometheus-stack:\n  alertmanager:\n    enabled: false\n\n  grafana:\n    enabled: true\n\n    image:\n      repository: grafana/grafana-oss\n      tag: 8.4.5\n\n    persistence:\n      type: pvc\n      enabled: true\n      storageClassName: dynamic-nfs\n\n    securityContext:\n      runAsUser: 472\n      runAsGroup: 472\n      fsGroup: 472\n\n    admin:\n      existingSecret: 'grafana-admin-secret'\n      userKey: admin-user\n      passwordKey: admin-password\n\n    initChownData:\n      enabled: false\n\n    ingress:\n      enabled: true\n      ingressClassName: traefik\n\n      annotations:\n        cert-manager.io/cluster-issuer: selfsigned-cluster-issuer\n        traefik.ingress.kubernetes.io/router.entrypoints: websecure\n        traefik.ingress.kubernetes.io/router.tls: 'true'\n\n      hosts:\n        - grafana.example.com\n\n      path: /\n\n      tls:\n        - secretName: grafana.example.com-secret\n          hosts:\n            - grafana.example.com\n\n  ## Component scraping the kube controller manager\n  ##\n  kubeControllerManager:\n    enabled: false\n\n  ## Component scraping coreDns. Use either this or kubeDns\n  ##\n  coreDns:\n    enabled: false\n\n  ## Component scraping kubeDns. Use either this or coreDns\n  ##\n  kubeDns:\n    enabled: false\n\n  ## Component scraping etcd\n  ##\n  kubeEtcd:\n    enabled: false\n\n  ## Component scraping kube scheduler\n  ##\n  kubeScheduler:\n    enabled: false\n\n  ## Component scraping kube proxy\n  ##\n  kubeProxy:\n    enabled: false\n\n  ## Component scraping kube state metrics\n  ##\n  kubeStateMetrics:\n    enabled: true\n\n  ## Configuration for kube-state-metrics subchart\n  ##\n  kube-state-metrics:\n    prometheus:\n      monitor:\n        enabled: true\n\n  ## Deploy node exporter as a daemonset to all nodes\n  ##\n  nodeExporter:\n    enabled: true\n\n  ## Configuration for prometheus-node-exporter subchart\n  ##\n  prometheus-node-exporter:\n    prometheus:\n      monitor:\n        enabled: true\n\n  ## Manages Prometheus and Alertmanager components\n  ##\n  prometheusOperator:\n    enabled: true\n\n  ## Deploy a Prometheus instance\n  ##\n  prometheus:\n    enabled: true\n\n    ingress:\n      enabled: true\n\n      annotations:\n        cert-manager.io/cluster-issuer: selfsigned-cluster-issuer\n        traefik.ingress.kubernetes.io/router.entrypoints: websecure\n        traefik.ingress .kubernetes.io/router.tls: 'true'\n\n      hosts:\n        - prometheus.example.com\n\n      paths:\n        - /\n\n      tls:\n        - secretName: prometheus.example.com-secret\n          hosts:\n            - prometheus.example.com\n\n    prometheusSpec:\n      ruleSelectorNilUsesHelmValues: false\n      serviceMonitorSelectorNilUsesHelmValues: false\n      podMonitorSelectorNilUsesHelmValues: false\n      probeSelectorNilUsesHelmValues: false\n\n      resources:\n        limits:\n          cpu: 1\n          memory: 2Gi\n        requests:\n          cpu: 200m\n          memory: 2Gi\n\n      storageSpec:\n        volumeClaimTemplate:\n          spec:\n            storageClassName: 'dynamic-nfs'\n            accessModes: ['ReadWriteOnce']\n            resources:\n              requests:\n                storage: 50Gi\n"})}),"\n",(0,t.jsxs)(n.p,{children:["In case you don't know how to use ",(0,t.jsx)(n.code,{children:"Ingress"})," with ",(0,t.jsx)(n.code,{children:"cert-manager"})," and Traefik. Use the annotations ",(0,t.jsx)(n.code,{children:"traefik.ingress.kubernetes.io/router.entrypoints"})," and ",(0,t.jsx)(n.code,{children:"traefik.ingress.kubernetes.io/router.tls"})," to indicate the port used by Traefik."]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"cfctl.yaml"})," indicates that the entry-point ",(0,t.jsx)(n.code,{children:"websecure"})," is port 443."]}),"\n",(0,t.jsxs)(n.p,{children:["More about Traefik with Kubernetes Ingresses in ",(0,t.jsx)(n.a,{href:"https://doc.traefik.io/traefik/routing/providers/kubernetes-ingress/",children:"their documentation"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Use the annotation ",(0,t.jsx)(n.code,{children:"cert-manager.io/cluster-issuer"})," to indicate the certificate issuer and specify the generated certificate secret name in the ",(0,t.jsx)(n.code,{children:"tls[].secretName"})," field. ",(0,t.jsx)(n.code,{children:"cert-manager"})," will automatically search or generate the TLS certificates."]}),"\n",(0,t.jsxs)(n.p,{children:["More about ",(0,t.jsx)(n.code,{children:"cert-manager"})," in ",(0,t.jsx)(n.a,{href:"https://cert-manager.io/docs/usage/ingress/",children:"their documentation"}),"."]}),"\n",(0,t.jsxs)(n.admonition,{type:"info",children:[(0,t.jsxs)(n.p,{children:["Notice that ",(0,t.jsx)(n.code,{children:"initChownData"})," is not enabled. This is because our NFS server does not allow ",(0,t.jsx)(n.code,{children:"chown"})," (change the owner of a directory) from a client."]}),(0,t.jsx)(n.p,{children:"This means that, for security reasons, our NFS server manages the permissions itself, i.e. :"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:"root@nfs",children:"chown 472:472 /srv/nfs/k8s/grafana\nchown 1000:2000 /srv/nfs/k8s/prometheus\n"})})]}),"\n",(0,t.jsx)(n.h2,{id:"5-deploy-the-app",children:"5. Deploy the app"}),"\n",(0,t.jsx)(n.p,{children:"Commit and push:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:'git add .\ngit commit -m "Added Prometheus stack application and values"\ngit push\n'})}),"\n",(0,t.jsx)(n.p,{children:"And deploy:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/monitoring/apps/prometheus-crd-app.yaml\nkubectl apply -f argo/monitoring/apps/prometheus-app.yaml\n"})})]})}function d(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},538:(e,n,r)=>{r.d(n,{Z:()=>o});r(959);var t=r(6259);const s={tabItem:"tabItem_NFuj"};var a=r(1527);function o(e){let{children:n,hidden:r,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,t.Z)(s.tabItem,o),hidden:r,children:n})}},6245:(e,n,r)=>{r.d(n,{Z:()=>v});var t=r(959),s=r(6259),a=r(2687),o=r(8903),l=r(136),i=r(7118),c=r(7765),u=r(2960);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:r}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:r,attributes:t,default:s}}=e;return{value:n,label:r,attributes:t,default:s}}))}(r);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function p(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:r}=e;const s=(0,o.k6)(),a=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,i._X)(a),(0,t.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(s.location.search);n.set(a,e),s.replace({...s.location,search:n.toString()})}),[a,s])]}function g(e){const{defaultValue:n,queryString:r=!1,groupId:s}=e,a=h(e),[o,i]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=r.find((e=>e.default))??r[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:a}))),[c,d]=m({queryString:r,groupId:s}),[g,f]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,a]=(0,u.Nk)(r);return[s,(0,t.useCallback)((e=>{r&&a.set(e)}),[r,a])]}({groupId:s}),b=(()=>{const e=c??g;return p({value:e,tabValues:a})?e:null})();(0,l.Z)((()=>{b&&i(b)}),[b]);return{selectedValue:o,selectValue:(0,t.useCallback)((e=>{if(!p({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),f(e)}),[d,f,a]),tabValues:a}}var f=r(2213);const b={tabList:"tabList_UCr5",tabItem:"tabItem_OhsY"};var x=r(1527);function y(e){let{className:n,block:r,selectedValue:t,selectValue:o,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.o5)(),u=e=>{const n=e.currentTarget,r=i.indexOf(n),s=l[r].value;s!==t&&(c(n),o(s))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=i.indexOf(e.currentTarget)+1;n=i[r]??i[0];break}case"ArrowLeft":{const r=i.indexOf(e.currentTarget)-1;n=i[r]??i[i.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":r},n),children:l.map((e=>{let{value:n,label:r,attributes:a}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>i.push(e),onKeyDown:d,onClick:u,...a,className:(0,s.Z)("tabs__item",b.tabItem,a?.className,{"tabs__item--active":t===n}),children:r??n},n)}))})}function j(e){let{lazy:n,children:r,selectedValue:s}=e;const a=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===s));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function k(e){const n=g(e);return(0,x.jsxs)("div",{className:(0,s.Z)("tabs-container",b.tabList),children:[(0,x.jsx)(y,{...e,...n}),(0,x.jsx)(j,{...e,...n})]})}function v(e){const n=(0,f.Z)();return(0,x.jsx)(k,{...e,children:d(e.children)},String(n))}},1880:(e,n,r)=>{r.d(n,{Z:()=>t});const t=r.p+"assets/images/image-20220510142533326-e9b5e6873b57c15418b24a62a98855c3.png"},3883:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>o});var t=r(959);const s={},a=t.createContext(s);function o(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);