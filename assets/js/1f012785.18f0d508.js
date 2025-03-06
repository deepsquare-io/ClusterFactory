"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[5691],{3881:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>l});var s=n(8101);const r={},i=s.createContext(r);function o(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),s.createElement(i.Provider,{value:t},e.children)}},5307:(e,t,n)=>{n.d(t,{A:()=>o});n(8101);var s=n(3526);const r={tabItem:"tabItem_kG01"};var i=n(5105);function o(e){let{children:t,hidden:n,className:o}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,s.A)(r.tabItem,o),hidden:n,children:t})}},7718:(e,t,n)=>{n.d(t,{A:()=>k});var s=n(8101),r=n(3526),i=n(7284),o=n(5234),l=n(6011),a=n(2577),c=n(5038),d=n(8840);function u(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:t,children:n}=e;return(0,s.useMemo)((()=>{const e=t??function(e){return u(e).map((e=>{let{props:{value:t,label:n,attributes:s,default:r}}=e;return{value:t,label:n,attributes:s,default:r}}))}(n);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function h(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function g(e){let{queryString:t=!1,groupId:n}=e;const r=(0,o.W6)(),i=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,a.aZ)(i),(0,s.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(r.location.search);t.set(i,e),r.replace({...r.location,search:t.toString()})}),[i,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,i=p(e),[o,a]=(0,s.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const s=n.find((e=>e.default))??n[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:t,tabValues:i}))),[c,u]=g({queryString:n,groupId:r}),[f,m]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,i]=(0,d.Dv)(n);return[r,(0,s.useCallback)((e=>{n&&i.set(e)}),[n,i])]}({groupId:r}),y=(()=>{const e=c??f;return h({value:e,tabValues:i})?e:null})();(0,l.A)((()=>{y&&a(y)}),[y]);return{selectedValue:o,selectValue:(0,s.useCallback)((e=>{if(!h({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);a(e),u(e),m(e)}),[u,m,i]),tabValues:i}}var m=n(4553);const y={tabList:"tabList_SzpM",tabItem:"tabItem_PF36"};var v=n(5105);function x(e){let{className:t,block:n,selectedValue:s,selectValue:o,tabValues:l}=e;const a=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.a_)(),d=e=>{const t=e.currentTarget,n=a.indexOf(t),r=l[n].value;r!==s&&(c(t),o(r))},u=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=a.indexOf(e.currentTarget)+1;t=a[n]??a[0];break}case"ArrowLeft":{const n=a.indexOf(e.currentTarget)-1;t=a[n]??a[a.length-1];break}}t?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":n},t),children:l.map((e=>{let{value:t,label:n,attributes:i}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:s===t?0:-1,"aria-selected":s===t,ref:e=>{a.push(e)},onKeyDown:u,onClick:d,...i,className:(0,r.A)("tabs__item",y.tabItem,i?.className,{"tabs__item--active":s===t}),children:n??t},t)}))})}function b(e){let{lazy:t,children:n,selectedValue:i}=e;const o=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===i));return e?(0,s.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,s.cloneElement)(e,{key:t,hidden:e.props.value!==i})))})}function j(e){const t=f(e);return(0,v.jsxs)("div",{className:(0,r.A)("tabs-container",y.tabList),children:[(0,v.jsx)(x,{...t,...e}),(0,v.jsx)(b,{...t,...e})]})}function k(e){const t=(0,m.A)();return(0,v.jsx)(j,{...e,children:u(e.children)},String(t))}},9728:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"guides/provisioning/gitops-with-grendel","title":"GitOps with Grendel","description":"Postscript strategy","source":"@site/docs/guides/50-provisioning/03-gitops-with-grendel.mdx","sourceDirName":"guides/50-provisioning","slug":"/guides/provisioning/gitops-with-grendel","permalink":"/docs/guides/provisioning/gitops-with-grendel","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/guides/50-provisioning/03-gitops-with-grendel.mdx","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{},"sidebar":"docs","previous":{"title":"Build an OS Image with Packer","permalink":"/docs/guides/provisioning/packer-build"},"next":{"title":"Deploying SLURM Cluster","permalink":"/docs/guides/slurm/deploy-slurm"}}');var r=n(5105),i=n(3881);n(7718),n(5307);const o={},l="GitOps with Grendel",a={},c=[{value:"Postscript strategy",id:"postscript-strategy",level:2},{value:"GitHub configuration",id:"github-configuration",level:2},{value:"You first postscript tracked with Git",id:"you-first-postscript-tracked-with-git",level:3},{value:"Adding a deploy key",id:"adding-a-deploy-key",level:3},{value:"Node Configuration: Sending the private key to the compute nodes",id:"node-configuration-sending-the-private-key-to-the-compute-nodes",level:2},{value:"Grendel configuration",id:"grendel-configuration",level:2},{value:"Setup the Grendel postscript for GitOps",id:"setup-the-grendel-postscript-for-gitops",level:3},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"gitops-with-grendel",children:"GitOps with Grendel"})}),"\n","\n",(0,r.jsx)(t.h2,{id:"postscript-strategy",children:"Postscript strategy"}),"\n",(0,r.jsx)(t.p,{children:"If you've looked inside the Packer recipes, you can see that there is a systemd service that will run to fetch the postscript on Grendel:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-shell",metastring:'title="Extract of ks.bare.cfg"',children:'cat << \'END\' >/pull-postscript.sh\n#!/bin/sh\nset -ex\n\nHOSTNAME="$(sed -E \'s/^.*grendel.hostname=([^ ]*).*$/\\1/\' /proc/cmdline)"\nhostnamectl set-hostname "${HOSTNAME}"\n\nGRENDEL_ADDRESS="$(sed -E \'s/^.*grendel.address=([^ ]*).*$/\\1/\' /proc/cmdline)"\n\ncurl -fsSL ${GRENDEL_ADDRESS}/repo/postscript.sh -o /postscript.sh\nchmod +x /postscript.sh\n/postscript.sh ${HOSTNAME}\nEND\n\nchmod +x /pull-postscript.sh\n\ncat <<\'END\' >/etc/systemd/system/grendel-postscript.service\n[Unit]\nDescription=Grendel Postscript\nAfter=network-online.target\nWants=network-online.target\n\n[Service]\nType=simple\nExecStart=/pull-postscript.sh\n\n[Install]\nWantedBy=multi-user.target\nEND\nln -s "/etc/systemd/system/grendel-postscript.service" "/etc/systemd/system/multi-user.target.wants/grendel-postscript.service"\n'})}),"\n",(0,r.jsx)(t.p,{children:"The postscript is defined inside the Grendel configuration:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",metastring:'title="helm/grendel/values-production.yaml"',children:"config:\n  postscript: ''\n"})}),"\n",(0,r.jsx)(t.p,{children:"The strategy to enable GitOps is the following:"}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsx)(t.li,{children:"The systemd service pull the grendel postscript."}),"\n",(0,r.jsx)(t.li,{children:"The grendel postscript fetches the ssh private key from the grendel HTTP server."}),"\n",(0,r.jsxs)(t.li,{children:["The grendel postscript ",(0,r.jsx)(t.code,{children:"git clone"})," a repository containing other postscripts by using the ssh private key."]}),"\n",(0,r.jsx)(t.li,{children:"After cloning the repository, grendel executes the postscripts."}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"github-configuration",children:"GitHub configuration"}),"\n",(0,r.jsx)(t.h3,{id:"you-first-postscript-tracked-with-git",children:"You first postscript tracked with Git"}),"\n",(0,r.jsxs)(t.p,{children:["Create a ",(0,r.jsx)(t.strong,{children:"private"})," Git repository for your scripts and add a ",(0,r.jsx)(t.code,{children:"post.sh"})," script."]}),"\n",(0,r.jsx)(t.p,{children:"This script is the main entry point. If you want to add a hierarchy, you use this script:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-shell",metastring:'title="Example of postscript"',children:'#!/bin/sh\n\n# Find all the executable scripts and sort them by name\nscripts=$(find ./scripts -type f | sort)\n\n# Loop through each script and execute it\nfor script in $scripts; do\n  # Check if the script needs to be chmod-ed\n  if [ ! -x "$script" ]; then\n    chmod +x "$script"\n  fi\n\n  # Execute the script\n  "./$script"\ndone\n'})}),"\n",(0,r.jsxs)(t.p,{children:["This script will execute all the files inside the ",(0,r.jsx)(t.code,{children:"scripts"})," folder in alphabetical order. So you need to create a ",(0,r.jsx)(t.code,{children:"scripts"})," folder with scripts inside."]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"Commit and push everything."})}),"\n",(0,r.jsx)(t.h3,{id:"adding-a-deploy-key",children:"Adding a deploy key"}),"\n",(0,r.jsx)(t.p,{children:"Generate a key pair using:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-shell",children:"ssh-keygen -f $(pwd)/id_rsa -C grendel\n"})}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsxs)(t.a,{href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#set-up-deploy-keys",children:["And add the ",(0,r.jsx)(t.code,{children:"id_rsa.pub"})," as a deploy key."]})}),"\n",(0,r.jsx)(t.h2,{id:"node-configuration-sending-the-private-key-to-the-compute-nodes",children:"Node Configuration: Sending the private key to the compute nodes"}),"\n",(0,r.jsxs)(t.p,{children:["Assuming ",(0,r.jsx)(t.code,{children:"/dev/nvme0n1"})," is the disk storing the private key, add the private key to the disk of the compute nodes:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-shell",metastring:'title="root@cn1:/root"',children:"mkdir -p /secret\nmount /dev/nvme0n1 /secret\ncat << 'EOF' > /secret/key\n-----BEGIN OPENSSH PRIVATE KEY-----\n<your private key>\n-----END OPENSSH PRIVATE KEY-----\nEOF\nchmod 600 /secret/key\numount /secret\n"})}),"\n",(0,r.jsx)(t.p,{children:"This key will be protected via Linux permissions and will be accessible only by the root user."}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"This step has to be done manually."})}),"\n",(0,r.jsx)(t.h2,{id:"grendel-configuration",children:"Grendel configuration"}),"\n",(0,r.jsx)(t.h3,{id:"setup-the-grendel-postscript-for-gitops",children:"Setup the Grendel postscript for GitOps"}),"\n",(0,r.jsxs)(t.p,{children:["In the Grendel values file, change the ",(0,r.jsx)(t.code,{children:"postscript"})," field to:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",metastring:'title="helm/grendel/values-production.yaml"',children:"config:\n  postscript: |\n    #!/bin/sh\n\n    set -ex\n\n    # Fetch deploy key\n    mkdir -p /secret\n    mount /dev/nvme0n1 /secret  # HERE!!!!: Change the device with the disk which will store the private key.\n\n    # Cloning git repo containing postscripts.\n    mkdir -p /configs\n    GIT_SSH_COMMAND='ssh -i /secret/key -o IdentitiesOnly=yes -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null' git clone git@github.com:<repo owner>/<repo>.git /configs\n    if [ -f /configs/post.sh ] && [ -x /configs/post.sh ]; then\n      cd /configs || exit 1\n      ./post.sh \"$1\"\n    fi\n\n    # Security\n    chmod -R g-rwx,o-rwx .\n    umount -f /secret\n"})}),"\n",(0,r.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,r.jsx)(t.p,{children:"And that's it! With this, the node postscripts will be tracked on Git and you won't be lost in your node configuration."})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}}}]);