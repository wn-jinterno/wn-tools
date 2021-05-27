(this["webpackJsonpwn-tools"]=this["webpackJsonpwn-tools"]||[]).push([[0],{133:function(e,t,n){},137:function(e,t,n){},238:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o),r=n(29),a=n.n(r),s=(n(133),n(134),n(43)),c=n(15),l=n(9),u=(n(137),n(30)),d="SET_IS_LOADING",b="RESET_STATE",j="SET_STATUS_MESSAGE",h="SET_FLOW_TREE",O="SET_AVAILABLE_NODES",g="SET_JSON_EDITOR_CONTENT",f=function(e){return{type:j,payload:{statusMessage:e}}},p=function(e){return{type:d,payload:{isLoading:e}}},x=function(e){return{type:g,payload:{jsonEditorContent:e}}},T=n(35),w=n(36),m=n(39),v=n(37),E=n(74),y=n(248),C=(n(60),n(5)),S=function(e){var t=e.title,n=(e.description,e.withLinkToHome),o=e.children;Object(E.a)(e,["title","description","withLinkToHome","children"]);return Object(C.jsxs)(l.a,{width:"100%",height:"100%",children:[Object(C.jsxs)(l.b,{width:"100%",height:85,p:15,bg:"white",alignItems:"center",sx:{borderBottom:"1px solid #d8d8d8",position:"absolute",top:0,left:0,zIndex:1},children:[n&&Object(C.jsx)(l.b,{marginRight:15,children:Object(C.jsx)(s.b,{to:"/",style:{textDecoration:"none",color:"#6D6D6D"},children:Object(C.jsx)(y.a,{size:32})})}),Object(C.jsx)(l.d,{p:2,fontSize:32,fontWeight:"bold",children:t}),Object(C.jsx)(l.a,{mx:"auto"})]}),Object(C.jsx)(l.b,{width:"100%",height:"100%",sx:{paddingTop:"85px"},children:o})]})},D=n(252),L=function(e){Object(m.a)(n,e);var t=Object(v.a)(n);function n(e){var o;return Object(T.a)(this,n),(o=t.call(this,e)).renderToolIcons=function(){return Object(C.jsx)(l.b,{width:"100%",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",children:[{name:"Flow Tree Tool",link:"/flowtreetool"},{name:"Test Tool 1",link:"/testtool1"},{name:"Test Tool 2",link:"/testtool2"},{name:"Test Tool 3",link:"/testtool3"}].map((function(e,t){return Object(C.jsx)(l.b,{my:15,mx:15,borderRadius:32,width:150,children:Object(C.jsx)(s.b,{style:{fontSize:"0.9rem",width:"100%",textDecoration:"none",color:"black"},to:e.link,children:Object(C.jsxs)(l.a,{width:"100%",children:[Object(C.jsx)(l.a,{width:"100%",height:150,children:Object(C.jsx)(D.a,{name:e.name,size:150})}),Object(C.jsx)(l.b,{width:"100%",justifyContent:"center",p:15,children:e.name})]})})},e.name)}))})},o}return Object(w.a)(n,[{key:"render",value:function(){return Object(C.jsx)(S,{title:"Home",children:Object(C.jsx)(l.b,{width:"100%",px:"25%",py:30,alignItems:"center",children:this.renderToolIcons()})})}}]),n}(o.Component),_=Object(u.b)((function(e,t){return{isLoading:e.global.isLoading,statusMessage:e.global.statusMessage}}),(function(e){return{setIsLoading:function(t){return e(p(t))},setStatusMessage:function(t){return e(f(t))}}}))(L),N=n(249),k=n(250),I=n(46),M=(i.a.Component,function(e){Object(m.a)(n,e);var t=Object(v.a)(n);function n(e){var o;return Object(T.a)(this,n),(o=t.call(this,e)).onTreeChange=function(e){var t=o.props,n=(t.flowTree,t.setFlowTree),i=t.setJsonEditorContent;n(e),void 0===e||null===e||0===e.length?i(""):i(JSON.stringify(e,null,"\t"))},o.onDeleteClick=function(e){var t=o.props,n=t.flowTree,i=t.setFlowTree,r=t.setJsonEditorContent,a=Object(I.c)({treeData:n,path:e,getNodeKey:function(e){return e.treeIndex}});i(a),void 0===a||null===a||0===a.length?r(""):r(JSON.stringify(a,null,"\t"))},o.canDrop=function(e){e.node;var t=e.nextParent;e.prevPath,e.nextPath;return 0===o.props.flowTree.length||null!==t},o}return Object(w.a)(n,[{key:"render",value:function(){var e=this,t=this.props.flowTree;Object(I.b)({treeData:t});return Object(C.jsx)(l.a,{height:"100%",width:"100%",children:Object(C.jsxs)(l.b,{height:"100%",p:15,flexDirection:"column",children:[Object(C.jsx)(l.c,{p:15,children:"Flow Tree"}),Object(C.jsx)(I.a,{innerStyle:{padding:"10px"},treeData:t,dndType:"FLOW_TREE_DND_TYPE",onChange:this.onTreeChange,canDrop:this.canDrop,generateNodeProps:function(t){t.node;var n=t.path;return{buttons:[Object(C.jsx)(N.a,{icon:k.a,intent:"danger",onClick:function(){return e.onDeleteClick(n)}})]}}})]})})}}]),n}(i.a.Component)),A=Object(u.b)((function(e,t){return{isLoading:e.global.isLoading,statusMessage:e.global.statusMessage,flowTree:e.global.flowTreeTool.flowTree}}),(function(e){return{setIsLoading:function(t){return e(p(t))},setStatusMessage:function(t){return e(f(t))},setFlowTree:function(t){return e(function(e){return{type:h,payload:{flowTree:e}}}(t))},setJsonEditorContent:function(t){return e(x(t))}}}))(M),R=n(123),F=n.n(R),J=(n(234),n(235),function(e){var t=e.jsonEditorContent,n=e.setJsonEditorContent;Object(E.a)(e,["jsonEditorContent","setJsonEditorContent"]);return Object(C.jsx)(F.a,{width:"100%",height:"100%",mode:"json",theme:"github",onChange:function(e){n&&n(e)},value:t,name:"flow-tree-json-editor",editorProps:{$blockScrolling:!0},setOptions:{enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!0}})}),P=Object(u.b)((function(e,t){return{isLoading:e.global.isLoading,statusMessage:e.global.statusMessage,jsonEditorContent:e.global.flowTreeTool.jsonEditorContent}}),(function(e){return{setIsLoading:function(t){return e(p(t))},setStatusMessage:function(t){return e(f(t))},setJsonEditorContent:function(t){return e(x(t))}}}))(J),z=function(e){Object(m.a)(n,e);var t=Object(v.a)(n);function n(e){var o;return Object(T.a)(this,n),(o=t.call(this,e)).onTreeChange=function(e){(0,o.props.setAvailableNodes)(e)},o.onDeleteClick=function(e){var t=o.props,n=t.availableNodes;(0,t.setAvailableNodes)(Object(I.c)({treeData:n,path:e,getNodeKey:function(e){return e.treeIndex}}))},o}return Object(w.a)(n,[{key:"render",value:function(){var e=this,t=this.props.availableNodes;return Object(C.jsxs)(l.a,{height:"100%",py:15,children:[Object(C.jsx)(l.c,{p:15,children:"Nodes"}),Object(C.jsx)(I.a,{treeData:t,dndType:"FLOW_TREE_DND_TYPE",innerStyle:{padding:"10px"},onChange:this.onTreeChange,shouldCopyOnOutsideDrop:!0,canNodeHaveChildren:function(e){return!1},canDrop:function(e){return!1},generateNodeProps:function(t){t.node;var n=t.path;return{buttons:[Object(C.jsx)(N.a,{icon:k.a,intent:"danger",onClick:function(){return e.onDeleteClick(n)}})]}}})]})}}]),n}(i.a.Component),B=Object(u.b)((function(e,t){return{isLoading:e.global.isLoading,statusMessage:e.global.statusMessage,availableNodes:e.global.flowTreeTool.availableNodes}}),(function(e){return{setIsLoading:function(t){return e(p(t))},setStatusMessage:function(t){return e(f(t))},setAvailableNodes:function(t){return e(function(e){return{type:O,payload:{availableNodes:e}}}(t))}}}))(z),H=function(e){Object(m.a)(n,e);var t=Object(v.a)(n);function n(e){return Object(T.a)(this,n),t.call(this,e)}return Object(w.a)(n,[{key:"render",value:function(){return Object(C.jsx)(S,{title:"Flow Tree Generator",withLinkToHome:!0,children:Object(C.jsxs)(l.b,{width:"100%",height:"100%",paddingTop:85,sx:{position:"fixed",top:0,left:0},children:[Object(C.jsx)(l.a,{width:2/8,sx:{borderRight:"1px solid #d8d8d8"},children:Object(C.jsx)(B,{})}),Object(C.jsx)(l.a,{width:.5,children:Object(C.jsx)(A,{})}),Object(C.jsx)(l.a,{width:2/8,children:Object(C.jsx)(P,{})})]})})}}]),n}(o.Component),W=Object(u.b)((function(e,t){return{isLoading:e.global.isLoading,statusMessage:e.global.statusMessage}}),(function(e){return{setIsLoading:function(t){return e(p(t))},setStatusMessage:function(t){return e(f(t))}}}))(H),G=n(58),X=n(251),U=function(){return Object(C.jsx)(l.b,{width:"100%",height:"100%",sx:{position:"fixed",top:0,left:0},children:Object(C.jsx)(l.b,{width:"100%",height:"100%",justifyContent:"center",alignItems:"center",children:Object(C.jsxs)(l.b,{flexDirection:"column",justifyContent:"center",alignItems:"center",children:[Object(C.jsx)(l.d,{fontSize:"3em",children:"\xaf\\_(\u30c4)_/\xaf"}),Object(C.jsx)(l.d,{fontSize:"12em",children:"404"}),Object(C.jsx)(l.d,{fontSize:"1.5em",children:"The page does not exist."}),Object(C.jsx)(s.b,{to:"/",style:{textDecoration:"none",color:"black",padding:"15px"},children:Object(C.jsx)(G.a,{iconBefore:X.a,size:"large",marginRight:10,children:"Go Home"})})]})})})};var V=function(){return Object(C.jsx)(s.a,{basename:"/wn-tools",children:Object(C.jsx)(l.a,{width:"100%",height:"100%",children:Object(C.jsxs)(c.c,{children:[Object(C.jsx)(c.a,{exact:!0,path:"/",component:_}),Object(C.jsx)(c.a,{path:"/flowtreetool",component:W}),Object(C.jsx)(c.a,{component:U})]})})})},q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,253)).then((function(t){var n=t.getCLS,o=t.getFID,i=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),o(e),i(e),r(e),a(e)}))},K=n(38),Y=n(56),$=n(72),Q=n.n($),Z=n(124),ee=n.n(Z),te=n(19),ne={isLoading:!1,statusMessage:"",flowTreeTool:{availableNodes:[{title:"processSale"},{title:"onRequestSetAmount"},{title:"submitAmount"},{title:"onSelectApplication"},{title:"submitApplication"},{title:"onSignatureRequired"},{title:"submitSignature"},{title:"onDeviceError"},{title:"onSaleResponse"},{title:"onError"},{title:"onDeviceDisconnected"}],jsonEditorContent:"",flowTree:[]}},oe={key:"global",storage:Q.a,whitelist:[]},ie=Object(K.a)({global:Object(Y.a)(oe,(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b:return Object(te.a)({},ne);case j:var n=t.payload.statusMessage;return Object(te.a)(Object(te.a)({},e),{},{statusMessage:n});case d:var o=t.payload.isLoading;return Object(te.a)(Object(te.a)({},e),{},{isLoading:o});case h:var i=t.payload.flowTree;return Object(te.a)(Object(te.a)({},e),{},{flowTreeTool:Object(te.a)(Object(te.a)({},e.flowTreeTool),{},{flowTree:i})});case O:var r=t.payload.availableNodes;return Object(te.a)(Object(te.a)({},e),{},{flowTreeTool:Object(te.a)(Object(te.a)({},e.flowTreeTool),{},{availableNodes:r})});case g:var a=t.payload.jsonEditorContent;return Object(te.a)(Object(te.a)({},e),{},{flowTreeTool:Object(te.a)(Object(te.a)({},e.flowTreeTool),{},{jsonEditorContent:a})});default:return e}}))}),re={key:"root",storage:Q.a,blacklist:["global"],stateReconciler:ee.a},ae=Object(Y.a)(re,ie),se=Object(K.b)(ae,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),ce=Object(Y.b)(se),le=n(125);a.a.render(Object(C.jsx)(u.a,{store:se,children:Object(C.jsx)(le.a,{loading:null,persistor:ce,children:Object(C.jsx)(V,{})})}),document.getElementById("root")),q()},60:function(e,t,n){}},[[238,1,2]]]);
//# sourceMappingURL=main.cdcf865a.chunk.js.map