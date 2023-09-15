import{_ as N,a as d,F as U,r as u,o as g,c as b,b as l,d as o,w as n,e as p,t as v,n as I,f as C,B as x,p as T,g as P}from"./index.d10435ed.js";const h=x+"direction/",R=x+"company/",B=x+"indicator/",E={data(){return{directions:null,directionDialog:!1,deleteDirectionDialog:!1,deleteDirectionsDialog:!1,direction:{},selectedDirections:null,filters:{},submitted:!1,compayDialog:!1,indicatorDialog:!1,companies:{},indicators:{},indicatorDialog:!1,indicator:{},pickcompanies:null,pickindicators:null,traza:{}}},created(){this.initFilters()},async mounted(){this.loadData()},methods:{formatCurrency(i){if(i)return i.toLocaleString("en-US",{style:"currency",currency:"USD"})},openNew(){this.direction={},this.submitted=!1,this.directionDialog=!0},hideDialog(){this.directionDialog=!1,this.submitted=!1},hidecompanyDialog(){this.compayDialog=!1},hideindicatorDialog(){this.indicatorDialog=!1},async saveDirection(){if(this.submitted=!0,this.direction.name.trim())if(this.direction.id){const{id:i,...t}=this.direction;try{await d.patch(h+this.direction.id,t),this.$toast.add({severity:"success",summary:"Successful",detail:"Direcci\xF3n actualizada con \xE9xito",life:3e3}),this.loadData()}catch(r){this.$toast.add({severity:"error",summary:"Error",detail:r,life:3e3}),console.log(r)}finally{this.directionDialog=!1,this.direction={}}}else try{await d.post(h,this.direction),this.$toast.add({severity:"success",summary:"Successful",detail:"Direcci\xF3n insertada con \xE9xito",life:3e3}),this.loadData()}catch(i){this.$toast.add({severity:"error",summary:"Error",detail:i,life:3e3}),console.log(i)}finally{this.directionDialog=!1,this.direction={}}},saveRelations(){this.direction.companies=this.pickcompanies[0],this.saveDirection(),this.hidecompanyDialog()},saveRelations2(){this.direction.indicators=this.pickindicators[0],this.saveDirection(),this.hideindicatorDialog()},editDirection(i){this.direction={...i},this.directionDialog=!0},confirmDeleteDirection(i){this.direction=i,this.deleteDirectionDialog=!0},async deleteDirection(){await d.delete(h+this.direction.id),this.deleteDirectionDialog=!1,this.loadData(),this.direction={},this.$toast.add({severity:"success",summary:"Operaci\xF3n exitosa",detail:"Direcci\xF3n eliminada",life:3e3})},findIndexById(i){let t=-1;for(let r=0;r<this.directions.length;r++)if(this.directions[r].id===i){t=r;break}return t},exportCSV(){this.$refs.dt.exportCSV()},confirmDeleteSelected(){this.deleteDirectionsDialog=!0},async deleteSelectedDirections(){await d.delete(h,this.directions),this.deleteDirectionsDialog=!1,this.selectedDirections=null,this.$toast.add({severity:"success",summary:"Successful",detail:"Directions Deleted",life:3e3})},initFilters(){this.filters={global:{value:null,matchMode:U.CONTAINS}}},loadData(){d.get(h).then(i=>{this.directions=i.data}),d.get(R).then(i=>{this.companies=i.data}),d.get(B).then(i=>{this.indicators=i.data})},async createList(i){const r=(await d.get(h+i)).data.companies,_=this.companies.filter(e=>r.filter(D=>D.id===e.id).length===0);return[r,_]},async createList2(i){const r=(await d.get(h+i)).data.indicators,_=this.indicators.filter(e=>r.filter(D=>D.id===e.id).length===0);return[r,_]},async showDialogCompany(i){this.pickcompanies=await this.createList(i.id),this.direction=i,this.compayDialog=!0},async showDialogIndicator(i){this.pickindicators=await this.createList2(i.id),this.direction=i,this.indicatorDialog=!0}}},m=i=>(T("data-v-1d09b2fb"),i=i(),P(),i),M={class:"grid"},A={class:"col-12"},z={class:"card"},F={class:"my-2"},O={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},q=m(()=>l("h5",{class:"m-0"},"Listado de direcciones",-1)),j={class:"block mt-2 md:mt-0 p-input-icon-left"},G=m(()=>l("i",{class:"pi pi-search"},null,-1)),K=m(()=>l("span",{class:"p-column-title"},"Nombre",-1)),Y={class:"field"},H=m(()=>l("label",{for:"name"},"Nombre",-1)),J={key:0,class:"p-invalid"},Q={class:"flex align-items-center justify-content-center"},W=m(()=>l("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),X={key:0},Z={class:"flex align-items-center justify-content-center"},$=m(()=>l("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),ee={key:0},ie=m(()=>l("br",null,null,-1)),te={class:"p-caritem"},se={class:"p-caritem-vin"},oe=m(()=>l("br",null,null,-1)),le={class:"p-caritem"},ne={class:"p-caritem-vin"};function ae(i,t,r,_,e,a){const D=u("Toast"),c=u("Button"),L=u("Toolbar"),w=u("InputText"),y=u("Column"),V=u("DataTable"),f=u("Dialog"),S=u("PickList");return g(),b("div",M,[l("div",A,[l("div",z,[o(D),o(L,{class:"mb-4"},{start:n(()=>[l("div",F,[o(c,{label:"A\xF1adir",icon:"pi pi-plus",class:"p-button-success mr-2",onClick:a.openNew},null,8,["onClick"]),o(c,{label:"Eliminar",icon:"pi pi-trash",class:"p-button-danger",onClick:a.confirmDeleteSelected,disabled:!e.selectedDirections||!e.selectedDirections.length},null,8,["onClick","disabled"])])]),_:1}),o(V,{ref:"dt",value:e.directions,selection:e.selectedDirections,"onUpdate:selection":t[1]||(t[1]=s=>e.selectedDirections=s),dataKey:"id",paginator:!0,rows:10,filters:e.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:"Mostrando {first} hasta {last} de {totalRecords} direcciones",responsiveLayout:"scroll"},{header:n(()=>[l("div",O,[q,l("span",j,[G,o(w,{modelValue:e.filters.global.value,"onUpdate:modelValue":t[0]||(t[0]=s=>e.filters.global.value=s),placeholder:"Buscar..."},null,8,["modelValue"])])])]),default:n(()=>[o(y,{selectionMode:"multiple",headerStyle:"width: 3rem"}),o(y,{field:"name",header:"Nombre",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:n(s=>[K,p(" "+v(s.data.name),1)]),_:1}),o(y,{headerStyle:"min-width:10rem;"},{body:n(s=>[o(c,{icon:"pi pi-pencil",class:"p-button-rounded p-button-success mr-2",onClick:k=>a.editDirection(s.data)},null,8,["onClick"]),o(c,{icon:"pi pi-trash",class:"p-button-rounded p-button-warning mt-2",onClick:k=>a.confirmDeleteDirection(s.data)},null,8,["onClick"]),o(c,{onClick:k=>a.showDialogCompany(s.data),label:"Empresas",class:"margin2 p-button-raised p-button-rounded"},null,8,["onClick"]),o(c,{onClick:k=>a.showDialogIndicator(s.data),label:"Indicadores",class:"margin2 p-button-raised p-button-rounded"},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters"]),o(f,{visible:e.directionDialog,"onUpdate:visible":t[3]||(t[3]=s=>e.directionDialog=s),style:{width:"450px"},header:"Detalles direcci\xF3n",modal:!0,class:"p-fluid"},{footer:n(()=>[o(c,{label:"Cancelar",icon:"pi pi-times",class:"p-button-text",onClick:a.hideDialog},null,8,["onClick"]),o(c,{label:"Guardar",icon:"pi pi-check",class:"p-button-text",onClick:a.saveDirection},null,8,["onClick"])]),default:n(()=>[l("div",Y,[H,o(w,{id:"name",modelValue:e.direction.name,"onUpdate:modelValue":t[2]||(t[2]=s=>e.direction.name=s),modelModifiers:{trim:!0},required:"true",autofocus:"",class:I({"p-invalid":e.submitted&&!e.direction.name})},null,8,["modelValue","class"]),e.submitted&&!e.direction.name?(g(),b("small",J,"Nombre es requerido.")):C("",!0)])]),_:1},8,["visible"]),o(f,{visible:e.deleteDirectionDialog,"onUpdate:visible":t[5]||(t[5]=s=>e.deleteDirectionDialog=s),style:{width:"450px"},header:"Confirmar",modal:!0},{footer:n(()=>[o(c,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:t[4]||(t[4]=s=>e.deleteDirectionDialog=!1)}),o(c,{label:"Si",icon:"pi pi-check",class:"p-button-text",onClick:a.deleteDirection},null,8,["onClick"])]),default:n(()=>[l("div",Q,[W,e.direction?(g(),b("span",X,[p("\xBFSeguro que desea eliminar "),l("b",null,v(e.direction.name),1),p("?")])):C("",!0)])]),_:1},8,["visible"]),o(f,{visible:e.deleteDirectionsDialog,"onUpdate:visible":t[7]||(t[7]=s=>e.deleteDirectionsDialog=s),style:{width:"450px"},header:"Confirm",modal:!0},{footer:n(()=>[o(c,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:t[6]||(t[6]=s=>e.deleteDirectionsDialog=!1)}),o(c,{label:"Si",icon:"pi pi-check",class:"p-button-text",onClick:a.deleteSelectedDirections},null,8,["onClick"])]),default:n(()=>[l("div",Z,[$,e.direction?(g(),b("span",ee,"\xBFSeguro que desea eliminar las direcciones seleccionadas?")):C("",!0)])]),_:1},8,["visible"]),o(f,{visible:e.compayDialog,"onUpdate:visible":t[9]||(t[9]=s=>e.compayDialog=s),style:{width:"650px"},header:"Empresas",modal:!0,class:"p-fluid"},{default:n(()=>[ie,l("div",null,[o(S,{modelValue:e.pickcompanies,"onUpdate:modelValue":t[8]||(t[8]=s=>e.pickcompanies=s),dataKey:"name"},{sourceheader:n(()=>[p(" Seleccionadas ")]),targetheader:n(()=>[p(" Total ")]),item:n(s=>[l("div",te,[l("div",null,[l("span",se,v(s.item.name),1)])])]),_:1},8,["modelValue"]),l("div",null,[o(c,{label:"Cancelar",icon:"pi pi-times",class:"p-button-text",onClick:a.hidecompanyDialog},null,8,["onClick"]),o(c,{label:"Guardar",icon:"pi pi-check",class:"p-button-text",onClick:a.saveRelations},null,8,["onClick"])])])]),_:1},8,["visible"]),o(f,{visible:e.indicatorDialog,"onUpdate:visible":t[11]||(t[11]=s=>e.indicatorDialog=s),style:{width:"650px"},header:"Empresas",modal:!0,class:"p-fluid"},{default:n(()=>[oe,l("div",null,[o(S,{modelValue:e.pickindicators,"onUpdate:modelValue":t[10]||(t[10]=s=>e.pickindicators=s),dataKey:"name"},{sourceheader:n(()=>[p(" Seleccionados ")]),targetheader:n(()=>[p(" Total ")]),item:n(s=>[l("div",le,[l("div",null,[l("span",ne,v(s.item.name),1)])])]),_:1},8,["modelValue"]),l("div",null,[o(c,{label:"Cancelar",icon:"pi pi-times",class:"p-button-text",onClick:a.hideindicatorDialog},null,8,["onClick"]),o(c,{label:"Guardar",icon:"pi pi-check",class:"p-button-text",onClick:a.saveRelations2},null,8,["onClick"])])])]),_:1},8,["visible"])])])])}const ce=N(E,[["render",ae],["__scopeId","data-v-1d09b2fb"]]),de={__name:"Directions",setup(i){return(t,r)=>(g(),b("main",null,[o(ce)]))}};export{de as default};