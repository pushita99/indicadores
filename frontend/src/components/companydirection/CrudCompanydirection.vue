<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast />
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Añadir" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger"
								@click="confirmDeleteSelected"
								:disabled="!selectedCompanydirections || !selectedCompanydirections.length" />
						</div>
					</template>
					
				</Toolbar>

				<DataTable ref="dt" :value="companydirections" v-model:selection="selectedCompanydirections" dataKey="id"
					:paginator="true" :rows="10" :filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					:rowsPerPageOptions="[5,10,25]"
					currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} empresas"
					responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Empresa dirección</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
								<i class="pi pi-search" />
								<InputText v-model="filters['global'].value" placeholder="Buscar..." />
							</span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

					<Column field="name" header="Empresa" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Nombre</span>
							{{slotProps.data.company.name}}
						</template>
					</Column>
					<Column field="name" header="Dirección" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Nombre</span>
							{{slotProps.data.direction.name}}
						</template>
					</Column>
					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
								@click="editCompanydirection(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
								@click="confirmDeleteCompanydirection(slotProps.data)" />
						</template>
					</Column>
					
				</DataTable>

				<Dialog v-model:visible="companydirectionDialog" :style="{width: '450px'}" header="Empresa dirección"	:modal="true" class="p-fluid">
				
					<div class="field">
						<label for="directionId" class="mb-3">Dirección</label>
						<AutoComplete placeholder="Buscar dirección" id="directionId" :dropdown="true"  v-model="direction" :suggestions="autoFilteredDirections" @complete="searchDirections($event)" :force-selection="true" field="name"/>
						
					</div>
					<div class="field">
						<label for="companyId" class="mb-3">Empresa</label>
						<AutoComplete placeholder="Buscar empresa" id="companyId" :dropdown="true"  v-model="company" :suggestions="autoFilteredCompanies" @complete="searchCompany($event)" :force-selection="true" field="name"/>
					</div>				
					
					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveCompanydirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteCompanydirectionDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="companydirection">¿Seguro que desea eliminar este elemento?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteCompanydirectionDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteCompanydirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteCompanydirectionsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="companydirection">¿Seguro que desea eliminar las filas seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"	@click="deleteCompanydirectionsDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedCompanydirection" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios';
import { useAuthStore } from '../../store/auth.store';

export default {
	data() {
		return {
			companydirections: null,
			companydirectionDialog: false,
			deleteCompanydirectionDialog: false,
			deleteCompanydirectionsDialog: false,
			companydirection: {},
			direction: {name: ""},
			company: {name: ""},
			selectedCompanydirections: null,
			filters: {},
			submitted: false,
			directions: [],	
			companies: [],	
			autoFilteredCompanies: [],		
			autoFilteredDirections: []		
		}
	},

	created() {
		
		this.initFilters();
	},
	async mounted() {
		await this.loadData();	
		
	},
	methods: {

		formatCurrency(value) {
			if (value)
				return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
			return;
		},
		openNew() {
			this.companydirection = {};
			this.submitted = false;
			this.companydirectionDialog = true;
		},
		hideDialog() {
			this.companydirectionDialog = false;
			this.submitted = false;
		},
		async saveCompanydirection() {
			this.submitted = true;
			
				if (this.companydirection.id) {

					this.companydirections[this.findIndexById(this.companydirection.id)] = this.companydirection;
					this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Empresa-dirección modificado con éxito', life: 3000 });
				}
				else {

					try {
						await axios.put('http://localhost:3000/company', {
							...this.company,
							direction: this.direction.id,
							company: this.company.id,
						});
						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Empresa-dirección insertada con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);

					} finally {
						this.companydirectionDialog = false;
						this.companydirection = {};
					}
				}
			
		},
		editCompanydirection(companydirection) {
			this.companydirection = { ...companydirection };
			this.companydirectionDialog = true;
		},
		confirmDeleteCompanydirection(companydirection) {
			console.log("pase por ConfirmDeleteCompanydirection");
			this.companydirection = companydirection;	
			this.deleteCompanydirectionDialog = true;
		},
		async deleteCompanydirection() {
			console.log("pase por deleteCompanydirection");	
			console.log(this.companydirection.id)	;	
      		const response = await axios.delete('http://localhost:3000/companydirection/'+ this.companydirection.id);
			console.log(response);
			this.deleteCompanydirectionDialog = false;
			this.companydirection = {}; 
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Empresa-dirección eliminada', life: 3000 });
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.companydirections.length; i++) {
				if (this.companydirections[i].id === id) {
					index = i;
					break;
				}
			}
			return index;
		},

		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			console.log("pase por confirmDeleteSelected");
			this.deleteCompanydirectionsDialog = true;
		},
		async deleteSelectedCompanydirections() {
			console.log("pase por ConfirmDeleteCompanydirections");
			await axios.delete('http://localhost:3000/companydirection/', this.companydirections);
			this.deleteCompanydirectionsDialog = false;
			this.selectedCompanydirections = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Companies directions Deleted', life: 3000 });
		},
		initFilters() {
			this.filters = {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			}
		},
		loadData() {
			axios.get('http://localhost:3000/direction').then(
			(data) => {
				this.directions = data.data;
			}
			);	
			axios.get('http://localhost:3000/company').then(
			(data) => {
				this.companies = data.data;					    
			}
			);
		},
		searchCompany(event) {
			setTimeout(() => {
				if (!event.query.trim().length) {
					this.autoFilteredCompanies = [...this.companies];
				}
				else {
					this.autoFilteredCompanies = this.companies.filter((company) => {
						return company.name.toLowerCase().startsWith(event.query.toLowerCase());
					});
				}
			}, 250);
		},
		searchDirections(event) {
			setTimeout(() => {
				if (!event.query.trim().length) {
					this.autoFilteredDirections = [...this.directions];
				}
				else {
					this.autoFilteredDirections = this.directions.filter((direction) => {
						return direction.name.toLowerCase().startsWith(event.query.toLowerCase());
					});
				}
			}, 250);
		}
	}
}
</script>

<style scoped lang="scss">
@import '../src/assets/demo/badges.scss';
</style>
