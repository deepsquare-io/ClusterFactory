"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[696],{34:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>a});var t=o(1527),s=o(2471);const r={},i="Deploying a Rook Cluster",l={id:"guides/storage/deploying-rook-cluster",title:"Deploying a Rook Cluster",description:"Configuration",source:"@site/docs/guides/90-storage/04-deploying-rook-cluster.md",sourceDirName:"guides/90-storage",slug:"/guides/storage/deploying-rook-cluster",permalink:"/docs/guides/storage/deploying-rook-cluster",draft:!1,unlisted:!1,editUrl:"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/guides/90-storage/04-deploying-rook-cluster.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{},sidebar:"docs",previous:{title:"Deploying the Rook Operator",permalink:"/docs/guides/storage/deploying-rook"},next:{title:"Claiming a volume",permalink:"/docs/guides/storage/claiming-volume"}},c={},a=[{value:"Configuration",id:"configuration",level:2},{value:"Exposing to the external network using Multus (experimental)",id:"exposing-to-the-external-network-using-multus-experimental",level:2},{value:"Deploy the cluster",id:"deploy-the-cluster",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"deploying-a-rook-cluster",children:"Deploying a Rook Cluster"}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Deploy the ArgoCD AppProject and namespace first:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:'language-title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/rook-ceph-cluster\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Create a values file based on the example in the ",(0,t.jsx)(n.code,{children:"helm-subcharts/rook-ceph-cluster"})," directory:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"cp helm-subcharts/rook-ceph-cluster/values-example.yaml helm-subcharts/rook-ceph-cluster/values-production.yaml\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Edit the values file."}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["If your storage plane is less than 3 nodes, enable the ",(0,t.jsx)(n.code,{children:"allowMultiplePerNode"})," for MONs and MGRs, or reduce the number of replicas."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsxs)(n.strong,{children:["Configure the ",(0,t.jsx)(n.code,{children:"rook-ceph-cluster.cephClusterSpec.storage"})," to filter the disk"]}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'storage:\n  useAllNodes: false\n  useAllDevices: false\n  deviceFilter: \'\' # You can filter using regex, like this: `^vdb$` will use /dev/vdb\n  # config:\n  #   crushRoot: "custom-root" # specify a non-default root label for the CRUSH map\n  #   metadataDevice: "md0" # specify a non-rotational storage so ceph-volume will use it as block db device of bluestore.\n  #   databaseSizeMB: "1024" # uncomment if the disks are smaller than 100 GB\n  #   osdsPerDevice: "1" # this value can be overridden at the node or device level\n  #   encryptedDevice: "true" # the default value for this option is "false"\n  # # Individual nodes and their config can be specified as well, but \'useAllNodes\' above must be set to false. Then, only the named\n  # # nodes below will be used as storage resources. Each node\'s \'name\' field should match their \'kubernetes.io/hostname\' label.\n  # nodes:\n  #   - name: "172.17.4.201"\n  #     devices: # specific devices to use for storage can be specified for each node\n  #       - name: "sdb"\n  #       - name: "nvme01" # multiple osds can be created on high performance devices\n  #         config:\n  #           osdsPerDevice: "5"\n  #       - name: "/dev/disk/by-id/ata-ST4000DM004-XXXX" # devices can be specified using full udev paths\n  #     config: # configuration can be specified at the node level which overrides the cluster level config\n  #   - name: "172.17.4.301"\n  #     deviceFilter: "^sd."\n'})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["You can configure the ",(0,t.jsx)(n.code,{children:"ingress"})," and CoreDNS if you wish to access the dashboard."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"If you wish for a Rados Block Device (RBD)"}),", which is used for ",(0,t.jsx)(n.code,{children:"ReadWriteOnce"})," volumes, uncomment the ",(0,t.jsx)(n.code,{children:"cephBlockPools"})," fields. Refer to the official ",(0,t.jsx)(n.a,{href:"https://rook.io/docs/rook/latest/Storage-Configuration/Block-Storage-RBD/block-storage/",children:"Rook documentation"})," for configuration details."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"If you wish for a CephFS"}),", which is used for ",(0,t.jsx)(n.code,{children:"ReadWriteMany"})," or ",(0,t.jsx)(n.code,{children:"ReadWriteOnce"})," volumes, uncomment the ",(0,t.jsx)(n.code,{children:"cephFileSystems"})," fields. Refer to the official ",(0,t.jsx)(n.a,{href:"https://rook.io/docs/rook/latest/Storage-Configuration/Shared-Filesystem-CephFS/filesystem-storage/",children:"Rook documentation"})," for configuration details."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"If you wish for a Object Storage (Rados GateWay, RGW)"}),", uncomment the ",(0,t.jsx)(n.code,{children:"cephObjectStores"})," fields. Refer to the official ",(0,t.jsx)(n.a,{href:"https://rook.io/docs/rook/latest/Storage-Configuration/Object-Storage-RGW/object-storage/",children:"Rook documentation"})," for configuration details. You can expose the RGW by filling the ",(0,t.jsx)(n.code,{children:"ingress"})," field. Beware of the ",(0,t.jsx)(n.code,{children:"erasureCoded"})," field which may require you to have at least 3 OSDs. If you are lacking in OSDs, you can enable the ",(0,t.jsx)(n.code,{children:"osdsPerDevice"})," in the storage configuration fields."]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"exposing-to-the-external-network-using-multus-experimental",children:"Exposing to the external network using Multus (experimental)"}),"\n",(0,t.jsx)(n.p,{children:"Rook offers these solutions to expose Rook to the external:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Using ",(0,t.jsx)(n.code,{children:"LoadBalancer"})," Services or Ingresses."]}),"\n",(0,t.jsxs)(n.li,{children:["Using the ",(0,t.jsx)(n.code,{children:"host"})," network by setting the value of ",(0,t.jsx)(n.code,{children:"rook-ceph-cluster.cephClusterSpec.network.provider"})," to ",(0,t.jsx)(n.code,{children:"host"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["Using Multus CNI by setting the value of ",(0,t.jsx)(n.code,{children:"rook-ceph-cluster.cephClusterSpec.network.provider"})," to ",(0,t.jsx)(n.code,{children:"multus"})," (which is experimental). (You can follow more details here: ",(0,t.jsx)(n.a,{href:"https://www.youtube.com/watch?v=zIS5qaG_HRw",children:"CNCF video"}),", ",(0,t.jsx)(n.a,{href:"https://github.com/rook/rook/blob/master/design/ceph/multus-network.md",children:"design"}),")"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["We will focus on the ",(0,t.jsx)(n.strong,{children:"Multus"})," solution as it offers the least of packet encapsulation and gives the best performance:"]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Install the ",(0,t.jsx)(n.a,{href:"https://github.com/k8snetworkplumbingwg/whereabouts",children:"Whereabouts IPAM plugin"})," (this is an alternative to the ",(0,t.jsxs)(n.a,{href:"https://www.cni.dev/plugins/current/ipam/host-local/",children:[(0,t.jsx)(n.code,{children:"host-local"})," IPAM plugin"]}),") by applying:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl -k core/whereabouts\n"})}),"\n",(0,t.jsxs)(n.p,{children:["You can add these lines to the ",(0,t.jsx)(n.code,{children:"scripts/deploy-core"})," script if you want to keep track of these deployments."]}),"\n",(0,t.jsxs)(n.admonition,{type:"info",children:[(0,t.jsxs)(n.p,{children:["To add further detail: ",(0,t.jsx)(n.code,{children:"host-local"})," is used to give IPs to pods within a certain range. It's very similar to DHCP, without the need to use a DHCP server. One difficulty with ",(0,t.jsx)(n.code,{children:"host-local"})," is that the IP allocation state is stored in a file, which is not extensible and does not work on multiple nodes."]}),(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"whereabouts"})," IPAM plugin uses the etcd database instead of files. And by using CRDs, it can integrate with the Kubernetes database."]})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Create two ",(0,t.jsx)(n.code,{children:"NetworkAttachmentDefinition"})," in the ",(0,t.jsx)(n.code,{children:"argo.example/rook-ceph-cluster/network"})," directory:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="argo/rook-ceph-cluster/network/rook-public-net.yaml"',children:'apiVersion: \'k8s.cni.cncf.io/v1\'\nkind: NetworkAttachmentDefinition\nmetadata:\n  name: rook-public-net\n  namespace: rook-ceph-cluster\nspec:\n  config: |\n    {\n      "cniVersion": "0.3.0",\n      "type": "ipvlan",\n      "master": "eth0",\n      "ipam":{\n        "type":"whereabouts",\n        "range": "192.168.0.0/24",\n        "exclude": [\n          "192.168.0.0/30"\n        ]\n      }\n    }\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This network is used by the clients. Clients in the ",(0,t.jsx)(n.code,{children:"192.168.0.0/24"})," will be able to communicate with the Ceph cluster."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="argo/rook-ceph-cluster/network/rook-cluster-net.yaml"',children:'apiVersion: \'k8s.cni.cncf.io/v1\'\nkind: NetworkAttachmentDefinition\nmetadata:\n  name: rook-cluster-net\n  namespace: rook-ceph-cluster\nspec:\n  config: |\n    {\n      "cniVersion": "0.3.0",\n      "type": "ipvlan",\n      "master": "eth0",\n      "ipam":{\n        "type":"whereabouts",\n        "range": "10.11.0.0/24"\n      }\n    }\n'})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsxs)(n.strong,{children:["Change the IPAM ",(0,t.jsx)(n.code,{children:"range"})," and ",(0,t.jsx)(n.code,{children:"excludes"})," accordingly. Also set the ",(0,t.jsx)(n.code,{children:"master"})," interface with a host interface. You can use two network interfaces to separate the public and cluster network."]})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"rook-cluster-net"})," is used internally by the daemons to communicate. While you could use ",(0,t.jsx)(n.code,{children:"rook-public-net"}),", the Rook developers reported that using two networks is more performant."]}),"\n",(0,t.jsx)(n.p,{children:"And apply them:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl -k argo/rook-ceph-cluster/network/\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Uncomment the ",(0,t.jsx)(n.code,{children:"provider: multus"})," field and set the selectors to:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"network:\n  # ...\n  provider: multus\n  selectors:\n    public: rook-ceph-cluster/rook-public-net\n    cluster: rook-ceph-cluster/rook-cluster-net\n"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"deploy-the-cluster",children:"Deploy the cluster"}),"\n",(0,t.jsx)(n.p,{children:"Configure the Argo CD Application:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="argo.example/rook-ceph-cluster/apps/app.yaml"',children:'apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: rook-ceph-cluster-app\n  namespace: argocd\n  finalizers:\n    - resources-finalizer.argocd.argoproj.io\nspec:\n  project: rook-ceph-cluster\n  source:\n    # You should have forked this repo. Change the URL to your fork.\n    repoURL: git@github.com:<your account>/<your repo>.git\n    # You should use your branch too.\n    targetRevision: HEAD\n    path: helm/rook-ceph-cluster\n    helm:\n      releaseName: rook-ceph-cluster\n\n      # Create a values file inside your fork and change the values.\n      valueFiles:\n        - values-production.yaml\n\n  destination:\n    server: \'https://kubernetes.default.svc\'\n    namespace: rook-ceph-cluster\n\n  syncPolicy:\n    automated:\n      prune: true # Specifies if resources should be pruned during auto-syncing ( false by default ).\n      selfHeal: true # Specifies if partial app sync should be executed when resources are changed only in target Kubernetes cluster and no git change detected ( false by default ).\n      allowEmpty: false # Allows deleting all application resources during automatic syncing ( false by default ).\n    syncOptions: []\n    retry:\n      limit: 5 # number of failed sync attempt retries; unlimited number of attempts if less than 0\n      backoff:\n        duration: 5s # the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")\n        factor: 2 # a factor to multiply the base duration after each failed retry\n        maxDuration: 3m # the maximum amount of time allowed for the backoff strategy\n'})}),"\n",(0,t.jsx)(n.p,{children:"And apply it:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"kubectl apply -f argo/rook-ceph-cluster/apps\n"})}),"\n",(0,t.jsx)(n.p,{children:"You should monitor the deployment with Lens."})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},2471:(e,n,o)=>{o.d(n,{Z:()=>l,a:()=>i});var t=o(959);const s={},r=t.createContext(s);function i(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);