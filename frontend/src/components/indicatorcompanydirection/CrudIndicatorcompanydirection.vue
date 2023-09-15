<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast />
				<Toolbar class="mb-4">
					<template v-slot:start>
						
					</template>
					 
					<template v-slot:end>
						<Calendar class="mx-2" v-model="date" view="month" dateFormat="mm/yy" @date-select="selectDate()"/>
					</template> 
				</Toolbar>

				<div v-if="loading">
            cargando...
            <ProgressSpinner />
            <ProgressSpinner aria-label="Basic ProgressSpinner" />
        </div>
        <div v-if="!indicadores || indicadores.length === 0">
           No hay indicadores para esta direccion...
            
        </div>
        <div v-show="!loading ">
            <!-- class="p-datatable p-component p-datatable-responsive-scroll p-datatable-grouped-header p-datatable-grouped-footer"> -->

            <div class="p-datatable-wrapper">
                <!-- <table class="p-datatable-table" v-if="indicadores"> -->
                <table class="tabla" v-if="indicadores && indicadores.length > 0">
                    <!-- <thead class="p-datatable-thead"> -->
                    <thead class="">
                        <tr>
                            <th rowspan="3">
                                <div class="">
                                    <!-- <div class="p-column-header-content"> -->
                                    <span class="p-column-title">Indicadores</span>
                                </div>

                            </th>
                            <th :colspan="2 * indicadores[0].companies.length">
                                <div class="p-column-header-content">
                                    <span class="p-column-title"> Empresas</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th v-for="empresa in indicadores[0].companies" colspan="2">
                                <div class="p-column-header-content">
                                    <span class="p-column-title">{{ empresa.name }}</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <template v-for="empresa in indicadores[0].companies">
                                <th>
                                    <div class="flex p-column-header-content">
                                        <span class="p-column-title flex-1 mt-2" >Plan</span>
										<Button icon="pi pi-pencil" class="flex-1 p-button-text p-button-info mr-2"
								@click="editIndicator(slotProps.data)" />
                                    </div>									
                                </th>
                                <th>
                                    <div class="p-column-header-content flex">
                                        <span class="p-column-title flex-1 mt-2">Real</span>
										<Button icon="pi pi-pencil" class="flex-1 p-button-text p-button-info mr-2"
								@click="editIndicator(slotProps.data)" />
                                    </div>
									
                                </th>
                            </template>
                        </tr>
                    </thead>
                    <tbody class="">
                        <!-- <tbody class="p-datatable-tbody"> -->
                        <tr v-for="indicador in indicadores">
                            <td>{{ indicador.name }}</td>
                            <template v-for="empresa in indicador.companies">
                                <td>
                                    {{ empresa.planification }}
                                </td>
                                <td>
                                    {{ empresa.value }}
                                </td>
                            </template>

                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

				

				<Dialog v-model:visible="indicatorcompanydirectionDialog" :style="{ width: '450px' }"
					header="Indicadores mes" :modal="true" class="p-fluid">

					<div class="field">
						<label for="companyId" class="mb-3">Empresa</label>
						<AutoComplete placeholder="Buscar Compañia" id="companyId" :dropdown="true" v-model="company"
							:suggestions="autoFilteredCompanies" @complete="searchCompanies($event)"
							:force-selection="true" field="name" />

					</div>

					<div v-for="(indicator, index) of indicators" :key="index" class="field col">
						<label for="name2">{{ indicator.name }}:</label>
						<InputText id="name2" type="number" v-model="tosave[index]" />
					</div>

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text"
							@click="saveIndicatorcompanydirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteIndicatorcompanydirectionDialog" :style="{ width: '450px' }"
					header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="indicatorcompanydirection">¿Seguro que desea eliminar
							<b>{{ indicatorcompanydirection.name }}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteIndicatorcompanydirectionDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text"
							@click="deleteIndicatorcompanydirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteIndicatorcompanydirectionsDialog" :style="{ width: '450px' }"
					header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="indicatorcompanydirection">¿Seguro que desea eliminar las planificaciones
							seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteIndicatorcompanydirectionsDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text"
							@click="deleteSelectedIndicatorcompanydirection" />
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
const REPORT = BASE_URL + "reports/general_report/";
const API_URL = BASE_URL + "indicatorcompanydirection/";
const DIRECTION = BASE_URL + "direction/";
const INDICATOR = BASE_URL + "indicator/direction/";

