"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[8734],{4942:(e,s,n)=>{n.d(s,{R:()=>i,x:()=>a});var t=n(6672);const r={},c=t.createContext(r);function i(e){const s=t.useContext(c);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(c.Provider,{value:s},e.children)}},7867:(e,s,n)=>{n.d(s,{A:()=>t});const t=n.p+"assets/images/image-20220509154116581-980a4a608d5e4e2012e25cd601aa9dd7.png"},9473:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>t,toc:()=>o});const t=JSON.parse('{"id":"guides/cvmfs/mount-cvmfs","title":"Mount CVMFS repositories on Kubernetes","description":"image-20220509154116581","source":"@site/docs/guides/70-cvmfs/01-mount-cvmfs.md","sourceDirName":"guides/70-cvmfs","slug":"/guides/cvmfs/mount-cvmfs","permalink":"/docs/guides/cvmfs/mount-cvmfs","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/guides/70-cvmfs/01-mount-cvmfs.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{},"sidebar":"docs","previous":{"title":"Deploy Open OnDemand","permalink":"/docs/guides/slurm/deploy-ondemand"},"next":{"title":"Deploy a CVMFS Stratum 1","permalink":"/docs/guides/cvmfs/deploy-cvmfs"}}');var r=n(3420),c=n(4942);const i={},a="Mount CVMFS repositories on Kubernetes",l={},o=[{value:"Helm and Docker resources",id:"helm-and-docker-resources",level:2},{value:"1. AppProject",id:"1-appproject",level:2},{value:"2. Secrets",id:"2-secrets",level:2},{value:"3. Editing <code>cvmfs-service-app.yaml</code> to use the fork",id:"3-editing-cvmfs-service-appyaml-to-use-the-fork",level:2},{value:"4. Adding custom values to the chart",id:"4-adding-custom-values-to-the-chart",level:2},{value:"4.a. Create the values file",id:"4a-create-the-values-file",level:3},{value:"4.b. Select the CVMFS repositories",id:"4b-select-the-cvmfs-repositories",level:3},{value:"4.c. Configure the CVMFS client",id:"4c-configure-the-cvmfs-client",level:3},{value:"4.d. Configure the keys",id:"4d-configure-the-keys",level:3},{value:"5. Deploy the CVMFS service",id:"5-deploy-the-cvmfs-service",level:2},{value:"6. Mount the repositories to a container",id:"6-mount-the-repositories-to-a-container",level:2}];function d(e){const s={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",...(0,c.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.header,{children:(0,r.jsx)(s.h1,{id:"mount-cvmfs-repositories-on-kubernetes",children:"Mount CVMFS repositories on Kubernetes"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.img,{alt:"image-20220509154116581",src:n(7867).A+"",width:"1009",height:"369"})}),"\n",(0,r.jsx)(s.admonition,{type:"warning",children:(0,r.jsxs)(s.p,{children:["The CVMFS CSI Plugin isn't stable yet, so we have to do it the old way: using ",(0,r.jsx)(s.code,{children:"hostPath"}),"."]})}),"\n",(0,r.jsx)(s.h2,{id:"helm-and-docker-resources",children:"Helm and Docker resources"}),"\n",(0,r.jsxs)(s.p,{children:["The Helm resources are stored on ",(0,r.jsx)(s.a,{href:"https://github.com/deepsquare-io/ClusterFactory/tree/main/helm/cvmfs-service",children:"ClusterFactory Git Repository"}),"."]}),"\n",(0,r.jsxs)(s.p,{children:["The Dockerfile is described in the git repository ",(0,r.jsx)(s.a,{href:"https://github.dev/cvmfs/cvmfs/blob/devel/packaging/container/Dockerfile",children:"cvmfs/cvmfs"}),"."]}),"\n",(0,r.jsx)(s.p,{children:"A Docker image can be pulled with:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"docker pull docker.io/cvmfs/cvmfs:latest\n"})}),"\n",(0,r.jsx)(s.h2,{id:"1-appproject",children:"1. AppProject"}),"\n",(0,r.jsx)(s.p,{children:"Apply the AppProject:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/cvmfs/app-project.yaml\n"})}),"\n",(0,r.jsx)(s.h2,{id:"2-secrets",children:"2. Secrets"}),"\n",(0,r.jsx)(s.p,{children:"Create a SealedSecret which contains the keys of the repositories:"}),"\n",(0,r.jsxs)(s.ol,{children:["\n",(0,r.jsxs)(s.li,{children:["Create a ",(0,r.jsx)(s.code,{children:"-secret.yaml.local"})," file:"]}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="argo/cvmfs/secrets/cvmfs-keys-secret.yaml.local"',children:"apiVersion: v1\nkind: Secret\nmetadata:\n  name: cvmfs-keys-secret\n  namespace: cvmfs\ntype: Opaque\nstringData:\n  software.sion.csquare.run.pub: |\n    -----BEGIN PUBLIC KEY-----\n    ...\n    -----END PUBLIC KEY-----\n"})}),"\n",(0,r.jsxs)(s.ol,{start:"2",children:["\n",(0,r.jsx)(s.li,{children:"Seal the secret:"}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"cfctl kubeseal\n"})}),"\n",(0,r.jsxs)(s.ol,{start:"3",children:["\n",(0,r.jsx)(s.li,{children:"Apply the SealedSecret:"}),"\n"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/cvmfs/secrets/cvmfs-keys-sealed-secret.yaml\n"})}),"\n",(0,r.jsxs)(s.h2,{id:"3-editing-cvmfs-service-appyaml-to-use-the-fork",children:["3. Editing ",(0,r.jsx)(s.code,{children:"cvmfs-service-app.yaml"})," to use the fork"]}),"\n",(0,r.jsxs)(s.p,{children:["Change the ",(0,r.jsx)(s.code,{children:"repoURL"})," to the URL used to pull the fork. Also add the ",(0,r.jsx)(s.code,{children:"values-production.yaml"})," file to customize the values."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="argo/provisioning/apps/cvmfs-service-app.yaml > spec > source"',children:"source:\n  # You should have forked this repo. Change the URL to your fork.\n  repoURL: git@github.com:<your account>/ClusterFactory.git\n  # You should use your branch too.\n  targetRevision: HEAD\n  path: helm/cvmfs-service\n  helm:\n    releaseName: cvmfs-service\n\n    # Create a values file inside your fork and change the values.\n    valueFiles:\n      - values-production.yaml\n"})}),"\n",(0,r.jsx)(s.h2,{id:"4-adding-custom-values-to-the-chart",children:"4. Adding custom values to the chart"}),"\n",(0,r.jsx)(s.admonition,{type:"tip",children:(0,r.jsxs)(s.p,{children:["Read the ",(0,r.jsx)(s.a,{href:"https://github.com/deepsquare-io/ClusterFactory/blob/main/helm/cvmfs-service/values.yaml",children:(0,r.jsx)(s.code,{children:"values.yaml"})})," to see all the default values."]})}),"\n",(0,r.jsx)(s.h3,{id:"4a-create-the-values-file",children:"4.a. Create the values file"}),"\n",(0,r.jsxs)(s.p,{children:["Create the values file ",(0,r.jsx)(s.code,{children:"values-production.yaml"})," inside the ",(0,r.jsx)(s.code,{children:"helm/cvmfs-service/"})," directory."]}),"\n",(0,r.jsx)(s.h3,{id:"4b-select-the-cvmfs-repositories",children:"4.b. Select the CVMFS repositories"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="helm/cvmfs-service/values-production.yaml"',children:"repositories:\n  - name: software-sion-csquare-run\n    repository: software.sion.csquare.run\n"})}),"\n",(0,r.jsx)(s.h3,{id:"4c-configure-the-cvmfs-client",children:"4.c. Configure the CVMFS client"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="helm/cvmfs-service/values-production.yaml"',children:'# ...\nconfigs:\n  default.local:\n    mountPath: default.local\n    contents: |\n      CVMFS_QUOTA_LIMIT=-1\n      CVMFS_USE_GEOAPI=no\n      CVMFS_HTTP_PROXY="DIRECT"\n      CVMFS_KEYS_DIR="/etc/cvmfs/keys"\n      CVMFS_SERVER_URL="http://cvmfs.ch1.deepsquare.run/cvmfs/@fqrn@"\n      CVMFS_USER=root\n'})}),"\n",(0,r.jsx)(s.h3,{id:"4d-configure-the-keys",children:"4.d. Configure the keys"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="helm/cvmfs-service/values-production.yaml"',children:"# ...\nkeys:\n  secretName: 'cvmfs-keys-secret'\n"})}),"\n",(0,r.jsxs)(s.p,{children:["The keys will be mounted on the ",(0,r.jsx)(s.code,{children:"/etc/cvmfs/keys"})," directory. If you wish to change the path of each key:"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="helm/cvmfs-service/values-production.yaml"',children:"#...\nkeys:\n  secretName: 'cvmfs-keys-secret'\n  items:\n    - key: software.sion.csquare.run.pub\n      path: sion.csquare.run/software.sion.csquare.run.pub\n"})}),"\n",(0,r.jsxs)(s.p,{children:["The key will be moved to the path ",(0,r.jsx)(s.code,{children:"/etc/cvmfs/keys/sion.csquare.run/software.sion.csquare.run.pub"}),"."]}),"\n",(0,r.jsx)(s.h2,{id:"5-deploy-the-cvmfs-service",children:"5. Deploy the CVMFS service"}),"\n",(0,r.jsx)(s.p,{children:"Commit and push:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:'git add .\ngit commit -m "Added CVMFS service"\ngit push\n'})}),"\n",(0,r.jsx)(s.p,{children:"And deploy the Argo CD application:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/provisioning/apps/cvmfs-service-app.yaml\n"})}),"\n",(0,r.jsx)(s.h2,{id:"6-mount-the-repositories-to-a-container",children:"6. Mount the repositories to a container"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",metastring:'title="job.yaml"',children:"apiVersion: batch/v1\nkind: Job\nmetadata:\n  name: list-cvmfs\nspec:\n  template:\n    spec:\n      containers:\n        - name: list-cvmfs\n          image: busybox\n          command: ['ls', '/cvmfs/software.sion.csquare.run']\n          volumeMounts:\n            - mountPath: /cvmfs/software.sion.csquare.run\n              name: software-sion-csquare-run\n              readOnly: true\n      restartPolicy: Never\n      volumes:\n        - name: software-sion-csquare-run\n          hostPath:\n            path: /cvmfs/cvmfs-k8s/mounts/software.sion.csquare.run\n            type: Directory\n  backoffLimit: 0\n"})})]})}function h(e={}){const{wrapper:s}={...(0,c.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}}}]);