import{_ as w,a as m,F as S,r as l,o as h,c as f,b as s,d as n,w as r,e as I,t as b,f as y,p as T,g as V}from"./index.d10435ed.js";const F={data(){return{indicatordirections:null,indicatordirectionDialog:!1,deleteIndicatordirectionDialog:!1,deleteIndicatordirectionsDialog:!1,indicatordirection:{},direction:{name:""},indicator:{name:""},selectedIndicatordirections:null,filters:{},submitted:!1,directions:[],indicators:[],autoFilteredIndicators:[],autoFilteredDirections:[]}},created(){this.initFilters()},async mounted(){await this.loadData()},methods:{formatCurrency(e){if(e)return e.toLocaleString("en-US",{style:"currency",currency:"USD"})},openNew(){this.indicatordirection={},this.submitted=!1,this.indicatordirectionDialog=!0},hideDialog(){this.indicatordirectionDialog=!1,this.submitted=!1},async saveIndicatordirection(){if(this.submitted=!0,this.indicatordirection.id)this.indicatordirections[this.findIndexById(this.indicatordirection.id)]=this.indicatordirection,this.$toast.add({severity:"success",summary:"Successful",detail:"Indicador-direcci\xF3n modificado con \xE9xito",life:3e3});else try{await m.put("http://localhost:3000/indicator",{...this.indicator,direction:this.direction.id,indicator:this.indicator.id}),this.$toast.add({severity:"success",summary:"Successful",detail:"Indicador-direcci\xF3n insertada con \xE9xito",life:3e3}),this.loadData()}catch(e){this.$toast.add({severity:"error",summary:"Error",detail:e,life:3e3}),console.log(e)}finally{this.indicatordirectionDialog=!1,this.indicatordirection={}}},editIndicatordirection(e){this.indicatordirection={...e},this.indicatordirectionDialog=!0},confirmDeleteIndicatordirection(e){console.log("pase por ConfirmDeleteIndicatordirection"),this.indicatordirection=e,this.deleteIndicatordirectionDialog=!0},async deleteIndicatordirection(){console.log("pase por deleteIndicatordirection"),console.log(this.indicatordirection.id);const e=await m.delete("http://localhost:3000/indicatordirection/"+this.indicatordirection.id);console.log(e),this.deleteIndicatordirectionDialog=!1,this.indicatordirection={},this.$toast.add({severity:"success",summary:"Operaci\xF3n exitosa",detail:"Indicador-direcci\xF3n eliminada",life:3e3})},findIndexById(e){let i=-1;for(let u=0;u<this.indicatordirections.length;u++)if(this.indicatordirections[u].id===e){i=u;break}return i},exportCSV(){this.$refs.dt.exportCSV()},confirmDeleteSelected(){console.log("pase por confirmDeleteSelected"),this.deleteIndicatordirectionsDialog=!0},async deleteSelectedIndicatordirections(){console.log("pase por ConfirmDeleteIndicatordirections"),await m.delete("http://localhost:3000/indicatordirection/",this.indicatordirections),this.deleteIndicatordirectionsDialog=!1,this.selectedIndicatordirections=null,this.$toast.add({severity:"success",summary:"Successful",detail:"Indicators directions Deleted",life:3e3})},initFilters(){this.filters={global:{value:null,matchMode:S.CONTAINS}}},loadData(){m.get("http://localhost:3000/direction").then(e=>{this.directions=e.data}),m.get("http://localhost:3000/indicator").then(e=>{this.indicators=e.data})},searchIndicator(e){setTimeout(()=>{e.query.trim().length?this.autoFilteredIndicators=this.indicators.filter(i=>i.name.toLowerCase().startsWith(e.query.toLowerCase())):this.autoFilteredIndicators=[...this.indicators]},250)},searchDirections(e){setTimeout(()=>{e.query.trim().length?this.autoFilteredDirections=this.directions.filter(i=>i.name.toLowerCase().startsWith(e.query.toLowerCase())):this.autoFilteredDirections=[...this.directions]},250)}}},a=e=>(T("data-v-44a2643a"),e=e(),V(),e),N={class:"grid"},L={class:"col-12"},P={class:"card"},B={class:"my-2"},U={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},q=a(()=>s("h5",{class:"m-0"},"Indicador direcci\xF3n",-1)),M={class:"block mt-2 md:mt-0 p-input-icon-left"},A=a(()=>s("i",{class:"pi pi-search"},null,-1)),R=a(()=>s("span",{class:"p-column-title"},"Nombre",-1)),j=a(()=>s("span",{class:"p-column-title"},"Nombre",-1)),E={class:"field"},O=a(()=>s("label",{for:"directionId",class:"mb-3"},"Direcci\xF3n",-1)),z={class:"field"},W=a(()=>s("label",{for:"indicatorId",class:"mb-3"},"Tipo de indicador",-1)),G={class:"flex align-items-center justify-content-center"},K=a(()=>s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),H={key:0},J={class:"flex align-items-center justify-content-center"},Q=a(()=>s("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),X={key:0};function Y(e,i,u,$,o,c){const D=l("Toast"),d=l("Button"),C=l("Toolbar"),v=l("InputText"),p=l("Column"),x=l("DataTable"),_=l("AutoComplete"),g=l("Dialog");return h(),f("div",N,[s("div",L,[s("div",P,[n(D),n(C,{class:"mb-4"},{start:r(()=>[s("div",B,[n(d,{label:"A\xF1adir",icon:"pi pi-plus",class:"p-button-success mr-2",onClick:c.openNew},null,8,["onClick"]),n(d,{label:"Eliminar",icon:"pi pi-trash",class:"p-button-danger",onClick:c.confirmDeleteSelected,disabled:!o.selectedIndicatordirections||!o.selectedIndicatordirections.length},null,8,["onClick","disabled"])])]),_:1}),n(x,{ref:"dt",value:o.indicatordirections,selection:o.selectedIndicatordirections,"onUpdate:selection":i[1]||(i[1]=t=>o.selectedIndicatordirections=t),dataKey:"id",paginator:!0,rows:10,filters:o.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:"Mostrando {first} hasta {last} de {totalRecords} tipos de indicadores",responsiveLayout:"scroll"},{header:r(()=>[s("div",U,[q,s("span",M,[A,n(v,{modelValue:o.filters.global.value,"onUpdate:modelValue":i[0]||(i[0]=t=>o.filters.global.value=t),placeholder:"Buscar..."},null,8,["modelValue"])])])]),default:r(()=>[n(p,{selectionMode:"multiple",headerStyle:"width: 3rem"}),n(p,{field:"name",header:"Indicador",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:r(t=>[R,I(" "+b(t.data.indicator.name),1)]),_:1}),n(p,{field:"name",header:"Direcci\xF3n",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:r(t=>[j,I(" "+b(t.data.direction.name),1)]),_:1}),n(p,{headerStyle:"min-width:10rem;"},{body:r(t=>[n(d,{icon:"pi pi-pencil",class:"p-button-rounded p-button-success mr-2",onClick:k=>c.editIndicatordirection(t.data)},null,8,["onClick"]),n(d,{icon:"pi pi-trash",class:"p-button-rounded p-button-warning mt-2",onClick:k=>c.confirmDeleteIndicatordirection(t.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters"]),n(g,{visible:o.indicatordirectionDialog,"onUpdate:visible":i[6]||(i[6]=t=>o.indicatordirectionDialog=t),style:{width:"450px"},header:"Indicador direcci\xF3n",modal:!0,class:"p-fluid"},{footer:r(()=>[n(d,{label:"Cancelar",icon:"pi pi-times",class:"p-button-text",onClick:c.hideDialog},null,8,["onClick"]),n(d,{label:"Guardar",icon:"pi pi-check",class:"p-button-text",onClick:c.saveIndicatordirection},null,8,["onClick"])]),default:r(()=>[s("div",E,[O,n(_,{placeholder:"Buscar direcci\xF3n",id:"directionId",dropdown:!0,modelValue:o.direction,"onUpdate:modelValue":i[2]||(i[2]=t=>o.direction=t),suggestions:o.autoFilteredDirections,onComplete:i[3]||(i[3]=t=>c.searchDirections(t)),"force-selection":!0,field:"name"},null,8,["modelValue","suggestions"])]),s("div",z,[W,n(_,{placeholder:"Buscar indicador",id:"indicatorId",dropdown:!0,modelValue:o.indicator,"onUpdate:modelValue":i[4]||(i[4]=t=>o.indicator=t),suggestions:o.autoFilteredIndicators,onComplete:i[5]||(i[5]=t=>c.searchIndicator(t)),"force-selection":!0,field:"name"},null,8,["modelValue","suggestions"])])]),_:1},8,["visible"]),n(g,{visible:o.deleteIndicatordirectionDialog,"onUpdate:visible":i[8]||(i[8]=t=>o.deleteIndicatordirectionDialog=t),style:{width:"450px"},header:"Confirmar",modal:!0},{footer:r(()=>[n(d,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:i[7]||(i[7]=t=>o.deleteIndicatordirectionDialog=!1)}),n(d,{label:"Si",icon:"pi pi-check",class:"p-button-text",onClick:c.deleteIndicatordirection},null,8,["onClick"])]),default:r(()=>[s("div",G,[K,o.indicatordirection?(h(),f("span",H,"\xBFSeguro que desea eliminar este elemento?")):y("",!0)])]),_:1},8,["visible"]),n(g,{visible:o.deleteIndicatordirectionsDialog,"onUpdate:visible":i[10]||(i[10]=t=>o.deleteIndicatordirectionsDialog=t),style:{width:"450px"},header:"Confirm",modal:!0},{footer:r(()=>[n(d,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:i[9]||(i[9]=t=>o.deleteIndicatordirectionsDialog=!1)}),n(d,{label:"Si",icon:"pi pi-check",class:"p-button-text",onClick:e.deleteSelectedIndicatordirection},null,8,["onClick"])]),default:r(()=>[s("div",J,[Q,o.indicatordirection?(h(),f("span",X,"\xBFSeguro que desea eliminar las filas seleccionadas?")):y("",!0)])]),_:1},8,["visible"])])])])}const Z=w(F,[["render",Y],["__scopeId","data-v-44a2643a"]]),ie={__name:"Indicatordirection",setup(e){return(i,u)=>(h(),f("main",null,[n(Z)]))}};export{ie as default};
