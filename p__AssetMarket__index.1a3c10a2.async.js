(self.webpackChunk_antv_li_website=self.webpackChunk_antv_li_website||[]).push([[921],{58390:function(S,$,i){"use strict";i.r($),i.d($,{default:function(){return pt}});var W=i(69024),f=i.n(W),x=i(16640),P=i.n(x),N=i(25435),D=i(39216),t=i(81821),R=i(88198),k=i(87363),te=i(28869),Le=i(91055),E=i.n(Le),Te=i(29773),Be=i.n(Te),Ie=i(51490),ne=i.n(Ie),Oe=i(88104),De=i.n(Oe),Y=i(12611),we=function(o){return fetch("https://data.jsdelivr.com/v1/packages/npm/".concat(o),{method:"get"}).then(function(a){return a.json()})},Ve=function(o,a){return fetch("https://data.jsdelivr.com/v1/packages/npm/".concat(o,"@").concat(a,"/entrypoints"),{method:"get"}).then(function(n){return n.json()}).then(function(n){var r,s,h=[];return n!=null&&(r=n.entrypoints)!==null&&r!==void 0&&r.css?h=["https://fastly.jsdelivr.net/npm/".concat(o,"@").concat(a).concat(n.entrypoints.css.file)]:n!=null&&(s=n.entrypoints)!==null&&s!==void 0&&s.js&&(h=["https://fastly.jsdelivr.net/npm/".concat(o,"@").concat(a).concat(n.entrypoints.js.file)]),h})},ze=function(o){var a=/\.css(\?.*)?$/.test(o),n=/\.js(\?.*)?$/.test(o);return a||n},Ue=function(o){var a,n="-"+((a=o.match(/([^/]+)$/))===null||a===void 0?void 0:a[0]),r=n.replace(/\-[a-z]/g,function(s){return s[1].toUpperCase()});return r.substring(0,2)==="Li"?r.replace("Li","LI"):r},e=i(70293),$e=function(){return(0,e.jsx)(t.Form.List,{name:"urls",rules:[{validator:function(){var o=De()(ne()().mark(function n(r,s){return ne()().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:if(!(!s||s.length<0)){d.next=2;break}return d.abrupt("return",Promise.reject(new Error("\u8BF7\u81F3\u5C11\u586B\u5199\u4E00\u4E2A CDN \u8D44\u6E90\u5730\u5740")));case 2:case"end":return d.stop()}},n)}));function a(n,r){return o.apply(this,arguments)}return a}()}],children:function(a,n,r){var s=n.add,h=n.remove,d=r.errors;return(0,e.jsxs)(e.Fragment,{children:[a.map(function(l,v){return(0,e.jsx)(t.Form.Item,{label:v===0?"CDN \u5730\u5740":"",wrapperCol:v===0?{span:24}:{span:20,offset:4},required:!1,children:(0,e.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,e.jsx)(t.Form.Item,E()(E()({},l),{},{validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"\u8BF7\u8F93\u5165 CDN \u5730\u5740"},{type:"url",message:"URL \u5730\u5740\u4E0D\u5408\u6CD5"},{validator:function(b,j){return j?j&&ze(j)?Promise.resolve():Promise.reject(new Error("\u8BF7\u8F93\u5165\u6709\u6548\u7684 JS \u6216 CSS \u8D44\u6E90\u5730\u5740")):Promise.reject()}}],noStyle:!0,children:(0,e.jsx)(t.Input,{placeholder:"\u8BF7\u8F93\u5165 URL\uFF0C\u4F8B\u5982\uFF1Ahttps://unpkg.com/@antv/li-analysis-assets@0.10.0/dist/umd/li-analysis-assets.min.js"})})),a.length>1?(0,e.jsx)(x.MinusCircleOutlined,{style:{marginLeft:8},onClick:function(){return h(l.name)}}):null]})},l.key)}),(0,e.jsxs)(t.Form.Item,{wrapperCol:{span:20,offset:4},children:[(0,e.jsx)(t.Button,{block:!0,type:"dashed",onClick:function(){return s()},icon:(0,e.jsx)(x.PlusOutlined,{}),children:a.length>0?"\u65B0\u589E CDN \u8D44\u6E90":"\u8F93\u5165 CDN \u5730\u5740"}),(0,e.jsx)(t.Form.ErrorList,{errors:d})]})]})}})},We=function(o){var a=o.open,n=o.initialValue,r=o.onSubmit,s=o.onCancel,h=t.Form.useForm(),d=f()(h,1),l=d[0],v=(0,k.useState)(!1),F=f()(v,2),b=F[0],j=F[1],L=(0,k.useState)(!1),A=f()(L,2),G=A[0],I=A[1],p=(0,k.useState)([]),_=f()(p,2),M=_[0],w=_[1],H=t.Form.useWatch("npmMirror",l),V=t.Form.useWatch("package",l),O=H==="npm",m=!(0,Y.isUndefined)(n==null?void 0:n.assetId),g=t.message.useMessage(),T=f()(g,2),z=T[0],J=T[1],Z=function(U){we(U).then(function(C){var q;if(C!=null&&(q=C.versions)!==null&&q!==void 0&&q.length){var ht=C.versions.map(function(Ee){return{label:Ee.version,value:Ee.version}});if(!(n!=null&&n.version)){var ee;l.setFieldValue("version",C==null||(ee=C.tags)===null||ee===void 0?void 0:ee.latest),l.setFieldValue("global",Ue(C==null?void 0:C.name)),l.setFieldValue("name",C==null?void 0:C.name)}w(ht),I(!1)}}).catch(function(){z.error("\u5305\u4FE1\u606F\u83B7\u53D6\u5931\u8D25\uFF01"),w([]),I(!1)})};(0,k.useEffect)(function(){m&&n?(l.setFieldsValue(n),O&&Z(n.package)):l.resetFields()},[n,a]);var vt=function(U){if(!O){r(U);return}j(!0),Ve(U.package,U.version).then(function(C){r(E()(E()({},U),{},{urls:C})),j(!1)}).catch(function(C){console.log("\u83B7\u53D6 CDN \u8D44\u6E90\u5931\u8D25\uFF01"),j(!1)})},Pe=function(){s()};return(0,e.jsx)(t.Modal,{title:"".concat(m?"\u4FEE\u6539":"\u5BFC\u5165","\u8D44\u4EA7\u5305"),width:600,open:a,footer:null,onCancel:Pe,centered:!0,destroyOnClose:!0,children:(0,e.jsxs)(t.Form,{initialValues:{npmMirror:"npm"},labelCol:{span:4},form:l,onFinish:vt,children:[(0,e.jsx)(t.Form.Item,{label:"\u5305\u955C\u50CF",name:"npmMirror",children:(0,e.jsxs)(t.Radio.Group,{children:[(0,e.jsx)(t.Radio.Button,{value:"npm",children:"NPM \u955C\u50CF"}),(0,e.jsx)(t.Radio.Button,{value:"private",children:"\u79C1\u6709\u955C\u50CF"})]})}),(0,e.jsx)(t.Form.Item,{label:"id",name:"assetId",style:{display:"none"},children:(0,e.jsx)(t.Input,{})}),J,(0,e.jsx)(t.Form.Item,{label:"\u5305\u540D",name:"package",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u5305\u540D"}],children:(0,e.jsx)(t.Input,{disabled:m,placeholder:"\u8BF7\u8F93\u5165\u5305\u540D\uFF0C\u4F8B\u5982\uFF1A@antv/li-analysis-assets",addonAfter:O?(0,e.jsx)(t.Button,{disabled:(0,Y.isEmpty)(V),loading:G,size:"small",type:"link",onClick:function(){I(!0),Z(l.getFieldValue("package"))},children:"\u83B7\u53D6\u5305\u4FE1\u606F"}):null})}),(0,e.jsx)(t.Form.Item,{label:"\u7248\u672C\u53F7",name:"version",rules:[{required:!0,message:O?"\u8BF7\u9009\u62E9\u7248\u672C\u53F7":"\u8BF7\u8F93\u5165\u7248\u672C\u53F7"}],children:O?(0,e.jsx)(t.Select,{options:M,placeholder:"\u8BF7\u9009\u62E9\u7248\u672C\u53F7"}):(0,e.jsx)(t.Input,{placeholder:"\u8BF7\u8F93\u5165\u7248\u672C\u53F7"})}),(0,e.jsx)(t.Form.Item,{label:"UMD \u540D\u79F0",name:"global",rules:[{required:!0,message:"\u8BF7\u8F93\u5165 UMD \u540D\u79F0"}],children:(0,e.jsx)(t.Input,{placeholder:"\u8BF7\u8F93\u5165 UMD \u540D\u79F0\uFF0C\u4F8B\u5982\uFF1ALIAnalysisAssets"})}),!O&&(0,e.jsx)($e,{}),(0,e.jsx)(t.Form.Item,{label:"\u8D44\u4EA7\u540D\u79F0",name:"name",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u8D44\u4EA7\u540D\u79F0"}],children:(0,e.jsx)(t.Input,{placeholder:"\u8BF7\u8F93\u5165\u8D44\u4EA7\u540D\u79F0\uFF0C\u4F8B\u5982\uFF1A\u5B98\u65B9\u5206\u6790\u8D44\u4EA7"})}),(0,e.jsx)(t.Form.Item,{label:"\u8D44\u4EA7\u63CF\u8FF0",name:"description",rules:[{message:"\u8BF7\u8F93\u5165\u8D44\u4EA7\u63CF\u8FF0"}],children:(0,e.jsx)(t.Input.TextArea,{placeholder:"\u8BF7\u8F93\u5165\u8D44\u4EA7\u63CF\u8FF0\uFF0C\u4F8B\u5982\uFF1A\u5206\u6790\u8D44\u4EA7\u5305\uFF0C\u7528\u4E8E\u6570\u636E\u53EF\u89C6\u5206\u6790\u573A\u666F\uFF0C\u5305\u542B\u5206\u6790\u56FE\u5C42\u3001\u7EC4\u4EF6\u7B49",rows:4})}),(0,e.jsxs)(t.Form.Item,{style:{textAlign:"right",marginBottom:0},children:[(0,e.jsx)(t.Button,{htmlType:"button",onClick:Pe,style:{marginRight:20},children:"\u8FD4\u56DE"}),(0,e.jsx)(t.Button,{type:"primary",htmlType:"submit",loading:b,children:m?"\u786E\u8BA4":"\u5BFC\u5165"})]})]})})},Re=We,Ge=i(49231),c=i.n(Ge),u=i(87651),se,ae,re,oe,ie,le,ce,He=function(){var o=t.theme.useToken,a=o(),n=a.token,r=n.colorTextSecondary,s=n.colorPrimary;return{card:(0,u.iv)(se||(se=c()([`
      cursor: pointer;
    `]))),cardTitle:(0,u.iv)(ae||(ae=c()([`
      display: flex;

      .ant-tag {
        position: relative;
      }
    `]))),cardDescription:(0,u.iv)(re||(re=c()([`
      height: 25px;
      overflow: hidden;
      color: `,`;
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
    `])),r),cardPackage:(0,u.iv)(oe||(oe=c()([`
      position: relative;
      color: `,`;
      font-size: 12px;
      display: flex;

      .ant-tag {
        position: relative;
      }
    `])),r),cardPackageVerson:(0,u.iv)(ie||(ie=c()([`
      position: absolute;
      margin-left: 5px;
      color: `,`;
    `])),s),cardPackagName:(0,u.iv)(le||(le=c()([`
      line-height: 20px;
    `]))),importAsset:(0,u.iv)(ce||(ce=c()([`
      position: absolute;
      top: -65px;
      right: 0;
    `])))}},Je=He,K=i(81309),Ke=i(90527),Ye=["assetId"],Q=function(o){return Ke.AT.some(function(a){return a.package===o})},Qe=function(o){var a=(0,k.useState)(!1),n=f()(a,2),r=n[0],s=n[1],h=(0,k.useState)(),d=f()(h,2),l=d[0],v=d[1],F=(0,k.useState)([]),b=f()(F,2),j=b[0],L=b[1],A=Je(),G=t.message.useMessage(),I=f()(G,2),p=I[0],_=I[1],M=function(){(0,K.nl)().then(function(g){L(g)})};(0,k.useEffect)(function(){M()},[]);var w=function(g){v(g),s(!0)},H=function(g){var T=g.assetId,z=Be()(g,Ye);(0,N.loadAssetPackages)([E()({},g)],{isLoadStyle:!1}).then(function(J){J&&(T?(0,K.rW)(T,z).then(function(Z){p.success("\u66F4\u65B0\u8D44\u4EA7\u6210\u529F\uFF01"),M(),s(!1),v(void 0)}):(0,K.fY)(g).then(function(){p.success("\u521B\u5EFA\u8D44\u4EA7\u6210\u529F\uFF01"),M(),s(!1),v(void 0)}))}).catch(function(){T?p.error("\u521B\u5EFA\u8D44\u4EA7\u5931\u8D25\uFF01"):p.error("\u8D44\u4EA7\u66F4\u65B0\u5931\u8D25\uFF01")})},V=function(g){(0,K.wM)(g).then(function(){p.success("\u8D44\u4EA7\u5220\u9664\u6210\u529F\uFF01"),M()})},O=function(g){var T=[{key:"editAsset",label:"\u4FEE\u6539\u8D44\u4EA7",disabled:Q(g.package),onClick:function(){w(g)}},{key:"delAsset",label:"\u5220\u9664\u8D44\u4EA7",disabled:Q(g.package),onClick:function(){V(g.assetId)}}];return(0,e.jsx)("div",{onClick:function(J){return J.stopPropagation()},children:(0,e.jsx)(t.Dropdown,{menu:{items:T},children:(0,e.jsx)(x.MoreOutlined,{})})})};return(0,e.jsxs)(t.Row,{gutter:[48,24],className:o.className,children:[j.map(function(m){var g;return(0,e.jsx)(t.Col,{xxl:6,xl:8,lg:12,md:12,sm:24,xs:24,children:(0,e.jsxs)(t.Card,{title:(0,e.jsxs)("div",{className:A.cardTitle,onClick:function(){Q(m.package)||w(m)},children:[(0,e.jsx)("div",{children:m.name}),((g=m.description)===null||g===void 0?void 0:g.includes("\u5B98\u65B9"))&&(0,e.jsx)("div",{children:(0,e.jsx)(t.Tag,{className:A.cardPackageVerson,children:"\u5B98\u65B9"})})]}),bordered:!1,className:A.card,extra:O(m),children:[(0,e.jsx)("p",{className:A.cardDescription,children:m.description&&m.description.length>26?(0,e.jsx)(t.Tooltip,{title:m.description,children:m.description}):m.description}),(0,e.jsxs)("div",{className:A.cardPackage,children:[(0,e.jsx)("div",{children:m.package}),(0,e.jsx)("div",{children:(0,e.jsx)(t.Tag,{className:A.cardPackageVerson,children:m.version})})]})]})},m.assetId)}),(0,e.jsx)(t.Button,{type:"primary",ghost:!0,className:A.importAsset,onClick:function(){return s(!0)},children:"\u5BFC\u5165\u8D44\u4EA7\u5305"}),(0,e.jsx)(Re,{open:r,initialValue:l,onSubmit:H,onCancel:function(){s(!1),v(void 0)}}),_]})},Ze=Qe,Xe=i(87971),qe=function(){return(0,e.jsxs)("svg",{viewBox:"0 0 1024 1024",width:"1em",height:"1em",style:{fill:"currentcolor"},children:[(0,e.jsx)("path",{d:"M307.2 486.4V194.56c0-23.04 17.92-40.96 40.96-40.96h478.72c25.6 0 43.52 17.92 43.52 40.96v478.72c0 23.04-17.92 40.96-40.96 40.96h-158.72l-227.84-386.56c-2.56-2.56-5.12-7.68-10.24-10.24-12.8-7.68-28.16-2.56-35.84 10.24L307.2 486.4z"}),(0,e.jsx)("path",{d:"M445.44 448l243.2 417.28c7.68 12.8 2.56 28.16-10.24 35.84-5.12 2.56-7.68 2.56-12.8 2.56H179.2c-15.36 0-25.6-10.24-25.6-25.6 0-5.12 0-10.24 2.56-12.8l243.2-417.28c7.68-12.8 23.04-15.36 35.84-10.24 5.12 2.56 7.68 5.12 10.24 10.24z",fill:"#A9CFFF",style:{opacity:.36}})]})},et=function(){return(0,e.jsxs)("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",style:{fill:"currentcolor"},children:[(0,e.jsx)("path",{d:"M510.464 625.152c-7.168 0-13.824-2.048-19.968-6.144L113.664 365.568c-10.24-6.656-15.872-18.432-15.872-30.208 0-12.288 6.656-23.552 16.896-29.696l382.976-239.616c11.776-7.168 26.624-7.168 37.888 0l374.784 234.496c10.24 6.656 16.384 17.408 16.896 29.696 0 12.288-5.632 23.552-15.872 30.208L530.432 619.52c-6.144 3.584-13.312 5.632-19.968 5.632zM199.168 336.896l310.784 209.408 315.392-214.528L516.608 138.24l-317.44 198.656z",fill:"#A9CFFF",style:{opacity:.36}}),(0,e.jsx)("path",{d:"M508.416 807.936c-7.168 0-14.336-2.048-19.968-6.144L61.44 509.952c-16.384-11.264-20.48-33.28-9.216-49.664 11.264-16.384 33.28-20.48 49.664-9.216l406.528 277.504L919.552 445.44c16.384-11.264 38.4-7.168 49.664 9.216 11.264 16.384 7.168 38.4-9.216 49.664l-431.616 297.472c-5.632 3.584-12.8 6.144-19.968 6.144z"}),(0,e.jsx)("path",{d:"M506.88 982.016c-7.168 0-14.336-2.048-19.968-6.144l-427.008-291.328c-16.384-11.264-20.48-33.28-9.216-49.664 11.264-16.384 33.28-20.48 49.664-9.216L506.88 903.168l411.136-283.136c16.384-11.264 38.4-7.168 49.664 9.216 11.264 16.384 7.168 38.4-9.216 49.664l-431.104 296.96c-6.144 4.096-13.312 6.144-20.48 6.144z",fill:"#A9CFFF",style:{opacity:.36}})]})},ue,de,me,pe,ve,he,ge,fe,xe,tt=function(){var o=t.theme.useToken,a=o(),n=a.token,r=n.colorTextSecondary,s=n.colorPrimary;return{components:(0,u.iv)(ue||(ue=c()([`
      padding: 15px 5px;
    `]))),components__content:(0,u.iv)(de||(de=c()([`
      position: relative;
      display: flex;
      align-items: center;
    `]))),components__content__img:(0,u.iv)(me||(me=c()([`
      span {
        font-size: 60px;

        svg {
          color: `,`;
        }
      }
    `])),s),components__content__right:(0,u.iv)(pe||(pe=c()([`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 80px;
      overflow: hidden;
      padding: 0 5px;
    `]))),components__content__right__header:(0,u.iv)(ve||(ve=c()([`
      display: flex;
      align-items: center;
    `]))),components__content__right__header__name:(0,u.iv)(he||(he=c()([`
      height: 22px;
      font-size: 14px;
    `]))),components__content__right__header__verson:(0,u.iv)(ge||(ge=c()([`
      margin-left: 4px;
      color: `,`;
    `])),s),components__content__right__description:(0,u.iv)(fe||(fe=c()([`
      height: 18px;
      overflow: hidden;
      color: `,`;
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
    `])),r),components__content__right__package:(0,u.iv)(xe||(xe=c()([`
      color: `,`;
      font-size: 12px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    `])),r)}},nt=tt,st=function(o){var a=o.list,n=o.icon,r=nt();return(0,e.jsx)(t.Row,{gutter:[48,24],children:a.map(function(s,h){var d,l=(0,e.jsx)(P(),{component:s.metadata.icon?s.metadata.icon:n}),v=(0,Y.isEmpty)(s.metadata.description)?"\u6682\u65E0\u63CF\u8FF0":s.metadata.description&&((d=s.metadata.description)===null||d===void 0?void 0:d.length)>20?(0,e.jsx)(t.Tooltip,{title:s.metadata.description,children:s.metadata.description}):s.metadata.description;return(0,e.jsx)(t.Col,{xxl:4,xl:6,lg:8,md:12,sm:24,xs:24,children:(0,e.jsx)(t.Card,{bordered:!1,className:r.components,bodyStyle:{overflow:"hidden",padding:0},children:(0,e.jsxs)("div",{className:r.components__content,children:[(0,e.jsx)("div",{className:r.components__content__img,children:l}),(0,e.jsxs)("div",{className:r.components__content__right,children:[(0,e.jsxs)("div",{className:r.components__content__right__header,children:[(0,e.jsx)("div",{className:r.components__content__right__header__name,children:s.metadata.displayName}),(0,e.jsx)(t.Tag,{className:r.components__content__right__header__verson,children:s.version})]}),(0,e.jsx)("span",{className:r.components__content__right__description,children:v}),(0,e.jsxs)("span",{className:r.components__content__right__package,children:[s.packageName,(0,e.jsx)("span",{style:{marginLeft:5},children:s.packageVersion})]})]})]})},h)},h)})})},ye=st,at=i(80445),je=i.n(at),rt=function(o){for(var a=[],n=[],r=function(){var d=o[s],l=d.metadata||{name:""};a.push.apply(a,je()(d.layers.map(function(v){return E()(E()({},v),{},{packageName:l.name,packageVersion:l.version})}))),n.push.apply(n,je()(d.widgets.map(function(v){return E()(E()({},v),{},{packageName:l.name,packageVersion:l.version})})))},s=0;s<o.length;s++)r();return{layers:a,widgets:n}},Ce,Fe,ke,Ae,_e,be,Me,Se,Ne,ot=function(){var o=t.theme.useToken,a=o(),n=a.token,r=n.colorTextSecondary;return{assetsFilterBtn:(0,u.iv)(Ce||(Ce=c()([`
      position: absolute;
      top: -65px;
      right: 0;
    `]))),filterAssetPopover:(0,u.iv)(Fe||(Fe=c()([`
      width: 180px;
    `]))),filterAssetPopoverTitle:(0,u.iv)(ke||(ke=c()([`
      color: `,`;
    `])),r),filterAssetPopoverCheckbox:(0,u.iv)(Ae||(Ae=c()([`
      display: flex;
      flex-direction: column;
    `]))),filterAssetPopoverCheckboxItem:(0,u.iv)(_e||(_e=c()([`
      margin-bottom: 10px;
    `]))),filterAssetPopoverBtn:(0,u.iv)(be||(be=c()([`
      text-align: right;
    `]))),assetMarketModule:(0,u.iv)(Me||(Me=c()([`
      padding: 10px 0;
    `]))),assetMarketModuleTitle:(0,u.iv)(Se||(Se=c()([`
      margin-bottom: 12px;
      font-size: 14px;
    `]))),assetMarkeEmpty:(0,u.iv)(Ne||(Ne=c()([`
      justify-content: center;
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
    `])))}},it=ot,lt=i(93707),ct=function(o){var a=(0,lt.z2)(void 0,{isLoadStyle:!1,sandbox:!0}),n=a.assets,r=a.loading,s=it(),h=(0,k.useMemo)(function(){return n.map(function(p){var _,M;return(_=(M=p.metadata)===null||M===void 0?void 0:M.name)!==null&&_!==void 0?_:""})},[n]),d=(0,k.useState)([]),l=f()(d,2),v=l[0],F=l[1];(0,k.useEffect)(function(){F(h)},[h]);var b=(0,k.useMemo)(function(){var p=rt(n),_=p.layers,M=p.widgets,w=_.filter(function(V){return v.includes(V.packageName)}),H=M.filter(function(V){return v.includes(V.packageName)});return{layers:w,widgets:H}},[n,v]),j=b.layers,L=b.widgets,A=(0,k.useMemo)(function(){if(!L)return[];var p=(0,Xe.cq)(L);return p},[L]),G=function(_){F(_)},I=(0,e.jsxs)("div",{className:s.filterAssetPopover,children:[(0,e.jsx)("p",{className:s.filterAssetPopoverTitle,children:"\u8D44\u4EA7\u5305"}),(0,e.jsx)(t.Checkbox.Group,{value:v,onChange:G,className:s.filterAssetPopoverCheckbox,children:h.map(function(p,_){return(0,e.jsx)(t.Checkbox,{value:p,className:s.filterAssetPopoverCheckboxItem,children:p},_)})}),(0,e.jsx)("div",{className:s.filterAssetPopoverBtn,children:(0,e.jsx)(t.Button,{size:"small",type:"primary",onClick:function(){if(n.length===v.length)return F([]);F(h)},children:n.length===v.length?"\u91CD\u7F6E":"\u5168\u9009"})})]});return r?(0,e.jsx)("div",{style:{textAlign:"center",padding:"30px 50px"},children:(0,e.jsx)(t.Spin,{})}):(0,e.jsxs)("div",{className:o.className,children:[(0,e.jsx)(t.Popover,{arrow:!1,content:I,trigger:"hover",placement:"leftTop",children:(0,e.jsx)(t.Button,{type:"primary",ghost:!0,className:s.assetsFilterBtn,icon:(0,e.jsx)(x.FilterOutlined,{}),children:"\u7B5B\u9009"})}),j.length?(0,e.jsxs)("div",{className:s.assetMarketModule,children:[(0,e.jsx)("p",{className:s.assetMarketModuleTitle,children:"\u53EF\u89C6\u5316\u56FE\u5C42\u7EC4\u4EF6"}),(0,e.jsx)(ye,{list:j,icon:et},"layers")]}):null,A==null?void 0:A.map(function(p){if(p.widgets.length)return(0,e.jsxs)("div",{className:s.assetMarketModule,children:[(0,e.jsx)("p",{className:s.assetMarketModuleTitle,children:p.categoryName}),(0,e.jsx)(ye,{list:p.widgets,icon:qe},"widgets")]},p.category)}),!j.length&&!L.length&&(0,e.jsx)("div",{className:s.assetMarkeEmpty,children:(0,e.jsx)(t.Empty,{image:t.Empty.PRESENTED_IMAGE_SIMPLE,description:"\u6682\u65E0\u7EC4\u4EF6"})})]})},ut=ct,B={layout:"layout___hYknw",header:"header___bnmp8","header-left":"header-left___rV4Gd",logo:"logo___FD0Z4","logo-img":"logo-img___h8YRK",content:"content___zUqyK","my-components":"my-components___By5le","my-assets-marks":"my-assets-marks___UEjSW"},dt=t.theme.useToken,mt=function(){var o=dt(),a=o.token,n=(0,k.useState)("myComponents"),r=f()(n,2),s=r[0],h=r[1],d="L7VP \uFF5C \u8D44\u4EA7\u5E02\u573A";(0,D.Z)(d);var l=[{key:"myComponents",label:"\u6211\u7684\u7EC4\u4EF6",children:(0,e.jsx)(ut,{className:B["my-components"]})},{key:"myAssetMarks",label:"\u6211\u7684\u8D44\u4EA7\u5305",children:(0,e.jsx)(Ze,{className:B["my-assets-marks"]})}],v=function(b){var j;try{j=(0,N.parseAssetPackage)(b)}catch(L){console.warn("\u89E3\u6790 ".concat(b," \u5931\u8D25"))}return j};return(0,e.jsxs)(t.Layout,{className:B.layout,children:[(0,e.jsxs)(R.h4,{className:B.header,style:{color:a.colorText,backgroundColor:a.colorBgLayout},children:[(0,e.jsxs)("div",{className:B["header-left"],onClick:function(){te.m8.push("/")},children:[(0,e.jsx)("img",{className:B["logo-img"],src:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xuDWR7uXkbkAAAAAAAAAAAAADmJ7AQ/original"}),(0,e.jsx)("div",{className:B.logo,children:d})]}),(0,e.jsxs)("div",{children:[(0,e.jsx)(t.Button,{type:"text",size:"small",icon:(0,e.jsx)(x.QuestionCircleOutlined,{}),onClick:function(){window.open(te.m8.createHref("/docs?path=zqvk302x61qq2kcq"))},children:"\u8D44\u4EA7\u624B\u518C"}),(0,e.jsx)("a",{href:"https://github.com/antvis/L7VP",target:"_blank",rel:"noreferrer",children:(0,e.jsx)(t.Button,{type:"text",size:"small",icon:(0,e.jsx)(x.GithubOutlined,{}),children:"GitHub"})})]})]}),(0,e.jsx)(R.VY,{style:{color:a.colorText},className:B.content,children:(0,e.jsx)(t.Tabs,{activeKey:s,items:l,destroyInactiveTabPane:!0,onChange:function(b){h(b)}})})]})},pt=mt},29773:function(S,$,i){var W=i(24146);function f(x,P){if(x==null)return{};var N=W(x,P),D,t;if(Object.getOwnPropertySymbols){var R=Object.getOwnPropertySymbols(x);for(t=0;t<R.length;t++)D=R[t],!(P.indexOf(D)>=0)&&Object.prototype.propertyIsEnumerable.call(x,D)&&(N[D]=x[D])}return N}S.exports=f,S.exports.__esModule=!0,S.exports.default=S.exports},24146:function(S){function $(i,W){if(i==null)return{};var f={},x=Object.keys(i),P,N;for(N=0;N<x.length;N++)P=x[N],!(W.indexOf(P)>=0)&&(f[P]=i[P]);return f}S.exports=$,S.exports.__esModule=!0,S.exports.default=S.exports}}]);