import{_ as w,a as p,F as N,r as m,o as y,c as h,b as a,d as s,w as l,e as C,t as D,n as P,f as g,B as T,p as V,g as L}from"./index.d10435ed.js";const u=T+"company/",I={data(){return{companies:null,companyDialog:!1,deleteCompanyDialog:!1,deleteCompaniesDialog:!1,company:{},selectedCompanies:null,filters:{},submitted:!1}},created(){this.initFilters()},async mounted(){this.loadData()},methods:{formatCurrency(i){if(i)return i.toLocaleString("en-US",{style:"currency",currency:"USD"})},openNew(){this.company={},this.submitted=!1,this.companyDialog=!0},hideDialog(){this.companyDialog=!1,this.submitted=!1},async saveCompany(){if(this.submitted=!0,this.company.name.trim())if(this.company.id){const{id:i,...t}=this.company;try{await p.patch(u+this.company.id,t),this.$toast.add({severity:"success",summary:"Successful",detail:"Empresa modificada con \xE9xito",life:3e3}),this.companyDialog=!1,this.loadData()}catch(c){this.$toast.add({severity:"error",summary:"Error",detail:c,life:3e3}),console.log(c)}finally{this.companyDialog=!1,this.company={}}}else try{await p.post(u,this.company),this.$toast.add({severity:"success",summary:"Successful",detail:"Empresa insertada con \xE9xito",life:3e3}),this.loadData(),this.companyDialog=!1}catch(i){this.$toast.add({severity:"error",summary:"Error",detail:i,life:3e3}),console.log(i)}finally{this.companyDialog=!1,this.company={},this.companyDialog=!1}},editCompany(i){this.company={...i},this.companyDialog=!0},confirmDeleteCompany(i){this.company=i,this.deleteCompanyDialog=!0,this.loadData()},async deleteCompany(){await p.delete(u+this.company.id),this.deleteCompanyDialog=!1,this.company={},this.$toast.add({severity:"success",summary:"Operaci\xF3n exitosa",detail:"Empresa eliminada",life:3e3}),this.loadData()},findIndexById(i){let t=-1;for(let c=0;c<this.companies.length;c++)if(this.companies[c].id===i){t=c;break}return t},exportCSV(){this.$refs.dt.exportCSV()},confirmDeleteSelected(){this.deleteCompaniesDialog=!0},async deleteSelectedCompanies(){await p.delete(u,this.companies),this.deleteCompaniesDialog=!1,this.selectedCompanies=null,this.$toast.add({severity:"success",summary:"Successful",detail:"Companies Deleted",life:3e3}),this.loadData()},initFilters(){this.filters={global:{value:null,matchMode:N.CONTAINS}}},loadData(){p.get(u).then(i=>{this.companies=i.data})}}},d=i=>(V("data-v-71793876"),i=i(),L(),i),U={class:"grid"},B={class:"col-12"},E={class:"card"},M={class:"my-2"},R={class:"flex flex-column md:flex-row md:justify-content-between md:align-items-center"},F=d(()=>a("h5",{class:"m-0"},"Listado de empresas",-1)),q={class:"block mt-2 md:mt-0 p-input-icon-left"},A=d(()=>a("i",{class:"pi pi-search"},null,-1)),j=d(()=>a("span",{class:"p-column-title"},"Nombre",-1)),z={class:"field"},O=d(()=>a("label",{for:"name"},"Nombre",-1)),G={key:0,class:"p-invalid"},K={class:"flex align-items-center justify-content-center"},H=d(()=>a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),J={key:0},Q={class:"flex align-items-center justify-content-center"},W=d(()=>a("i",{class:"pi pi-exclamation-triangle mr-3",style:{"font-size":"2rem"}},null,-1)),X={key:0};function Y(i,t,c,$,e,r){const v=m("Toast"),n=m("Button"),x=m("Toolbar"),b=m("InputText"),f=m("Column"),k=m("DataTable"),_=m("Dialog");return y(),h("div",U,[a("div",B,[a("div",E,[s(v),s(x,{class:"mb-4"},{start:l(()=>[a("div",M,[s(n,{label:"A\xF1adir",icon:"pi pi-plus",class:"p-button-success mr-2",onClick:r.openNew},null,8,["onClick"]),s(n,{label:"Eliminar",icon:"pi pi-trash",class:"p-button-danger",onClick:r.confirmDeleteSelected,disabled:!e.selectedCompanies||!e.selectedCompanies.length},null,8,["onClick","disabled"])])]),_:1}),s(k,{ref:"dt",value:e.companies,selection:e.selectedCompanies,"onUpdate:selection":t[1]||(t[1]=o=>e.selectedCompanies=o),dataKey:"id",paginator:!0,rows:10,filters:e.filters,paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25],currentPageReportTemplate:"Mostrando {first} hasta {last} de {totalRecords} empresas",responsiveLayout:"scroll"},{header:l(()=>[a("div",R,[F,a("span",q,[A,s(b,{modelValue:e.filters.global.value,"onUpdate:modelValue":t[0]||(t[0]=o=>e.filters.global.value=o),placeholder:"Buscar..."},null,8,["modelValue"])])])]),default:l(()=>[s(f,{selectionMode:"multiple",headerStyle:"width: 3rem"}),s(f,{field:"name",header:"Nombre",sortable:!0,headerStyle:"width:14%; min-width:10rem;"},{body:l(o=>[j,C(" "+D(o.data.name),1)]),_:1}),s(f,{headerStyle:"min-width:10rem;"},{body:l(o=>[s(n,{icon:"pi pi-pencil",class:"p-button-rounded p-button-success mr-2",onClick:S=>r.editCompany(o.data)},null,8,["onClick"]),s(n,{icon:"pi pi-trash",class:"p-button-rounded p-button-warning mt-2",onClick:S=>r.confirmDeleteCompany(o.data)},null,8,["onClick"])]),_:1})]),_:1},8,["value","selection","filters"]),s(_,{visible:e.companyDialog,"onUpdate:visible":t[3]||(t[3]=o=>e.companyDialog=o),style:{width:"450px"},header:"Detalles Empresa",modal:!0,class:"p-fluid"},{footer:l(()=>[s(n,{label:"Cancelar",icon:"pi pi-times",class:"p-button-text",onClick:r.hideDialog},null,8,["onClick"]),s(n,{label:"Guardar",icon:"pi pi-check",class:"p-button-text",onClick:r.saveCompany},null,8,["onClick"])]),default:l(()=>[a("div",z,[O,s(b,{id:"name",modelValue:e.company.name,"onUpdate:modelValue":t[2]||(t[2]=o=>e.company.name=o),modelModifiers:{trim:!0},required:"true",autofocus:"",class:P({"p-invalid":e.submitted&&!e.company.name})},null,8,["modelValue","class"]),e.submitted&&!e.company.name?(y(),h("small",G,"Nombre es requerido.")):g("",!0)])]),_:1},8,["visible"]),s(_,{visible:e.deleteCompanyDialog,"onUpdate:visible":t[5]||(t[5]=o=>e.deleteCompanyDialog=o),style:{width:"450px"},header:"Confirmar",modal:!0},{footer:l(()=>[s(n,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:t[4]||(t[4]=o=>e.deleteCompanyDialog=!1)}),s(n,{label:"Si",icon:"pi pi-check",class:"p-button-text",onClick:r.deleteCompany},null,8,["onClick"])]),default:l(()=>[a("div",K,[H,e.company?(y(),h("span",J,[C("\xBFSeguro que desea eliminar "),a("b",null,D(e.company.name),1),C("?")])):g("",!0)])]),_:1},8,["visible"]),s(_,{visible:e.deleteCompaniesDialog,"onUpdate:visible":t[7]||(t[7]=o=>e.deleteCompaniesDialog=o),style:{width:"450px"},header:"Confirm",modal:!0},{footer:l(()=>[s(n,{label:"No",icon:"pi pi-times",class:"p-button-text",onClick:t[6]||(t[6]=o=>e.deleteCompaniesDialog=!1)}),s(n,{label:"Si",icon:"pi pi-check",class:"p-button-text",onClick:r.deleteSelectedCompanies},null,8,["onClick"])]),default:l(()=>[a("div",Q,[W,e.company?(y(),h("span",X,"\xBFSeguro que desea eliminar las empresas seleccionadas?")):g("",!0)])]),_:1},8,["visible"])])])])}const Z=w(I,[["render",Y],["__scopeId","data-v-71793876"]]),te={__name:"Companies",setup(i){return(t,c)=>(y(),h("main",null,[s(Z)]))}};export{te as default};
