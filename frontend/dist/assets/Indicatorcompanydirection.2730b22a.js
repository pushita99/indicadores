import{_ as B,a as d,u as v,F as L,r as p,o as a,c,b as i,d as s,w as m,e as b,f as g,h as U,v as P,i as u,j as I,t as f,B as x,p as q,g as A}from"./index.d10435ed.js";const D=x+"indicatorcompanydirection/",E=x+"direction/",O=x+"indicator/direction/",M={data(){return{indicatorcompanydirections:null,indicatorcompanydirectionDialog:!1,deleteIndicatorcompanydirectionDialog:!1,deleteIndicatorcompanydirectionsDialog:!1,indicatorcompanydirection:{},company:{name:""},indicator:{name:""},selectedIndicatorcompanydirections:null,filters:{},submitted:!1,companies:[],indicators:[],autoFilteredIndicators:[],autoFilteredCompanies:[],tosave:[],sales:null,indicadores:[],autoFilteredDirections:[],directions:null,direction:null,loading:!0,date:new Date}},created(){this.initFilters()},async mounted(){this.loadData(this.getDirectionId())},methods:{formatCurrency(t){if(t)return t.toLocaleString("en-US",{style:"currency",currency:"USD"})},openNew(){this.indicatorcompanydirection={},this.submitted=!1,this.indicatorcompanydirectionDialog=!0},hideDialog(){this.indicatorcompanydirectionDialog=!1,this.submitted=!1},async saveIndicatorcompanydirection(){const t=new Date;if(this.indicatorcompanydirection.date=t,this.submitted=!0,this.indicatorcompanydirection.id)this.indicatorcompanydirections[this.findIndexById(this.indicatorcompanydirection.id)]=this.indicatorcompanydirection,this.$toast.add({severity:"success",summary:"Successful",detail:"Indicador modificado con \xE9xito",life:3e3});else try{for(let e=0;e<this.indicators.length;e++)await d.post(D,{...this.indicatorcompanydirection,company:this.company.id,direction:v().user.user.direction.id,indicator:this.indicators[e].id,value:this.tosave[e]});this.$toast.add({severity:"success",summary:"Successful",detail:"Indicador insertado con \xE9xito",life:3e3}),this.loadData()}catch(e){this.$toast.add({severity:"error",summary:"Error",detail:e,life:3e3}),console.log(e)}finally{this.indicatorcompanydirectionDialog=!1,this.indicatorcompanydirection={}}},editIndicatorcompanydirection(t){this.indicatorcompanydirection={...t},this.indicatorcompanydirectionDialog=!0},selectDate(){console.log(this.date.toLocaleString()),console.log(this.date.toISOString()),this.date.setMonth(this.date.getMonth()+1),this.loadData(this.getDirectionId())},confirmDeleteIndicatorcompanydirection(t){console.log("pase por ConfirmDeleteIndicatorcompanydirection"),this.indicatorcompanydirection=t,this.deleteIndicatorcompanydirectionDialog=!0},async deleteIndicatorcompanydirection(){console.log("pase por deleteIndicatorcompanydirection"),console.log(this.indicatorcompanydirection.id);const t=await d.delete(D+this.indicatorcompanydirection.id);console.log(t),this.deleteIndicatorcompanydirectionDialog=!1,this.indicatorcompanydirection={},this.$toast.add({severity:"success",summary:"Operaci\xF3n exitosa",detail:"Indicador eliminado",life:3e3})},findIndexById(t){let e=-1;for(let y=0;y<this.indicatorcompanydirections.length;y++)if(this.indicatorcompanydirections[y].id===t){e=y;break}return e},computed:{lastYearTotal(){let t=0;for(let e of this.sales)t+=e.lastYearProfit;return this.formatCurrency(t)},thisYearTotal(){let t=0;for(let e of this.sales)t+=e.thisYearProfit;return this.formatCurrency(t)},ancho(){return 100/(this.indicadores[0].empresas.lenth+1)}},exportCSV(){this.$refs.dt.exportCSV()},confirmDeleteSelected(){this.deleteIndicatorcompanydirectionsDialog=!0},async deleteSelectedIndicatorcompanydirections(){await d.delete(D,this.indicatorcompanydirections),this.deleteIndicatorcompanydirectionsDialog=!1,this.selectedIndicatorcompanydirections=null,this.$toast.add({severity:"success",summary:"Successful",detail:"Indicatorcompanydirections Deleted",life:3e3})},initFilters(){this.filters={global:{value:null,matchMode:L.CONTAINS}}},async loadData(t){this.loading=!0;try{const e=await d.get(`http://localhost:3000/reports/general_report/${t}/${this.date.toISOString()}`);this.indicadores=e.data,this.loading=!1}catch(e){console.log(e)}d.get(D).then(e=>{this.indicatorcompanydirections=e.data}),d.get(`http://localhost:3000/company/direction/${v().user.user.direction.id}`).then(e=>{this.companies=e.data}),d.get(`${O}${v().user.user.direction.id}`).then(e=>{this.indicators=e.data})},async loadDirections(){try{const t=await d.get(E);this.directions=t.data}catch(t){console.log(t)}},getDirectionId(){return v().user.user.direction.id},searchDirections(t){setTimeout(()=>{t.query.trim().length?this.autoFilteredDirections=this.directions.filter(e=>e.name.toLowerCase().startsWith(t.query.toLowerCase())):this.autoFilteredDirections=[...this.directions]},250)},searchIndicator(t){setTimeout(()=>{t.query.trim().length?this.autoFilteredIndicators=this.indicators.filter(e=>e.name.toLowerCase().startsWith(t.query.toLowerCase())):this.autoFilteredIndicators=[...this.indicators]},250)},searchCompanies(t){setTimeout(()=>{t.query.trim().length?this.autoFilteredCompanies=this.companies.filter(e=>e.name.toLowerCase().startsWith(t.query.toLowerCase())):this.autoFilteredCompanies=[...this.companies]},250)}}},h=t=>(q("data-v-f1e6334e"),t=t(),A(),t),R={class:"grid"},Y={class:"col-12"},j={class:"card"},W={key:0},z={key:1},G={class:"p-datatable-wrapper"},H={key:0,class:"tabla"},J={class:""},K=h(()=>i("th",{rowspan:"3"},[i("div",{class:""},[i("span",{class:"p-column-title"},"Indicadores")])],-1)),Q=["colspan"],X=h(()=>i("div",{class:"p-column-header-content"},[i("span",{class:"p-column-title"}," Empresas")],-1)),Z=[X],$={colspan:"2"},ee={class:"p-column-header-content"},te={class:"p-column-title"},ie={class:"flex p-column-header-content"},oe=h(()=>i("span",{class:"p-column-title flex-1 mt-2"},"Plan",-1)),ne={class:"p-column-header-content flex"},se=h(()=>i("span",{class:"p-column-title flex-1 mt-2"},"Real",-1)),ae={class:""},ce={class:"field"},re=h(()=>i("label",{for:"companyId",class:"mb-3"},"Empresa",-1)),le={for:"name2"},de={class:"flex align-items-center justify-content-center"},pe=h(()=>i("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),me={key:0},ue={class:"flex align-items-center justify-content-center"},he=h(()=>i("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),ye={key:0};function fe(t,e,y,ge,o,_){const w=p("Toast"),k=p("Calendar"),F=p("Toolbar"),S=p("ProgressSpinner"),r=p("Button"),V=p("AutoComplete"),T=p("InputText"),C=p("Dialog");return a(),c("div",R,[i("div",Y,[i("div",j,[s(w),s(F,{class:"mb-4"},{start:m(()=>[]),end:m(()=>[s(k,{class:"mx-2",modelValue:o.date,"onUpdate:modelValue":e[0]||(e[0]=n=>o.date=n),view:"month",dateFormat:"mm/yy",onDateSelect:e[1]||(e[1]=n=>_.selectDate())},null,8,["modelValue"])]),_:1}),o.loading?(a(),c("div",W,[b(" cargando... "),s(S),s(S,{"aria-label":"Basic ProgressSpinner"})])):g("",!0),!o.indicadores||o.indicadores.length===0?(a(),c("div",z," No hay indicadores para esta direccion... ")):g("",!0),U(i("div",null,[i("div",G,[o.indicadores&&o.indicadores.length>0?(a(),c("table",H,[i("thead",J,[i("tr",null,[K,i("th",{colspan:2*o.indicadores[0].companies.length},Z,8,Q)]),i("tr",null,[(a(!0),c(u,null,I(o.indicadores[0].companies,n=>(a(),c("th",$,[i("div",ee,[i("span",te,f(n.name),1)])]))),256))]),i("tr",null,[(a(!0),c(u,null,I(o.indicadores[0].companies,n=>(a(),c(u,null,[i("th",null,[i("div",ie,[oe,s(r,{icon:"pi pi-pencil",class:"flex-1 p-button-text p-button-info mr-2",onClick:e[2]||(e[2]=l=>t.editIndicator(t.slotProps.data))})])]),i("th",null,[i("div",ne,[se,s(r,{icon:"pi pi-pencil",class:"flex-1 p-button-text p-button-info mr-2",onClick:e[3]||(e[3]=l=>t.editIndicator(t.slotProps.data))})])])],64))),256))])]),i("tbody",ae,[(a(!0),c(u,null,I(o.indicadores,n=>(a(),c("tr",null,[i("td",null,f(n.name),1),(a(!0),c(u,null,I(n.companies,l=>(a(),c(u,null,[i("td",null,f(l.planification),1),i("td",null,f(l.value),1)],64))),256))]))),256))])])):g("",!0)])],512),[[P,!o.loading]]),s(C,{visible:o.indicatorcompanydirectionDialog,"onUpdate:visible":e[6]||(e[6]=n=>o.indicatorcompanydirectionDialog=n),style:{width:"450px"},header:"Indicadores mes",modal:!0,class:"p-fluid"},{footer:m(()=>[s(r,{label:"Cancelar",icon:"pi pi-times",class:"p-button-text",onClick:_.hideDialog},null,8,["onClick"]),s(r,{label:"Guardar",icon:"pi pi-check",class:"p-button-text",onClick:_.saveIndicatorcompanydirection},null,8,["onClick"])]),default:m(()=>[i("div",ce,[re,s(V,{placeholder:"Buscar Compa\xF1ia",id:"companyId",dropdown:!0,modelValue:o.company,"onUpdate:modelValue":e[4]||(e[4]=n=>o.company=n),suggestions:o.autoFilteredCompanies,onComplete:e[5]||(e[5]=n=>_.searchCompanies(n)),"force-selection":!0,field:"name"},null,8,["modelValue","suggestions"])]),(a(!0),c(u,null,I(o.indicators,(n,l)=>(a(),c("div",{key:l,class:"field col"},[i("label",le,f(n.name)+":",1),s(T,{id:"name2",type:"number",modelValue:o.tosave[l],"onUpdate:modelValue":N=>o.tosave[l]=N},null,8,["modelValue","onUpdate:modelValue"])]))),128))]),_:1},8,["visible"]),s(C,{visible:o.deleteIndicatorcompanydirectionDialog,"onUpdate:visible":e[8]||(e[8]=n=>o.deleteIndicatorcompanydirectionDialog=n),style:{width:"450px"},header:"Confirmar",modal:!0},{footer:m(()=>[s(r,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:e[7]||(e[7]=n=>o.deleteIndicatorcompanydirectionDialog=!1)}),s(r,{label:"Si",icon:"pi pi-check",class:"p-button-text",onClick:_.deleteIndicatorcompanydirection},null,8,["onClick"])]),default:m(()=>[i("div",de,[pe,o.indicatorcompanydirection?(a(),c("span",me,[b("\xBFSeguro que desea eliminar "),i("b",null,f(o.indicatorcompanydirection.name),1),b("?")])):g("",!0)])]),_:1},8,["visible"]),s(C,{visible:o.deleteIndicatorcompanydirectionsDialog,"onUpdate:visible":e[10]||(e[10]=n=>o.deleteIndicatorcompanydirectionsDialog=n),style:{width:"450px"},header:"Confirm",modal:!0},{footer:m(()=>[s(r,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:e[9]||(e[9]=n=>o.deleteIndicatorcompanydirectionsDialog=!1)}),s(r,{label:"Si",icon:"pi pi-check",class:"p-button-text",onClick:t.deleteSelectedIndicatorcompanydirection},null,8,["onClick"])]),default:m(()=>[i("div",ue,[he,o.indicatorcompanydirection?(a(),c("span",ye,"\xBFSeguro que desea eliminar las planificaciones seleccionadas?")):g("",!0)])]),_:1},8,["visible"])])])])}const _e=B(M,[["render",fe],["__scopeId","data-v-f1e6334e"]]),ve={__name:"Indicatorcompanydirection",setup(t){return(e,y)=>(a(),c("main",null,[s(_e)]))}};export{ve as default};
