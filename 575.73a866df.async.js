"use strict";(self.webpackChunk_antv_li_website=self.webpackChunk_antv_li_website||[]).push([[575],{39153:function(G,C,a){a.r(C);var _=a(87363),l=a.n(_),R=a(36248),W=a(90005),L=a.n(W),O=a(81821),k=a.n(O),b=a(15934),D=a(30095),F=a(14214),j=a(89446),q=a(86610);function y(e){"@babel/helpers - typeof";return y=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(e)}function M(e,t,n){return t=N(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function N(e){var t=V(e,"string");return y(t)=="symbol"?t:String(t)}function V(e,t){if(y(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(y(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function z(e,t){return $(e)||Y(e,t)||H(e,t)||Z()}function Z(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function H(e,t){if(e){if(typeof e=="string")return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(e,t)}}function A(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function Y(e,t){var n=e==null?null:typeof Symbol!="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var i,c,r,s,g=[],f=!0,E=!1;try{if(r=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;f=!1}else for(;!(f=(i=r.call(n)).done)&&(g.push(i.value),g.length!==t);f=!0);}catch(h){E=!0,c=h}finally{try{if(!f&&n.return!=null&&(s=n.return(),Object(s)!==s))return}finally{if(E)throw c}}return g}}function $(e){if(Array.isArray(e))return e}var w=function(t){var n=t.tableData,i=t.id,c=t.columns,r=t.value,s=t.settingVisible,g=s===void 0?!0:s,f=t.reloadSignal,E=t.theme,h=E===void 0?"light":E,J=(0,_.useState)([]),S=z(J,2),tt=S[0],B=S[1],m=(0,_.useRef)(),U=function(u){var d=r.y;if(!r.split){var P;d="".concat(r.y,"(").concat((P=b.d0.find(function(v){return v.id===r.aggregation}))===null||P===void 0?void 0:P.displayName,")")}var I=M(M({},r.x,{alias:c.find(function(v){return v.name===r.x}).id}),d,{alias:c.find(function(v){return v.name===r.y}).id});if(m.current)m.current.update({data:u,meta:I,angleField:d,colorField:r.x});else{var K=new R.by(i,{data:u,meta:I,appendPadding:10,angleField:d,colorField:r.x,radius:.9,color:["#5B8FF9","#61DDAA","#65789B","#F6BD16"],legend:{layout:"horizontal",position:"bottom",itemName:{style:{fill:h==="light"?"black":"white",fontSize:14}},title:{style:{fill:h==="light"?"black":"white"}}},label:{type:"inner",offset:"-30%",content:function(Q){var X=Q.percent;return"".concat((X*100).toFixed(0),"%")},style:{fill:h==="light"?"black":"white",fontSize:14,textAlign:"center"}},interactions:[{type:"element-active"}]});m.current=K,K.render()}},T=function(){m.current&&(m.current.destroy(),m.current=null)};(0,_.useEffect)(function(){if(r.x&&r.y&&n.length>1){var o=(0,b.jm)(r.x,r.y,r.aggregation,n,r.split);B(o),U(o)}else T()},[n,f]),(0,j.YP)(r,function(){if(r.x&&r.y&&n.length>1){var o=(0,b.jm)(r.x,r.y,r.aggregation,n,r.split);B(o),U(o)}else T()});var p=function(u,d){r[u]=d},x=r.x&&r.y;return l().createElement("div",{className:"chartContainer"},g&&l().createElement("div",{className:"settings"},l().createElement("div",{className:"item"},l().createElement(D.Z,{label:"\u5207\u7247",value:r.x,onChange:function(u){p("x",u)},columns:c}),l().createElement(D.Z,{label:l().createElement("div",{className:"splitLabel"},l().createElement("div",null,"\u6570\u503C"),l().createElement(F.Z,{value:r.aggregation,onChange:function(u){p("aggregation",u)}})),value:r.y,onChange:function(u){p("y",u)},columns:c}))),l().createElement("div",{className:L()("content",{empty:!x})},x?l().createElement("div",{id:i,className:"g2Container"}):l().createElement(O.Empty,null)))};C.default=l().memo(w)}}]);
