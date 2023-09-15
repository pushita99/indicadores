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
								:disabled="!selectedMeasurementunits || !selectedMeasurementunits.length" />
						</div>
					</template>
					<!-- 
					<template v-slot:end>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template> -->
				</Toolbar>

				<DataTable ref="dt" :value="measurementunits" v-model:selection="selectedMeasurementunits" dataKey="id"
					:paginator="true" :rows="10" :filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					:rowsPerPageOptions="[5,10,25]"
					currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} unidades de medida"
					responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Listado de unidades de medida</h5>
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
								@click="editMeasurementunit(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
								@click="confirmDeleteMeasurementunit(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="measurementunitDialog" :style="{width: '450px'}" header="Detalles Unidad de medida"
					:modal="true" class="p-fluid">

					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="measurementunit.name" required="true" autofocus
							:class="{'p-invalid': submitted && !measurementunit.name}" />
						<small class="p-invalid" v-if="submitted && !measurementunit.name">Nombre es requerido.</small>
					</div>



					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveMeasurementunit" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteMeasurementunitDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="measurementunit">¿Seguro que desea eliminar <b>{{measurementunit.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteMeasurementunitDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteMeasurementunit" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteMeasurementunitsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="measurementunit">¿Seguro que desea eliminar las unidades de medida seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"	@click="deleteMeasurementunitsDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedMeasurementunits" />
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
const API_URL = BASE_URL + "measurementunit/";

export default {
	data() {
		return {
			measurementunits: null,
			measurementunitDialog: false,
			deleteMeasurementunitDialog: false,
			deleteMeasurementunitsDialog: false,
			measurementunit: {},
			selectedMeasurementunits: null,
			filters: {},
			submitted: false,
		}
	},
	// measurementunit: null,
	created() {
		// 	this.measurementunit = new MeasurementunitService();
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
			this.measurementunit = {};
			this.submitted = false;
			this.measurementunitDialog = true;
		},
		hideDialog() {
			this.measurementunitDialog = false;
			this.submitted = false;
		},
		async saveMeasurementunit() {
			this.submitted = true;
			if (this.measurementunit.name.trim()) {
				if (this.measurementunit.id) {					
					const {id, ...data} = this.measurementunit;
					try {
						await axios.patch(API_URL + this.measurementunit.id , {
							...this.measurementunit,
						});

						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Tipo de unidad de medida modificada con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);
					} finally {
						this.measurementunitDialog = false;
						this.measurementunit = {};
					}
				}
				else {
					try {
						await axios.post(API_URL, this.measurementunit);
						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Unidad de medida insertada con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);

					} finally {
						this.measurementunitDialog = false;
						this.measurementunit = {};
					}

				}

			}
		},
		editMeasurementunit(measurementunit) {
			this.measurementunit = { ...measurementunit };
			this.measurementunitDialog = true;
		},
		confirmDeleteMeasurementunit(measurementunit) {
			console.log("pase por ConfirmDeleteMeasurementunit");
			this.measurementunit = measurementunit;	
			this.deleteMeasurementunitDialog = true;
		},
		async deleteMeasurementunit() {
			console.log("pase por deleteMeasurementunit");	
			console.log(this.measurementunit.id)	;	
      		const response = await axios.delete(API_URL + this.measurementunit.id);
			console.log(response);
			this.loadData();

			this.deleteMeasurementunitDialog = false;
			this.measurementunit = {}; 
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Unidad de medida eliminada', life: 3000 });
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.measurementunits.length; i++) {
				if (this.measurementunits[i].id === id) {
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
			this.deleteMeasurementunitsDialog = true;
		},
		async deleteSelectedMeasurementunits() {
			console.log("pase por ConfirmDeleteMeasurementunits");
			await axios.delete(API_URL, this.measurementunits);
			this.deleteMeasurementunitsDialog = false;
			this.loadData();

			this.selectedMeasurementunits = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Unidades de medida eliminadas', life: 3000 });
		},
		initFilters() {
			this.filters = {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			}
		},
		loadData() {
			axios.get(API_URL).then(
			(data) => {
				this.measurementunits = data.data;
			}
		);
		}
	}
}
</script>

<style scoped lang="scss">
@import '../src/assets/demo/badges.scss';
</style>
