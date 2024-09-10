"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[7918],{6026:(e,t,s)=>{s.r(t),s.d(t,{default:()=>le});var n=s(5271),a=s(7227),i=s(1269),o=s(2676);const l=n.createContext(null);function r(e){let{children:t,content:s}=e;const a=function(e){return(0,n.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(s);return(0,o.jsx)(l.Provider,{value:a,children:t})}function c(){const e=(0,n.useContext)(l);if(null===e)throw new i.i6("DocProvider");return e}function d(){const{metadata:e,frontMatter:t,assets:s}=c();return(0,o.jsx)(a.d,{title:e.title,description:e.description,keywords:t.keywords,image:s.image??t.image})}var m=s(4814),u=s(2097),h=s(3382),b=s(8958);function x(e){const{permalink:t,title:s,subLabel:n,isNext:a}=e;return(0,o.jsxs)(b.Z,{className:(0,m.Z)("pagination-nav__link",a?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[n&&(0,o.jsx)("div",{className:"pagination-nav__sublabel",children:n}),(0,o.jsx)("div",{className:"pagination-nav__label",children:s})]})}function p(e){const{previous:t,next:s}=e;return(0,o.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,h.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,o.jsx)(x,{...t,subLabel:(0,o.jsx)(h.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),s&&(0,o.jsx)(x,{...s,subLabel:(0,o.jsx)(h.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}function v(){const{metadata:e}=c();return(0,o.jsx)(p,{previous:e.previous,next:e.next})}var g=s(8902),j=s(5393),f=s(6722),_=s(3419),C=s(6710);const N={unreleased:function(e){let{siteTitle:t,versionMetadata:s}=e;return(0,o.jsx)(h.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,o.jsx)("b",{children:s.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:s}=e;return(0,o.jsx)(h.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,o.jsx)("b",{children:s.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function k(e){const t=N[e.versionMetadata.banner];return(0,o.jsx)(t,{...e})}function L(e){let{versionLabel:t,to:s,onClick:n}=e;return(0,o.jsx)(h.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,o.jsx)("b",{children:(0,o.jsx)(b.Z,{to:s,onClick:n,children:(0,o.jsx)(h.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function Z(e){let{className:t,versionMetadata:s}=e;const{siteConfig:{title:n}}=(0,g.Z)(),{pluginId:a}=(0,j.gA)({failfast:!0}),{savePreferredVersionName:i}=(0,_.J)(a),{latestDocSuggestion:l,latestVersionSuggestion:r}=(0,j.Jo)(a),c=l??(d=r).docs.find((e=>e.id===d.mainDocId));var d;return(0,o.jsxs)("div",{className:(0,m.Z)(t,f.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,o.jsx)("div",{children:(0,o.jsx)(k,{siteTitle:n,versionMetadata:s})}),(0,o.jsx)("div",{className:"margin-top--md",children:(0,o.jsx)(L,{versionLabel:r.label,to:c.path,onClick:()=>i(r.name)})})]})}function T(e){let{className:t}=e;const s=(0,C.E)();return s.banner?(0,o.jsx)(Z,{className:t,versionMetadata:s}):null}function M(e){let{className:t}=e;const s=(0,C.E)();return s.badge?(0,o.jsx)("span",{className:(0,m.Z)(t,f.k.docs.docVersionBadge,"badge badge--secondary"),children:(0,o.jsx)(h.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:s.label},children:"Version: {versionLabel}"})}):null}const I={tag:"tag_eUpe",tagRegular:"tagRegular_LIjx",tagWithCount:"tagWithCount_hLd6"};function w(e){let{permalink:t,label:s,count:n,description:a}=e;return(0,o.jsxs)(b.Z,{href:t,title:a,className:(0,m.Z)(I.tag,n?I.tagWithCount:I.tagRegular),children:[s,n&&(0,o.jsx)("span",{children:n})]})}const y={tags:"tags_qIim",tag:"tag_kC_y"};function B(e){let{tags:t}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("b",{children:(0,o.jsx)(h.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,o.jsx)("ul",{className:(0,m.Z)(y.tags,"padding--none","margin-left--sm"),children:t.map((e=>(0,o.jsx)("li",{className:y.tag,children:(0,o.jsx)(w,{...e})},e.permalink)))})]})}var H=s(5150);function V(){const{metadata:e}=c(),{editUrl:t,lastUpdatedAt:s,lastUpdatedBy:n,tags:a}=e,i=a.length>0,l=!!(t||s||n);return i||l?(0,o.jsxs)("footer",{className:(0,m.Z)(f.k.docs.docFooter,"docusaurus-mt-lg"),children:[i&&(0,o.jsx)("div",{className:(0,m.Z)("row margin-top--sm",f.k.docs.docFooterTagsRow),children:(0,o.jsx)("div",{className:"col",children:(0,o.jsx)(B,{tags:a})})}),l&&(0,o.jsx)(H.Z,{className:(0,m.Z)("margin-top--sm",f.k.docs.docFooterEditMetaRow),editUrl:t,lastUpdatedAt:s,lastUpdatedBy:n})]}):null}var A=s(169),E=s(6558);const P={tocCollapsibleButton:"tocCollapsibleButton_kYhZ",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_RIGx"};function U(e){let{collapsed:t,...s}=e;return(0,o.jsx)("button",{type:"button",...s,className:(0,m.Z)("clean-btn",P.tocCollapsibleButton,!t&&P.tocCollapsibleButtonExpanded,s.className),children:(0,o.jsx)(h.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const R={tocCollapsible:"tocCollapsible_h2U9",tocCollapsibleContent:"tocCollapsibleContent_n8nD",tocCollapsibleExpanded:"tocCollapsibleExpanded_ftUl"};function D(e){let{toc:t,className:s,minHeadingLevel:n,maxHeadingLevel:a}=e;const{collapsed:i,toggleCollapsed:l}=(0,A.u)({initialState:!0});return(0,o.jsxs)("div",{className:(0,m.Z)(R.tocCollapsible,!i&&R.tocCollapsibleExpanded,s),children:[(0,o.jsx)(U,{collapsed:i,onClick:l}),(0,o.jsx)(A.z,{lazy:!0,className:R.tocCollapsibleContent,collapsed:i,children:(0,o.jsx)(E.Z,{toc:t,minHeadingLevel:n,maxHeadingLevel:a})})]})}const S={tocMobile:"tocMobile_JXxD"};function F(){const{toc:e,frontMatter:t}=c();return(0,o.jsx)(D,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,m.Z)(f.k.docs.docTocMobile,S.tocMobile)})}var J=s(7845);function z(){const{toc:e,frontMatter:t}=c();return(0,o.jsx)(J.Z,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:f.k.docs.docTocDesktop})}var O=s(8864),W=s(7760);function G(e){let{children:t}=e;const s=function(){const{metadata:e,frontMatter:t,contentTitle:s}=c();return t.hide_title||void 0!==s?null:e.title}();return(0,o.jsxs)("div",{className:(0,m.Z)(f.k.docs.docMarkdown,"markdown"),children:[s&&(0,o.jsx)("header",{children:(0,o.jsx)(O.Z,{as:"h1",children:s})}),(0,o.jsx)(W.Z,{children:t})]})}var Y=s(3011),q=s(7338),Q=s(1109);function X(e){return(0,o.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,o.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const $={breadcrumbHomeIcon:"breadcrumbHomeIcon_a6JC"};function K(){const e=(0,Q.ZP)("/");return(0,o.jsx)("li",{className:"breadcrumbs__item",children:(0,o.jsx)(b.Z,{"aria-label":(0,h.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,o.jsx)(X,{className:$.breadcrumbHomeIcon})})})}const ee={breadcrumbsContainer:"breadcrumbsContainer_LYo3"};function te(e){let{children:t,href:s,isLast:n}=e;const a="breadcrumbs__link";return n?(0,o.jsx)("span",{className:a,itemProp:"name",children:t}):s?(0,o.jsx)(b.Z,{className:a,href:s,itemProp:"item",children:(0,o.jsx)("span",{itemProp:"name",children:t})}):(0,o.jsx)("span",{className:a,children:t})}function se(e){let{children:t,active:s,index:n,addMicrodata:a}=e;return(0,o.jsxs)("li",{...a&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,m.Z)("breadcrumbs__item",{"breadcrumbs__item--active":s}),children:[t,(0,o.jsx)("meta",{itemProp:"position",content:String(n+1)})]})}function ne(){const e=(0,Y.s1)(),t=(0,q.Ns)();return e?(0,o.jsx)("nav",{className:(0,m.Z)(f.k.docs.docBreadcrumbs,ee.breadcrumbsContainer),"aria-label":(0,h.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,o.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,o.jsx)(K,{}),e.map(((t,s)=>{const n=s===e.length-1,a="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,o.jsx)(se,{active:n,index:s,addMicrodata:!!a,children:(0,o.jsx)(te,{href:a,isLast:n,children:t.label})},s)}))]})}):null}var ae=s(1077);const ie={docItemContainer:"docItemContainer_V2se",docItemCol:"docItemCol_xC9Q"};function oe(e){let{children:t}=e;const s=function(){const{frontMatter:e,toc:t}=c(),s=(0,u.i)(),n=e.hide_table_of_contents,a=!n&&t.length>0;return{hidden:n,mobile:a?(0,o.jsx)(F,{}):void 0,desktop:!a||"desktop"!==s&&"ssr"!==s?void 0:(0,o.jsx)(z,{})}}(),{metadata:n}=c();return(0,o.jsxs)("div",{className:"row",children:[(0,o.jsxs)("div",{className:(0,m.Z)("col",!s.hidden&&ie.docItemCol),children:[(0,o.jsx)(ae.Z,{metadata:n}),(0,o.jsx)(T,{}),(0,o.jsxs)("div",{className:ie.docItemContainer,children:[(0,o.jsxs)("article",{children:[(0,o.jsx)(ne,{}),(0,o.jsx)(M,{}),s.mobile,(0,o.jsx)(G,{children:t}),(0,o.jsx)(V,{})]}),(0,o.jsx)(v,{})]})]}),s.desktop&&(0,o.jsx)("div",{className:"col col--3",children:s.desktop})]})}function le(e){const t=`docs-doc-id-${e.content.metadata.id}`,s=e.content;return(0,o.jsx)(r,{content:e.content,children:(0,o.jsxs)(a.FG,{className:t,children:[(0,o.jsx)(d,{}),(0,o.jsx)(oe,{children:(0,o.jsx)(s,{})})]})})}}}]);