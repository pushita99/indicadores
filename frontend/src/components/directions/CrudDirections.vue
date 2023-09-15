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
								:disabled="!selectedDirections || !selectedDirections.length" />
						</div>
					</template>
					<!-- 
					<template v-slot:end>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template> -->
				</Toolbar>

				<DataTable ref="dt" :value="directions" v-model:selection="selectedDirections" dataKey="id"
					:paginator="true" :rows="10" :filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					:rowsPerPageOptions="[5, 10, 25]"
					currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} direcciones"
					responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Listado de direcciones</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
								<i class="pi pi-search" />
								<InputText v-model="filters['global'].value" placeholder="Buscar..." />
							</span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

					<Column field="name" header="Nombre" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Nombre</span>
							{{ slotProps.data.name }}
						</template>
					</Column>

					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
								@click="editDirection(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
								@click="confirmDeleteDirection(slotProps.data)" />
							<Button @click="showDialogCompany(slotProps.data)" label="Empresas"
								class="margin2 p-button-raised p-button-rounded" />
							<Button @click="showDialogIndicator(slotProps.data)" label="Indicadores"
								class="margin2 p-button-raised p-button-rounded" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="directionDialog" :style="{ width: '450px' }" header="Detalles dirección"
					:modal="true" class="p-fluid">

					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="direction.name" required="true" autofocus
							:class="{ 'p-invalid': submitted && !direction.name }" />
						<small class="p-invalid" v-if="submitted && !direction.name">Nombre es requerido.</small>
					</div>

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveDirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteDirectionDialog" :style="{ width: '450px' }" header="Confirmar"
					:modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="direction">¿Seguro que desea eliminar <b>{{ direction.name }}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteDirectionDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteDirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteDirectionsDialog" :style="{ width: '450px' }" header="Confirm"
					:modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="direction">¿Seguro que desea eliminar las direcciones seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteDirectionsDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedDirections" />
					</template>
				</Dialog>

				<Dialog v-model:visible="compayDialog" :style="{ width: '650px' }" header="Empresas" :modal="true"
					class="p-fluid">
					<br>
					<div>

						<PickList v-model="pickcompanies" dataKey="name">
							<template #sourceheader>
								Seleccionadas
							</template>
							<template #targetheader>
								Total
							</template>
							<template #item="slotProps">
								<div class="p-caritem">
									<div>
										<span class="p-caritem-vin">{{ slotProps.item.name }}</span>
									</div>
								</div>
							</template>
						</PickList>
						<div >
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hidecompanyDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveRelations" />
					    </div>
					</div>
					
				</Dialog>
				<Dialog v-model:visible="indicatorDialog" :style="{ width: '650px' }" header="Empresas" :modal="true"
					class="p-fluid">
					<br>
					<div>
						<PickList v-model="pickindicators" dataKey="name">
							<template #sourceheader>
								Seleccionados
							</template>
							<template #targetheader>
								Total
							</template>
							<template #item="slotProps">
								<div class="p-caritem">
									<div>
										<span class="p-caritem-vin">{{ slotProps.item.name }}</span>
									</div>
								</div>
							</template>
						</PickList>
						<div >
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideindicatorDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveRelations2" />
					    </div>
					</div>					
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios'
import { BASE_URL } from '@/services/http-adaptator.js'
const API_URL = BASE_URL + "direction/";
const COMPANY_URL = BASE_URL + "company/";
const INDICATOR_URL = BASE_URL + "indicator/";

export default {
	data() {
		return {
			directions: null,
			directionDialog: false,
			deleteDirectionDialog: false,
			deleteDirectionsDialog: false,
			direction: {},
			selectedDirections: null,
			filters: {},
			submitted: false,
			compayDialog: false,
			indicatorDialog: false,
			companies: {},
			indicators: {},
			indicatorDialog: false,
			indicator: {},
			pickcompanies: null,
			pickindicators: null,
			traza: {},
		}
	},
	// directionService: null,
	created() {
		// 	this.directionService = new DirectionService();
		this.initFilters();
	},
	async mounted() {
		this.loadData();
	},
	methods: {

		formatCurrency(value) {
			if (value)
				return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
			return;
		},
		openNew() {
			this.direction = {};
			this.submitted = false;
			this.directionDialog = true;
		},
		hideDialog() {
			this.directionDialog = false;
			this.submitted = false;
	
		},
		hidecompanyDialog() {
			this.compayDialog = false;

		},
		hideindicatorDialog() {
			this.indicatorDialog = false;

		},
		async saveDirection() {
			this.submitted = true;
			if (this.direction.name.trim()) {
				if (this.direction.id) {
                      const {id, ...data} = this.direction;
					try {
						await axios.patch(API_URL + this.direction.id, data);
						
						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Dirección actualizada con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);

					} finally {
						this.directionDialog = false;
						this.direction = {};
					}
				}
				else {
					try {
						await axios.post(API_URL, this.direction);						
						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Dirección insertada con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);

					} finally {
						this.directionDialog = false;
						this.direction = {};
					}

				}

			}
		},
		saveRelations(){
			this.direction.companies = this.pickcompanies[0];
			this.saveDirection();
			this.hidecompanyDialog();
			
		},
		saveRelations2(){
			this.direction.indicators = this.pickindicators[0];
			this.saveDirection();
			this.hideindicatorDialog();
			
		},
		editDirection(direction) {
			this.direction = { ...direction };
			this.directionDialog = true;
		},
		confirmDeleteDirection(direction) {
			this.direction = direction;
			this.deleteDirectionDialog = true;
		},
		async deleteDirection() {		
			const response = await axios.delete(API_URL + this.direction.id);
			this.deleteDirectionDialog = false;
			this.loadData();
			this.direction = {};
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Dirección eliminada', life: 3000 });
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.directions.length; i++) {
				if (this.directions[i].id === id) {
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
			this.deleteDirectionsDialog = true;
		},
		async deleteSelectedDirections() {
			await axios.delete(API_URL, this.directions);
			this.deleteDirectionsDialog = false;
			this.selectedDirections = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Directions Deleted', life: 3000 });
		},
		initFilters() {
			this.filters = {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			}
		},
		loadData() {
			axios.get(API_URL).then(
				(data) => {
					this.directions = data.data;
				}
			);
			axios.get(COMPANY_URL).then(
				(data) => {
					this.companies = data.data;
				}
			);
			axios.get(INDICATOR_URL).then(
				(data) => {
					this.indicators = data.data;
				}
			);
		},
		async createList(id){
			const  response = await axios.get(API_URL + id);
			const belongcompanies = response.data.companies;
			const companies = this.companies.filter((company)=>{ 
				
				let a =  belongcompanies.filter((element)=> {
					return element.id === company.id;
				});
				return a.length === 0;

			})

			return [belongcompanies, companies];
		},
		async createList2(id){
			const  response = await axios.get(API_URL + id);
			const belongindicators = response.data.indicators;
			const indicators = this.indicators.filter((indicator)=>{ 
				
				let a =  belongindicators.filter((element)=> {
					return element.id === indicator.id;
				});
				return a.length === 0;

			})

			return [belongindicators, indicators];
		},
		async showDialogCompany(direction) {
			this.pickcompanies = await this.createList(direction.id);
	        this.direction = direction;
			this.compayDialog = true;
		},
		async showDialogIndicator(direction) {
			this.pickindicators = await this.createList2(direction.id);
	        this.direction = direction;
			this.indicatorDialog = true;
		},
	}
}
</script>

<style scoped lang="scss">
@import '../src/assets/demo/badges.scss';

.margin2 {
	margin-left: 10px;
}


</style>
