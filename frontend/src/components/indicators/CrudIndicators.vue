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
								:disabled="!selectedIndicators || !selectedIndicators.length" />
						</div>
					</template>				
				</Toolbar>

				<DataTable ref="dt" :value="indicators" v-model:selection="selectedIndicators" dataKey="id"
					:paginator="true" :rows="10" :filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					:rowsPerPageOptions="[5,10,25]"
					currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} tipos de indicadores"
					responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Listado de tipos de indicadores</h5>
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
							{{slotProps.data.name}}
						</template>
					</Column>
				

					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
								@click="editIndicator(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
								@click="confirmDeleteIndicator(slotProps.data)" />
					    </template>
					</Column>					
				</DataTable>

				<Dialog v-model:visible="indicatorDialog" :style="{width: '450px'}" header="Detalles Tipo de indicador"
					:modal="true" class="p-fluid">

					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="indicator.name" required="true" autofocus
							:class="{'p-invalid': submitted && !indicator.name}" />
						<small class="p-invalid" v-if="submitted && !indicator.name">Nombre es requerido.</small>
					</div>

					<div class="field">
						<label for="description">Descripción</label>
						<Textarea id="description" v-model="indicator.description" required="true" rows="3" cols="20" />
					</div>			

					<div class="field">
						<label for="measurementunitId" class="mb-3">Unidad de medida</label>
						<AutoComplete placeholder="Buscar unidad de medida" id="measurementunitId" :dropdown="true"  v-model="measurementunit" :suggestions="autoFilteredMeasurementunits" @complete="searchMeasurementunits($event)" :force-selection="true" field="name"/>
					</div>

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveIndicator" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteIndicatorDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="indicator">¿Seguro que desea eliminar <b>{{indicator.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteIndicatorDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteIndicator" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteIndicatorsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="indicator">¿Seguro que desea eliminar las tipos de indicadores seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"	@click="deleteIndicatorsDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedIndicators" />
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
const API_URL = BASE_URL + "indicator/";
const DIRECTION = BASE_URL + "direction/";
const MEASUREMENTUNIT = BASE_URL + "measurementunit/";

export default {
	data() {
		return {
			indicators: null,
			indicatorDialog: false,
			deleteIndicatorDialog: false,
			deleteIndicatorsDialog: false,
			indicator: {},
			selectedIndicators: null,
			filters: {},
			submitted: false,
			measurementunits: [],	
			directions: [],	
			direction: {name: ""},
			measurementunit: {name: ""},	
			autoFilteredMeasurementunits: [],
			autoFilteredDirections: []	
		}
	},
	// indicatorService: null,
	created() {
		// 	this.indicatorService = new IndicatorService();
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
			this.indicator = {};
			this.submitted = false;
			this.indicatorDialog = true;
		},
		hideDialog() {
			this.indicatorDialog = false;
			this.submitted = false;
		},
		async saveIndicator() {
			this.submitted = true;
			if (this.indicator.name.trim()) {
				if (this.indicator.id) {
					const {id, ...data} = this.indicator;
					try {
						await axios.patch(API_URL + this.indicator.id , {
							...this.indicator,
							measurementunit: this.measurementunit.id,
						});

						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Tipo de indicador modificado con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);
					} finally {
						this.indicatorDialog = false;
						this.indicator = {};
					}				
				}
				else {
					try {
						await axios.post(API_URL, {
							...this.indicator,
							measurementunit: this.measurementunit.id,
						    direction: this.direction.id,
						});
						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Tipo de indicador insertada con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);

					} finally {
						this.indicatorDialog = false;
						this.indicator = {};
					}
				}
			}
		},
		editIndicator(indicator) {
			this.indicator = { ...indicator };
			this.indicatorDialog = true;
		},
		confirmDeleteIndicator(indicator) {
			console.log("pase por ConfirmDeleteIndicator");
			this.indicator = indicator;	
			this.deleteIndicatorDialog = true;
		},
		async deleteIndicator() {
			console.log("pase por deleteIndicator");	
			console.log(this.indicator.id)	;	
      		const response = await axios.delete(API_URL + this.indicator.id);
			console.log(response);
			this.deleteIndicatorDialog = false;
			this.indicator = {}; 
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Tipo de indicador eliminado', life: 3000 });
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.indicators.length; i++) {
				if (this.indicators[i].id === id) {
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
			this.deleteIndicatorsDialog = true;
		},
		async deleteSelectedIndicators() {
			console.log("pase por ConfirmDeleteIndicators");
			await axios.delete(API_URL, this.indicators);
			this.deleteIndicatorsDialog = false;
			this.selectedIndicators = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicators Deleted', life: 3000 });
		},
		initFilters() {
			this.filters = {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			}
		},
		loadData() {
			axios.get(API_URL).then(
			(data) => {
				this.indicators = data.data;
			}
			);
			axios.get(DIRECTION).then(
			(data) => {
				this.directions = data.data;
			}
			);
			axios.get(MEASUREMENTUNIT).then(
			(data) => {
				this.measurementunits = data.data;					    
			}
			);
		},
		searchMeasurementunits(event) {
			setTimeout(() => {
				if (!event.query.trim().length) {
					this.autoFilteredMeasurementunits = [...this.measurementunits];
				}
				else {
					this.autoFilteredMeasurementunits = this.measurementunits.filter((measurementunit) => {
						return measurementunit.name.toLowerCase().startsWith(event.query.toLowerCase());
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
