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
								:disabled="!selectedPlanifications || !selectedPlanifications.length" />
						</div>
					</template>
					<!-- 
					<template v-slot:end>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template> -->
				</Toolbar>

				<DataTable ref="dt" :value="planifications" v-model:selection="selectedPlanifications" dataKey="id"
					:paginator="true" :rows="10" :filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					:rowsPerPageOptions="[5,10,25]"
					currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} tipos de indicadores"
					responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Planificación anual</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
								<i class="pi pi-search" />
								<InputText v-model="filters['global'].value" placeholder="Buscar..." />
							</span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

					<Column field="name" header="Indicador" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Indicador</span>
							{{slotProps.data.indicator.name}}
						</template>
					</Column>

					<Column field="name" header="Empresa" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Empresa</span>
							{{slotProps.data.company.name}}
						</template>
					</Column>

					<Column field="name" header="Dirección" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Dirección</span>
							{{slotProps.data.direction.name}}
						</template>
					</Column>

					<Column field="name" header="Fecha entrada" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Año</span>
							{{slotProps.data.date}}
						</template>
					</Column>

					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
								@click="editPlanification(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
								@click="confirmDeletePlanification(slotProps.data)" />
						</template>
					</Column>
					
				</DataTable>

				<Dialog v-model:visible="planificationDialog" :style="{width: '450px'}" header="Planificacación anual"	:modal="true" class="p-fluid">
				
					<div class="field">
						<label for="companyId" class="mb-3">Empresa</label>
						<AutoComplete placeholder="Buscar Compañia" id="companyId" :dropdown="true"  v-model="company" :suggestions="autoFilteredCompanies" @complete="searchCompanies($event)" :force-selection="true" field="name"/>
						
					</div>
					<div class="field">
						<label for="indicatorId" class="mb-3">Tipo de indicador</label>
						<AutoComplete placeholder="Buscar indicador" id="indicatorId" :dropdown="true"  v-model="indicator" :suggestions="autoFilteredIndicators" @complete="searchIndicator($event)" :force-selection="true" field="name"/>
					</div>
					<div class="formgrid grid">
						<div class="field col">
							<label for="name2">Enero</label>
							<InputText id="name2" type="number" v-model="planification.january"/>
						</div>
						<div class="field col">
							<label for="email2">Febrero</label>
							<InputText id="email2" type="number" v-model="planification.february" />
						</div>
					</div>
					
					<div class="formgrid grid">
						<div class="field col">
							<label for="name2">Marzo</label>
							<InputText id="name2" type="number" v-model="planification.march" />
						</div>
						<div class="field col">
							<label for="email2">Abril</label>
							<InputText id="email2" type="number" v-model="planification.april"/>
						</div>
					</div>

					<div class="formgrid grid">
						<div class="field col">
							<label for="name2">Mayo</label>
							<InputText id="name2" type="number" v-model="planification.may"/> 
						</div>
						<div class="field col">
							<label for="email2">Junio</label>
							<InputText id="email2" type="number" v-model="planification.june"/>
						</div>
					</div>
					<div class="formgrid grid">
						<div class="field col">
							<label for="name2">Julio</label>
							<InputText id="name2" type="number" v-model="planification.july"/> 
						</div>
						<div class="field col">
							<label for="email2">Agosto</label>
							<InputText id="email2" type="number" v-model="planification.august"/>
						</div>
					</div>
					<div class="formgrid grid">
						<div class="field col">
							<label for="name2">Septiembre</label>
							<InputText id="name2" type="number" v-model="planification.september"/>
						</div>
						<div class="field col">
							<label for="email2">Octubre</label>
							<InputText id="email2" type="number" v-model="planification.october"/>
						</div>
					</div>
					<div class="formgrid grid">
						<div class="field col">
							<label for="name2">Noviembre</label>
							<InputText id="name2" type="number" v-model="planification.november"/> 
						</div>
						<div class="field col">
							<label for="email2">Diciembre</label>
							<InputText id="email2" type="number" v-model="planification.december"/>
						</div>
					</div>
					
					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="savePlanification" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deletePlanificationDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="planification">¿Seguro que desea eliminar <b>{{planification.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deletePlanificationDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deletePlanification" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deletePlanificationsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="planification">¿Seguro que desea eliminar las planificaciones seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"	@click="deletePlanificationsDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedPlanification" />
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
import { BASE_URL } from '@/services/http-adaptator.js';
const API_URL = BASE_URL + "planification/";
const COMPANY = BASE_URL + "company/direction/";
const INDICATOR = BASE_URL + "indicator/direction/";

export default {
	data() {
		return {
			planifications: null,
			planificationDialog: false,
			deletePlanificationDialog: false,
			deletePlanificationsDialog: false,
			planification: {},
			company: {name: ""},
			indicator: {name: ""},
			selectedPlanifications: null,
			filters: {},
			submitted: false,
			companies: [],	
			indicators: [],	
			autoFilteredIndicators: [],		
			autoFilteredCompanies: []		
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
			this.planification = {};
			this.submitted = false;
			this.planificationDialog = true;
		},
		hideDialog() {
			this.planificationDialog = false;
			this.submitted = false;
		},
		async savePlanification() {
			const datee = new Date();
			this.planification.date = datee;
			this.submitted = true;
			
				if (this.planification.id) {

					this.planifications[this.findIndexById(this.planification.id)] = this.planification;
					this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Planificación modificada con éxito', life: 3000 });
				}
				else {

					try {
						await axios.post(API_URL, {
							...this.planification,
							company: this.company.id,
							indicator: this.indicator.id,
							direction: useAuthStore().user.user.direction.id,
						});
						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Planificación insertada con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);

					} finally {
						this.planificationDialog = false;
						this.planification = {};
					}
				}
			
		},
		editPlanification(planification) {
			this.planification = { ...planification };
			this.planificationDialog = true;
		},
		confirmDeletePlanification(planification) {
			console.log("pase por ConfirmDeletePlanification");
			this.planification = planification;	
			this.deletePlanificationDialog = true;
		},
		async deletePlanification() {
			console.log("pase por deletePlanification");	
			console.log(this.planification.id)	;	
      		const response = await axios.delete(API_URL+ this.planification.id);
			console.log(response);
			this.deletePlanificationDialog = false;
			this.planification = {}; 
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Planificación eliminada', life: 3000 });
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.planifications.length; i++) {
				if (this.planifications[i].id === id) {
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
			this.deletePlanificationsDialog = true;
		},
		async deleteSelectedPlanifications() {
			console.log("pase por ConfirmDeletePlanificatios");
			await axios.delete(API_URL, this.planifications);
			this.deletePlanificationsDialog = false;
			this.selectedPlanifications = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Planifications Deleted', life: 3000 });
		},
		initFilters() {
			this.filters = {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			}
		},
		loadData() {
			axios.get(API_URL).then(
			(data) => {
				this.planifications = data.data;
			}
			);
			axios.get(`${COMPANY}${useAuthStore().user.user.direction.id}`).then(
			(data) => {
				this.companies = data.data;					    
			}
			);
			axios.get(`${INDICATOR}${useAuthStore().user.user.direction.id}`).then(
			(data) => {
				this.indicators = data.data;					    
			}
			);
		},
		searchIndicator(event) {
			setTimeout(() => {
				if (!event.query.trim().length) {
					this.autoFilteredIndicators = [...this.indicators];
				}
				else {
					this.autoFilteredIndicators = this.indicators.filter((indicator) => {
						return indicator.name.toLowerCase().startsWith(event.query.toLowerCase());
					});
				}
			}, 250);
		},
		searchCompanies(event) {
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
		}
	}
}
</script>

<style scoped lang="scss">
@import '../src/assets/demo/badges.scss';
</style>
