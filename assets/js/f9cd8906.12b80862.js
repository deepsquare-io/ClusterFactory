"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[2253],{9613:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return f}});var r=n(9496);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),p=c(n),f=o,m=p["".concat(u,".").concat(f)]||p[f]||d[f]||i;return n?r.createElement(m,a(a({ref:t},l),{},{components:n})):r.createElement(m,a({ref:t},l))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=p;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},786:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return u},default:function(){return f},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return d}});var r=n(665),o=n(151),i=(n(9496),n(9613)),a=["components"],s={},u="Contributing",c={unversionedId:"see-also/contributing",id:"see-also/contributing",title:"Contributing",description:"You can read the contributing guide in the official GitHub repository.",source:"@site/docs/see-also/01-contributing.md",sourceDirName:"see-also",slug:"/see-also/contributing",permalink:"/docs/see-also/contributing",draft:!1,editUrl:"https://github.com/SquareFactory/ClusterFactory-CE/tree/main/web/docs/see-also/01-contributing.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"docs",previous:{title:"cfctl.yaml",permalink:"/docs/reference/cfctl.yaml"},next:{title:"Frequently Asked Questions",permalink:"/docs/see-also/faq"}},l={},d=[{value:"Welcome",id:"welcome",level:2},{value:"Helping out in the issue database",id:"helping-out-in-the-issue-database",level:2},{value:"Quality Assurance",id:"quality-assurance",level:2},{value:"Documentation",id:"documentation",level:2}],p={toc:d};function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"contributing"},"Contributing"),(0,i.kt)("p",null,"You can read the contributing guide in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/SquareFactory/ClusterFactory-CE/blob/main/CONTRIBUTING.md"},"official GitHub repository"),"."),(0,i.kt)("h2",{id:"welcome"},"Welcome"),(0,i.kt)("p",null,"Everyone is welcome to contribute code via pull requests, to file issues on\nGitHub, to help triage, reproduce, or fix bugs that people have filed, to add to\nour documentation, or to help out in any other way."),(0,i.kt)("p",null,"We can grant commit access (which includes full rights to the issue database, such as being able to edit labels) to people who have gained our trust and demonstrated a commitment to ClusterFactory."),(0,i.kt)("h2",{id:"helping-out-in-the-issue-database"},"Helping out in the issue database"),(0,i.kt)("p",null,"Triage is the process of going through bugs and determining if they are valid, finding out how to reproduce them, catching duplicate reports, and generally making our issues list useful for our engineers."),(0,i.kt)("p",null,"If you want to help us triage, you are very welcome to do so!"),(0,i.kt)("h2",{id:"quality-assurance"},"Quality Assurance"),(0,i.kt)("p",null,"One of the most useful tasks, closely related to triage, is finding and filing bugs. Testing beta releases, looking for regressions, creating test cases, adding to our test suites, and other work along these lines can drive the quality of the product up. Creating tests that increase our test coverage, writing tests for issues others have filed, all these tasks are really valuable contributions to open source projects."),(0,i.kt)("h2",{id:"documentation"},"Documentation"),(0,i.kt)("p",null,"Another great area to contribute is sample code and API documentation. Most\nof the documentation is written inside the ",(0,i.kt)("inlineCode",{parentName:"p"},"web")," directory. Feel free to add diagrams and sample code to our documentation!"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"argo")," directory is also an ",(0,i.kt)("inlineCode",{parentName:"p"},"example")," directory. Feel free to add new applications or modify ours!"))}f.isMDXComponent=!0}}]);