"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[7409],{9613:function(e,t,a){a.d(t,{Zo:function(){return p},kt:function(){return d}});var r=a(9496);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var i=r.createContext({}),c=function(e){var t=r.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},p=function(e){var t=c(e.components);return r.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(a),d=n,h=m["".concat(i,".").concat(d)]||m[d]||u[d]||l;return a?r.createElement(h,o(o({ref:t},p),{},{components:a})):r.createElement(h,o({ref:t},p))}));function d(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,o=new Array(l);o[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var c=2;c<l;c++)o[c]=a[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9269:function(e,t,a){a.r(t),a.d(t,{assets:function(){return p},contentTitle:function(){return i},default:function(){return d},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return u}});var r=a(665),n=a(151),l=(a(9496),a(9613)),o=["components"],s={},i="Deploy a CVMFS Stratum 1",c={unversionedId:"guides/cvmfs/deploy-cvmfs",id:"guides/cvmfs/deploy-cvmfs",title:"Deploy a CVMFS Stratum 1",description:"image-20220509180348675",source:"@site/docs/guides/70-cvmfs/04-deploy-cvmfs.md",sourceDirName:"guides/70-cvmfs",slug:"/guides/cvmfs/deploy-cvmfs",permalink:"/docs/guides/cvmfs/deploy-cvmfs",draft:!1,editUrl:"https://github.com/SquareFactory/ClusterFactory-CE/tree/main/web/docs/guides/70-cvmfs/04-deploy-cvmfs.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{},sidebar:"docs",previous:{title:"Mount CVMFS repositories on Kubernetes",permalink:"/docs/guides/cvmfs/mount-cvmfs"},next:{title:"Deploy a VM with KubeVirt",permalink:"/docs/guides/kubevirt/deploy-vm"}},p={},u=[{value:"Helm and Docker resources",id:"helm-and-docker-resources",level:2},{value:"1. Deploy Namespace and AppProject",id:"1-deploy-namespace-and-appproject",level:2},{value:"2. Persistent Volumes, Secrets and PVC",id:"2-persistent-volumes-secrets-and-pvc",level:2},{value:"2.a. Write the CVMFS public key",id:"2a-write-the-cvmfs-public-key",level:3},{value:"2.b Deploy a <code>PersistentVolume</code> or <code>StorageClass</code>",id:"2b-deploy-a-persistentvolume-or-storageclass",level:3},{value:"3. Editing <code>cvmfs-server-app.yml</code> to use the fork",id:"3-editing-cvmfs-server-appyml-to-use-the-fork",level:2},{value:"4. Adding custom values to the chart",id:"4-adding-custom-values-to-the-chart",level:2},{value:"4.a. Create the values file",id:"4a-create-the-values-file",level:3},{value:"4.b. Select the nodes",id:"4b-select-the-nodes",level:3},{value:"4.c. Mount the keys",id:"4c-mount-the-keys",level:3},{value:"4.d. Add the replicas",id:"4d-add-the-replicas",level:3},{value:"4.e. (Optional) Expose the application to the external network",id:"4e-optional-expose-the-application-to-the-external-network",level:3},{value:"5. Deploy the app",id:"5-deploy-the-app",level:2}],m={toc:u};function d(e){var t=e.components,s=(0,n.Z)(e,o);return(0,l.kt)("wrapper",(0,r.Z)({},m,s,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"deploy-a-cvmfs-stratum-1"},"Deploy a CVMFS Stratum 1"),(0,l.kt)("p",null,(0,l.kt)("img",{alt:"image-20220509180348675",src:a(915).Z,width:"1026",height:"454"})),(0,l.kt)("p",null,"Let's assume we plan to replicate ",(0,l.kt)("inlineCode",{parentName:"p"},"http://cvmfs.example.com/cvmfs/repo.example.com"),"."),(0,l.kt)("h2",{id:"helm-and-docker-resources"},"Helm and Docker resources"),(0,l.kt)("p",null,"The Helm resources are stored on ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/SquareFactory/ClusterFactory-CE/tree/main/helm/cvmfs-server"},"ClusterFactory Git Repository"),"."),(0,l.kt)("p",null,"The Dockerfile is described in the git repository ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/SquareFactory/cvmfs-server-docker"},"SquareFactory/cvmfs-server-docker"),"."),(0,l.kt)("p",null,"A Docker image can be pulled with:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sh"},"docker pull ghcr.io/squarefactory/cvmfs-server:latest\n")),(0,l.kt)("h2",{id:"1-deploy-namespace-and-appproject"},"1. Deploy Namespace and AppProject"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory-CE"',title:'"user@local:/ClusterFactory-CE"'},"kubectl apply -f argo/cvmfs/\n")),(0,l.kt)("h2",{id:"2-persistent-volumes-secrets-and-pvc"},"2. Persistent Volumes, Secrets and PVC"),(0,l.kt)("h3",{id:"2a-write-the-cvmfs-public-key"},"2.a. Write the CVMFS public key"),(0,l.kt)("p",null,"Create a SealedSecret which contains the keys of the repositories:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Create a ",(0,l.kt)("inlineCode",{parentName:"li"},"-secret.yml.local")," file:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="argo/cvmfs/secrets/keys-secret.yaml.local"',title:'"argo/cvmfs/secrets/keys-secret.yaml.local"'},"apiVersion: v1\nkind: Secret\nmetadata:\n  name: keys-secret\n  namespace: cvmfs\ntype: Opaque\nstringData:\n  repo.example.com.pub: |\n    -----BEGIN PUBLIC KEY-----\n    ...\n    -----END PUBLIC KEY-----\n")),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"Seal the secret:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory-CE"',title:'"user@local:/ClusterFactory-CE"'},"cfctl kubeseal\n")),(0,l.kt)("ol",{start:3},(0,l.kt)("li",{parentName:"ol"},"Apply the SealedSecret:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory-CE"',title:'"user@local:/ClusterFactory-CE"'},"kubectl apply -f argo/cvmfs/secrets/keys-sealed-secret.yaml\n")),(0,l.kt)("h3",{id:"2b-deploy-a-persistentvolume-or-storageclass"},"2.b Deploy a ",(0,l.kt)("inlineCode",{parentName:"h3"},"PersistentVolume")," or ",(0,l.kt)("inlineCode",{parentName:"h3"},"StorageClass")),(0,l.kt)("p",null,"While we could use ",(0,l.kt)("em",{parentName:"p"},"NFS")," to as persistent storage for the replica, let's deploy a ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/rancher/local-path-provisioner"},(0,l.kt)("inlineCode",{parentName:"a"},"local-path-provisioner")),"."),(0,l.kt)("p",null,"Basically, ",(0,l.kt)("inlineCode",{parentName:"p"},"local-path-provisioner")," creates the ",(0,l.kt)("inlineCode",{parentName:"p"},"/opt/local-path-provisioner")," directory on the nodes. It allocates dynamically a volume in that directory using a StorageClass."),(0,l.kt)("p",null,"To deploy the provisioner:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory-CE"',title:'"user@local:/ClusterFactory-CE"'},"kubectl apply -f argo/default/apps/local-path-provisioner-app.yml\n")),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"StorageClass")," ",(0,l.kt)("inlineCode",{parentName:"p"},"local-path")," should be deployed."),(0,l.kt)("h2",{id:"3-editing-cvmfs-server-appyml-to-use-the-fork"},"3. Editing ",(0,l.kt)("inlineCode",{parentName:"h2"},"cvmfs-server-app.yml")," to use the fork"),(0,l.kt)("p",null,"Change the ",(0,l.kt)("inlineCode",{parentName:"p"},"repoURL")," to the URL used to pull the fork. Also add the ",(0,l.kt)("inlineCode",{parentName:"p"},"values-production.yaml")," file to customize the values."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="argo.example/cvmfs/apps/cvmfs-server-app.yml > spec > source"',title:'"argo.example/cvmfs/apps/cvmfs-server-app.yml',">":!0,spec:!0,'source"':!0},"source:\n  # You should have forked this repo. Change the URL to your fork.\n  repoURL: git@github.com:<your account>/ClusterFactory-CE.git\n  targetRevision: HEAD\n  path: helm/cvmfs-server\n  helm:\n    releaseName: cvmfs-server\n\n    # Create a values file inside your fork and change the values.\n    valueFiles:\n      - values-production.yaml\n")),(0,l.kt)("h2",{id:"4-adding-custom-values-to-the-chart"},"4. Adding custom values to the chart"),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"Read the ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/SquareFactory/ClusterFactory-CE/blob/main/helm/cvmfs-server/values.yaml"},(0,l.kt)("inlineCode",{parentName:"a"},"values.yaml"))," to see all the default values.")),(0,l.kt)("h3",{id:"4a-create-the-values-file"},"4.a. Create the values file"),(0,l.kt)("p",null,"Create the values file ",(0,l.kt)("inlineCode",{parentName:"p"},"values-production.yaml")," inside the ",(0,l.kt)("inlineCode",{parentName:"p"},"helm/cvmfs-server/")," directory."),(0,l.kt)("h3",{id:"4b-select-the-nodes"},"4.b. Select the nodes"),(0,l.kt)("p",null,"Because we are using ",(0,l.kt)("inlineCode",{parentName:"p"},"local-path"),", you should select the nodes hosting the volumes."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="helm/cvmfs-server/values-production.yaml"',title:'"helm/cvmfs-server/values-production.yaml"'},"nodeSelector:\n  kubernetes.io/hostname: my-node\n")),(0,l.kt)("h3",{id:"4c-mount-the-keys"},"4.c. Mount the keys"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="helm/cvmfs-server/values-production.yaml"',title:'"helm/cvmfs-server/values-production.yaml"'},"# ...\nvolumeMounts:\n  - name: keys\n    mountPath: /etc/cvmfs/keys/cvmfs.example.com/repo.example.com.pub\n    subPath: repo.example.com.pub\n    readOnly: true\n\nvolumes:\n  - name: keys\n    secret:\n      secretName: keys-secret\n      defaultMode: 256\n\nstate:\n  storageClassName: 'local-path'\n\nstorage:\n  storageClassName: 'local-path'\n")),(0,l.kt)("h3",{id:"4d-add-the-replicas"},"4.d. Add the replicas"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="helm/cvmfs-server/values-production.yaml"',title:'"helm/cvmfs-server/values-production.yaml"'},"# ...\nconfig:\n  replicas:\n    - name: repo.example.com\n      url: http://cvmfs.example.com/cvmfs/repo.example.com\n      keys: /etc/cvmfs/keys/cvmfs.example.com/repo.example.com.pub\n      options: '-o root'\n")),(0,l.kt)("p",null,"Make sure the option ",(0,l.kt)("inlineCode",{parentName:"p"},"-o root")," is present to avoid a deadlock."),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"-o root")," indicates the owner of the repository."),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"options")," field is the arguments passed to ",(0,l.kt)("inlineCode",{parentName:"p"},"cvmfs_server add-replica"),"."),(0,l.kt)("h3",{id:"4e-optional-expose-the-application-to-the-external-network"},"4.e. (Optional) Expose the application to the external network"),(0,l.kt)("p",null,"If you want to expose your stratum 1 server, add these fields to the values:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="helm/cvmfs-server/values-production.yaml"',title:'"helm/cvmfs-server/values-production.yaml"'},"# ...\ningress:\n  enabled: true\n  annotations:\n    cert-manager.io/cluster-issuer: selfsigned-cluster-issuer\n    traefik.ingress.kubernetes.io/router.entrypoints: websecure\n    traefik.ingress.kubernetes.io/router.tls: 'true'\n\n  ingressClass: traefik\n\n  hosts:\n    - cvmfs.example.com\n\n  tls:\n    - secretName: cvmfs.example.com-secret\n      hosts:\n        - cvmfs.example.com\n")),(0,l.kt)("p",null,"The service is already enabled."),(0,l.kt)("p",null,"In case you don't know how to use ",(0,l.kt)("inlineCode",{parentName:"p"},"Ingress")," with ",(0,l.kt)("inlineCode",{parentName:"p"},"cert-manager")," and Traefik. Use the annotations ",(0,l.kt)("inlineCode",{parentName:"p"},"traefik.ingress.kubernetes.io/router.entrypoints")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"traefik.ingress.kubernetes.io/router.tls")," to indicates the port used by Traefik."),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"cfctl.yaml")," indicates that the entrypoints ",(0,l.kt)("inlineCode",{parentName:"p"},"websecure")," is the port 443."),(0,l.kt)("p",null,"More about Traefik with Kubernetes Ingresses in ",(0,l.kt)("a",{parentName:"p",href:"https://doc.traefik.io/traefik/routing/providers/kubernetes-ingress/"},"their documentation"),"."),(0,l.kt)("p",null,"Use the annotation ",(0,l.kt)("inlineCode",{parentName:"p"},"cert-manager.io/cluster-issuer")," to indicates the certificate issuer and specify the generated certificate secret name in the ",(0,l.kt)("inlineCode",{parentName:"p"},"tls[].secretName")," field. ",(0,l.kt)("inlineCode",{parentName:"p"},"cert-manager")," will automatically search or generate the TLS certificates."),(0,l.kt)("p",null,"More about ",(0,l.kt)("inlineCode",{parentName:"p"},"cert-manager")," in ",(0,l.kt)("a",{parentName:"p",href:"https://cert-manager.io/docs/usage/ingress/"},"their documentation"),"."),(0,l.kt)("h2",{id:"5-deploy-the-app"},"5. Deploy the app"),(0,l.kt)("p",null,"Commit and push:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory-CE"',title:'"user@local:/ClusterFactory-CE"'},'git add .\ngit commit -m "Added CVMFS server"\ngit push\n')),(0,l.kt)("p",null,"And deploy the Argo CD application:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory-CE"',title:'"user@local:/ClusterFactory-CE"'},"kubectl apply -f argo/provisioning/apps/cvmfs-server-app.yml\n")),(0,l.kt)("p",null,"If the Ingress is enabled and configured, the CVMFS server should be available on the IP specified by MetalLB. Configure your DNS so it redirects to this IP."))}d.isMDXComponent=!0},915:function(e,t,a){t.Z=a.p+"assets/images/image-20220509180348675-72e61e3b74ef02813999a23896812ff6.png"}}]);