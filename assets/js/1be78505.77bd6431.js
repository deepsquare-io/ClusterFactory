"use strict";(self.webpackChunkcluster_factory_ce_docs=self.webpackChunkcluster_factory_ce_docs||[]).push([[9514,8426],{9893:function(e,t,n){n.r(t),n.d(t,{default:function(){return ye}});var a=n(9496),r=n(5924),l=n(2329),i=n(7207),o=n(6325),c=n(9859),s=n(3597),d=n(5439),u=n(8633),m=n(1410),b=n(8264),p=n(7909);var v="backToTopButton_dC1g",h="backToTopButtonShow_MRWo";function f(){var e=function(e){var t=e.threshold,n=(0,a.useState)(!1),r=n[0],l=n[1],i=(0,a.useRef)(!1),o=(0,b.Ct)(),c=o.startScroll,s=o.cancelScroll;return(0,b.RF)((function(e,n){var a=e.scrollY,r=null==n?void 0:n.scrollY;r&&(i.current?i.current=!1:a>=r?(s(),l(!1)):a<t?l(!1):a+window.innerHeight<document.documentElement.scrollHeight&&l(!0))})),(0,p.S)((function(e){e.location.hash&&(i.current=!0,l(!1))})),{shown:r,scrollToTop:function(){return c(0)}}}({threshold:300}),t=e.shown,n=e.scrollToTop;return a.createElement("button",{"aria-label":(0,m.I)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,r.Z)("clean-btn",i.k.common.backToTopButton,v,t&&h),type:"button",onClick:n})}var E=n(3226),g=n(2824),_=n(3453),k=n(5541),C=n(665);function I(e){return a.createElement("svg",(0,C.Z)({width:"20",height:"20","aria-hidden":"true"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))}var N="collapseSidebarButton_KObv",S="collapseSidebarButtonIcon_Allc";function Z(e){var t=e.onClick;return a.createElement("button",{type:"button",title:(0,m.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,m.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,r.Z)("button button--secondary button--outline",N),onClick:t},a.createElement(I,{className:S}))}var y=n(5658),x=n(151),T=n(5665),w=Symbol("EmptyContext"),L=a.createContext(w);function A(e){var t=e.children,n=(0,a.useState)(null),r=n[0],l=n[1],i=(0,a.useMemo)((function(){return{expandedItem:r,setExpandedItem:l}}),[r]);return a.createElement(L.Provider,{value:i},t)}var M=n(5697),P=n(6985),F=n(1487),B=n(4702),H=["item","onItemClick","activePath","level","index"];function W(e){var t=e.categoryLabel,n=e.onClick;return a.createElement("button",{"aria-label":(0,m.I)({id:"theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel",message:"Toggle the collapsible sidebar category '{label}'",description:"The ARIA label to toggle the collapsible sidebar category"},{label:t}),type:"button",className:"clean-btn menu__caret",onClick:n})}function R(e){var t=e.item,n=e.onItemClick,l=e.activePath,c=e.level,s=e.index,d=(0,x.Z)(e,H),u=t.items,m=t.label,b=t.collapsible,p=t.className,v=t.href,h=(0,_.L)().docs.sidebar.autoCollapseCategories,f=function(e){var t=(0,B.Z)();return(0,a.useMemo)((function(){return e.href?e.href:!t&&e.collapsible?(0,o.Wl)(e):void 0}),[e,t])}(t),E=(0,o._F)(t,l),g=(0,P.Mg)(v,l),k=(0,M.u)({initialState:function(){return!!b&&(!E&&t.collapsed)}}),I=k.collapsed,N=k.setCollapsed,S=function(){var e=(0,a.useContext)(L);if(e===w)throw new T.i6("DocSidebarItemsExpandedStateProvider");return e}(),Z=S.expandedItem,y=S.setExpandedItem,A=function(e){void 0===e&&(e=!I),y(e?null:s),N(e)};return function(e){var t=e.isActive,n=e.collapsed,r=e.updateCollapsed,l=(0,T.D9)(t);(0,a.useEffect)((function(){t&&!l&&n&&r(!1)}),[t,l,n,r])}({isActive:E,collapsed:I,updateCollapsed:A}),(0,a.useEffect)((function(){b&&Z&&Z!==s&&h&&N(!0)}),[b,Z,s,N,h]),a.createElement("li",{className:(0,r.Z)(i.k.docs.docSidebarItemCategory,i.k.docs.docSidebarItemCategoryLevel(c),"menu__list-item",{"menu__list-item--collapsed":I},p)},a.createElement("div",{className:(0,r.Z)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":g})},a.createElement(F.Z,(0,C.Z)({className:(0,r.Z)("menu__link",{"menu__link--sublist":b,"menu__link--sublist-caret":!v&&b,"menu__link--active":E}),onClick:b?function(e){null==n||n(t),v?A(!1):(e.preventDefault(),A())}:function(){null==n||n(t)},"aria-current":g?"page":void 0,"aria-expanded":b?!I:void 0,href:b?null!=f?f:"#":f},d),m),v&&b&&a.createElement(W,{categoryLabel:m,onClick:function(e){e.preventDefault(),A()}})),a.createElement(M.z,{lazy:!0,as:"ul",className:"menu__list",collapsed:I},a.createElement(Q,{items:u,tabIndex:I?-1:0,onItemClick:n,activePath:l,level:c+1})))}var D=n(7184),z=n(6811),K="menuExternalLink_qGCy",G=["item","onItemClick","activePath","level","index"];function V(e){var t=e.item,n=e.onItemClick,l=e.activePath,c=e.level,s=(e.index,(0,x.Z)(e,G)),d=t.href,u=t.label,m=t.className,b=(0,o._F)(t,l),p=(0,D.Z)(d);return a.createElement("li",{className:(0,r.Z)(i.k.docs.docSidebarItemLink,i.k.docs.docSidebarItemLinkLevel(c),"menu__list-item",m),key:u},a.createElement(F.Z,(0,C.Z)({className:(0,r.Z)("menu__link",!p&&K,{"menu__link--active":b}),"aria-current":b?"page":void 0,to:d},p&&{onClick:n?function(){return n(t)}:void 0},s),u,!p&&a.createElement(z.Z,null)))}var Y="menuHtmlItem_K9wi";function q(e){var t=e.item,n=e.level,l=e.index,o=t.value,c=t.defaultStyle,s=t.className;return a.createElement("li",{className:(0,r.Z)(i.k.docs.docSidebarItemLink,i.k.docs.docSidebarItemLinkLevel(n),c&&[Y,"menu__list-item"],s),key:l,dangerouslySetInnerHTML:{__html:o}})}var j=["item"];function O(e){var t=e.item,n=(0,x.Z)(e,j);switch(t.type){case"category":return a.createElement(R,(0,C.Z)({item:t},n));case"html":return a.createElement(q,(0,C.Z)({item:t},n));default:return a.createElement(V,(0,C.Z)({item:t},n))}}var U=["items"];function J(e){var t=e.items,n=(0,x.Z)(e,U);return a.createElement(A,null,t.map((function(e,t){return a.createElement(O,(0,C.Z)({key:t,item:e,index:t},n))})))}var Q=(0,a.memo)(J),X="menu_kFka",$="menuWithAnnouncementBar_mt1G";function ee(e){var t=e.path,n=e.sidebar,l=e.className,o=function(){var e=(0,y.nT)().isActive,t=(0,a.useState)(e),n=t[0],r=t[1];return(0,b.RF)((function(t){var n=t.scrollY;e&&r(0===n)}),[e]),e&&n}();return a.createElement("nav",{className:(0,r.Z)("menu thin-scrollbar",X,o&&$,l)},a.createElement("ul",{className:(0,r.Z)(i.k.docs.docSidebarMenu,"menu__list")},a.createElement(Q,{items:n,activePath:t,level:1})))}var te="sidebar_GAnd",ne="sidebarWithHideableNavbar_h2S6",ae="sidebarHidden_Kzc6",re="sidebarLogo_o0c5";function le(e){var t=e.path,n=e.sidebar,l=e.onCollapse,i=e.isHidden,o=(0,_.L)(),c=o.navbar.hideOnScroll,s=o.docs.sidebar.hideable;return a.createElement("div",{className:(0,r.Z)(te,c&&ne,i&&ae)},c&&a.createElement(k.Z,{tabIndex:-1,className:re}),a.createElement(ee,{path:t,sidebar:n}),s&&a.createElement(Z,{onClick:l}))}var ie=a.memo(le),oe=n(7758),ce=n(6999),se=function(e){var t=e.sidebar,n=e.path,l=(0,ce.e)();return a.createElement("ul",{className:(0,r.Z)(i.k.docs.docSidebarMenu,"menu__list")},a.createElement(Q,{items:t,activePath:n,onItemClick:function(e){"category"===e.type&&e.href&&l.toggle(),"link"===e.type&&l.toggle()},level:1}))};function de(e){return a.createElement(oe.Zo,{component:se,props:e})}var ue=a.memo(de);function me(e){var t=(0,g.i)(),n="desktop"===t||"ssr"===t,r="mobile"===t;return a.createElement(a.Fragment,null,n&&a.createElement(ie,e),r&&a.createElement(ue,e))}var be="expandButton_CpZL",pe="expandButtonIcon_jo8k";function ve(e){var t=e.toggleSidebar;return a.createElement("div",{className:be,title:(0,m.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,m.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t},a.createElement(I,{className:pe}))}var he="docSidebarContainer_Gdgi",fe="docSidebarContainerHidden_cuKE";function Ee(e){var t,n=e.children,r=(0,d.V)();return a.createElement(a.Fragment,{key:null!=(t=null==r?void 0:r.name)?t:"noSidebar"},n)}function ge(e){var t=e.sidebar,n=e.hiddenSidebarContainer,l=e.setHiddenSidebarContainer,o=(0,E.TH)().pathname,c=(0,a.useState)(!1),s=c[0],d=c[1],u=(0,a.useCallback)((function(){s&&d(!1),l((function(e){return!e}))}),[l,s]);return a.createElement("aside",{className:(0,r.Z)(i.k.docs.docSidebarContainer,he,n&&fe),onTransitionEnd:function(e){e.currentTarget.classList.contains(he)&&n&&d(!0)}},a.createElement(Ee,null,a.createElement(me,{sidebar:t,path:o,onCollapse:u,isHidden:s})),s&&a.createElement(ve,{toggleSidebar:u}))}var _e={docMainContainer:"docMainContainer_T9YJ",docMainContainerEnhanced:"docMainContainerEnhanced_jU1N",docItemWrapperEnhanced:"docItemWrapperEnhanced_udzS"};function ke(e){var t=e.hiddenSidebarContainer,n=e.children,l=(0,d.V)();return a.createElement("main",{className:(0,r.Z)(_e.docMainContainer,(t||!l)&&_e.docMainContainerEnhanced)},a.createElement("div",{className:(0,r.Z)("container padding-top--md padding-bottom--lg",_e.docItemWrapper,t&&_e.docItemWrapperEnhanced)},n))}var Ce="docPage_KQZd",Ie="docsWrapper_Wnw6";function Ne(e){var t=e.children,n=(0,d.V)(),r=(0,a.useState)(!1),l=r[0],i=r[1];return a.createElement(u.Z,{wrapperClassName:Ie},a.createElement(f,null),a.createElement("div",{className:Ce},n&&a.createElement(ge,{sidebar:n.items,hiddenSidebarContainer:l,setHiddenSidebarContainer:i}),a.createElement(ke,{hiddenSidebarContainer:l},t)))}var Se=n(8426),Ze=n(72);function ye(e){var t=e.versionMetadata,n=(0,o.hI)(e);if(!n)return a.createElement(Se.default,null);var u=n.docElement,m=n.sidebarName,b=n.sidebarItems;return a.createElement(a.Fragment,null,a.createElement(Ze.Z,{version:t.version,tag:(0,c.os)(t.pluginId,t.version)}),a.createElement(l.FG,{className:(0,r.Z)(i.k.wrapper.docsPages,i.k.page.docsDocPage,e.versionMetadata.className)},a.createElement(s.q,{version:t},a.createElement(d.b,{name:m,items:b},a.createElement(Ne,null,u)))))}},8426:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var a=n(9496),r=n(1410),l=n(2329),i=n(8633);function o(){return a.createElement(a.Fragment,null,a.createElement(l.d,{title:(0,r.I)({id:"theme.NotFound.title",message:"Page Not Found"})}),a.createElement(i.Z,null,a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(r.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(r.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(r.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken.")))))))}},3597:function(e,t,n){n.d(t,{E:function(){return o},q:function(){return i}});var a=n(9496),r=n(5665),l=a.createContext(null);function i(e){var t=e.children,n=e.version;return a.createElement(l.Provider,{value:n},t)}function o(){var e=(0,a.useContext)(l);if(null===e)throw new r.i6("DocsVersionProvider");return e}}}]);