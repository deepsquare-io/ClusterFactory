"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[4996],{3881:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>i});var s=r(8101);const t={},o=s.createContext(t);function a(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(o.Provider,{value:n},e.children)}},4874:(e,n,r)=>{r.d(n,{A:()=>s});const s=r.p+"assets/images/metallb_concepts-afe86a92b9fa058b25211ba9e095608d.png"},9784:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"getting-started/core-apps-deployment","title":"4. Core Apps Deployment","description":"We will deploy:","source":"@site/docs/getting-started/04-core-apps-deployment.md","sourceDirName":"getting-started","slug":"/getting-started/core-apps-deployment","permalink":"/docs/getting-started/core-apps-deployment","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/getting-started/04-core-apps-deployment.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{},"sidebar":"docs","previous":{"title":"3. K0s Configuration","permalink":"/docs/getting-started/k0s-configuration"},"next":{"title":"5. Adding the Git repository to ArgoCD","permalink":"/docs/getting-started/adding-repository-argocd"}}');var t=r(5105),o=r(3881);const a={},i="4. Core Apps Deployment",l={},c=[{value:"Configuring MetalLB",id:"configuring-metallb",level:2},{value:"Multi-zone (BGP)",id:"multi-zone-bgp",level:3},{value:"Single zone (L2/ARP)",id:"single-zone-l2arp",level:3},{value:"Configuring Traefik",id:"configuring-traefik",level:2},{value:"CoreDNS configuration",id:"coredns-configuration",level:2},{value:"Configure the cert-manager issuers",id:"configure-the-cert-manager-issuers",level:2},{value:"Configure the route and certificate for the ArgoCD dashboard",id:"configure-the-route-and-certificate-for-the-argocd-dashboard",level:2},{value:"Deploying the core apps",id:"deploying-the-core-apps",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"4-core-apps-deployment",children:"4. Core Apps Deployment"})}),"\n",(0,t.jsx)(n.p,{children:"We will deploy:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Traefik, the Ingress Controller"}),"\n",(0,t.jsx)(n.li,{children:"MetalLB advertisements, for Load Balancing"}),"\n",(0,t.jsx)(n.li,{children:"CoreDNS, the internal DNS for Kubernetes"}),"\n",(0,t.jsx)(n.li,{children:"Sealed Secrets, secret management optimized for GitOps"}),"\n",(0,t.jsx)(n.li,{children:"Cert-manager issuers, generate your SSL certificates and enable, for free, TLS configuration."}),"\n",(0,t.jsx)(n.li,{children:"Argo CD, to enable GitOps."}),"\n",(0,t.jsx)(n.li,{children:"Multus CNI, to support multiple network interfaces"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"configuring-metallb",children:"Configuring MetalLB"}),"\n",(0,t.jsx)(n.p,{children:"We need to configure MetalLB to expose Kubernetes Services like Traefik to the external network."}),"\n",(0,t.jsxs)(n.p,{children:["MetalLB is an L2/L3 load balancer designed for bare metal Kubernetes clusters. It exposes the Kubernetes ",(0,t.jsx)(n.code,{children:"Services"}),' to the external network. It uses either L2 (ARP) or BGP to advertise routes. It is possible to make "zoned" advertisements with L2, but we heavily recommend using BGP for multi-zone clusters.']}),"\n",(0,t.jsx)("div",{style:{textAlign:"center"},children:(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"metallb_concepts",src:r(4874).A+"#white-bg",width:"860",height:"831"})})}),"\n",(0,t.jsx)(n.h3,{id:"multi-zone-bgp",children:"Multi-zone (BGP)"}),"\n",(0,t.jsx)(n.p,{children:"This is the most stable solution, the router must be capable of using BGP. If not, you should use an appliance with BGP capabilities (like OPNsense, OpenWRT, vyOS, or Linux with BIRD) which can act like a router."}),"\n",(0,t.jsxs)(n.p,{children:["Let's start configuring the main ",(0,t.jsx)(n.code,{children:"IPAddressPool"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="core/metallb/address-pools.yaml"',children:"apiVersion: metallb.io/v1beta1\nkind: IPAddressPool\nmetadata:\n  name: main-pool\n  namespace: metallb\nspec:\n  addresses:\n    - 192.168.1.100/32\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The indicated IP address will be allocated to the ",(0,t.jsx)(n.code,{children:"LoadBalancer"})," Kubernetes Services, which is Traefik."]}),"\n",(0,t.jsxs)(n.p,{children:["We should now advertise the IP address by configuring a ",(0,t.jsx)(n.code,{children:"BGPAdvertisement"})," and its peers:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="core/metallb/peers.yaml"',children:"apiVersion: metallb.io/v1beta2\nkind: BGPPeer\nmetadata:\n  name: main-router\n  namespace: metallb\nspec:\n  myASN: 65001 # MetalLB Speaker ASN (Autonomous System Number)\n  peerASN: 65000 # The router ASN\n  peerAddress: 192.168.0.1 # The router address\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="core/metallb/advertisements.yaml"',children:"apiVersion: metallb.io/v1beta1\nkind: BGPAdvertisement\nmetadata:\n  name: bgp-advertisement\n  namespace: metallb\nspec:\n  ipAddressPools:\n    - main-pool\n"})}),"\n",(0,t.jsxs)(n.p,{children:["With this configuration, the MetalLB speakers on all the nodes will advertise the IP address ",(0,t.jsx)(n.code,{children:"192.168.1.100/32"})," to the router, which is at ",(0,t.jsx)(n.code,{children:"192.168.0.1"}),". By receiving the advertisement, the router will create a BGP route ",(0,t.jsx)(n.code,{children:"192.168.1.100/32 via <ip of the node>"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"single-zone-l2arp",children:"Single zone (L2/ARP)"}),"\n",(0,t.jsxs)(n.p,{children:["Let's start configuring the main ",(0,t.jsx)(n.code,{children:"IPAddressPool"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="core/metallb/address-pools.yaml"',children:"apiVersion: metallb.io/v1beta1\nkind: IPAddressPool\nmetadata:\n  name: main-pool\n  namespace: metallb\nspec:\n  addresses:\n    - 192.168.0.100/32\n"})}),"\n",(0,t.jsx)(n.p,{children:"By using ARP, every machine in the super net will be able to see that machine. For example, we are announcing 192.168.0.100. This IP is part of 192.168.0.0/24 and therefore, all the machines will be able to see 192.168.0.100."}),"\n",(0,t.jsxs)(n.p,{children:["The indicated IP address will be allocated to the ",(0,t.jsx)(n.code,{children:"LoadBalancer"})," Kubernetes Services, which is Traefik."]}),"\n",(0,t.jsxs)(n.p,{children:["We should now advertise the IP address by configuring a ",(0,t.jsx)(n.code,{children:"L2Advertisement"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="core/metallb/advertisements.yaml"',children:"apiVersion: metallb.io/v1beta1\nkind: L2Advertisement\nmetadata:\n  name: l2-advertisement\n  namespace: metallb\nspec:\n  ipAddressPools:\n    - main-pool\n"})}),"\n",(0,t.jsxs)(n.p,{children:["That's all! The MetalLB speakers on all the nodes will advertise the IP address ",(0,t.jsx)(n.code,{children:"192.168.1.100/32"})," to the router via ARP. You can also use an IP in the same subnet as the host."]}),"\n",(0,t.jsx)(n.h2,{id:"configuring-traefik",children:"Configuring Traefik"}),"\n",(0,t.jsx)(n.p,{children:"Traefik is the main L7 load balancer and router. It is mostly used to route HTTP packets based on rules (URL path, headers, ...)."}),"\n",(0,t.jsxs)(n.p,{children:["To configure Traefik, edit the ",(0,t.jsx)(n.code,{children:"core/traefik/values.yaml"})," file, which is the main configuration file."]}),"\n",(0,t.jsxs)(n.p,{children:["You should look for ",(0,t.jsx)(n.code,{children:"loadBalancerIP"})," and the ",(0,t.jsx)(n.code,{children:"metallb.universe.tf"})," annotations:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="core/traefik/values.yaml"',children:"service:\n  enabled: true\n  annotations:\n    metallb.universe.tf/address-pool: main-pool\n    metallb.universe.tf/allow-shared-ip: traefik-lb-key\n  spec:\n    externalTrafficPolicy: Cluster # Load Balance horizontally via MetalLB too\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Since we are using MetalLB, we select our ",(0,t.jsx)(n.code,{children:"IPAddressPool"})," by using the ",(0,t.jsx)(n.code,{children:"metallb.universe.tf/address-pool"})," annotation."]}),"\n",(0,t.jsx)(n.p,{children:"After that, you can add or remove ports:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="core/traefik/values.yaml"',children:"ports:\n  traefik:\n    port: 9000\n    expose: true\n    exposedPort: 9000\n    protocol: TCP\n  dns-tcp:\n    port: 8053\n    expose: true\n    exposedPort: 53\n    protocol: TCP\n  dns-udp:\n    port: 8054\n    expose: true\n    exposedPort: 53\n    protocol: UDP\n  web:\n    port: 80\n    expose: true\n    exposedPort: 80\n    protocol: TCP\n  websecure:\n    port: 443\n    expose: true\n    exposedPort: 443\n    protocol: TCP\n    # You MUST open port 443 UDP!\n    # HTTP3 upgrades the connection from TCP to UDP.\n    http3:\n      enabled: true\n    tls:\n      enabled: true\n  metrics:\n    port: 9100\n    expose: false\n    exposedPort: 9100\n    protocol: TCP\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Since Traefik will be used as the main Ingress, these ports will be exposed to the external network if ",(0,t.jsx)(n.code,{children:"expose"})," is set to true."]}),"\n",(0,t.jsx)(n.p,{children:"You can also configure the dashboard route:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"ingressRoute:\n  dashboard:\n    enabled: true\n    # See your DNS configuration\n    matchRule: Host(`traefik.internal`)\n    entryPoints: ['traefik']\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This means that the Traefik dashboard is accessible to ",(0,t.jsx)(n.code,{children:"traefik.internel"})," on the ",(0,t.jsx)(n.code,{children:"traefik"})," entry point, which is the 9000/tcp port. In short: ",(0,t.jsx)(n.a,{href:"http://traefik.internal:9000/dashboard/",children:"http://traefik.internal:9000/dashboard/"})," (the trailing slash is important)."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsxs)(n.strong,{children:["Your DNS should be configured to redirect ",(0,t.jsx)(n.code,{children:"traefik.internal"})," to the load balancer at ",(0,t.jsx)(n.code,{children:"192.168.1.100"})," (or ",(0,t.jsx)(n.code,{children:"192.168.0.100"})," if using L2). Fortunately, we configure and expose our the CoreDNS."]})}),"\n",(0,t.jsxs)(n.p,{children:["For the rest of the guide, we will assume that you have announced ",(0,t.jsx)(n.code,{children:"192.168.1.100/32"})," to the router."]}),"\n",(0,t.jsx)(n.h2,{id:"coredns-configuration",children:"CoreDNS configuration"}),"\n",(0,t.jsxs)(n.p,{children:["The CoreDNS given by k0s does not meet our needs, so we added ",(0,t.jsx)(n.code,{children:"--disable-components coredns"})," in the ",(0,t.jsx)(n.code,{children:"installFlags"})," of ",(0,t.jsx)(n.code,{children:"cfctl.yaml"}),". We will deploy our own."]}),"\n",(0,t.jsxs)(n.p,{children:["CoreDNS will be exposed to the external network thanks to the ",(0,t.jsx)(n.code,{children:"IngressRoute"})," objects in the ",(0,t.jsx)(n.a,{href:"https://github.com/deepsquare-io/ClusterFactory/blob/main/core.example/coredns/overlays/prod/ingress-route.yaml",children:(0,t.jsx)(n.code,{children:"core/coredns/overlays/prod/ingress-route.yaml"})}),". ",(0,t.jsxs)(n.strong,{children:["It is also exposed using ",(0,t.jsx)(n.code,{children:"hostPort"})," (",(0,t.jsx)(n.a,{href:"https://github.com/deepsquare-io/ClusterFactory/blob/main/core.example/coredns/overlays/prod/daemonset.yaml",children:(0,t.jsx)(n.code,{children:"core/coredns/overlays/prod/daemonset.yaml"})}),")."]})]}),"\n",(0,t.jsxs)(n.admonition,{type:"caution",children:[(0,t.jsxs)(n.p,{children:["Since ",(0,t.jsx)(n.code,{children:"hostPort"})," will be used, make sure the host does not have port 53/udp busy. On most systems with SystemD, this port is occupied by a stub listener. Open the ",(0,t.jsx)(n.code,{children:"/etc/systemd/resolved.conf"})," configuration file on the Kubernetes hosts and disable the stub listener by setting ",(0,t.jsx)(n.code,{children:"DNSStubListener"})," to ",(0,t.jsx)(n.code,{children:"no"}),". Finally, restart the service with ",(0,t.jsx)(n.code,{children:"systemctl restart systemd-resolved.service"}),"."]}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",metastring:'title="user@local:/ClusterFactory"',children:"./scripts/deploy-core\n"})})]}),"\n",(0,t.jsxs)(n.p,{children:["The files that you should look for are ",(0,t.jsx)(n.a,{href:"https://github.com/deepsquare-io/ClusterFactory/blob/main/core.example/coredns/overlays/prod/configmap.yaml",children:(0,t.jsx)(n.code,{children:"core/coredns/overlays/prod/configmap.yaml"})})," and ",(0,t.jsx)(n.a,{href:"https://github.com/deepsquare-io/ClusterFactory/blob/main/core.example/coredns/overlays/prod/daemonset.yaml",children:(0,t.jsx)(n.code,{children:"core/coredns/overlays/prod/daemonset.yaml"})}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Inside the ",(0,t.jsx)(n.code,{children:"ConfigMap"}),", you'll find:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="core/coredns/overlays/prod/configmap.yaml"',children:"apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: coredns\n  namespace: kube-system\n  labels:\n    k0s.k0sproject.io/stack: coredns\ndata:\n  Corefile: |\n    .:53 {\n      errors\n      health {\n        lameduck 5s\n      }\n      ready\n      kubernetes cluster.local in-addr.arpa ip6.arpa {\n        pods insecure\n        fallthrough in-addr.arpa ip6.arpa\n        ttl 30\n      }\n      prometheus :9153\n      forward . 8.8.8.8\n      cache 30\n      loop\n      reload\n      loadbalance\n      }\n      internal:53 {\n        log\n        errors\n        ready\n        hosts /etc/coredns/internal.db\n        reload\n      }\n      example.com:53 {\n        log\n        errors\n        ready\n        hosts /etc/coredns/example.com.db\n        reload\n      }\n\n  internal.db: |\n    192.168.1.100 traefik.internal\n    192.168.1.100 argocd.internal\n\n  example.com.db: |\n    # Examples of external services\n    192.168.0.1 gateway.example.com\n    192.168.0.2 mn1.example.com\n    192.168.0.3 grendel.example.com\n    192.168.0.5 cvmfs.example.com\n    192.168.0.6 nfs.example.com\n    192.168.0.7 mysql.example.com\n    192.168.0.8 ldap.example.com\n\n    192.168.0.10 slurm-cluster-example-controller-0.example.com\n    192.168.0.20 slurm-cluster-example-login-0.example.com\n    192.168.0.21 slurm-cluster-example-login-1.example.com\n    192.168.0.51 cn1.example.com\n\n    # Internal services\n    192.168.1.100 prometheus.example.com\n    192.168.1.100 grafana.example.com\n"})}),"\n",(0,t.jsx)(n.p,{children:"There are three DNS zones in this configuration:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The general zone ",(0,t.jsx)(n.code,{children:".:53"}),", which forwards DNS requests to ",(0,t.jsx)(n.code,{children:"8.8.8.8"})," and announces the Kubernetes Services and Pod domain names."]}),"\n",(0,t.jsxs)(n.li,{children:["The internal zone ",(0,t.jsx)(n.code,{children:"internal:53"}),", which contains rules to access the ArgoCD and Traefik dashboard."]}),"\n",(0,t.jsxs)(n.li,{children:["The internal zone ",(0,t.jsx)(n.code,{children:"example.com:53"}),", which contains examples of rules to access to other services."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsxs)(n.strong,{children:["Modify the zones with your own custom ones and update the ",(0,t.jsx)(n.code,{children:"forward"})," field with your preferred DNS."]})," Additionally, you can add, remove or modify domain names as per your requirements. Please note the following:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"For Kubernetes Services that are routed through the Traefik Load Balancer, you must use the MetalLB IP."}),"\n",(0,t.jsxs)(n.li,{children:["If you are using ",(0,t.jsx)(n.code,{children:"hostPort"})," on your pod (such as the Slurm Controller), set the IP to be the Kubernetes host that is hosting the pod."]}),"\n",(0,t.jsx)(n.li,{children:"If you are using IPVLAN, set the IP to be the IP that you declared in the IPVLAN settings."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"You should configure the DNS of your machines to use CoreDNS."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-conf",metastring:'title="resolv.conf"',children:"nameserver 192.168.1.100\nsearch example.com\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"warning",children:(0,t.jsx)(n.p,{children:"Be aware of the chicken-egg problem, you do NOT want to have the Kubernetes hosts using the DNS."})}),"\n",(0,t.jsxs)(n.admonition,{type:"warning",children:[(0,t.jsxs)(n.p,{children:["If some files were added and removed, you must change the ",(0,t.jsx)(n.code,{children:"daemonset.yaml"}),":"]}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-diff",metastring:'title="core/coredns/overlays/prod/daemonset.yaml > spec > template > spec > volumes"',children:"        volumes:\n          - name: config-volume\n            configMap:\n              name: coredns\n              items:\n                - key: Corefile\n                  path: Corefile\n                - key: example.com.db\n                  path: example.com.db\n                - key: internal.db\n                  path: internal.db\n+               - key: your.new.file.db\n+                 path: your.new.file.db\n              defaultMode: 420\n"})}),(0,t.jsxs)(n.admonition,{type:"note",children:[(0,t.jsx)(n.h2,{id:"configure-the-cert-manager-issuers",children:"Configure the cert-manager issuers"}),(0,t.jsxs)(n.p,{children:["Specify new certificate issuers in the ",(0,t.jsx)(n.code,{children:"core/cert-manager"})," directory."]}),(0,t.jsxs)(n.p,{children:["It is highly recommended adding your own private certificate authority, follow the ",(0,t.jsx)(n.a,{href:"https://cert-manager.io/docs/configuration/ca/",children:"official guide of cert-manager"}),"."]}),(0,t.jsxs)(n.p,{children:["You must create a Secret ",(0,t.jsx)(n.code,{children:"ca-key-pair"}),". To generate a TLS certificate and its private key:"]}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-shell",children:"openssl genrsa -out tls.key 2048\nopenssl req -x509 -sha256 -new -nodes -key tls.key -days 3650 -out tls.crt\nkubectl create secret tls ca-key-pair -n cert-manager --cert=tls.crt --key=tls.key\nrm ca-key-pair-secret.yaml\n"})}),(0,t.jsx)(n.p,{children:"Then you can create a private ClusterIssuer:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="private-cluster-issuer.yaml"',children:"apiVersion: cert-manager.io/v1\nkind: ClusterIssuer\nmetadata:\n  name: private-cluster-issuer\n  namespace: cert-manager\nspec:\n  ca:\n    secretName: ca-key-pair\n"})}),(0,t.jsx)(n.p,{children:"Edit the production ClusterIssuer to use your email address:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="production-cluster-issuer.yaml"',children:"apiVersion: cert-manager.io/v1\nkind: ClusterIssuer\nmetadata:\n  name: production-cluster-issuer\n  namespace: cert-manager\nspec:\n  acme:\n    email: john.smith@example.com\n    server: https://acme-staging-v02.api.letsencrypt.org/directory\n    privateKeySecretRef:\n      name: production-cluster-issuer-account-key\n    solvers:\n      - http01:\n          ingress:\n            class: traefik\n"})}),(0,t.jsx)(n.p,{children:"The production ClusterIssuer will contact the ACME servers to generate public TLS certificates on trusted root CA servers."}),(0,t.jsx)(n.h2,{id:"configure-the-route-and-certificate-for-the-argocd-dashboard",children:"Configure the route and certificate for the ArgoCD dashboard"}),(0,t.jsxs)(n.p,{children:["ArgoCD has a dashboard. To change the URL and certificate, modify the ",(0,t.jsx)(n.code,{children:"ingress-route.yaml"})," file and ",(0,t.jsx)(n.code,{children:"certificate.yaml"})," in the ",(0,t.jsx)(n.code,{children:"core/argo-cd"})," directory."]}),(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Make sure the domain name correspond to the ones defined in the CoreDNS (or in your private DNS)."})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",metastring:'title="Example of ingress-route.yaml for ArgoCD"',children:"apiVersion: traefik.io/v1alpha1\nkind: IngressRoute\nmetadata:\n  name: argocd-server-https\n  namespace: argocd\n  labels:\n    app.kubernetes.io/name: argocd-server-https\n    app.kubernetes.io/component: ingress-route\nspec:\n  entryPoints:\n    - websecure\n  routes:\n    - kind: Rule\n      match: Host(`argocd.internal`)\n      priority: 10\n      services:\n        - name: argocd-server\n          port: 80\n    - kind: Rule\n      match: Host(`argocd.internal`) && HeadersRegexp(`Content-Type`, `^application/grpc.*$`)\n      priority: 11\n      services:\n        - name: argocd-server\n          port: 80\n          scheme: h2c\n  tls:\n    secretName: argocd.internal-secret\n"})}),(0,t.jsx)(n.p,{children:"IngressRoute allows us to create more complex routing rules than the classic Ingress. However, Ingress can automatically generate a TLS certificate by using annotations, without the need to create a Certificate resource."}),(0,t.jsx)(n.p,{children:"Our recommendation is to use Ingress for simple routes with HTTP. Otherwise, IngressRoute is the best solution for all cases."}),(0,t.jsx)(n.h2,{id:"deploying-the-core-apps",children:"Deploying the core apps"}),(0,t.jsxs)(n.p,{children:["Run the ",(0,t.jsx)(n.code,{children:"./scripts/deploy-core"})," script to deploy the core applications. This should deploy:"]}),(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Traefik"}),"\n",(0,t.jsx)(n.li,{children:"CoreDNS"}),"\n",(0,t.jsx)(n.li,{children:"MetalLB"}),"\n",(0,t.jsx)(n.li,{children:"MultusCNI"}),"\n",(0,t.jsx)(n.li,{children:"sealed-secrets"}),"\n",(0,t.jsx)(n.li,{children:"cert-manager"}),"\n",(0,t.jsx)(n.li,{children:"ArgoCD"}),"\n"]}),(0,t.jsx)(n.p,{children:"If the script fails, you can run it again without harming the cluster."}),(0,t.jsx)(n.p,{children:"If CoreDNS and the IngressRoutes are configured, you should be able to access the ArgoCD dashboard and Traefik dashboard."}),(0,t.jsxs)(n.p,{children:["Congratulations! You have successfully deployed a Kubernetes Cluster with the minimum requirements. We still recommend deploying the Monitoring stack to monitor the RAM and CPU usage of the containers. Nevertheless, you can follow the ",(0,t.jsx)(n.a,{href:"/docs/guides/installing-the-utilities",children:"guides"}),", learn the ",(0,t.jsx)(n.a,{href:"/docs/main-concepts/k0s",children:"main concepts of ClusterFactory"}),", or continue the ",(0,t.jsx)(n.a,{href:"./adding-repository-argocd",children:"Getting Started"}),"."]})]})]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}}}]);