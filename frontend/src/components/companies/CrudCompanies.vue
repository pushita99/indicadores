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
								:disabled="!selectedCompanies || !selectedCompanies.length" />
						</div>
					</template>
					<!-- 
					<template v-slot:end>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template> -->
				</Toolbar>

				<DataTable ref="dt" :value="companies" v-model:selection="selectedCompanies" dataKey="id"
					:paginator="true" :rows="10" :filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					:rowsPerPageOptions="[5,10,25]"
					currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} empresas"
					responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Listado de empresas</h5>
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
								@click="editCompany(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
								@click="confirmDeleteCompany(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="companyDialog" :style="{width: '450px'}" header="Detalles Empresa"
					:modal="true" class="p-fluid">

					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="company.name" required="true" autofocus
							:class="{'p-invalid': submitted && !company.name}" />
						<small class="p-invalid" v-if="submitted && !company.name">Nombre es requerido.</small>
					</div>



					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveCompany" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteCompanyDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="company">¿Seguro que desea eliminar <b>{{company.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteCompanyDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteCompany" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteCompaniesDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="company">¿Seguro que desea eliminar las empresas seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"	@click="deleteCompaniesDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedCompanies" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios';
import { BASE_URL } from '@/services/http-adaptator.js'
const API_URL = BASE_URL + "company/";

export default {
	data() {
		return {
			companies: null,
			companyDialog: false,
			deleteCompanyDialog: false,
			deleteCompaniesDialog: false,
			company: {},
			selectedCompanies: null,
			filters: {},
			submitted: false,
		}
	},
	// companyService: null,
	created() {
		// 	this.companyService = new CompanyService();
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
			this.company = {};
			this.submitted = false;
			this.companyDialog = true;
		},
		hideDialog() {
			this.companyDialog = false;
			this.submitted = false;
		},
		async saveCompany() {
			this.submitted = true;
			if (this.company.name.trim()) {
				if (this.company.id) {
					const {id, ...data} = this.company;
					try{
					    await axios.patch(API_URL + this.company.id, data);
					    this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Empresa modificada con éxito', life: 3000 });
				        this.companyDialog = false;
					    this.loadData();		
					}
					catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
                        console.log(error);						
					}
					finally {
						this.companyDialog = false;
						this.company = {};
					}											
				}
				else {
					try {
						await axios.post(API_URL, this.company);
						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Empresa insertada con éxito', life: 3000 });
						this.loadData();
						this.companyDialog = false;

					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);

					} finally {
						this.companyDialog = false;
						this.company = {};
						this.companyDialog = false;
					}

				}

			}
		},
		editCompany(company) {
			this.company = { ...company };
			this.companyDialog = true;
		},
		confirmDeleteCompany(company) {
			this.company = company;	
			this.deleteCompanyDialog = true;
			this.loadData();
		},
		async deleteCompany() {
      		const response = await axios.delete(API_URL + this.company.id);
			this.deleteCompanyDialog = false;
			this.company = {}; 
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Empresa eliminada', life: 3000 });
			this.loadData();
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.companies.length; i++) {
				if (this.companies[i].id === id) {
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
			this.deleteCompaniesDialog = true;
		},
		async deleteSelectedCompanies() {
			await axios.delete(API_URL, this.companies);
			this.deleteCompaniesDialog = false;
			this.selectedCompanies = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Companies Deleted', life: 3000 });
			this.loadData();
		},
		initFilters() {
			this.filters = {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			}
		},
		loadData() {
			axios.get(API_URL).then(
			(data) => {
				this.companies = data.data;
			}
		);
		}
	}
}
</script>

<style scoped lang="scss">
@import '../src/assets/demo/badges.scss';
</style>