export default {
	data() {
		return {
			indicatorcompanydirections: null,
			indicatorcompanydirectionDialog: false,
			deleteIndicatorcompanydirectionDialog: false,
			deleteIndicatorcompanydirectionsDialog: false,
			indicatorcompanydirection: {},
			company: { name: "" },
			indicator: { name: "" },
			selectedIndicatorcompanydirections: null,
			filters: {},
			submitted: false,
			companies: [],
			indicators: [],
			autoFilteredIndicators: [],
			autoFilteredCompanies: [],
			tosave: [],
			sales: null,
            indicadores: [],
            autoFilteredDirections: [],
            directions: null,
            direction: null,
            loading: true,
			date: new Date()
		}
	},

	created() {

		this.initFilters();
	},
	async mounted() {
		this.loadData(this.getDirectionId());
	},
	methods: {

		formatCurrency(value) {
			if (value)
				return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
			return;
		},
		openNew() {
			this.indicatorcompanydirection = {};
			this.submitted = false;
			this.indicatorcompanydirectionDialog = true;
		},
		hideDialog() {
			this.indicatorcompanydirectionDialog = false;
			this.submitted = false;
		},
		async saveIndicatorcompanydirection() {
			const datee = new Date();
			this.indicatorcompanydirection.date = datee;
			this.submitted = true;

			if (this.indicatorcompanydirection.id) {

				this.indicatorcompanydirections[this.findIndexById(this.indicatorcompanydirection.id)] = this.indicatorcompanydirection;
				this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicador modificado con éxito', life: 3000 });
			}
			else {

				try {
					for (let i = 0; i < this.indicators.length; i++) {
						await axios.post(API_URL, {
							...this.indicatorcompanydirection,
							company: this.company.id,
							direction: useAuthStore().user.user.direction.id,
							indicator: this.indicators[i].id,
							value: this.tosave[i],							
						});						
					}
					this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicador insertado con éxito', life: 3000 });
					this.loadData();
				} catch (error) {
					this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
					console.log(error);

				} finally {
					this.indicatorcompanydirectionDialog = false;
					this.indicatorcompanydirection = {};
				}
			}

		},
		editIndicatorcompanydirection(indicatorcompanydirection) {
			this.indicatorcompanydirection = { ...indicatorcompanydirection };
			this.indicatorcompanydirectionDialog = true;
		},
		selectDate() {
			console.log(this.date.toLocaleString());
			console.log(this.date.toISOString());
			this.date.setMonth(this.date.getMonth() + 1);
			this.loadData(this.getDirectionId());
		}
		,
		confirmDeleteIndicatorcompanydirection(indicatorcompanydirection) {
			console.log("pase por ConfirmDeleteIndicatorcompanydirection");
			this.indicatorcompanydirection = indicatorcompanydirection;
			this.deleteIndicatorcompanydirectionDialog = true;
		},
		async deleteIndicatorcompanydirection() {
			console.log("pase por deleteIndicatorcompanydirection");
			console.log(this.indicatorcompanydirection.id);
			const response = await axios.delete(API_URL + this.indicatorcompanydirection.id);
			console.log(response);
			this.deleteIndicatorcompanydirectionDialog = false;
			this.indicatorcompanydirection = {};
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Indicador eliminado', life: 3000 });
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.indicatorcompanydirections.length; i++) {
				if (this.indicatorcompanydirections[i].id === id) {
					index = i;
					break;
				}
			}
			return index;
		},
		computed: {
        lastYearTotal() {
            let total = 0;
            for (let sale of this.sales) {
                total += sale.lastYearProfit;
            }

            return this.formatCurrency(total);
        },
        thisYearTotal() {
            let total = 0;
            for (let sale of this.sales) {
                total += sale.thisYearProfit;
            }

            return this.formatCurrency(total);
        },
        ancho() {
            const columnas = this.indicadores[0].empresas.lenth + 1;
            return (100 / columnas);
        }
    },

		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			
			this.deleteIndicatorcompanydirectionsDialog = true;
		},
		async deleteSelectedIndicatorcompanydirections() {
			
			await axios.delete(API_URL, this.indicatorcompanydirections);
			this.deleteIndicatorcompanydirectionsDialog = false;
			this.selectedIndicatorcompanydirections = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicatorcompanydirections Deleted', life: 3000 });
		},
		initFilters() {
			this.filters = {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			}
		},
		async loadData(id) {
			
            this.loading = true;
            try {
                const resource = await axios.get(`http://localhost:3000/reports/general_report/${id}/${this.date.toISOString()}`);
                this.indicadores = resource.data;
                this.loading = false;
            } catch (e) {
                console.log(e);
            };
			axios.get(API_URL).then(
				(data) => {
					this.indicatorcompanydirections = data.data;
				}
			);
			axios.get(`http://localhost:3000/company/direction/${useAuthStore().user.user.direction.id}`).then(
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
		async loadDirections() {
            try {
                const resource = await axios.get(DIRECTION);
                this.directions = resource.data;
            } catch (e) {
                console.log(e);
            }
        },
        getDirectionId() {
            const store = useAuthStore();
            return store.user.user.direction.id;
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
.tabla tr>td {
    text-align: left;
    border: 1px solid #dee2e6;
    border-width: 0 0 1px 0 !important;
    padding: 1rem 1rem;

}

.tabla {
    border-collapse: collapse;
    width: 100%;
}

.tabla tr>th {
    text-align: left;
    border: 1px solid #dee2e6;
    border-width: 0 0 1px 0 !important;
    padding: 1rem 1rem;
    font-family: var(--font-family);
    font-weight: bold !important;
}


@keyframes p-progress-spinner-color {
    100%,
    0% {
        stroke: #d62d20;
    }
    40% {
        stroke: #0057e7;
    }
    66% {
        stroke: #008744;
    }
    80%,
    90% {
        stroke: #ffa700;
    }
}
</style>
