"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[8438],{3881:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>i});var r=t(8101);const s={},c=r.createContext(s);function a(e){const n=r.useContext(c);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(c.Provider,{value:n},e.children)}},7417:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"guides/maintenance/backup-restore","title":"Backup and restore","description":"Backup","source":"@site/docs/guides/30-maintenance/03-backup-restore.md","sourceDirName":"guides/30-maintenance","slug":"/guides/maintenance/backup-restore","permalink":"/docs/guides/maintenance/backup-restore","draft":false,"unlisted":false,"editUrl":"https://github.com/deepsquare-io/ClusterFactory/tree/main/web/docs/guides/30-maintenance/03-backup-restore.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{},"sidebar":"docs","previous":{"title":"Updating the K0s cluster","permalink":"/docs/guides/maintenance/updating-k0s-cluster"},"next":{"title":"Ejecting a controller","permalink":"/docs/guides/maintenance/removing-controller"}}');var s=t(5105),c=t(3881);const a={},i="Backup and restore",o={},d=[{value:"Backup",id:"backup",level:2},{value:"Restore",id:"restore",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,c.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"backup-and-restore",children:"Backup and restore"})}),"\n",(0,s.jsx)(n.h2,{id:"backup",children:"Backup"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"cfctl backup\n"})}),"\n",(0,s.jsxs)(n.p,{children:["This will create a ",(0,s.jsx)(n.code,{children:"tar.gz"})," with:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"The certificates (the content of the <data-dir>/pki directory)"}),"\n",(0,s.jsx)(n.li,{children:"An etcd snapshot, if the etcd datastore is used"}),"\n",(0,s.jsx)(n.li,{children:"Any custom-defined manifests under the <data-dir>/manifests"}),"\n",(0,s.jsx)(n.li,{children:"Any image bundles located under the <data-dir>/images"}),"\n",(0,s.jsx)(n.li,{children:"Any helm configuration"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"PersistentVolumes won't be inside the backup."}),"\n",(0,s.jsx)(n.h2,{id:"restore",children:"Restore"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-shell",children:"cfctl apply --debug --restore-from /path/to/backup_file.tar.gz\n"})})]})}function u(e={}){const{wrapper:n}={...(0,c.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}}}]);