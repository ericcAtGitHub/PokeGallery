(this["webpackJsonpericc-at-git-hub.poke-gallery"]=this["webpackJsonpericc-at-git-hub.poke-gallery"]||[]).push([[0],{56:function(e){e.exports=JSON.parse('{"EnvName":"dev."}')},57:function(e){e.exports=JSON.parse('{"EnvName":"prod."}')},78:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var c,r=n(0),a=n.n(r),s=n(27),i=n.n(s),o=function(e){e&&e instanceof Function&&n.e(8).then(n.bind(null,116)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))},l=n(23),u=n(20),p=(n(56),n(57)),j=Object(u.a)({},p),h=n(2),d=function(){return Object(h.jsxs)("div",{className:"row",children:[Object(h.jsxs)("div",{className:"mx-auto w-50",children:[Object(h.jsxs)("div",{style:{fontSize:15},children:["This React app is about Pok\xe9mon. It was inspired by the examples in"," ",Object(h.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/PacktPublishing/React-17-Design-Patterns-and-Best-Practices-Third-Edition",children:"this book"})," ","and"," ",Object(h.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/dogriffiths/ReactCookbook-source/tree/master/ch02-05-transitions",children:"this"}),". The app is built from:",Object(h.jsxs)("ul",{children:[Object(h.jsx)("li",{children:Object(h.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://pokeapi.co/",children:"Pok\xe9API"})}),Object(h.jsx)("li",{children:Object(h.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/vercel/swr",children:"SWR"})}),Object(h.jsx)("li",{children:Object(h.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/styled-components/styled-components",children:"styled-components"})}),Object(h.jsx)("li",{children:Object(h.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/wix/pro-gallery",children:"Pro Gallery"})}),Object(h.jsx)("li",{children:Object(h.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/xiaolin/react-image-gallery",children:"React Image Gallery"})}),Object(h.jsx)("li",{children:Object(h.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://reactcommunity.org/react-transition-group/",children:"React Transition Group"})})]})]}),Object(h.jsxs)("p",{children:["Developed by Chan Ching Yin.",Object(h.jsx)("span",{style:{float:"right"},children:"v".concat("1.2.0",".").concat(j.EnvName)})]}),Object(h.jsx)("br",{}),Object(h.jsx)("br",{})]}),Object(h.jsx)("hr",{})]})},b=n(11),m=n(86),f=n(85);!function(e){e[e.Default=0]="Default",e[e.Water=1]="Water"}(c||(c={}));var O=n(26);n(58);var x=function(){var e=function(e){return parseInt(e.url.replace("https://pokeapi.co/api/v2/pokemon-species/","").slice(0,-1))};return{GetGenNameDesc:function(e){var t,n,c=e.names.filter((function(e){return["en","ja"].indexOf(e.language.name)>=0}));return"".concat(null===(t=c[0])||void 0===t?void 0:t.name," / ").concat(null===(n=c[1])||void 0===n?void 0:n.name)},GetGenVerDesc:function(e){return"ver: ".concat(e.version_groups[0].name,", ").concat(e.version_groups[1].name)},GetSortedGen:function(t){return Object(u.a)(Object(u.a)({},t),{},{pokemon_species:t.pokemon_species.sort((function(t,n){return e(t)-e(n)}))})},GetPokeIdFromPokeSpecApiRes:e,GetGenusDesc:function(e){return e.genera.filter((function(e){return["en","zh-Hant"].indexOf(e.language.name)>=0})).map((function(e){return e.genus.replace("Pok\xe9mon","").replace("\u5bf6\u53ef\u5922","")})).reverse().join(" ")},GetNameDesc:function(e){var t=e.names.filter((function(e){return["en","zh-Hant","ja"].indexOf(e.language.name)>=0}));return"".concat(t[1].name," ").concat(t[0].name," ").concat(t[2].name)}}},g={nameof:function(e){return e},nameofFactory:function(){return function(e){return e}},Sleep:function(e){return new Promise((function(t){return setTimeout(t,e)}))},CopySelectedText:function(){try{document.execCommand("copy")||alert("Testing code was copied unsuccessfully")}catch(e){alert("Oops, unable to copy")}},GetGlobalConfig:function(){return window.GlobalConfig},Fetcher:function(e){return fetch(e).then((function(e){return e.ok?e.json():{error:!0}}))}},v=n(13),k=g.GetGlobalConfig(),y=Object(r.createContext)({appSearchKey:"",appSetSearchKey:{},appImgRepo:k.Gallery.ImgRepo[0],appSetImgRepo:{}}),S=function(e){var t=e.children,n=Object(r.useState)(""),c=Object(v.a)(n,2),a=c[0],s=c[1],i=Object(r.useState)(k.Gallery.ImgRepo[0]),o=Object(v.a)(i,2),l={appSearchKey:a,appSetSearchKey:s,appImgRepo:o[0],appSetImgRepo:o[1]};return Object(h.jsx)(y.Provider,{value:l,children:t})},I=function(e){var t=e.children;return Object(h.jsx)(S,{children:Object(h.jsx)(O.a,{value:{fetcher:g.Fetcher,suspense:!0,revalidateOnFocus:!1,revalidateOnMount:!1,revalidateOnReconnect:!1,refreshWhenOffline:!1,refreshWhenHidden:!1,refreshInterval:0},children:Object(h.jsx)("div",{className:"App",children:t})})})},G=n(52),w=n(37);var N,C,R=["children"],P=Object(r.createContext)({appDisplayGalleryItems:[],appIsShowSpecialHandler:null}),_=Object(b.g)((function(e){var t=e.children,n=Object(w.a)(e,R),c=g.GetGlobalConfig(),a=x(),s=function(e){return c.Gallery.GenData.find((function(t){return e(t)}))||c.Gallery.GenData[0]},i=s((function(e){return e.routeId===n.match.params.routeId})),o=a.GetSortedGen(i.obj),u=Object(r.useState)([]),p=Object(v.a)(u,2),j=p[0],d=p[1],b=function(){var e=Object(r.useContext)(y);return[e.appSearchKey,e.appSetSearchKey]}(),m=Object(v.a)(b,2),f=m[0],O=m[1],k=Object(r.useState)(!1),S=Object(v.a)(k,2),I=S[0],N=(S[1],Object(r.useRef)(null));Object(r.useEffect)((function(){d(o.pokemon_species)}),[n.match.params,o.pokemon_species]);var C=Object(r.useState)("scroll-top scroll-top-hide"),_=Object(v.a)(C,2),D=_[0],T=_[1],A=function(){return T("scroll-top scroll-top-show")};Object(r.useEffect)((function(){return document.addEventListener("scroll",A,{once:!0}),function(){document.removeEventListener("scroll",A)}}));var E={appDisplayGalleryItems:function(){var e=[];return j.forEach((function(t){t.name.toLowerCase().includes(f.toLocaleLowerCase())&&(e=[].concat(Object(G.a)(e),[t]))})),e}(),appIsShowSpecialHandler:function(e){var t=!0;return!I||e.is_legendary||e.is_mythical||(t=!1),t},appRouteCtx:n};return Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{ref:N,children:"\xa0"}),Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{children:[Object(h.jsx)("select",{onChange:function(e){var t=s((function(t){return t.desc===e.target.value}));n.history.push(n.match.path.replace(":routeId?",t.routeId))},defaultValue:i.desc,children:c.Gallery.GenData.map((function(e){return Object(h.jsx)("option",{value:e.desc,children:e.desc},e.desc)}))}),Object(h.jsx)("h5",{style:{display:"inline-block"},className:"ms-2",children:a.GetGenNameDesc(o)}),Object(h.jsxs)("span",{className:"nav-menu",children:[Object(h.jsx)(l.c,{activeClassName:"currently-viewing",to:"/".concat(i.routeId),exact:!0,children:"List view"})," ","|"," ",Object(h.jsx)(l.c,{activeClassName:"currently-viewing",to:"/waterfall/".concat(i.routeId),children:"Waterfall gallery"})]})]}),Object(h.jsx)("button",{onClick:function(){var e=function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),c=[e[n],e[t]];e[t]=c[0],e[n]=c[1]}return e}(Object(G.a)(j));d(e)},children:"Shuffle"}),"\xa0",Object(h.jsx)("input",{type:"text",value:f,placeholder:"Search by Eng name",onChange:function(e){return O(e.target.value)}}),"\xa0 \xa0"]}),Object(h.jsx)("br",{}),Object(h.jsx)(P.Provider,{value:E,children:t}),Object(h.jsx)("button",{className:D,onClick:function(){N.current.scrollIntoView()},children:"Top"})]})})),D=n(49),T=n(50),A={bug:"rgb(81,204,90)",dark:"rgb(104,129,213)",dragon:"rgb(254,136,88)",electric:"rgb(232,212,1)",fairy:"rgb(253,119,154)",fighting:"rgb(239,105,106)",fire:"rgb(255,167,103)",flying:"rgb(100,166,240)",ghost:"rgb(177,110,180)",grass:"rgb(154,195,13)",ground:"rgb(200,168,65)",ice:"rgb(96,232,244)",normal:"rgb(174, 174, 174)",poison:"rgb(171,122,203)",psychic:"rgb(236,127,244)",rock:"rgb(251,199,38)",steel:"rgb(128,138,165)",water:"rgb(100,198,247)"},E=T.a.div(N||(N=Object(D.a)(["\n  position: relative;\n  \n  ","\n\n  .ul-poke-desc {\n    ","\n    list-style-type: none;\n    padding: 3px 10px;\n  }\n\n  .ul-poke-desc li:first-child {\n     padding-bottom: 10px;\n  }\n\n    .ul-poke-spec li {\n        padding-bottom: 5px;\n        white-space:nowrap;\n        color: #ffffff;\n    }\n\n    .h-weight-height-desc{\n        margin-left:15px;\n        margin-top:5px;\n    }\n\n"])),(function(e){var t=e.pokeColor;return"\n    background-image: linear-gradient(60deg, rgb(45, 45, 45) 30%, ".concat(t," 100%);\n  ")}),(function(e){var t=e.pokeColor;return"border-left: 5px solid ".concat(t,";")})),F=T.a.span(C||(C=Object(D.a)(["\n  position: relative;\n  \n  ","\n\n  display: inline-block;\n  border-radius: 20px;\n  font-weight: bold;\n  padding: 6px;\n  color: #444444;\n  margin-right: 4px;\n  opacity: 1;\n  text-transform: capitalize;\n"])),(function(e){var t=e.pokemonType;return"\n    background: ".concat(A[t],";\n    background-size: 65%;\n    background-position: center;\n  ")})),L=x(),H=function(e){return e?"Yes":"--"},W=function(e){var t,n,c,a=e.pokeSpecApiRes,s=Object(r.useContext)(P).appIsShowSpecialHandler,i=Object(O.b)(function(e){return"https://pokeapi.co/api/v2/pokemon/".concat(L.GetPokeIdFromPokeSpecApiRes(e))}(a)),o=i.data,l=i.error,u=Object(O.b)(a.url),p=u.data,j=u.error;if(l||j||o.error||p.error)return Object(h.jsx)("div",{});n=o;var d=(c=p).flavor_text_entries.find((function(e){return"en"===e.language.name})),b=null!==(t=c.flavor_text_entries.find((function(e){return"zh-Hant"===e.language.name})))&&void 0!==t?t:c.flavor_text_entries.find((function(e){return"ja"===e.language.name})),m=null===d||void 0===d?void 0:d.flavor_text.replace("\f"," "),f=null===b||void 0===b?void 0:b.flavor_text.replace("\f"," ").replaceAll("\n",""),x=n.types.map((function(e){return e.type.name}));return s(c)&&Object(h.jsxs)(E,{pokeColor:c.color.name,className:"border-bottom",children:[Object(h.jsxs)("h2",{children:["#",c.id," ",L.GetNameDesc(c)]}),Object(h.jsx)("div",{className:"container",children:Object(h.jsxs)("div",{className:"row",children:[Object(h.jsxs)("div",{className:"col-sm",children:[x.map((function(e){return Object(h.jsx)(F,{pokemonType:e,children:Object(h.jsx)("span",{children:e},n.name+e)},e)})),Object(h.jsx)("img",{alt:n.name,src:"sprites/pokemon/".concat(n.id,".png")}),Object(h.jsxs)("ul",{className:"ul-poke-desc",children:[Object(h.jsx)("li",{children:m}),Object(h.jsx)("li",{children:f})]})]}),Object(h.jsx)("div",{className:"col-sm my-auto",children:Object(h.jsxs)("div",{className:"row",children:[Object(h.jsxs)("h5",{className:"h-weight-height-desc",children:["Height: ",10*n.height," cm \xa0 \xa0 Weight: ",n.weight/10," kg"]}),Object(h.jsx)("div",{className:"col-sm",children:Object(h.jsxs)("ul",{className:"ul-poke-spec",children:[Object(h.jsxs)("li",{title:"The happiness when caught by a normal Pok\xe9ball; up to 255. The higher the number, the happier the Pok\xe9mon.",children:["Base happiness: ",c.base_happiness]}),Object(h.jsxs)("li",{title:"The base capture rate; up to 255. The higher the number, the easier the catch.",children:["Capture rate: ",c.capture_rate]}),Object(h.jsxs)("li",{title:"The chance of this Pok\xe9mon being female, in eighths; or -1 for genderless.",children:["Gender rate: ",c.gender_rate]}),Object(h.jsxs)("li",{title:"The color of this Pok\xe9mon for Pok\xe9dex search.",children:["Color: ",c.color.name]}),Object(h.jsxs)("li",{title:"The genus of this Pok\xe9mon species listed in multiple languages.",children:["Genera: ",L.GetGenusDesc(c)]})]})}),Object(h.jsx)("div",{className:"col-sm",children:Object(h.jsxs)("ul",{className:"ul-poke-spec",children:[Object(h.jsxs)("li",{title:"Whether or not this is a baby Pok\xe9mon.",children:["Is baby? ",H(c.is_baby)]}),Object(h.jsxs)("li",{title:"Whether or not this Pok\xe9mon has multiple forms and can switch between them.",children:["Forms switchable? ",H(c.forms_switchable)]}),Object(h.jsxs)("li",{title:"Whether or not this Pok\xe9mon has visual gender differences.",children:["Has gender differences? ",H(c.has_gender_differences)]}),Object(h.jsxs)("li",{title:"Whether or not this is a legendary Pok\xe9mon.",children:["Is legendary? ",H(c.is_legendary)]}),Object(h.jsxs)("li",{title:"Whether or not this is a mythical Pok\xe9mon.",children:["Is mythical? ",H(c.is_mythical)]})]})})]})})]})})]})},V=n(44),B=(n(75),function(e){var t=e.pokeSpecApiRes,n=x();return Object(h.jsxs)("div",{children:[Object(h.jsxs)("h2",{children:["#",n.GetPokeIdFromPokeSpecApiRes(t)," ",t.name]}),Object(h.jsx)("div",{className:"container",children:Object(h.jsxs)("div",{className:"row",children:[Object(h.jsx)("div",{className:"col-sm",children:Object(h.jsx)(V.a,{height:10,count:5})}),Object(h.jsx)("div",{className:"col-sm",children:Object(h.jsx)(V.a,{height:10,count:5})}),Object(h.jsx)("div",{className:"col-sm",children:Object(h.jsx)(V.a,{height:10,count:5})})]})})]})}),z=function(){var e=Object(r.useContext)(P),t=e.appDisplayGalleryItems,n=e.appRouteCtx,c=Object(r.useState)(!1),a=Object(v.a)(c,2),s=a[0],i=a[1],o=n.match.params;return Object(r.useEffect)((function(){i(!1)}),[o]),null==t?Object(h.jsx)(h.Fragment,{}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)("p",{children:"Loading..."}),children:t.slice(0,30).map((function(e){return Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)(B,{pokeSpecApiRes:e}),children:Object(h.jsx)(W,{pokeSpecApiRes:e},e.name)},"GalleryUIsuspense"+e.name)}))}),Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)("p",{children:"Loading..."}),children:t.slice(30,60).map((function(e){return Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)(B,{pokeSpecApiRes:e}),children:Object(h.jsx)(W,{pokeSpecApiRes:e},e.name)},"GalleryUIsuspense"+e.name)}))}),t.length>60&&!s&&Object(h.jsx)(h.Fragment,{children:Object(h.jsx)("button",{onClick:function(){return i(!0)},className:"btn btn-primary mx-auto d-block mt-3",children:"Load more"})}),s&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)("p",{children:"Loading..."}),children:t.slice(60,90).map((function(e){return Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)(B,{pokeSpecApiRes:e}),children:Object(h.jsx)(W,{pokeSpecApiRes:e},e.name)},"GalleryUIsuspense"+e.name)}))}),Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)("p",{children:"Loading..."}),children:t.slice(90,120).map((function(e){return Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)(B,{pokeSpecApiRes:e}),children:Object(h.jsx)(W,{pokeSpecApiRes:e},e.name)},"GalleryUIsuspense"+e.name)}))}),Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)("p",{children:"Loading..."}),children:t.slice(120,151).map((function(e){return Object(h.jsx)(r.Suspense,{fallback:Object(h.jsx)(B,{pokeSpecApiRes:e}),children:Object(h.jsx)(W,{pokeSpecApiRes:e},e.name)},"GalleryUIsuspense"+e.name)}))})]})]})},U=n(84),K=(n(76),n(62)),M=n.n(K),J=(n(77),x(),function(e){var t,n=e.pokeSpecApiRes,c=e.appIsTargetNow,a=e.appDisplayPokeDetailHandler,s=(Object(r.useContext)(P).appIsShowSpecialHandler,Object(O.b)(n.url)),i=s.data,o=s.error;if(Object(r.useEffect)((function(){l()})),o||i.error)return null;t=i;var l=function(){c&&a(t)};return null});n(78);var Y=function(e){var t=Object(r.useState)(e.InitSelectedInd),n=Object(v.a)(t,2),c=n[0],a=n[1];Object(r.useEffect)((function(){var t=!0;return t&&a(e.InitSelectedInd),function(){t=!1}}),[e.InitSelectedInd]);var s=e.OptionLabels.map((function(t,n){return{label:t,value:e.OptionValues[n]}})),i=function(t,n){e.OptionChangeHandler(t),a(n)};return Object(h.jsxs)("span",{children:[e.Desc,Object(h.jsxs)("span",{className:"option-roll-holder",children:[Object(h.jsx)("button",{className:"btn btn-link shadow-none option-roll-clicker",onClick:function(t){t.preventDefault();var n=c-1<0?c-1+e.OptionValues.length:c-1,r=e.OptionValues[n];i(r,n)},children:"\u25c0"}),Object(h.jsx)("select",{className:"option-roll-select",onChange:function(e){var t=e.target.value,n=s.findIndex((function(e){return e.value===t}));i(t,n)},value:e.OptionValues[c],children:s.map((function(e,t){return Object(h.jsx)("option",{value:e.value,children:e.label},e.label)}))}),Object(h.jsx)("button",{className:"btn btn-link shadow-none option-roll-clicker",onClick:function(t){t.preventDefault();var n=(c+1)%e.OptionValues.length,r=e.OptionValues[n];i(r,n)},children:"\u25b6"})]})]})},Z="loading...",q=function(){Object(r.useContext)(P).appIsShowSpecialHandler;var e=g.GetGlobalConfig(),t=x(),n=Object(r.useState)(!1),c=Object(v.a)(n,2),a=c[0],s=c[1],i=Object(r.useState)(0),o=Object(v.a)(i,2),l=o[0],u=o[1],p=Object(r.useState)(-1),j=Object(v.a)(p,2),d=j[0],b=j[1],m=Object(r.useState)(null),f=Object(v.a)(m,2),O=f[0],k=f[1],S=function(){var e=Object(r.useContext)(y);return[e.appImgRepo,e.appSetImgRepo]}(),I=Object(v.a)(S,2),G=I[0],w=I[1],N=Object(r.useContext)(P).appDisplayGalleryItems,C=N.map((function(e){var n=t.GetPokeIdFromPokeSpecApiRes(e);return{itemId:n+"",mediaUrl:"".concat(G.basePath).concat(n,".").concat(G.ext),url:"".concat(G.basePath).concat(n,".").concat(G.ext),metadata:{type:"image",alt:" "}}})),R=C.map((function(e){return{pokeId:e.itemId,original:e.url}})),_={width:window.innerWidth-60,height:window.innerHeight},D=function(e){k(e)};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(Y,{Desc:"Style: ",OptionLabels:e.Gallery.ImgRepo.map((function(e){return e.desc})),OptionValues:e.Gallery.ImgRepo.map((function(e){return e.optValue})),InitSelectedInd:e.Gallery.ImgRepo.findIndex((function(e){return e.optValue===G.optValue})),OptionChangeHandler:function(t){return function(t){var n=e.Gallery.ImgRepo.find((function(e){return e.optValue===t}));w(n)}(t)}}),Object(h.jsx)("br",{}),Object(h.jsx)("br",{}),0!==N.length&&Object(h.jsx)(U.a,{items:C,container:_,options:{imageHoverAnimation:"ZOOM_IN",hoveringBehaviour:"NEVER_SHOW",gallerySize:30,itemBorderWidth:2},eventsListener:function(e,t){if("ITEM_ACTION_TRIGGERED"===e)"image"===t.type&&(u(t.idx),k(null),b(parseInt(t.id)),s(!0))}}),a&&Object(h.jsx)("div",{className:"react-image-gallery-container-container",children:Object(h.jsx)("div",{className:"react-image-gallery-container",children:Object(h.jsx)(M.a,{items:R,onErrorImageURL:"water-default.png",showBullets:!1,showIndex:!0,showThumbnails:!0,lazyLoad:!0,showPlayButton:!1,startIndex:l,slideDuration:0,showFullscreenButton:!1,onClick:function(){return s(!1)},onSlide:function(e){k(null),b(parseInt(R[e].pokeId))}})})}),Object(h.jsx)(r.Suspense,{fallback:null,children:N.map((function(e){return Object(h.jsx)(J,{pokeSpecApiRes:e,appIsTargetNow:t.GetPokeIdFromPokeSpecApiRes(e)===d,appDisplayPokeDetailHandler:D},"WaterUIback1"+e.name)}))}),a&&Object(h.jsxs)("div",{className:"target-poke-desc",children:[Object(h.jsx)("h1",{className:"target-poke-desc-top-left",children:null!=O?"#"+O.id:Z}),Object(h.jsx)("h1",{className:"target-poke-desc-bottom-center",children:null!=O?t.GetNameDesc(O):Z})]})]})},Q=function(e){return Object(h.jsx)(_,{children:(t=e,t===c.Water?Object(h.jsx)(q,{}):Object(h.jsx)(z,{}))});var t},X=function(){var e=Object(b.f)();return Object(h.jsx)(I,{children:Object(h.jsx)(l.b,{children:Object(h.jsx)(m.a,{className:"anim-manager",children:Object(h.jsx)(f.a,{in:!0,classNames:"my-page",timeout:500,children:Object(h.jsxs)(b.c,{children:[Object(h.jsx)(b.a,{path:"/waterfall/:routeId?",component:function(e){return Q(c.Water)},exact:!0}),Object(h.jsx)(b.a,{path:"/:routeId?",component:function(e){return Q(c.Default)},exact:!0})]})},e.hash)})})})};i.a.render(Object(h.jsxs)(a.a.StrictMode,{children:[Object(h.jsx)("link",{rel:"stylesheet",type:"text/css",href:"".concat(".","/pageCss/app-routes.css")}),Object(h.jsx)("link",{rel:"stylesheet",type:"text/css",href:"".concat(".","/pageCss/gallery-context.css")}),Object(h.jsx)("link",{rel:"stylesheet",type:"text/css",href:"".concat(".","/pageCss/water-ui.css")}),Object(h.jsx)(d,{}),Object(h.jsx)(l.a,{children:Object(h.jsx)(X,{})})]}),document.getElementById("root")),o()}},[[79,3,4]]]);
//# sourceMappingURL=main.1a9cf02c.chunk.js.map