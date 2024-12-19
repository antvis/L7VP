"use strict";(self.webpackChunk_antv_li_website=self.webpackChunk_antv_li_website||[]).push([[795],{34795:function(ht,xe,i){i.d(xe,{es:function(){return Dn},FE:function(){return kn},Tl:function(){return Fn}});var $=i(36268),O=i(87971),ce=i(80445),Ae=i.n(ce),be=i(51490),re=i.n(be),ve=i(88104),ue=i.n(ve),Se=i(69024),x=i.n(Se),s=i(81821),je=i(90005),r=i.n(je),M=i(12611),m=i(87363),b=i(71022),W=[{imgUrl:"https://gw.alipayobjects.com/zos/antfincdn/3Cb1AYfvlq/44e305b2-498e-4ff3-924b-bba7c8fdafda.png",dataSources:[{url:"https://mdn.alipayobjects.com/afts/file/A*aMdOS56bGT8AAAAAAAAAAAAADrd2AQ/Most-photographed-attractions-in-the-world.json",id:"most-photographed-scenic",name:"\u5168\u7403\u62CD\u7167\u6700\u591A\u7684\u666F\u70B9",type:"json"}],demoName:"\u5168\u7403\u62CD\u7167\u6700\u591A\u7684\u666F\u70B9",layerList:[{id:"most-photographed-scenic",type:"BubbleLayer",metadata:{name:"\u5168\u7403\u62CD\u7167\u6700\u591A\u7684\u666F\u70B9"},sourceConfig:{datasetId:"most-photographed-scenic",parser:{type:"json",x:"lng",y:"lat"}},visConfig:{visible:!0,radius:3,fillColor:{field:"value",value:["rgb(102,37,6)","rgb(153,52,4)","rgb(204,76,2)","rgb(236,112,20)","rgb(254,153,41)","rgb(254,196,79)","rgb(254,227,145)"],scale:{type:"quantize"}},opacity:1,lineWidth:0,state:!1,blend:"additive",label:{field:void 0,visible:!0,style:{fill:"#a9abb1",fontSize:14,textAnchor:"center"}}}}]},{imgUrl:"https://gw.alipayobjects.com/mdn/rms_e7e1c6/afts/img/A*8lyORIRMDNYAAAAAAAAAAAAAARQnAQ",dataSources:[{url:"https://gw.alipayobjects.com/os/bmw-prod/5c4fdc5c-5cf7-46da-a361-f377938553dc.json",id:"heat-demo-1",name:"\u5168\u7403\u5730\u9707\u70ED\u529B\u5206\u5E03",type:"json"}],demoName:"\u5168\u7403\u5730\u9707\u70ED\u529B\u5206\u5E03",layerList:[{id:"heat-demo-1",type:"HeatmapLayer",metadata:{name:"\u5168\u7403\u5730\u9707\u70ED\u529B\u56FE\u5C42"},sourceConfig:{datasetId:"heat-demo-1",parser:{type:"json",x:"lon",y:"lat"}},visConfig:{visible:!0,size:{field:"mag",value:[0,1]},style:{intensity:4,radius:4,opacity:1,rampColors:{colors:["#FF4818","#F7B74A","#FFF598","#F27DEB","#8C1EB2","#421EB2"],positions:[0,.2,.4,.6,.8,1]}}}}]},{imgUrl:"https://gw.alipayobjects.com/mdn/rms_e7e1c6/afts/img/A*SLbgR72KKFsAAAAAAAAAAAAAARQnAQ",dataSources:[{url:"https://gw.alipayobjects.com/os/bmw-prod/0a544b66-a04b-4b98-9b69-d71258f5f577.json",id:"arc-line-data",name:"\u56FD\u5185\u5916\u822A\u73ED\u7EBF\u6570\u636E",type:"json"}],demoName:"\u56FD\u5185\u5916\u822A\u73ED\u7EBF",layerList:[{id:"arc-point-layer-examsple",type:"BubbleLayer",metadata:{name:"\u56FD\u5185\u5916\u673A\u573A\u56FE\u5C42"},sourceConfig:{datasetId:"arc-line-data",parser:{type:"json",x:"to_lon",y:"to_lat"}},visConfig:{visible:!0,zIndex:1,radius:5,fillColor:"#1890ff",opacity:1,strokeColor:"#fff",lineWidth:1,state:{active:{fillColor:!1,strokeColor:"yellow"},select:{fillColor:!1,strokeColor:"red"}}}},{id:"arc-line-example",type:"ArcLayer",metadata:{name:"\u56FD\u5185\u5916\u822A\u73ED\u5F27\u7EBF\u56FE\u5C42"},sourceConfig:{datasetId:"arc-line-data",parser:{type:"json",x:"from_lon",y:"from_lat",x1:"to_lon",y1:"to_lat"}},visConfig:{zIndex:2,visible:!0,size:1,style:{opacity:1,sourceColor:"#1890ff",targetColor:"#1890ff"},state:{active:{color:"yellow"}}}}]},{demoName:"\u52A0\u5DDE 2.5 \u7EA7\u4EE5\u4E0A\u5730\u9707\u6570\u636E",imgUrl:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*p7W-SKyg8ekAAAAAAAAAAAAADmJ7AQ/original",dataSources:[{name:"\u52A0\u5DDE 2.5 \u7EA7\u4EE5\u4E0A\u5730\u9707\u6570\u636E",id:"california-earthquakes",url:"https://mdn.alipayobjects.com/afts/file/A*8ARuTJPfyvcAAAAAAAAAAAAADrd2AQ/earthquake",type:"json"}],layerList:[{id:"california-earthquakes",type:"BubbleLayer",metadata:{name:"\u52A0\u5DDE 2.5 \u7EA7\u4EE5\u4E0A\u5730\u9707\u6570\u636E"},sourceConfig:{datasetId:"california-earthquakes",parser:{type:"json",x:"Longitude",y:"Latitude"}},visConfig:{visible:!0,fillColor:{field:"Magnitude",value:["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#2c7fb8","#253494"],scale:{type:"quantile"}},opacity:1,strokeColor:"#fff",lineWidth:1,lineOpacity:1,label:{field:void 0,visible:!0,style:{fill:"#a9abb1",fontSize:14,textAnchor:"center"}},radius:{field:"Depth",value:[4,20]},state:{active:{fillColor:!1,strokeColor:"yellow"},select:{fillColor:!1,strokeColor:"red"}}}}]},{demoName:"\u4E2D\u56FD\u7701\u7EA7\u884C\u653F\u533A\u57DF",imgUrl:"https://gw.alipayobjects.com/mdn/rms_e7e1c6/afts/img/A*0W_dSre5Tq4AAAAAAAAAAAAAARQnAQ",dataSources:[{name:"\u4E2D\u56FD\u7701\u7EA7\u884C\u653F\u533A\u57DF",id:"china-provice",url:"https://npm.elemecdn.com/static-geo-atlas@0.1.0/geo-data/choropleth-data/country/100000_country_province.json",type:"geojson"}],layerList:[{id:"choroplethLayer",type:"ChoroplethLayer",metadata:{name:"\u4E2D\u56FD\u7701\u7EA7\u884C\u653F\u533A\u57DF\u56FE\u5C42"},sourceConfig:{datasetId:"china-provice",parser:{type:"json",geometry:"_geometry"}},visConfig:{visible:!0,fillColor:{field:"childrenNum",value:["#0f9960","#33a02c","#377eb8"],scale:{type:"quantize"}},opacity:1,strokeColor:"#a9abb1",lineWidth:1,lineOpacity:1,label:{field:"name",visible:!0,style:{fill:"#a9abb1",fontSize:14,textAnchor:"center",stroke:"#fff",strokeWidth:1}},state:{active:{fillColor:!1,strokeColor:"yellow"},select:{fillColor:!1,strokeColor:"red"}}}}]},{demoName:"\u4E2D\u56FD\u57CE\u5E02\u884C\u653F\u533A\u57DF",imgUrl:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9t6mRpeK0DEAAAAAAAAAAAAADmJ7AQ/original",dataSources:[{name:"\u4E2D\u56FD\u57CE\u5E02\u884C\u653F\u533A\u57DF",id:"china-city",url:"https://mdn.alipayobjects.com/afts/file/A*6VJLQ5arJMgAAAAAAAAAAAAADrd2AQ/100000_country_city.json",type:"geojson"}],layerList:[{id:"choroplethCityLayer",type:"ChoroplethLayer",metadata:{name:"\u4E2D\u56FD\u57CE\u5E02\u884C\u653F\u533A\u57DF\u56FE\u5C42"},sourceConfig:{datasetId:"china-city",parser:{type:"json",geometry:"_geometry"}},visConfig:{visible:!0,fillColor:{field:"childrenNum",value:["#f7fbff","#ddebf7","#c6dcef","#6caed7","#4292c6","#2071b5","#08519c","#09306b"],scale:{type:"quantize",unknown:"#c0c0c0"},isReversed:!1},opacity:.9,strokeColor:"#1990ff",lineWidth:.3,lineOpacity:.7,label:{field:void 0,visible:!0,style:{fill:"#252525",fontSize:12,textAnchor:"center",stroke:"#fff",strokeWidth:1}},state:{active:{fillColor:!1,strokeColor:"yellow"},select:{fillColor:!1,strokeColor:"red"}}}}]},{demoName:"2017 \u5E74\u7F8E\u56FD\u5404\u53BF\u7684\u5931\u4E1A\u7387",imgUrl:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*w1DdRJcE1jQAAAAAAAAAAAAADmJ7AQ/original",dataSources:[{name:"2017 \u5E74\u7F8E\u56FD\u5404\u53BF\u7684\u5931\u4E1A\u7387",id:"unemployment-rates-for-US-counties",url:"https://mdn.alipayobjects.com/afts/file/A*UF2kT5xWRr4AAAAAAAAAAAAADrd2AQ/unemployment",type:"json"}],layerList:[{id:"unemployment-rates-for-US-counties",type:"ChoroplethLayer",metadata:{name:"2017 \u5E74\u7F8E\u56FD\u5404\u53BF\u7684\u5931\u4E1A\u7387"},sourceConfig:{datasetId:"unemployment-rates-for-US-counties",parser:{type:"json",geometry:"_geometry"}},visConfig:{visible:!0,fillColor:{field:"unemployment_rate",value:["rgb(255, 247, 243)","rgb(253, 224, 221)","rgb(252, 197, 192)","rgb(250, 159, 181)","rgb(247, 104, 161)","rgb(221, 52, 151)","rgb(174, 1, 126)","rgb(122, 1, 119)","rgb(73, 0, 106)"],scale:{type:"quantile"}},opacity:.8,strokeColor:"rgb(146, 112, 202)",lineWidth:1,lineOpacity:1,label:{field:void 0,visible:!0,style:{fill:"#a9abb1",fontSize:14,textAnchor:"center"}},state:{active:{fillColor:!1,strokeColor:"yellow"},select:{fillColor:!1,strokeColor:"red"}}}}]},{demoName:"\u65B0\u80FD\u6E90\u5145\u7535\u6869\u5206\u5E03",imgUrl:"https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gH-fRrU4G7oAAAAAAAAAAAAADmJ7AQ/original.png",dataSources:[{name:"\u65B0\u80FD\u6E90\u5145\u7535\u6869\u5206\u5E03",id:"new-energy-charging-pile-distribution",url:"https://mdn.alipayobjects.com/afts/file/A*uaGISLpSx7AAAAAAAAAAAAAADrd2AQ/charging ",type:"json"}],layerList:[{id:"HexbinLayer_new-energy-charging-pile-distribution",type:"HexbinLayer",metadata:{name:"\u65B0\u80FD\u6E90\u5145\u7535\u6869\u5206\u5E03"},sourceConfig:{datasetId:"new-energy-charging-pile-distribution",parser:{type:"json",geometry:"_geometry"},transforms:[{type:"hexagon",size:1e3,field:"count",method:"sum"}]},visConfig:{visible:!0,aggregateSize:1e3,color:{field:"count",isReversed:!1,scale:{type:"quantize"},value:["#c2ad1f","#bf6261","#bb3432","#5c257d","#162044"]},style:{coverage:1,opacity:.6},state:{active:{fillColor:!1,strokeColor:"yellow"},select:{fillColor:!1,strokeColor:"red"}}}},{id:"BubbleLayer_new-energy-charging-pile-distribution",type:"BubbleLayer",metadata:{name:"\u5145\u7535\u6869\u56FE\u5C42"},sourceConfig:{datasetId:"new-energy-charging-pile-distribution",parser:{type:"json",geometry:"_geometry"}},visConfig:{visible:!0,lineOpacity:1,lineWidth:0,opacity:.8,radius:4,fillColor:"#f8dc31",blend:"normal",label:{field:void 0,visible:!1,style:{fill:"#c0c0c0",fontSize:14,textAnchor:"center"}},state:{active:{fillColor:!1,strokeColor:"red"},select:{fillColor:!1,strokeColor:"red"}}}}]},{imgUrl:"https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*g8RGQ47Xbc8AAAAAAAAAAAAADmJ7AQ",dataSources:[{url:"https://mdn.alipayobjects.com/afts/file/A*XCJJQK2L5O8AAAAAAAAAAAAADrd2AQ/city.json",id:"bus-travel-volume-example",name:"\u57CE\u5E02\u516C\u4EA4\u51FA\u884C\u91CF",type:"json"}],demoName:"\u57CE\u5E02\u516C\u4EA4\u51FA\u884C\u91CF",layerList:[{id:"bus-travel-volume-example",type:"H3HexagonLayer",metadata:{name:"\u57CE\u5E02\u516C\u4EA4\u51FA\u884C\u91CF\u56FE\u5C42"},sourceConfig:{datasetId:"bus-travel-volume-example",parser:{type:"json",hexagonId:"oh"}},visConfig:{visible:!0,fillColor:{field:"od_cnt",value:["rgb(127, 0, 0)","rgb(179, 0, 0)","rgb(215, 48, 31)","rgb(239, 101, 72)","rgb(252, 141, 89)","rgb(253, 187, 132)","rgb(253, 212, 158)","rgb(254, 232, 200)","rgb(255, 247, 236)"],scale:{type:"quantile"}},opacity:.8,lineWidth:0,minZoom:0,maxZoom:24,blend:"normal",state:{active:{fillColor:!1,strokeColor:"yellow"},select:{fillColor:!1,strokeColor:"red"}}}},{id:"bus-travel-volume-arcLayer",type:"ArcLayer",metadata:{name:"\u6210\u90FD\u516C\u4EA4\u51FA\u884C\u91CF\u5173\u7CFB"},sourceConfig:{parser:{type:"json",x:"f_lon",y:"f_lat",x1:"t_lon",y1:"t_lat"},datasetId:"bus-travel-volume-example"},visConfig:{size:1.5,color:"#5ad8a6",style:{opacity:.8,lineType:"solid",sourceColor:"#5ad8a6",targetColor:"#5B8FF9"},minZoom:1,maxZoom:23,blend:"normal",animate:{enable:!0,duration:4,interval:.8,trailLength:1},state:{active:{color:"yellow"}},visible:!1}}]}],ie=i(49231),u=i.n(ie),d=i(87651),de,me,fe,pe,Te=function(){var t=(0,b.Sr)(),a=t.colorPrimaryActive;return{caseDataset:(0,d.iv)(de||(de=u()([`
      max-height: 500px;
      overflow: hidden;
      overflow-y: auto;
    `]))),datasetItem:(0,d.iv)(me||(me=u()([`
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        transform: scale(1.1);
      }
    `]))),datasetItemSelect:(0,d.iv)(fe||(fe=u()([`
      border: 2px solid `,`;
    `])),a),datasetItemName:(0,d.iv)(pe||(pe=u()([`
      margin: 8px 0 4px 0;
      text-align: center;
    `])))}},ge=Te,e=i(70293);function Ct(v){var t=v.onSubmit,a=v.onCancel,l=(0,b.F8)("case-dataset"),o=ge(),n=(0,m.useState)({dataSources:[],layers:[]}),f=x()(n,2),p=f[0],C=f[1],R=(0,m.useState)([]),_=x()(R,2),S=_[0],H=_[1],K=function(){var h=ue()(re()().mark(function E(c,Q){var V,N,B,w;return re()().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return V=function(){var k=ue()(re()().mark(function T(G){var I,F;return re()().wrap(function(J){for(;;)switch(J.prev=J.next){case 0:return J.next=2,fetch(G);case 2:return I=J.sent,J.next=5,I.text();case 5:return F=J.sent,J.abrupt("return",F);case 7:case"end":return J.stop()}},T)}));return function(G){return k.apply(this,arguments)}}(),N=c.map(function(k){return V(k.url)}),U.next=4,Promise.all(N);case 4:B=U.sent,w=B.map(function(k,T){if(c[T].type==="json")return(0,O.kF)(k,c[T].name,c[T].id);if(c[T].type==="geojson")return(0,O.sk)(k,c[T].name,c[T].id);if(c[T].type==="csv")return(0,O.ZQ)(k,c[T].name,c[T].id)}).filter(function(k){return k!==void 0}),C({dataSources:w,layers:Q});case 7:case"end":return U.stop()}},E)}));return function(c,Q){return h.apply(this,arguments)}}();return(0,m.useEffect)(function(){var h=W.filter(function(c){return S.includes(c.demoName)}).map(function(c){return c.dataSources}),E=W.filter(function(c){return S.includes(c.demoName)}).map(function(c){return c.layerList});K((0,M.flatten)(h),(0,M.flatten)(E))},[S]),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(s.Row,{className:r()(l,o.caseDataset),gutter:[42,24],children:W.map(function(h){return(0,e.jsx)(s.Col,{span:8,children:(0,e.jsxs)("div",{className:r()("".concat(l,"__item"),o.datasetItem),onClick:function(){S.includes(h.demoName)?H(S.filter(function(c){return c!==h.demoName})):H([].concat(Ae()(S),[h.demoName]))},children:[(0,e.jsx)("img",{style:{width:"100%",height:150},src:h.imgUrl,className:S.includes(h.demoName)?r()("".concat(l,"__item_select"),o.datasetItemSelect):""}),(0,e.jsx)("div",{className:r()("".concat(l,"__item-name"),o.datasetItemName),children:h.demoName})]})},h.demoName)})}),(0,e.jsx)("div",{className:r()("".concat(l,"__footer"),"ant-modal-footer"),children:(0,e.jsxs)(s.Space,{children:[(0,e.jsx)(s.Button,{onClick:function(){a()},children:"\u8FD4\u56DE"}),(0,e.jsx)(s.Button,{disabled:!p.dataSources.length,type:"primary",onClick:function(){t(p.dataSources,p.layers)},children:"\u6DFB\u52A0"})]})})]})}var De=(0,O.BP)({version:"v0.1",component:Ct,metadata:{name:"CaseDataset",displayName:"\u793A\u4F8B\u6570\u636E",description:"\u793A\u4F8B\u6570\u636E\u96C6"},container:{type:"Datasets",slot:"addDataset"}}),yt=i(91055),j=i.n(yt),xt=i(58335),At=i.n(xt),ee=i(16640),he=i.n(ee),se=i(75784),ke=i(50476),bt=i(40496),St=i(36012),Fe=i.n(St),jt=function(){return(0,e.jsxs)("svg",{viewBox:"0 0 1024 1024",fill:"currentColor",children:[(0,e.jsx)("path",{d:"M747.7 288.2c0-17.6-14.4-32.1-32.1-32.1H306.4c-17.6 0-32.1 14.4-32.1 32.1 0 17.6 14.4 32.1 32.1 32.1h409.2c17.7 0 32.1-14.5 32.1-32.1zM306.4 448c-17.6 0-32.1 14.4-32.1 32.1 0 17.6 14.4 32.1 32.1 32.1h191.1c17.7 0 32.2-14.4 32.1-32.1 0-17.6-14.4-32.1-32.1-32.1H306.4zM766.6 776.8c-2.1-2.1-4.4-3.9-6.9-5.2 18.1-25.8 28.7-57.1 28.7-90.9 0-88.2-72.4-159.6-161.7-159.6S465 592.5 465 680.7s72.4 159.6 161.7 159.6c32.7 0 63.2-9.6 88.7-26.1 1.5 2.9 3.4 5.6 5.8 8l83.3 83.3c12.5 12.5 32.9 12.5 45.4 0s12.5-32.9 0-45.4l-83.3-83.3z m-139.9 0.6c-54.1 0-98-43.3-98-96.7s43.9-96.7 98-96.7 98 43.3 98 96.7c0 53.4-43.8 96.7-98 96.7z"}),(0,e.jsx)("path",{d:"M577.6 895.4H221.2c-35.2 0-64-28.8-64-64V192.8c0-35.2 28.8-64 64-64h547.3c35.2 0 64 28.8 64 64v318.4h0.3v0.1c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1c0-1.2-0.1-2.3-0.2-3.5v-316c0-70.4-27.6-128-98-128H225c-70.4 0-128 57.6-128 128v639.8c0 70.4 57.6 128 128 128h352.2c17.8 0 32.2-14.4 32.2-32.1 0-17.6-14.2-31.9-31.8-32.1z"}),(0,e.jsx)("path",{d:"M832.7 639.3a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z"})]})},Le,Ee,Be,we,Ie,_t=function(){var t=(0,b.Sr)(),a=t.colorBgContainer;return{datasetPreview:(0,d.iv)(Le||(Le=u()([`
      min-width: 600px;
      height: calc(100% - 200px);
    `]))),modelTabel:(0,d.iv)(Ee||(Ee=u()([`
      position: relative;
      height: calc(100vh - 300px);
      padding: 10px 0 20px;
    `]))),tabelToolbar:(0,d.iv)(Be||(Be=u()([`
      display: flex;
      align-items: center;
      height: 36px;
      padding: 0 10px;
      background: `,`;
    `])),a),toolbarItem:(0,d.iv)(we||(we=u()([`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 24px;
      margin-right: 10px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;

        svg {
          width: 13px;
          height: 13px;
          fill: #fff;
        }
      }
    `]))),toolbarItemActived:(0,d.iv)(Ie||(Ie=u()([`
      background: rgba(255, 255, 255, 0.2);
    `])))}},Nt=_t,Tt=i(25435),Dt=function(t){var a=t.type,l=Tt.DATASET_FIELD_TYPE_MAP[a],o=l.color,n=l.value;return(0,e.jsx)(s.Tag,{color:o,children:n})},kt=Dt,Ft=s.theme.useToken,Lt=function(){var t=(0,se.L00)(),a=t.spreadsheet;return(0,m.useEffect)(function(){return(0,ke.Dt)("fieldType",function(){return(0,e.jsx)(e.Fragment,{children:a.interaction.getAllColHeaderCells().map(function(l){return l.getMeta()}).map(function(l,o){var n,f=(0,se.l3E)(l,a),p=f.height,C=f.x,R="translate(".concat(C+5,"px,1px)"),_=(n=a.dataCfg)===null||n===void 0||(n=n.meta)===null||n===void 0||(n=n.find(function(S){return S.field===l.field}))===null||n===void 0?void 0:n.colType;return(l==null?void 0:l.colIndex)==0?null:(0,e.jsx)("div",{style:{position:"absolute",width:"40",pointerEvents:"none",height:p-10,transform:R},children:(0,e.jsx)(kt,{type:_})},o)})})}),function(){}},[]),null},Et=(0,se.A4U)({childContribution:[ke.ZP.childContribution,Lt],wrapperContribution:[bt.ZP.wrapperContribution]}),Bt=function(t){var a=t.datasetId,l=t.visible,o=t.onCancel,n=(0,b.F8)("dataset-preview"),f=Nt(),p=(0,O.OA)(a),C=(0,m.useState)(!0),R=x()(C,2),_=R[0],S=R[1],H=s.Modal.useModal(),K=x()(H,2),h=K[0],E=K[1],c=s.message.useMessage(),Q=x()(c,2),V=Q[0],N=Q[1],B=Ft(),w=B.token,Y=(0,M.merge)(se.$_G,{colCell:{cell:{backgroundColor:w.colorBgContainer,padding:{left:50},interactionState:{hover:{backgroundColor:w.colorBgElevated}}},bolderText:{textAlign:"left"}},rowCell:{cell:{backgroundColor:w.colorBgContainer}},dataCell:{cell:{backgroundColor:w.colorBgContainer,crossBackgroundColor:w.colorBgContainer,interactionState:{hover:{backgroundColor:w.colorBgElevated}}}}}),U=function(A){h.info({closable:!0,title:"\u5F53\u524D\u5B57\u6BB5\u503C",content:(0,e.jsx)(e.Fragment,{children:A}),okText:"\u590D\u5236",onOk:function(){var P=typeof A=="string"?A:JSON.stringify(A);Fe()(P),V.success("\u590D\u5236\u6210\u529F")}})};if(p!=null&&p.isLocalOrRemoteDataset){var k=p.data,T=k===void 0?[]:k,G=p.columns,I=G===void 0?[]:G,F=I.map(function(z){return{name:z.name,displayName:z.name,colType:z.type}}),le=T.map(function(z){return(0,M.mapValues)(z,function(A){return At()(A)!=="object"?A:JSON.stringify(A)})}),J=function(A){var ae=A,P=ae.summaryRowCfg,L=ae.setSummaryRowCfg;return(0,e.jsxs)("div",{className:r()("".concat(n,"__model-tabel__toolbar"),f.tabelToolbar),children:[(0,e.jsx)("div",{className:r()("".concat(n,"__model-tabel__toolbar-item"),f.toolbarItem,_?"".concat(n,"__model-tabel__toolbar-item-actived"):"",_?f.toolbarItemActived:""),children:(0,e.jsx)(s.Tooltip,{title:"\u9AD8\u4EAE",children:(0,e.jsx)(ee.BorderInnerOutlined,{onClick:function(){S(!_)}})})}),(0,e.jsx)("div",{className:r()("".concat(n,"__model-tabel__toolbar-item"),f.toolbarItem,P.visible?"".concat(n,"__model-tabel__toolbar-item-actived"):"",P.visible?f.toolbarItemActived:""),children:(0,e.jsx)(s.Tooltip,{title:"\u6570\u636E\u63A2\u67E5",children:(0,e.jsx)(he(),{component:jt,onClick:function(){L(function(te){return j()(j()({},te),{},{visible:!te.visible})})}})})})]})};return(0,e.jsxs)(s.Modal,{className:r()(n,f.datasetPreview),title:"".concat(p==null?void 0:p.metadata.name),open:l,bodyStyle:{padding:0},destroyOnClose:!0,width:"calc(100vw - 200px)",footer:!1,onCancel:function(){return o()},children:[E,N,(0,e.jsx)("div",{className:r()("".concat(n,"__model-tabel"),f.modelTabel),children:(0,e.jsx)(Et,{hoverable:!0,expandVacancy:!0,theme:Y,disableCellDetail:!0,Toolbar:J,s2Options:{frozenRowCount:1,interaction:{hoverHighlight:_},dataCell:function(A){return A.colIndex===0?new se.E5N(A,A.spreadsheet):new se.iG8(A,A.spreadsheet)}},onDataCellDoubleClick:function(A){U(A.fieldValue)},data:le,columns:F})})]})}},wt=Bt,Pe=(0,O.BP)({version:"v0.1",component:wt,metadata:{name:"DatasetPreview",displayName:"\u6570\u636E\u9884\u89C8",description:"\u9884\u89C8\u6570\u636E\u96C6"},container:{type:"Datasets",slot:"preview"}}),Ce=i(28869),It=function(t){return(0,e.jsx)(s.Tooltip,{placement:"right",title:"\u6587\u6863",children:(0,e.jsx)(s.Button,{id:"LITourDocs",type:"text",size:"middle",shape:"circle",icon:(0,e.jsx)(ee.ReadOutlined,{size:18}),onClick:function(){window.open(Ce.m8.createHref("/docs"))}})})},Pt=It,Ot=(0,O.BP)({version:"v0.1",component:Pt,metadata:{name:"Docs",displayName:"\u6587\u6863",description:"\u7528\u6237\u6307\u5357"},container:{type:"SideNav",slot:"bottom"}}),Mt=i(59767),Oe,Rt=function(){var t=(0,b.Sr)(),a=t.antCls;return{exportPopover:(0,d.iv)(Oe||(Oe=u()([`
      `,`-popover-arrow {
        display: none;
      }
    
      `,`-popover-inner {
        padding: 0;s
      }
    
      `,`-popover-inner-content {
        padding: 0;
      }
    `])),a,a,a)}},zt=Rt,_e=i(41991),Ht=i(57088),Vt=i(17728),Jt=i.n(Vt),Kt=function(){return(0,e.jsx)("svg",{viewBox:"0 0 14 14",fill:"currentColor",width:"1em",height:"1em",children:(0,e.jsx)("path",{d:"M13.8875145,13.1234844 C13.8687399,13.0691875 13.8499977,13.0329687 13.8312555,12.9786562 L11.3687445,8.83296875 C12.9187468,8.05754687 13.9640694,6.49009375 13.9640694,4.68728125 C13.9624994,2.09095312 11.7968694,0 9.10938728,0 L3.86404855,0 C3.04217572,0 2.37028902,0.648703125 2.37028902,1.44223437 L2.37028902,1.82090625 L0.746871676,1.82090625 C0.33593526,1.82090625 0,2.14526562 0,2.54203125 L0,13.4478437 C0,13.7540937 0.242191908,13.9879375 0.559368786,13.9879375 C0.615627746,13.9879375 0.67187052,13.9698281 0.72812948,13.9517187 L13.440615,13.9517187 C13.7578081,13.9517187 14,13.7178906 14,13.4116406 C14,13.321125 13.9624994,13.2125 13.8875145,13.1234844 Z M3.49061272,8.0394375 L3.49061272,2.9206875 L8.71719306,2.9206875 C9.74375723,2.9206875 10.5843723,3.73232812 10.5843723,4.7235 C10.5843723,5.71465625 9.76249942,6.5081875 8.71719306,6.5081875 L6.53280462,6.5081875 L6.53280462,6.52629688 C6.45781965,6.52629688 6.3828185,6.5625 6.3093711,6.59870313 C6.04843699,6.74354688 5.95469364,7.08598438 6.10467977,7.33792188 L8.3078104,11.0325469 L3.4906289,11.0325469 L3.4906289,8.0394375 L3.49061272,8.0394375 Z M1.1203237,12.8881406 L1.1203237,2.9206875 L2.3703052,2.9206875 L2.3703052,11.5545313 C2.3703052,11.8607813 2.61249711,12.0946094 2.92969017,12.0946094 L2.94843237,12.0946094 C2.98593295,12.1127188 3.04219191,12.1127188 3.09843468,12.1127188 L9.16563006,12.1127188 C9.48280694,12.1127188 9.72499884,11.878875 9.72499884,11.572625 L9.72499884,11.5364219 C9.76249942,11.3915938 9.74375723,11.2482813 9.66875607,11.1215469 L7.5593526,7.58835938 L8.6984185,7.58835938 C10.3406104,7.58835938 11.6843514,6.29095313 11.6843514,4.703875 C11.6843514,3.1168125 10.3406104,1.81939063 8.6984185,1.81939063 L3.4906289,1.81939063 L3.4906289,1.44073437 C3.4906289,1.24310937 3.65937341,1.08017187 3.86406474,1.08017187 L9.09061272,1.08017187 C11.143741,1.08017187 12.8234173,2.7019375 12.8234173,4.68578125 C12.8234173,6.21853125 11.8343538,7.5340625 10.4343538,8.05603125 C10.378111,8.07414063 10.3406104,8.09223438 10.2843514,8.11034375 C10.0234173,8.25517188 9.92967399,8.597625 10.0796763,8.8495625 L12.5062405,12.8881563 L1.12030751,12.8881563 L1.1203237,12.8881406 Z"})})},Ut=function(t){return(0,e.jsx)(he(),j()({component:Kt},t))},Qt=function(){return(0,e.jsx)("svg",{viewBox:"0 0 1024 1024",fill:"currentColor",width:"1em",height:"1em",children:(0,e.jsx)("path",{d:"M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z"})})},Wt=function(t){return(0,e.jsx)(he(),j()({component:Qt},t))},Me,Re,ze,He,Gt=function(){var t=(0,b.Sr)(),a=t.colorBgContainer;return{codePreview:(0,d.iv)(Me||(Me=u()([`
      display: flex;
      flex-direction: column;
    `]))),toolBar:(0,d.iv)(Re||(Re=u()([`
      display: flex;
      align-items: center;
      justify-content: end;
      width: 100%;
      height: 32px;
      padding: 6px 16px;
      background: `,`;
      border-radius: 10px 10px 0 0;
      opacity: 0.7;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    `])),a),action:(0,d.iv)(ze||(ze=u()([`
      position: relative;
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
    `]))),actionIcon:(0,d.iv)(He||(He=u()([`
      width: 16px;
      height: 16px;
      overflow: hidden;
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
      border: 0;
      cursor: pointer;
      transition: all 0.24s;

      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    `])))}},Zt=Gt,Ve=i(93707);function $t(v){return Jt().compressToBase64(v).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var En={base:"vs-dark",inherit:!0,rules:[],colors:{"editor.foreground":"#ffffffd9","editor.background":"#282932","editor.selectionBackground":"#282932","editor.lineHighlightBackground":"#282932","editorCursor.foreground":"#819090","editorWhitespace.foreground":"#282932"}},Xt=function(t){var a=t.language,l=t.value,o=t.riddle,n=t.codesanbox,f=t.className,p=(0,b.F8)("code-preview"),C=Zt(),R=(0,m.useRef)(null),_=(0,m.useRef)(null),S=(0,Ve.nK)()&&o,H=(0,Ve.nK)()&&n,K=(0,m.useState)(!1),h=x()(K,2),E=h[0],c=h[1],Q=(0,m.useState)(!1),V=x()(Q,2),N=V[0],B=V[1],w=(0,m.useRef)(null),Y=function(){w.current&&clearTimeout(w.current)},U=o,k=n,T=function(){Fe()(l||""),B(!0),Y(),w.current=setTimeout(function(){B(!1)},3e3)},G=(0,e.jsx)("div",{className:r()("".concat(p,"__toolbar"),C.toolBar),children:(0,e.jsxs)(s.Space,{size:"middle",children:[H?(0,e.jsxs)("form",{className:r()("".concat(p,"__action"),C.action),action:"https://codesandbox.io/api/v1/sandboxes/define",method:"POST",target:"_blank",ref:_,onClick:function(){var F;(F=_.current)===null||F===void 0||F.submit()},children:[(0,e.jsx)("input",{type:"hidden",name:"parameters",value:$t(JSON.stringify(k))}),(0,e.jsx)(s.Tooltip,{title:"\u5728 CodeSandbox \u4E2D\u6253\u5F00",children:(0,e.jsx)(Wt,{className:r()("".concat(p,"__action-icon"),C.actionIcon)})})]}):null,S?(0,e.jsxs)("form",{className:r()("".concat(p,"__action"),C.action),action:"//riddle.alibaba-inc.com/riddles/define",method:"POST",target:"_blank",ref:R,onClick:function(){var F;(F=R.current)===null||F===void 0||F.submit()},children:[(0,e.jsx)("input",{type:"hidden",name:"data",value:JSON.stringify(U)}),(0,e.jsx)(s.Tooltip,{title:"\u5728 Riddle \u4E2D\u6253\u5F00",children:(0,e.jsx)(Ut,{className:r()("".concat(p,"__action-icon"),C.actionIcon)})})]}):null,(0,e.jsx)(s.Tooltip,{title:N?"\u590D\u5236\u6210\u529F":"\u590D\u5236\u4EE3\u7801",children:(0,e.jsx)(ee.CopyOutlined,{className:r()("".concat(p,"__action-icon"),C.actionIcon),onClick:T})})]})});return(0,e.jsxs)("div",{className:r()(f,C.codePreview,p),children:[E?G:null,(0,e.jsx)(Ht.ZP,{language:a,options:{readOnly:!0,minimap:{enabled:!1},lineNumbers:"off",overviewRulerBorder:!1,wordWrap:"off",wordWrapOverride1:"off"},onMount:function(){c(!0)},theme:"vs-dark",value:l})]})},Je=Xt,Yt=i(78453),Ke=i(90527),ye=function(t,a){var l=a.map(function(n){return"import ".concat(n.global," from '").concat(n.package,"';")}).join(`
`),o=a.map(function(n){return n.global}).join(", ");return`import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { LocationInsightApp, Application } from '@antv/li-sdk';
`.concat(l,`

const config: Application = `).concat(JSON.stringify(t),`

const assets = [`).concat(o,`];
const appTheme = { algorithm: theme.darkAlgorithm, token: `).concat(JSON.stringify(Ke.vh.token),`, }

export default () => {
  const { token } = theme.useToken();
  const inheritedStyle = { color: token.colorText, fontSize: token.fontSize, fontFamily: token.fontFamily, lineHeight: token.lineHeight, background: token.colorBgLayout, }

  return (
    <ConfigProvider theme={appTheme}>
      <LocationInsightApp
        config={config}
        assets={assets}
        style={{ height: "100vh", ...inheritedStyle, }}
      />
    </ConfigProvider>
  );
};
  `)},Ue=function(t){var a={"@ant-design/icons":"^5.0.1","@antv/l7":"^2.17.2","@antv/larkmap":"^1.4.1",antd:"^5.5.0","@antv/li-sdk":"^"+Yt.i8,react:"^18.0.0","react-dom":"^18.0.0"},l=t.reduce(function(o,n){return o[n.package]="^"+n.version,o},a);return l},qt=function(t){var a=Ue(t);return{title:"L7VP App",main:"index.js",dependencies:j()(j()({},a),{},{"react-scripts":"^5.0.0"}),devDependencies:{typescript:"^5.0.2","@types/react":"^18.0.0","@types/react-dom":"^18.0.0"},scripts:{start:"react-scripts start",build:"react-scripts build",test:"react-scripts test --env=jsdom",eject:"react-scripts eject"},browserslist:[">0.2%","not dead"]}},en=function(t,a){var l=`
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
      </head>
      <body>
        <div id="container" />
      </body>
    </html>
  `,o=`import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import 'antd/dist/reset.css';
import './index.css';

createRoot(document.getElementById('container')).render(<App />);
  `,n="";return{files:{"package.json":{content:qt(a)},"index.css":{content:n},"index.tsx":{content:o},"app.tsx":{content:ye(t,a)},"index.html":{content:l}}}},tn=function(t,a){var l=`import { createRoot } from 'react-dom/client';
`.concat(ye(t,a).replace(/export default/,"const APP ="),`
createRoot(mountNode).render(<APP />);
`),o="@import '~antd/dist/reset.css';",n={title:"L7VP App",js:l,css:o,json:JSON.stringify({name:"L7VP App",dependencies:Ue(a)},null,2)};return n},Qe,We,Ge,Ze,$e,nn=function(){return{appType:(0,d.iv)(Qe||(Qe=u()([`
      margin: 8px 0 35px;
    `]))),appContent:(0,d.iv)(We||(We=u()([`
      margin: 8px 0 35px;
      display: flex;
    `]))),appTitle:(0,d.iv)(Ge||(Ge=u()([`
      width: 185px;
      margin-right: 60px;
    `]))),appSubtitle:(0,d.iv)(Ze||(Ze=u()([`
      color: rgb(160, 167, 180);
      font-size: 11px;
    `]))),codePreview:(0,d.iv)($e||($e=u()([`
      width: 100%;
      max-width: 600px;
      height: 300px;
    `])))}},an=nn,Ne=i(9256),on=i(81309),rn={HTML:"html",JSON:"json",SDK:"tsx"},sn=function(t){var a=t.visible,l=t.onVisbleChange,o=(0,b.F8)("export-app"),n=an(),f=(0,m.useState)("HTML"),p=x()(f,2),C=p[0],R=p[1],_=(0,m.useState)(),S=x()(_,2),H=S[0],K=S[1],h=(0,O.ox)(),E=h.editorService,c=E.getApplicationConfig(),Q=(0,m.useState)([]),V=x()(Q,2),N=V[0],B=V[1],w=(0,m.useState)(),Y=x()(w,2),U=Y[0],k=Y[1],T=c.spec.map.basemap&&c.spec.map.basemap==="Mapbox",G=c.spec.map.basemap&&["Gaode","GaodeV1","GaodeV2"].includes(c.spec.map.basemap);(0,m.useEffect)(function(){var P,L=(P=c.metadata)===null||P===void 0?void 0:P.assetPackageIds;(0,on.nl)().then(function(q){var te=Array.isArray(L)?q.filter(function(ne){return L.includes(ne.assetId)}):q;B(te)})},[]);var I=function(){var L="".concat(c.metadata.name,".").concat(rn[C]);if(C==="JSON")(0,_e.Di)(L,JSON.stringify(c));else if(C==="SDK")(0,_e.Di)(L,ye(c,N));else{var q=(0,Ne.VZ)(c,N,{token:H,aMapSecurityJsCode:U});(0,_e.Di)(L,q)}(0,Ne.lF)(12),l(!1)},F=function(){l(!1)},le=function(L){R(L.target.value)},J=function(){return(0,e.jsxs)("div",{className:r()("".concat(o,"__content"),n.appContent),children:[(0,e.jsxs)("div",{className:r()("".concat(o,"__title"),n.appTitle),children:[(0,e.jsx)("div",{children:"\u5E94\u7528\u914D\u7F6E"}),(0,e.jsx)("div",{className:r()("".concat(o,"__subtitle"),n.appSubtitle),children:"\u5E94\u7528\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u5BFC\u51FA\u540E\u53EF\u4EE5\u901A\u8FC7\u9879\u76EE\u65B9\u5F0F\u518D\u6B21\u5BFC\u5165"})]}),(0,e.jsx)(Je,{className:r()("".concat(o,"__code-preview"),n.codePreview),language:"json",value:JSON.stringify(c,null,"  ")})]})},z=function(){var L=(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)("div",{className:r()("".concat(o,"__content"),n.appContent),children:[(0,e.jsxs)("div",{className:r()("".concat(o,"__title"),n.appTitle),children:[(0,e.jsx)("div",{children:"Key \u914D\u7F6E"}),(0,e.jsxs)("div",{className:r()("".concat(o,"__subtitle"),n.appSubtitle),children:["\u5E94\u7528\u9700\u8981\u9AD8\u5FB7\u5E95\u56FE\u670D\u52A1\u7684"," ",(0,e.jsx)("a",{href:"https://lbs.amap.com/api/javascript-api-v2/prerequisites",target:"_blank",rel:"noreferrer",children:"Key"})]})]}),(0,e.jsx)(s.Input,{placeholder:"\u8BF7\u586B\u5199\u9AD8\u5FB7\u5F00\u653E\u5E73\u53F0\u7533\u8BF7\u7684 key",style:{width:400},onChange:function(ne){K(ne.target.value)}})]}),(0,e.jsxs)("div",{className:r()("".concat(o,"__content"),n.appContent),children:[(0,e.jsxs)("div",{className:r()("".concat(o,"__title"),n.appTitle),children:[(0,e.jsx)("div",{children:"\u5B89\u5168\u5BC6\u94A5\u914D\u7F6E"}),(0,e.jsxs)("div",{className:r()("".concat(o,"__subtitle"),n.appSubtitle),children:["\u5E94\u7528\u9700\u8981\u9AD8\u5FB7\u5E95\u56FE\u670D\u52A1\u7684"," ",(0,e.jsx)("a",{href:"https://lbs.amap.com/api/javascript-api-v2/prerequisites",target:"_blank",rel:"noreferrer",children:"\u5B89\u5168\u5BC6\u94A5"})]})]}),(0,e.jsx)(s.Input,{placeholder:"\u8BF7\u586B\u5199\u9AD8\u5FB7\u5F00\u653E\u5E73\u53F0\u7533\u8BF7\u7684\u5B89\u5168\u5BC6\u94A5",style:{width:400},onChange:function(ne){k(ne.target.value)}})]})]}),q=(0,e.jsx)(e.Fragment,{children:(0,e.jsxs)("div",{className:r()("".concat(o,"__content"),n.appContent),children:[(0,e.jsxs)("div",{className:r()("".concat(o,"__title"),n.appTitle),children:[(0,e.jsx)("div",{children:"Token \u914D\u7F6E"}),(0,e.jsxs)("div",{className:r()("".concat(o,"__subtitle"),n.appSubtitle),children:["\u5E94\u7528\u9700\u8981 Mapbox \u5E95\u56FE\u670D\u52A1\u7684"," ",(0,e.jsx)("a",{href:"https://account.mapbox.com/access-tokens/",target:"_blank",rel:"noreferrer",children:"Token"})]})]}),(0,e.jsx)(s.Input,{placeholder:"\u8BF7\u586B\u5199 Mapbox \u5E73\u53F0\u7533\u8BF7\u7684 token",style:{width:400},onChange:function(ne){K(ne.target.value)}})]})});return T?q:G?L:null},A=function(){return(0,e.jsxs)("div",{className:r()("".concat(o,"__content"),n.appContent),children:[(0,e.jsxs)("div",{className:r()("".concat(o,"__title"),n.appTitle),children:[(0,e.jsx)("div",{children:"SDK \u6E32\u67D3"}),(0,e.jsx)("div",{className:r()("".concat(o,"__subtitle"),n.appSubtitle),children:"\u5BFC\u51FA\u6E90\u4EE3\u7801\uFF0CSDK \u65B9\u5F0F\u63A5\u5165\u5230\u4E1A\u52A1\u7CFB\u7EDF\u4E2D"})]}),(0,e.jsx)(Je,{className:r()("".concat(o,"__code-preview"),n.codePreview),language:"typescript",codesanbox:en(c,N),riddle:tn(c,N),value:ye(c,N)})]})},ae=function(){return N.length===0?null:C==="HTML"?z():C==="JSON"?J():A()};return(0,e.jsxs)(s.Modal,{className:o,width:960,title:"\u5BFC\u51FA\u5E94\u7528",open:a,onCancel:F,destroyOnClose:!0,footer:(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(s.Button,{onClick:F,children:"\u8FD4\u56DE"}),(0,e.jsx)(s.Button,{disabled:N.length===0,type:"primary",onClick:I,children:"\u5BFC\u51FA"})]}),children:[(0,e.jsx)("div",{className:r()("".concat(o,"__type"),n.appType),children:(0,e.jsxs)("div",{className:r()("".concat(o,"__content"),n.appContent),children:[(0,e.jsxs)("div",{className:r()("".concat(o,"__title"),n.appTitle),children:[(0,e.jsx)("div",{children:"\u5BFC\u51FA\u7684\u683C\u5F0F"}),(0,e.jsx)("div",{className:r()("".concat(o,"__subtitle"),n.appSubtitle),children:"\u9009\u62E9\u5BFC\u51FA\u7684\u683C\u5F0F"})]}),(0,e.jsxs)(s.Radio.Group,{onChange:le,value:C,children:[(0,e.jsx)(s.Radio,{value:"HTML",children:"HTML"}),(0,e.jsx)(s.Radio,{value:"SDK",children:"SDK"}),(0,e.jsx)(s.Radio,{value:"JSON",children:"JSON"})]})]})}),ae()]})},ln=sn,cn=function(t){var a=(0,b.F8)("export-popover"),l=zt(),o=(0,m.useState)(!1),n=x()(o,2),f=n[0],p=n[1],C=(0,m.useState)(!1),R=x()(C,2),_=R[0],S=R[1],H=(0,m.useState)(!1),K=x()(H,2),h=K[0],E=K[1],c=function(){p(!0)},Q=function(){S(!0)},V=(0,e.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,e.jsx)(s.Button,{type:"text",size:"middle",icon:(0,e.jsx)(ee.TableOutlined,{size:18}),onClick:c,children:"\u5BFC\u51FA\u6570\u636E"}),(0,e.jsx)(s.Button,{type:"text",size:"middle",icon:(0,e.jsx)(ee.CodeOutlined,{size:18}),onClick:Q,children:"\u5BFC\u51FA\u5E94\u7528"})]});return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(s.Popover,{overlayClassName:r()(a,l.exportPopover),placement:"rightBottom",trigger:"click",content:V,onOpenChange:function(B){B&&E(!1)},children:(0,e.jsx)(s.Tooltip,{placement:"right",title:"\u5BFC\u51FA",open:h,onOpenChange:function(B){E(B)},children:(0,e.jsx)(s.Button,{id:"LITourExportApp",type:"text",size:"middle",shape:"circle",icon:(0,e.jsx)(ee.DownloadOutlined,{size:18})})})}),_&&(0,e.jsx)(ln,{visible:_,onVisbleChange:S}),f&&(0,e.jsx)(Mt.Z,{visible:f,onVisbleChange:p})]})},un=cn,Xe=(0,O.BP)({version:"v0.1",component:un,metadata:{name:"Export",displayName:"\u5BFC\u51FA",description:"\u6570\u636E\u4E0E\u5E94\u7528\u5BFC\u51FA"},container:{type:"SideNav",slot:"bottom"}}),Ye,dn=function(){return{logo:(0,d.iv)(Ye||(Ye=u()([`
      margin: 15px 0;
      cursor: pointer;

      img {
        width: 26px;
        height: 26px;
      }
    `])))}},pn=dn,vn=function(t){var a=(0,b.F8)("logo"),l=pn(),o=function(){Ce.m8.push("/project")};return(0,e.jsx)("div",{className:r()(a,l.logo),onClick:o,children:(0,e.jsx)("img",{src:Ke.Oi})})},mn=vn,fn=(0,O.BP)({version:"v0.1",component:mn,metadata:{name:"NavLogo",displayName:"Logo",description:"\u5BFC\u822A\u680F Logo"},container:{type:"SideNav",slot:"top"}}),gn=i(78020),Bn="li-editor-novice-tour",hn=[{key:1,title:"\u6DFB\u52A0\u6570\u636E\u96C6",status:"process",menu:"datasets"},{key:2,title:"\u6DFB\u52A0\u53EF\u89C6\u5316\u56FE\u5C42",status:"wait",menu:"layers"},{key:3,title:"\u5730\u56FE\u5BFC\u51FA\u5206\u4EAB",status:"wait",menu:"widgets"},{key:4,title:"\u7528\u6237\u6307\u5357",status:"wait",menu:"widgets"}],qe=[{title:"\u6DFB\u52A0\u6570\u636E\u96C6",key:"LITourAddDataset",target:function(){return document.getElementById("LITourAddDataset")}},{title:"\u6DFB\u52A0\u53EF\u89C6\u5316\u56FE\u5C42",key:"LITourAddVisualLayer",target:function(){return document.getElementById("LITourAddVisualLayer")}},{title:"\u5B8C\u6210\u5730\u56FE\u5236\u4F5C\uFF0C\u5BFC\u51FA\u5206\u4EAB",key:"LITourExportApp",target:function(){return document.getElementById("LITourExportApp")}},{title:"\u9605\u8BFB\u624B\u518C\uFF0C\u5FEB\u901F\u5165\u95E8",key:"LITourDocs",target:function(){return document.getElementById("LITourDocs")}}],Cn=function(){return(0,e.jsx)("svg",{width:"15px",height:"15px",viewBox:"0 0 20 20",version:"1.1",xmlns:"http://www.w3.org/2000/svg",children:(0,e.jsx)("g",{stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd",children:(0,e.jsx)("path",{d:"M4.9678489,1.3826075 C8.31012853,-0.576268489 12.3192184,-0.389784816 15.3790084,1.53808248 C15.4935937,1.61192055 15.4928733,1.78214939 15.3736444,1.85395109 L14.0978957,2.62222925 C13.9886026,2.68804748 13.8520304,2.6948292 13.7386066,2.63646258 C13.1905076,2.36282194 12.6137116,2.14958565 12.010593,2.00071416 C10.970607,1.74569518 9.90840342,1.69271707 8.85335106,1.84565472 C7.76136852,2.00466142 6.72177749,2.37737642 5.76595952,2.9529867 C4.8081544,3.52979367 3.99373676,4.27359505 3.34100375,5.16528653 C2.71095499,6.0271462 2.25895212,6.99200586 1.99536933,8.03205673 C1.73178655,9.0721076 1.67339792,10.1341255 1.82105473,11.187951 C1.97142175,12.2778767 2.33903402,13.315133 2.90887125,14.265643 C3.47870848,15.2161529 4.21990448,16.0284306 5.1094904,16.6731857 C5.96854603,17.2985945 6.93155125,17.7455112 7.97153725,18.0005301 C9.01152326,18.2555491 10.0737268,18.3085272 11.1287792,18.1555896 C12.2207617,17.9965829 13.2603528,17.6238679 14.2161707,17.0482576 C15.1739759,16.4714506 15.9883935,15.7276492 16.6411265,14.8359578 C17.2711753,13.9740981 17.7231781,13.0092384 17.9867609,11.9691876 C18.1407455,11.3643753 18.2236826,10.7538363 18.2379463,10.141531 C18.2429514,10.0145396 18.3098682,9.89608148 18.4191613,9.83026326 L19.6949101,9.0619851 C19.8121518,8.99138009 19.9644417,9.06946342 19.9737082,9.20672633 C20.2394918,12.8576204 18.4818538,16.5304041 15.1196034,18.5552174 C10.3683304,21.4165096 4.21533345,19.8960401 1.38906036,15.1593382 C-1.43467549,10.4264989 0.189300038,4.18486864 4.9678489,1.3826075 Z M16.3466891,4.95062607 L17.7876947,5.02614597 C17.9874077,5.03661249 18.0919786,5.27522166 17.9665,5.43555412 L10.2347711,14.5486992 C9.81543005,15.0841339 9.00736079,15.0417848 8.64628512,14.4654502 L5.09928324,8.83771232 C4.99125133,8.6651421 5.12018635,8.43885722 5.31989928,8.44932373 L6.76090492,8.52484364 C7.07430061,8.54126801 7.36426878,8.71077624 7.5347935,8.98424731 L9.55980195,12.2018001 L15.5290147,5.32670623 C15.7270262,5.07569854 16.0302209,4.93404067 16.3466891,4.95062607 Z",fill:"#FFFFFF"})})})},et,tt,nt,at,ot,rt,it,st,lt,ct,ut,dt,pt,vt,mt,ft,yn=function(){var t=(0,b.Sr)(),a=t.antCls,l=t.colorBgContainer,o=t.colorTextSecondary,n=t.colorText,f=t.colorPrimary;return{noviceTour:(0,d.iv)(et||(et=u()([`
      position: fixed;
      right: 40px;
      bottom: 10px;
      border-radius: 20px;
    `]))),tourPopover:(0,d.iv)(tt||(tt=u()([`
      z-index: 2;
    `]))),tourContent:(0,d.iv)(nt||(nt=u()([`
      width: 180px;
    `]))),tourContentHeader:(0,d.iv)(at||(at=u()([`
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
    `]))),tourContentMenu:(0,d.iv)(ot||(ot=u()([`
      padding-top: 10px;
    `]))),tourContentMenuItem:(0,d.iv)(rt||(rt=u()([`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 5px;
      font-size: 12px;
      border-radius: 5px;

      &:hover {
        background-color: `,`;
      }
    `])),l),tourContentMenuItemSelected:(0,d.iv)(it||(it=u()([`
      background-color: `,`;
    `])),l),tourContentMenuItemHeader:(0,d.iv)(st||(st=u()([`
      display: flex;
      align-items: center;
      height: 20px;
      color: `,`;
      line-height: 20px;
      cursor: pointer;
    `])),o),tourContentMenuItemHeaderSelected:(0,d.iv)(lt||(lt=u()([`
      color: `,`;
    `])),n),tourContentMenuItemHeaderIndex:(0,d.iv)(ct||(ct=u()([`
      width: 20px;
      margin-right: 5px;
      text-align: center;
      border-radius: 50%;
    `]))),tourContentMenuItemHeaderIndexSelected:(0,d.iv)(ut||(ut=u()([`
      color: `,`;
      background-color: `,`;
    `])),n,f),tourContentMenuItemNext:(0,d.iv)(dt||(dt=u()([`
      height: 20px;
      color: `,`;
      line-height: 20px;
      cursor: pointer;
    `])),f),tourContentBtn:(0,d.iv)(pt||(pt=u()([`
      width: 48px;
      color: `,`;
      font-size: 12px;
      border-bottom: 1px solid `,`;
      cursor: pointer;
      &:hover {
        color: `,`;
        border-bottom: 1px solid `,`;
      }
    `])),o,o,f,f),tourContentTour:(0,d.iv)(vt||(vt=u()([`
      width: 396px;
      `,`-tour-content {
        width: 350px;
      }
    `])),a),clearBtn:(0,d.iv)(mt||(mt=u()([`
      display: flex;
      margin: 20px 0 10px;
    `]))),noTour:(0,d.iv)(ft||(ft=u()([`
      color: `,`;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        color: `,`;
      }
    `])),o,f)}},xn=yn,An="_LI_VNOVICE_TOUR_TIME",gt=2,bn=function(){var t=(0,b.F8)("editor-novice-tour"),a=xn(),l=(0,O.sZ)(),o=l.updateState,n=(0,m.useState)(hn),f=x()(n,2),p=f[0],C=f[1],R=(0,m.useState)(!0),_=x()(R,2),S=_[0],H=_[1],K=(0,m.useState)(!0),h=x()(K,2),E=h[0],c=h[1],Q=(0,m.useState)(!1),V=x()(Q,2),N=V[0],B=V[1],w=(0,m.useState)(!1),Y=x()(w,2),U=Y[0],k=Y[1],T=(0,gn.Z)(An,{defaultValue:0}),G=x()(T,2),I=G[0],F=G[1],le=(0,m.useState)(!0),J=x()(le,2),z=J[0],A=J[1];if((0,m.useEffect)(function(){(0,M.isNumber)(I)&&(I>gt||F(I+1))},[]),(0,M.isNumber)(I)&&I>gt&&E)return null;var ae=function(){o(function(y){y.activeNavMenuKey=p[0].menu,y.collapsed&&(y.collapsed=!1)})},P=function(y,Z,oe){switch(Z){case"pre":return oe.map(function(D){return D.key===y?j()(j()({},D),{},{status:"finish"}):D.key===y-1?(o(function(X){X.activeNavMenuKey=D.menu,X.collapsed&&(X.collapsed=!1)}),j()(j()({},D),{},{status:"process"})):D});case"next":return oe.map(function(D){return D.key===y?j()(j()({},D),{},{status:"finish"}):D.key===y+1?(o(function(X){X.activeNavMenuKey=D.menu,X.collapsed&&(X.collapsed=!1)}),j()(j()({},D),{},{status:"process"})):D});case"now":default:return oe.map(function(D){return D.key===y?(o(function(X){X.activeNavMenuKey=D.menu,X.collapsed&&(X.collapsed=!1)}),j()(j()({},D),{},{status:"process"})):j()(j()({},D),{},{status:D.status==="process"?"finish":D.status})})}},L=function(y,Z){var oe=P(y,Z,p);C(oe),B(!1),H(!0)},q=function(){var y=p[0];o(function(Z){Z.activeNavMenuKey=y.menu,Z.collapsed&&(Z.collapsed=!1)}),H(!1),c(!1),U&&F(Number.MAX_SAFE_INTEGER)},te=function(){if(A(!z),z)H(!1);else{var y,Z=(y=p.find(function(oe){return oe.status==="process"}))===null||y===void 0?void 0:y.key;Z&&L(Z,"now")}},ne=qe.map(function(g,y){return j()(j()({},g),{},{prevButtonProps:{onClick:function(){L(p[y].key,"pre")}},nextButtonProps:{children:y+1===qe.length?"\u5F00\u59CB\u4F7F\u7528":"\u4E0B\u4E00\u6B65",onClick:function(){y!==p.length-1?L(p[y].key,"next"):ae()}}})}),Ln=(0,e.jsxs)("div",{className:r()("".concat(t,"__tour-content"),a.tourContent),children:[N?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("div",{className:r()("".concat(t,"__tour-content__header"),a.tourContentHeader),children:"\u8DF3\u8FC7\u5206\u6790\u64CD\u4F5C\u5F15\u5BFC\uFF1F"}),(0,e.jsx)("div",{className:r()("".concat(t,"__tour-content__clear-btn"),a.clearBtn),children:(0,e.jsxs)(s.Space,{children:[(0,e.jsx)(s.Button,{type:"primary",size:"small",onClick:function(){return q()},children:"\u5F00\u59CB\u4F7F\u7528"}),(0,e.jsx)(s.Button,{size:"small",onClick:function(){return B(!1)},children:"\u53D6\u6D88"})]})}),(0,e.jsx)("div",{className:r()("".concat(t,"__tour-content__no-tour"),a.noTour),children:(0,e.jsx)(s.Checkbox,{onChange:function(){return k(!U)},className:r()("".concat(t,"__tour-content__no-tour"),a.noTour),children:"\u4EE5\u540E\u4E0D\u9700\u8981\u64CD\u4F5C\u5F15\u5BFC"})})]}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("div",{className:r()("".concat(t,"__tour-content__header"),a.tourContentHeader),children:"\u8BF7\u5F00\u59CB\u5206\u6790\u64CD\u4F5C\u5427"}),(0,e.jsx)("div",{className:r()("".concat(t,"__tour-content__menu"),a.tourContentMenu),children:p.map(function(g){return(0,e.jsxs)("div",{className:r()("".concat(t,"__tour-content__menu__item"),a.tourContentMenuItem,["process"].includes(g.status)&&"".concat(t,"__tour-content__menu__item_selected"),["process"].includes(g.status)&&a.tourContentMenuItemSelected),children:[(0,e.jsxs)("div",{className:r()("".concat(t,"__tour-content__menu__item-header"),a.tourContentMenuItemHeader),onClick:function(){return L(g.key,"now")},children:[(0,e.jsx)("div",{className:r()("".concat(t,"__tour-content__menu__item-header-index"),a.tourContentMenuItemHeaderIndex,["process","finish"].includes(g.status)&&"".concat(t,"__tour-content__menu__item-header-index_selected"),["process","finish"].includes(g.status)&&a.tourContentMenuItemHeaderIndexSelected),children:g.key}),(0,e.jsx)("div",{className:r()("".concat(t,"__tour-content__menu__item-header-title"),["process","finish"].includes(g.status)&&"".concat(t,"__tour-content__menu__item-header-title_selected")),children:g.title})]}),g.status==="process"&&g.key!==4&&(0,e.jsx)("div",{className:r()("".concat(t,"__tour-content__menu__item-next"),a.tourContentMenuItemNext),onClick:function(){return L(g.key,"next")},children:(0,e.jsx)(ee.ArrowRightOutlined,{})})]},g.key)})}),(0,e.jsx)("div",{className:r()("".concat(t,"__tour-content__btn"),a.tourContentBtn),onClick:function(){return B(!0)},children:"\u8DF3\u8FC7\u5F15\u5BFC"})]}),(0,e.jsx)(s.Tour,{open:S,current:p.findIndex(function(g){return g.status==="process"}),onClose:function(){return H(!1)},steps:ne,rootClassName:r()("".concat(t,"__tour-content__tour"),a.tourContentTour)})]});return E&&(0,e.jsx)(s.Popover,{overlayClassName:r()("".concat(t,"__popover"),a.tourPopover),placement:"topRight",open:z,content:Ln,trigger:"click",arrow:!1,destroyTooltipOnHide:!0,children:(0,e.jsx)(s.Button,{className:r()(t,a.noviceTour),type:"primary",icon:(0,e.jsx)(he(),{component:Cn}),onClick:te,children:"\u64CD\u4F5C\u5F15\u5BFC"})})},Sn=bn,jn=(0,O.BP)({version:"v0.1",component:Sn,metadata:{name:"NoviceTour",displayName:"\u65B0\u624B\u5F15\u5BFC",description:"\u7528\u4E8E\u5F15\u5BFC\u5206\u6790\u64CD\u4F5C"},container:{type:"SideNav",slot:"bottom"}}),_n=function(t){var a=(0,Ce.UO)(),l=a.id,o=l===void 0?"":l;return(0,e.jsx)(s.Tooltip,{placement:"right",title:"\u9884\u89C8",children:(0,e.jsx)(Ce.rU,{to:"/app/".concat(o,"?type=project"),target:"_blank",children:(0,e.jsx)(s.Button,{type:"text",size:"middle",shape:"circle",id:"LITourPreviewApp",icon:(0,e.jsx)(ee.DesktopOutlined,{size:18}),onClick:function(){(0,Ne.lF)(11)}})})})},Nn=_n,Tn=(0,O.BP)({version:"v0.1",component:Nn,metadata:{name:"Preview",displayName:"\u9884\u89C8",description:"\u9884\u89C8\u7F16\u8F91\u7ED3\u679C"},container:{type:"SideNav",slot:"bottom"}}),Dn=[$.rd,$.G9,$.kk,$.I6,$.u0,jn],kn=[Pe,De,Xe],Fn=[Pe,$.Sf,$.a,De,fn,Tn,$.sP,Xe,Ot,$.gt]},71022:function(ht,xe,i){i.d(xe,{Sr:function(){return s},JV:function(){return be},F8:function(){return je}});var $=i(69024),O=i.n($),ce=i(87363),Ae=i(28869),be=function(M){var m=(0,Ae.lr)(),b=O()(m,2),W=b[0],ie=b[1],u=W.get("nav")||"datasets",d=(0,ce.useState)(u),de=O()(d,2),me=de[0],fe=de[1];return(0,ce.useEffect)(function(){var pe=function(ge){W.set("nav",ge),ie(W),fe(ge)};return M.on("select-nav-menu",pe),function(){M.off("select-nav-menu",pe)}},[M,W,ie]),me},re=i(91055),ve=i.n(re),ue=i(81821),Se=ue.ConfigProvider.ConfigContext,x=function(){return(0,ce.useContext)(Se)},s=function(){var M=x(),m=M.getPrefixCls,b=m(),W=ue.theme.useToken,ie=W(),u=ie.token;return ve()(ve()({},u),{},{antCls:".".concat(b)})},je=function(M,m){var b,W=(b=m==null?void 0:m.prefixCls)!==null&&b!==void 0?b:"li-";return"".concat(W).concat(M!=null?M:"")}}}]);
