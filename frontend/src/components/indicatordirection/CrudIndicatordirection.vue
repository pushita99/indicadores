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
								:disabled="!selectedIndicatordirections || !selectedIndicatordirections.length" />
						</div>
					</template>
					
				</Toolbar>

				<DataTable ref="dt" :value="indicatordirections" v-model:selection="selectedIndicatordirections" dataKey="id"
					:paginator="true" :rows="10" :filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					:rowsPerPageOptions="[5,10,25]"
					currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} tipos de indicadores"
					responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Indicador dirección</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
								<i class="pi pi-search" />
								<InputText v-model="filters['global'].value" placeholder="Buscar..." />
							</span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

					<Column field="name" header="Indicador" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Nombre</span>
							{{slotProps.data.indicator.name}}
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
								@click="editIndicatordirection(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
								@click="confirmDeleteIndicatordirection(slotProps.data)" />
						</template>
					</Column>
					
				</DataTable>

				<Dialog v-model:visible="indicatordirectionDialog" :style="{width: '450px'}" header="Indicador dirección"	:modal="true" class="p-fluid">
				
					<div class="field">
						<label for="directionId" class="mb-3">Dirección</label>
						<AutoComplete placeholder="Buscar dirección" id="directionId" :dropdown="true"  v-model="direction" :suggestions="autoFilteredDirections" @complete="searchDirections($event)" :force-selection="true" field="name"/>
						
					</div>
					<div class="field">
						<label for="indicatorId" class="mb-3">Tipo de indicador</label>
						<AutoComplete placeholder="Buscar indicador" id="indicatorId" :dropdown="true"  v-model="indicator" :suggestions="autoFilteredIndicators" @complete="searchIndicator($event)" :force-selection="true" field="name"/>
					</div>				
					
					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveIndicatordirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteIndicatordirectionDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="indicatordirection">¿Seguro que desea eliminar este elemento?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteIndicatordirectionDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteIndicatordirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteIndicatordirectionsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="indicatordirection">¿Seguro que desea eliminar las filas seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"	@click="deleteIndicatordirectionsDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedIndicatordirection" />
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
			indicatordirections: null,
			indicatordirectionDialog: false,
			deleteIndicatordirectionDialog: false,
			deleteIndicatordirectionsDialog: false,
			indicatordirection: {},
			direction: {name: ""},
			indicator: {name: ""},
			selectedIndicatordirections: null,
			filters: {},
			submitted: false,
			directions: [],	
			indicators: [],	
			autoFilteredIndicators: [],		
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
			this.indicatordirection = {};
			this.submitted = false;
			this.indicatordirectionDialog = true;
		},
		hideDialog() {
			this.indicatordirectionDialog = false;
			this.submitted = false;
		},
		async saveIndicatordirection() {
			this.submitted = true;
			
				if (this.indicatordirection.id) {

					this.indicatordirections[this.findIndexById(this.indicatordirection.id)] = this.indicatordirection;
					this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicador-dirección modificado con éxito', life: 3000 });
				}
				else {

					try {
						await axios.put('http://localhost:3000/indicator', {
							...this.indicator,
							direction: this.direction.id,
							indicator: this.indicator.id,
						});
						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicador-dirección insertada con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);

					} finally {
						this.indicatordirectionDialog = false;
						this.indicatordirection = {};
					}
				}
			
		},
		editIndicatordirection(indicatordirection) {
			this.indicatordirection = { ...indicatordirection };
			this.indicatordirectionDialog = true;
		},
		confirmDeleteIndicatordirection(indicatordirection) {
			console.log("pase por ConfirmDeleteIndicatordirection");
			this.indicatordirection = indicatordirection;	
			this.deleteIndicatordirectionDialog = true;
		},
		async deleteIndicatordirection() {
			console.log("pase por deleteIndicatordirection");	
			console.log(this.indicatordirection.id)	;	
      		const response = await axios.delete('http://localhost:3000/indicatordirection/'+ this.indicatordirection.id);
			console.log(response);
			this.deleteIndicatordirectionDialog = false;
			this.indicatordirection = {}; 
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Indicador-dirección eliminada', life: 3000 });
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.indicatordirections.length; i++) {
				if (this.indicatordirections[i].id === id) {
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
			this.deleteIndicatordirectionsDialog = true;
		},
		async deleteSelectedIndicatordirections() {
			console.log("pase por ConfirmDeleteIndicatordirections");
			await axios.delete('http://localhost:3000/indicatordirection/', this.indicatordirections);
			this.deleteIndicatordirectionsDialog = false;
			this.selectedIndicatordirections = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicators directions Deleted', life: 3000 });
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
			axios.get('http://localhost:3000/indicator').then(
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
