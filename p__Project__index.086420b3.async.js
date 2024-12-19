(self.webpackChunk_antv_li_website=self.webpackChunk_antv_li_website||[]).push([[721],{3944:function(E,u,n){"use strict";n.d(u,{R:function(){return s}});var C=n(12611),L=n.n(C),A=n(90527),s=function(t,V){var T=V.includes(A.hg)?A.e1:A.Gj,j={version:"v0.1",metadata:{name:t},datasets:[],spec:{map:{basemap:"Gaode",config:{zoom:3,center:[120.153576,30.287459],pitch:0,bearing:0,style:"dark",WebGLParams:{preserveDrawingBuffer:!0}},logoPosition:"leftbottom"},layers:[],widgets:(0,C.cloneDeep)(T)}};return j}},16736:function(E,u,n){"use strict";n.r(u),n.d(u,{default:function(){return Ge}});var C=n(12134),L=n.n(C),A=n(69024),s=n.n(A),c=n(16640),t=n(81821),V=n(90005),T=n.n(V),j=n(41991),d=n(87363),b=n(28869),U=n(51490),z=n.n(U),_=n(91055),$=n.n(_),Pe=n(88104),Ie=n.n(Pe),Ne=n(3944),X={inputBorder:"inputBorder___GpAvJ",submitButton:"submitButton____lcIY","tabs-item":"tabs-item___Ec99P"},G=n(81309),K=n(90527),e=n(70293),Ae=t.Input.TextArea;function Te(y){var o=y.visible,p=y.onVisibleChange,a=y.project,v=y.onSubmit,S=y.type,x=t.Form.useForm(),F=s()(x,1),m=F[0],P=(0,d.useState)([]),M=s()(P,2),W=M[0],J=M[1],Q=W.map(function(h){return{label:h.name,value:h.assetId}});(0,d.useEffect)(function(){(0,G.nl)().then(function(h){J(h)})},[]);var k=function(){var h=Ie()(z()().mark(function B(){return z()().wrap(function(R){for(;;)switch(R.prev=R.next){case 0:m.validateFields().then(function(I){if(S==="edit")a!=null&&a.projectId&&(0,G.ty)(a==null?void 0:a.projectId,$()($()({},a),I)).then(function(N){v(N),p(!1),m.resetFields()});else{var w=(0,Ne.R)(I.projectName,I.assetPackageIds);(0,G.$L)($()($()({},I),{},{applicationConfig:w})).then(function(N){v(N),p(!1),m.resetFields()})}});case 1:case"end":return R.stop()}},B)}));return function(){return h.apply(this,arguments)}}();(0,d.useEffect)(function(){S==="edit"&&o&&m.setFieldsValue({projectName:a==null?void 0:a.projectName,description:a==null?void 0:a.description,assetPackageIds:(a==null?void 0:a.assetPackageIds)||K.CN})},[m,a,S,o]);var f=[{key:"1",label:"".concat(S==="edit"?"\u4FEE\u6539":"\u521B\u5EFA","\u9879\u76EE"),children:(0,e.jsxs)(t.Form,{form:m,layout:"vertical",initialValues:{assetPackageIds:K.CN},children:[(0,e.jsx)(t.Form.Item,{name:"projectName",label:"\u9879\u76EE\u540D\u79F0",rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0"}],children:(0,e.jsx)(t.Input,{placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0",className:X.inputBorder})}),(0,e.jsx)(t.Form.Item,{name:"description",label:"\u9879\u76EE\u63CF\u8FF0",children:(0,e.jsx)(Ae,{rows:2,className:X.inputBorder})}),(0,e.jsx)(t.Form.Item,{name:"assetPackageIds",label:"\u8D44\u4EA7\u5305",validateFirst:!0,rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u9879\u76EE\u4F9D\u8D56\u7684\u8D44\u4EA7\u5305"},{validator:function(B,D){return D.includes(K.Jg)?Promise.resolve():Promise.reject(new Error("\u8BF7\u6DFB\u52A0\u53EF\u89C6\u5316\u6838\u5FC3\u8D44\u4EA7"))}}],children:(0,e.jsx)(t.Select,{placeholder:"\u8BF7\u9009\u62E9\u8D44\u4EA7\u5305",mode:"multiple",options:Q})})]})}];return(0,e.jsx)(t.Modal,{width:800,open:o,onOk:k,onCancel:function(){p(!1),m.resetFields()},destroyOnClose:!0,children:(0,e.jsx)(t.Tabs,{defaultActiveKey:"1",items:f,className:X["tabs-item"]})})}var ee={"upload-dragger-content":"upload-dragger-content___rhE1S"};function Fe(y){var o=y.visible,p=y.onVisibleChange,a=y.onSubmit,v=(0,d.useState)(),S=s()(v,2),x=S[0],F=S[1],m=t.message.useMessage(),P=s()(m,2),M=P[0],W=P[1],J=function(f){var h=f.file,B=f.onSuccess,D=new FileReader;D.readAsText(h),D.onload=function(R){try{var I,w=JSON.parse((I=R.target)===null||I===void 0?void 0:I.result);if(w.version&&w.metadata&&w.datasets&&w.spec){var N;F(JSON.parse((N=R.target)===null||N===void 0?void 0:N.result))}else M.error("\u6570\u636E\u65E0\u6CD5\u89E3\u6790\uFF0C\u8BF7\u68C0\u67E5\u6570\u636E\u7ED3\u6784")}catch(Y){console.log("\u6587\u4EF6\u89E3\u6790\u5931\u8D25",Y)}B()}},Q=[{key:"1",label:"\u5BFC\u5165\u9879\u76EE",children:(0,e.jsx)(t.Upload.Dragger,{name:"data",accept:".json",customRequest:J,maxCount:1,children:(0,e.jsxs)("div",{className:ee["upload-dragger-content"],children:[(0,e.jsx)("p",{className:"ant-upload-drag-icon",children:(0,e.jsx)(c.InboxOutlined,{})}),(0,e.jsx)("p",{className:"ant-upload-text",children:"\u70B9\u51FB\u6216\u5C06\u6570\u636E\u6587\u4EF6\u62D6\u62FD\u5230\u8FD9\u91CC\u4E0A\u4F20"})]})})}];return(0,e.jsxs)(t.Modal,{width:800,open:o,destroyOnClose:!0,onCancel:function(){return p(!1)},footer:(0,e.jsxs)(t.Space,{children:[(0,e.jsx)(t.Button,{onClick:function(){return p(!1)},children:"\u8FD4\u56DE"}),(0,e.jsx)(t.Button,{type:"primary",disabled:!x,onClick:function(){if(x){var f=x.metadata,h={projectName:f.name,description:(f==null?void 0:f.description)||"\u6682\u65E0\u9879\u76EE\u63CF\u8FF0",assetPackageIds:(f==null?void 0:f.assetPackageIds)||K.CN};(0,G.$L)($()($()({},h),{},{applicationConfig:x})).then(function(B){a(),p(!1)})}},children:"\u5BFC\u5165"})]}),children:[W,(0,e.jsx)(t.Tabs,{defaultActiveKey:"1",items:Q,className:ee["tabs-item"]})]})}var ke=n(99067),Be=n(49231),r=n.n(Be),i=n(87651),te,ne,ae,se,oe,re,ie,le,ce,ue,De=function(){var o=t.theme.useToken,p=o(),a=p.token,v=a.colorTextSecondary;return{navCard:(0,i.iv)(te||(te=r()([`
      width: 100%;
      height: 200px;
      margin-bottom: 20px;
    `]))),navCardTitle:(0,i.iv)(ne||(ne=r()([`
      font-size: 20px;
      font-weight: 500;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    `]))),navCardClosed:(0,i.iv)(ae||(ae=r()([`
      font-size: 16px;
      line-height: 22px;
      padding: 0;
      width: 22px;
      height: 22px;
      color: `,`;
    `])),v),navCardContent:(0,i.iv)(se||(se=r()([`
      display: flex;
      justify-content: space-between;
    `]))),navCardContentItem:(0,i.iv)(oe||(oe=r()([`
      display: flex;
      flex: 1;
      margin-right: 10px;
      align-items: flex-start;
    `]))),itemSerialNumber:(0,i.iv)(re||(re=r()([`
      margin-right: 5px;
      font-size: 16px;
      font-weight: 500;
      height: 30px;
    `]))),itemContent:(0,i.iv)(ie||(ie=r()([`
      display: flex;
      flex-direction: column;
      width: 100%;
    `]))),itemTitle:(0,i.iv)(le||(le=r()([`
      font-size: 16px;
      font-weight: 500;
      height: 30px;
      display: flex;
      width: 100%;
      margin-bottom: 10px;
      justify-content: space-between;
      align-items: flex-start;
    `]))),itemTitleIcon:(0,i.iv)(ce||(ce=r()([`
      font-size: 10px;
      color: `,`;
      margin-top: 7px;
      margin-right: 20px;
    `])),v),itemDesc:(0,i.iv)(ue||(ue=r()([`
      color: `,`;
      font-size: 12px;
    `])),v)}},Re=De,de=[{title:"\u51C6\u5907\u6570\u636E",description:"\u51C6\u5907\u597D\u8981\u8FDB\u884C\u5730\u7406\u53EF\u89C6\u5206\u6790\u7684\u6570\u636E"},{title:"\u521B\u5EFA\u9879\u76EE",description:"\u521B\u5EFA\u4E00\u4E2A\u9879\u76EE\u5F00\u59CB\u63A2\u7D22\u4F60\u51C6\u5907\u7684\u6570\u636E"},{title:"\u914D\u7F6E\u5BFC\u51FA",description:"\u914D\u7F6E\u53EF\u89C6\u56FE\u5C42\u4EE5\u53CA\u5206\u6790\u7EC4\u4EF6\uFF0C\u9884\u89C8\u6216\u5BFC\u51FA\u53EF\u89C6\u5206\u6790\u6210\u679C"}],we=function(){var o=Re(),p=(0,d.useState)(!1),a=s()(p,2),v=a[0],S=a[1],x=(0,ke.Z)(),F=x.md===!1;if(!(v||F))return(0,e.jsxs)(t.Card,{className:T()(o.navCard),children:[(0,e.jsxs)("div",{className:o.navCardTitle,children:[(0,e.jsx)("div",{children:"\u5FEB\u6765\u63A2\u7D22\u4F60\u7684\u5730\u7406\u7A7A\u95F4\u6570\u636E\u5427\uFF5E"}),(0,e.jsx)(t.Button,{type:"text",className:o.navCardClosed,onClick:function(){S(!0)},children:(0,e.jsx)(c.CloseOutlined,{})})]}),(0,e.jsx)("div",{className:o.navCardContent,children:de.map(function(m,P){return(0,e.jsxs)("div",{className:o.navCardContentItem,children:[(0,e.jsx)("div",{className:o.itemSerialNumber,children:P+1}),(0,e.jsxs)("div",{className:o.itemContent,children:[(0,e.jsxs)("div",{className:o.itemTitle,children:[m.title," ",P+1!==de.length&&(0,e.jsx)(c.RightOutlined,{className:o.itemTitleIcon})]}),(0,e.jsx)("div",{className:o.itemDesc,children:m.description})]})]},P)})})]})},Le=we,pe,me,ve,fe,je,xe,he,ge,Ce,be,Me=function(){var o=t.theme.useToken,p=o(),a=p.token,v=a.colorTextSecondary,S=a.colorPrimaryText,x=a.colorText,F=a.colorBgElevated;return{project:(0,i.iv)(pe||(pe=r()([`
      padding: 0 95px;
    `]))),projectTabs:(0,i.iv)(me||(me=r()([`
      .ant-tabs-tab-active .ant-tabs-tab-btn {
        color: `,` !important;
      }
      .ant-tabs-ink-bar {
        background: `,` !important;
      }
    `])),x,x),projectCard:(0,i.iv)(ve||(ve=r()([`
      cursor: pointer;
    `]))),projectCardImg:(0,i.iv)(fe||(fe=r()([`
      height: 200px;
      object-fit: cover;
      width: 100%;
    `]))),projectCardTools:(0,i.iv)(je||(je=r()([`
      position: absolute;
      top: 10px;
      right: 10px;
      border-radius: 20px;
      &:hover {
        background: `,`;
      }
    `])),F),itemDescription:(0,i.iv)(xe||(xe=r()([`
      margin-bottom: 0 !important;
    `]))),addCard:(0,i.iv)(he||(he=r()([`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 113px;
      color: `,`;
    `])),v),addCardIcon:(0,i.iv)(ge||(ge=r()([`
      font-size: 20px;
      margin-bottom: 12px;
    `]))),importBtnIcon:(0,i.iv)(Ce||(Ce=r()([`
      transition: transform 0.1s linear, -webkit-transform 0.1s linear;
    `]))),importBtnIconRotate:(0,i.iv)(be||(be=r()([`
      transform: rotate(180deg);
    `])))}},Ve=Me,Ue=n(9256),ze=t.Card.Meta,$e=function(){var o=(0,d.useState)(!0),p=s()(o,2),a=p[0],v=p[1],S=(0,d.useState)(!1),x=s()(S,2),F=x[0],m=x[1],P=(0,d.useState)(!1),M=s()(P,2),W=M[0],J=M[1],Q=(0,d.useState)("add"),k=s()(Q,2),f=k[0],h=k[1],B=(0,d.useState)(),D=s()(B,2),R=D[0],I=D[1],w=(0,d.useState)([]),N=s()(w,2),Y=N[0],ye=N[1],O=Ve(),Ke=(0,d.useState)(!1),Se=s()(Ke,2),Je=Se[0],We=Se[1],Z=function(){return(0,G.ku)().then(function(g){g.length?ye(K.RI.concat(g)):ye(K.RI)}).catch(function(g){console.log("err: ",g)})};(0,d.useEffect)(function(){v(!0),Z().finally(function(){return v(!1)})},[]);var Ee=function(){window.open(b.m8.createHref("/new"))},Oe=function(g){b.m8.push({pathname:"/builder/".concat(g.projectId)})},Qe=function(g){f==="edit"?Z():Oe(g)},He=function(){Z()},_e={right:(0,e.jsx)(t.Space,{children:(0,e.jsx)(t.Dropdown.Button,{type:"primary",icon:(0,e.jsx)(c.DownOutlined,{className:T()(O.importBtnIcon,L()({},O.importBtnIconRotate,Je))}),menu:{items:[{key:"importProject",label:"\u5BFC\u5165\u9879\u76EE",onClick:function(){J(!0)}}]},onClick:function(){return Ee()},onOpenChange:function(g){We(g)},children:"\u521B\u5EFA\u9879\u76EE"})})},Ye=[{key:"my-project",label:"\u6211\u7684\u9879\u76EE",children:(0,e.jsxs)(t.Row,{gutter:[48,24],children:[Y.map(function(l){var g,q,Ze=[{key:"2",label:"\u5BFC\u51FA\u9879\u76EE",onClick:function(){(0,j.Di)("".concat(l.projectName,".json"),JSON.stringify(l.applicationConfig))}},{key:"3",label:"\u5220\u9664\u9879\u76EE",onClick:function(){(0,G.th)(l.projectId).then(function(){Z()})}}],Xe=(0,e.jsx)(t.Card,{className:O.projectCard,onClick:function(){return Oe(l)},cover:(0,e.jsxs)("div",{children:[(0,e.jsx)("img",{className:O.projectCardImg,src:"https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*OREXQ4vgQRIAAAAAAAAAAAAAARQnAQ"}),(0,e.jsx)("div",{className:O.projectCardTools,onClick:function(qe){return qe.stopPropagation()},children:(0,e.jsxs)(t.Space,{children:[(0,e.jsx)(t.Tooltip,{title:"\u9884\u89C8\u9879\u76EE",children:(0,e.jsx)(t.Button,{type:"text",shape:"circle",icon:(0,e.jsx)(c.DesktopOutlined,{}),onClick:function(){(0,Ue.lF)(11),window.open(b.m8.createHref("/app/".concat(l.projectId,"?type=project")))}})}),(0,e.jsx)(t.Tooltip,{title:"\u4FEE\u6539\u9879\u76EE",children:(0,e.jsx)(t.Button,{type:"text",shape:"circle",icon:(0,e.jsx)(c.EditOutlined,{}),onClick:function(){h("edit"),I(l),m(!0)}})}),(0,e.jsx)(t.Dropdown,{menu:{items:Ze},children:(0,e.jsx)(t.Button,{type:"text",shape:"circle",icon:(0,e.jsx)(c.EllipsisOutlined,{})})})]})})]}),children:(0,e.jsx)(ze,{title:(0,e.jsx)("span",{title:l.projectName,children:l.projectName}),description:(0,e.jsx)("div",{children:(0,e.jsx)(t.Typography.Paragraph,{className:O.itemDescription,type:"secondary",ellipsis:{rows:1,tooltip:((g=l.description)===null||g===void 0?void 0:g.length)>20&&{title:l.description}},children:(q=l.description)!==null&&q!==void 0?q:"\u6682\u65E0\u9879\u76EE\u63CF\u8FF0"})})})});return(0,e.jsx)(t.Col,{xxl:6,xl:8,lg:12,md:12,sm:24,xs:24,children:Xe},l.projectId)}),Y.length===0&&(0,e.jsx)(t.Col,{xxl:6,xl:8,lg:12,md:12,sm:24,xs:24,children:(0,e.jsx)(t.Card,{bordered:!1,className:O.projectCard,onClick:Ee,children:(0,e.jsxs)("div",{className:O.addCard,children:[(0,e.jsx)(c.PlusOutlined,{className:O.addCardIcon}),(0,e.jsx)("span",{children:"\u6682\u65E0\u9879\u76EE\uFF0C\u521B\u5EFA\u4E00\u4E2A\u5427"})]})})})]})}];return a?(0,e.jsx)("div",{style:{textAlign:"center",padding:"60px 50px"},children:(0,e.jsx)(t.Spin,{})}):(0,e.jsxs)("div",{className:O.project,children:[(0,e.jsx)(Le,{}),(0,e.jsx)(t.Tabs,{defaultActiveKey:"my-project",tabBarExtraContent:_e,items:Ye,className:O.projectTabs}),(0,e.jsx)(Te,{visible:F,onVisibleChange:m,project:R,type:f,onSubmit:Qe}),(0,e.jsx)(Fe,{visible:W,onVisibleChange:J,onSubmit:He})]})},Ge=$e},164:function(E,u,n){"use strict";var C=n(87363),L=Symbol.for("react.element"),A=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,c=C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,t={key:!0,ref:!0,__self:!0,__source:!0};function V(T,j,d){var b,U={},z=null,_=null;d!==void 0&&(z=""+d),j.key!==void 0&&(z=""+j.key),j.ref!==void 0&&(_=j.ref);for(b in j)s.call(j,b)&&!t.hasOwnProperty(b)&&(U[b]=j[b]);if(T&&T.defaultProps)for(b in j=T.defaultProps,j)U[b]===void 0&&(U[b]=j[b]);return{$$typeof:L,type:T,key:z,ref:_,props:U,_owner:c.current}}u.Fragment=A,u.jsx=V,u.jsxs=V},70293:function(E,u,n){"use strict";E.exports=n(164)},24252:function(E,u){"use strict";var n=!!(typeof window!="undefined"&&window.document&&window.document.createElement);u.Z=n},41991:function(E,u){"use strict";var n;n={value:!0};function C(s,c){var t=document.createElement("a");t.href=c,t.download=s,t.click()}n=C;function L(s,c){var t=URL.createObjectURL(c);C(s,t),URL.revokeObjectURL(t)}u.lm=L;function A(s,c){L(s,new Blob([c],{type:"octet/stream"}))}u.Di=A},49231:function(E){function u(n,C){return C||(C=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(C)}}))}E.exports=u,E.exports.__esModule=!0,E.exports.default=E.exports}}]);
