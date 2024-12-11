var _=Object.defineProperty;var g=(i,a,t)=>a in i?_(i,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[a]=t;var o=(i,a,t)=>g(i,typeof a!="symbol"?a+"":a,t);import"./OrbitControls-DI2741t5.js";import{G as x,B as y}from"./base-three-DlDRCK0E.js";import{R as w,M as b,j as O,k as T}from"./three.core-BWGKd-O1.js";import{_ as P}from"./plugin-vueexport-helper-DlAUqK2U.js";import{f as L,i as B,g as k,e as D,d as p,t as h,n as R,o as F}from"./index-BWXbnMxx.js";const G=new x,M=new w,C=new T;class V extends y{constructor(t,e="/models/"){super(t);o(this,"modelPath");o(this,"maps",new Map);o(this,"cabinets",[]);o(this,"curCabinet");o(this,"onMouseOverCabinet",t=>{});o(this,"onMouseMoveCabinet",(t,e)=>{});o(this,"onMouseOutCabinet",()=>{});this.modelPath=e,this.crtTexture("cabinet-hover.jpg")}loadGLTF(t=""){G.load(this.modelPath+t,({scene:{children:e}})=>{e.forEach(s=>{const{map:l,color:u}=s.material;this.changeMat(s,l,u),s.name.includes("cabinet")&&this.cabinets.push(s)}),this.scene.add(...e)})}changeMat(t,e,s){e?t.material=new b({map:this.crtTexture(e.name)}):t.material=new b({color:s})}crtTexture(t){let e=this.maps.get(t);return e||(e=new O().load(this.modelPath+t),e.flipY=!1,e.wrapS=1e3,e.wrapT=1e3,this.maps.set(t,e)),e}selectCabinet(t,e){const{cabinets:s,renderer:l,camera:u,maps:m,curCabinet:n}=this,{clientWidth:r,clientHeight:d}=l.domElement;C.set(t/r*2-1,-(e/d)*2+1),M.setFromCamera(C,u);const f=M.intersectObjects(s)[0];let c=f?f.object:null;n&&n!==c&&n.material.setValues({map:m.get("cabinet.jpg")}),c?(this.onMouseMoveCabinet(t,e),c!==n&&(this.curCabinet=c,c.material.setValues({map:m.get("cabinet-hover.jpg")}),this.onMouseOverCabinet(c))):n&&(this.curCabinet=null,this.onMouseOutCabinet())}}const j={class:"machine-room"},E={__name:"index",setup(i){const a=L(null);let t=null;const e=B({planePos:{left:0,top:0},planeDisplay:"none",curCabinet:{name:"Loading……",temperature:0,capacity:0,count:0}}),s=n=>{const{offsetX:r,offsetY:d}=n;t.selectCabinet(r,d)},l=({name:n})=>{e.planeDisplay="block"},u=(n,r)=>{e.planePos={left:n+"px",top:r+"px"}},m=()=>{e.planeDisplay="none"};return k(()=>{a.value&&(t=new V(a.value),t.loadGLTF("machineRoom.gltf"),t.animate(),t.onMouseOverCabinet=l,t.onMouseMoveCabinet=u,t.onMouseOutCabinet=m)}),(n,r)=>(F(),D("div",j,[p("div",{id:"container",ref_key:"containerRef",ref:a,onMousemove:s},null,544),p("div",{id:"plane",style:R({left:e.planePos.left,top:e.planePos.top,display:e.planeDisplay})},[p("p",null,"机柜名称："+h(e.curCabinet.name),1),p("p",null,"机柜温度："+h(e.curCabinet.temperature)+"°",1),p("p",null," 使用情况："+h(e.curCabinet.count)+"/"+h(e.curCabinet.capacity),1)],4)]))}},X=P(E,[["__scopeId","data-v-113db69c"]]);export{X as default};