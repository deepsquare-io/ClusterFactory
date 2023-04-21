"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[9205],{9613:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>g});var r=a(9496);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,r,o=function(e,t){if(null==e)return{};var a,r,o={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var a=e.components,o=e.mdxType,n=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=c(a),g=o,d=m["".concat(s,".").concat(g)]||m[g]||u[g]||n;return a?r.createElement(d,l(l({ref:t},p),{},{components:a})):r.createElement(d,l({ref:t},p))}));function g(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=a.length,l=new Array(n);l[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var c=2;c<n;c++)l[c]=a[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,a)}m.displayName="MDXCreateElement"},4681:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>n,metadata:()=>i,toc:()=>c});var r=a(665),o=(a(9496),a(9613));const n={},l="Setting up the Git repository for GitOps",i={unversionedId:"guides/setting-up-repository",id:"guides/setting-up-repository",title:"Setting up the Git repository for GitOps",description:"To enable GitOps and be able to follow the updates of the ClusterFactory repository, you should fork the ClusterFactory repository or create a private copy, so you could use Argo CD on your own repository.",source:"@site/docs/guides/01-setting-up-repository.md",sourceDirName:"guides",slug:"/guides/setting-up-repository",permalink:"/docs/guides/setting-up-repository",draft:!1,editUrl:"https://github.com/SquareFactory/ClusterFactory/tree/main/web/docs/guides/01-setting-up-repository.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"docs",previous:{title:"Installing the utilities",permalink:"/docs/guides/installing-the-utilities"},next:{title:"Exposing your Kubernetes Workload",permalink:"/docs/guides/exposing-k8s-workloads"}},s={},c=[{value:"Setting up the Git repository",id:"setting-up-the-git-repository",level:2},{value:"1. Fork the repository",id:"1-fork-the-repository",level:3},{value:"Method 1: Create a public fork",id:"method-1-create-a-public-fork",level:4},{value:"Method 2: Create a private fork",id:"method-2-create-a-private-fork",level:4},{value:"2. Setup the upstream remote for git",id:"2-setup-the-upstream-remote-for-git",level:3},{value:"3. Checkout to a stable version and create a new branch",id:"3-checkout-to-a-stable-version-and-create-a-new-branch",level:3},{value:"4. Rename the examples and commit",id:"4-rename-the-examples-and-commit",level:3},{value:"Use <code>git fetch</code> and <code>git merge</code> to merge the upstream main into the local branch",id:"use-git-fetch-and-git-merge-to-merge-the-upstream-main-into-the-local-branch",level:2},{value:"Use Argo CD to pull, synchronize and deploy the manifests",id:"use-argo-cd-to-pull-synchronize-and-deploy-the-manifests",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"setting-up-the-git-repository-for-gitops"},"Setting up the Git repository for GitOps"),(0,o.kt)("p",null,"To enable GitOps and be able to follow the updates of the ClusterFactory repository, you should ",(0,o.kt)("a",{parentName:"p",href:"https://docs.github.com/en/get-started/quickstart/fork-a-repo"},"fork")," the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/SquareFactory/ClusterFactory"},"ClusterFactory repository")," or create a private copy, so you could use Argo CD on your own repository."),(0,o.kt)("h2",{id:"setting-up-the-git-repository"},"Setting up the Git repository"),(0,o.kt)("h3",{id:"1-fork-the-repository"},"1. Fork the repository"),(0,o.kt)("h4",{id:"method-1-create-a-public-fork"},"Method 1: Create a public fork"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},'Use the "Fork" button on Github and create the fork on your favorite account.')),(0,o.kt)("div",{style:{textAlign:"center"}},(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Fork button",src:a(8145).Z,width:"1724",height:"240"}))),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"After setting up the fork, ",(0,o.kt)("inlineCode",{parentName:"p"},"git clone")," the fork. Example:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/"',title:'"user@local:/"'},"# SSH\ngit clone git@github.com:<your account>/ClusterFactory.git\n")))),(0,o.kt)("h4",{id:"method-2-create-a-private-fork"},"Method 2: Create a private fork"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Create a bare clone of the repository."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/"',title:'"user@local:/"'},"git clone --bare https://github.com/SquareFactory/ClusterFactory.git\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Create ",(0,o.kt)("a",{parentName:"p",href:"https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository"},"a new private repository on your favorite Git hosting website")," and name it ",(0,o.kt)("inlineCode",{parentName:"p"},"ClusterFactory"),".")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Mirror-push your bare clone to your new ",(0,o.kt)("inlineCode",{parentName:"p"},"ClusterFactory")," repository."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/"',title:'"user@local:/"'},"cd ClusterFactory.git\n# SSH\ngit push --mirror git@github.com:<your account>/ClusterFactory.git\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Remove the bare clone."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory.git"',title:'"user@local:/ClusterFactory.git"'},"cd ..\nrm -rf ./ClusterFactory.git\n\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"You can now clone your ",(0,o.kt)("inlineCode",{parentName:"p"},"ClusterFactory")," repository on your machine."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/"',title:'"user@local:/"'},"# SSH\ngit clone git@github.com:<your account>/ClusterFactory.git\n")))),(0,o.kt)("h3",{id:"2-setup-the-upstream-remote-for-git"},"2. Setup the upstream remote for git"),(0,o.kt)("p",null,"Git is capable of managing multiple remote repositories. By default, ",(0,o.kt)("inlineCode",{parentName:"p"},"origin")," is linked to the ",(0,o.kt)("inlineCode",{parentName:"p"},"<your account>/ClusterFactory")," repository. To be able to fetch updates from the upstream ",(0,o.kt)("inlineCode",{parentName:"p"},"SquareFactory/ClusterFactory")," repository, we need to add a remote repository that we call ",(0,o.kt)("inlineCode",{parentName:"p"},"upstream"),"."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Add the upstream and disable push on the remote ",(0,o.kt)("inlineCode",{parentName:"p"},"upstream"),":"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory"',title:'"user@local:/ClusterFactory"'},"git remote add upstream https://github.com/SquareFactory/ClusterFactory.git\ngit remote set-url --push upstream DISABLE\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"You can list all your remotes with ",(0,o.kt)("inlineCode",{parentName:"p"},"git remote -v"),":"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory"',title:'"user@local:/ClusterFactory"'},"git remote -v\n# origin    git@github.com:<your account>/ClusterFactory.git (fetch)\n# origin    git@github.com:<your account>/ClusterFactory.git (push)\n# upstream  https://github.com/SquareFactory/ClusterFactory.git (fetch)\n# upstream  DISABLE (push)\n")))),(0,o.kt)("h3",{id:"3-checkout-to-a-stable-version-and-create-a-new-branch"},"3. Checkout to a stable version and create a new branch"),(0,o.kt)("p",null,"You can checkout to a stable version:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory"',title:'"user@local:/ClusterFactory"'},"git checkout -b configs v0.7.0\n# You can delete the local main branch\ngit branch -D main\n")),(0,o.kt)("h3",{id:"4-rename-the-examples-and-commit"},"4. Rename the examples and commit"),(0,o.kt)("p",null,"Copy ",(0,o.kt)("inlineCode",{parentName:"p"},"argo.example"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"core.example"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"cfctl.yaml.example"),", and remove the ",(0,o.kt)("inlineCode",{parentName:"p"},".example"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory"',title:'"user@local:/ClusterFactory"'},"cp -R argo.example/ argo/\ncp -R core.example/ core/\ncp cfctl.yaml.example cfctl.yaml\n")),(0,o.kt)("p",null,"You can track these files on Git:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory"',title:'"user@local:/ClusterFactory"'},'git add .\ngit commit -m "Initialized my config"\ngit push -u origin configs\n# You can also delete the remote main branch\n')),(0,o.kt)("h2",{id:"use-git-fetch-and-git-merge-to-merge-the-upstream-main-into-the-local-branch"},"Use ",(0,o.kt)("inlineCode",{parentName:"h2"},"git fetch")," and ",(0,o.kt)("inlineCode",{parentName:"h2"},"git merge")," to merge the upstream main into the local branch"),(0,o.kt)("p",null,"Because ClusterFactory will be updated regularly, you can fetch the updates with git fetch:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory"',title:'"user@local:/ClusterFactory"'},"git fetch --tags upstream\n")),(0,o.kt)("div",{style:{textAlign:"center"}},(0,o.kt)("p",null,(0,o.kt)("img",{alt:"git-fetch",src:a(265).Z,width:"1046",height:"358"}))),(0,o.kt)("p",null,"To merge the upstream changes, either rebase or create a merge commit."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory"',title:'"user@local:/ClusterFactory"'},"git merge v0.8.0\n")),(0,o.kt)("div",{style:{textAlign:"center"}},(0,o.kt)("p",null,(0,o.kt)("img",{alt:"git-merge",src:a(7837).Z,width:"1234",height:"417"}))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory"',title:'"user@local:/ClusterFactory"'},"git push\n")),(0,o.kt)("div",{style:{textAlign:"center"}},(0,o.kt)("p",null,(0,o.kt)("img",{alt:"git-push",src:a(5365).Z,width:"1212",height:"406"}))),(0,o.kt)("hr",null),(0,o.kt)("p",null,"If you wish to follow the upstream main branch:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell",metastring:'title="user@local:/ClusterFactory"',title:'"user@local:/ClusterFactory"'},"git merge upstream/main\ngit push\n")),(0,o.kt)("p",null,"If everything goes well, your git graph should always look like this:"),(0,o.kt)("div",{style:{textAlign:"center"}},(0,o.kt)("p",null,(0,o.kt)("img",{alt:"git-graph-example",src:a(8896).Z,width:"633",height:"314"}))),(0,o.kt)("h2",{id:"use-argo-cd-to-pull-synchronize-and-deploy-the-manifests"},"Use Argo CD to pull, synchronize and deploy the manifests"),(0,o.kt)("p",null,"If you want to deploy your applications, you should write your manifests and commit these files to your repository, like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},"./\n\u251c\u2500\u2500 argo/\n\u251c\u2500\u2500 bin/\n\u251c\u2500\u2500 core/\n\u251c\u2500\u2500 helm/\n\u2502   \u251c\u2500\u2500 csi-driver-cvmfs/\n\u2502   \u251c\u2500\u2500 cvmfs-server/\n\u2502   \u251c\u2500\u2500 cvmfs-service/\n\u2502   \u251c\u2500\u2500 ipmi-exporter/\n\u2502   \u251c\u2500\u2500 my-helm-application/  <----- HERE if it's a helm application\n\u2502   \u2502   \u251c\u2500\u2500 templates/\n\u2502   \u2502   \u251c\u2500\u2500 Chart.yaml\n\u2502   \u2502   \u2514\u2500\u2500 values.yaml\n\u2502   \u251c\u2500\u2500 openldap/\n\u2502   \u251c\u2500\u2500 slurm-cluster/\n\u2502   \u2514\u2500\u2500 grendel/\n\u251c\u2500\u2500 manifests/                <----- Or HERE if it's a kustomized/vanilla Kubernetes application\n\u2502   \u2514\u2500\u2500 my-application/       <-----\n\u2502       \u2514\u2500\u2500 statefulset.yaml  <-----\n\u2514\u2500\u2500 ...\n")),(0,o.kt)("p",null,"Argo CD is able to retrieve your repository from your Git hosting server, synchronize changes and deploy your Kubernetes manifests."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create a local secret containing a SSH deploy key and the git url:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="argo/default/secrets/my-repository-secret.yaml.local"',title:'"argo/default/secrets/my-repository-secret.yaml.local"'},"apiVersion: v1\nkind: Secret\nmetadata:\n  name: my-repository-secret\n  namespace: argocd\n  labels:\n    argocd.argoproj.io/secret-type: repository\ntype: Opaque\nstringData:\n  sshPrivateKey: |\n    -----BEGIN RSA PRIVATE KEY-----\n    -----END RSA PRIVATE KEY-----\n  type: git\n  url: git@github.com:<your account>/<your repo>.git\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Seal it and apply it:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"cfctl kubeseal\nkubectl apply -f argo/default/secrets/my-repository-sealed-secret.yaml\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Configure an Argo CD Application:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="argo/default/apps/my-application.yaml"',title:'"argo/default/apps/my-application.yaml"'},'apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: my-application\n  namespace: argocd\n  finalizers:\n    - resources-finalizer.argocd.argoproj.io\nspec:\n  project: default\n  source:\n    repoURL: git@github.com:<your account>/<your repo>.git\n    # You should use your branch too.\n    targetRevision: HEAD\n    path: manifests/my-application\n    directory:\n      recurse: true\n\n  destination:\n    server: \'https://kubernetes.default.svc\'\n    namespace: default\n\n  syncPolicy:\n    automated:\n      prune: true # Specifies if resources should be pruned during auto-syncing ( false by default ).\n      selfHeal: true # Specifies if partial app sync should be executed when resources are changed only in target Kubernetes cluster and no git change detected ( false by default ).\n      allowEmpty: false # Allows deleting all application resources during automatic syncing ( false by default ).\n    syncOptions: []\n    retry:\n      limit: 5 # number of failed sync attempt retries; unlimited number of attempts if less than 0\n      backoff:\n        duration: 5s # the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")\n        factor: 2 # a factor to multiply the base duration after each failed retry\n        maxDuration: 3m # the maximum amount of time allowed for the backoff strategy\n')),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"And apply it:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f argo/default/apps/my-application.yaml\n")),(0,o.kt)("p",null,"Argo CD will deploy and synchronize automatically by following the HEAD commit. You can also specify the branch instead of ",(0,o.kt)("inlineCode",{parentName:"p"},"HEAD"),"."))}u.isMDXComponent=!0},8145:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/fork_button-0eaa0bb958f213c929f690b73fa13c2e.png"},265:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/image-20220624193812004-950c566d63078e19f0c95f8e387e6609.png"},7837:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/image-20220624194957531-dd9e755a4799530a9c7ac66eac7b636c.png"},5365:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/image-20220624195047988-d41b28d875b7257a18fdf37cf28359ea.png"},8896:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/image-20220624204605963-3ec11b6a06787bd93c16eedc63ae956a.png"}}]);