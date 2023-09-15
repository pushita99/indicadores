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
								:disabled="!selectedUsers || !selectedUsers.length" />
						</div>
					</template>
					<!-- 
					<template v-slot:end>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template> -->
				</Toolbar>

				<DataTable ref="dt" :value="users" v-model:selection="selectedUsers" dataKey="id"
					:paginator="true" :rows="10" :filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					:rowsPerPageOptions="[5,10,25]"
					currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} tipos de indicadores"
					responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Listado de usuarios</h5>
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

					<Column field="lastname" header="Apellidos" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Apellidos</span>
							{{slotProps.data.lastname}}
						</template>
					</Column>

					<Column field="username" header="Nombre de usuario" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Correo</span>
							{{slotProps.data.username}}
						</template>
					</Column>

					<Column field="email" header="Correo" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Correo</span>
							{{slotProps.data.email}}
						</template>
					</Column>

					<Column field="role" header="Rol" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Rol</span>
							{{slotProps.data.role}}
						</template>
					</Column>

					<Column field="direction" header="Dirección" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Dirección</span>
							{{slotProps.data.direction}}
						</template>
					</Column>

					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
								@click="editUser(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
								@click="confirmDeleteUser(slotProps.data)" />
						</template>
					</Column>
					
				</DataTable>

				<Dialog v-model:visible="userDialog" :style="{width: '450px'}" header="Inserte los datos del usuario"
					:modal="true" class="p-fluid">

					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="user.name" required="true" autofocus
							:class="{'p-invalid': submitted && !user.name}" />
						<small class="p-invalid" v-if="submitted && !user.name">Nombre es requerido.</small>
					</div>								

					<div class="field">
						<label for="lastname">Apellidos</label>
						<InputText id="lastname" v-model.trim="user.lastname" required="true" autofocus
							:class="{'p-invalid': submitted && !user.lastname}" />
						<small class="p-invalid" v-if="submitted && !user.name">Apellidos es requerido.</small>
					</div>	

					<div class="field">
						<label for="email">Correo</label>
						<InputText id="email" v-model.trim="user.email" required="true" autofocus
							:class="{'p-invalid': submitted && !user.email}" />
						<small class="p-invalid" v-if="submitted && !user.email">Correo es requerido.</small>
					</div>	

					<div class="field">
						<label for="password">Contraseña</label>
						<InputText id="password" v-model.trim="user.password" required="true" autofocus
							:class="{'p-invalid': submitted && !user.password}" />
						<small class="p-invalid" v-if="submitted && !user.password">Contraseña es requerido.</small>
					</div>	

					<div class="field">
						<label for="username">Nombre de usuario</label>
						<InputText id="username" v-model.trim="user.username" required="true" autofocus
							:class="{'p-invalid': submitted && !user.username}" />
						<small class="p-invalid" v-if="submitted && !user.username">Nombre de usuario es requerido.</small>
					</div>	

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveUser" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteUserDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="user">¿Seguro que desea eliminar <b>{{user.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteUserDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteUser" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteUsersDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="user">¿Seguro que desea eliminar las tipos de indicadores seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"	@click="deleteUsersDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedUsers" />
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
const API_URL = BASE_URL + "security/users/";
const DIRECTION = BASE_URL + "direction/";
const DELETE = BASE_URL + "security/";
const REGISTER = BASE_URL + "security/register/"

export default {
	data() {
		return {
			users: null,
			userDialog: false,
			deleteUserDialog: false,
			deleteUsersDialog: false,
			user: {},
			selectedUsers: null,
			filters: {},
			submitted: false,
			directions: [],	
			direction: {name: ""},
			autoFilteredDirections: []	
		}
	},
	// userService: null,
	created() {
		// 	this.userService = new UserService();
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
			this.user = {};
			this.submitted = false;
			this.userDialog = true;
		},
		hideDialog() {
			this.userDialog = false;
			this.submitted = false;
		},
		async saveUser() {
			this.submitted = true;
			if (this.user.name.trim()) {
				if (this.user.id) {

					const {id, ...data} = this.user;
					try {
						await axios.patch(API_URL + this.user.id , {
							...this.user,
						});

						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Usuario modificado con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
						console.log(error);
					} finally {
						this.userDialog = false;
						this.user = {};
					}
				}
				else {
					try {
						const date =  new Date();
						this.user.status = true;
						this.user.created_at = date.toTimeString();
						console.log(date.toDateString());
						await axios.post(REGISTER, this.user);
						this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Usuario insertadao con éxito', life: 3000 });
						this.loadData();
					} catch (error) {
						this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
      					console.log(error);				
					} finally {
						this.userDialog = false;
						this.user = {};
					}
				}
			}
		},
		editUser(user) {
			this.user = { ...user };
			this.userDialog = true;
		},
		confirmDeleteUser(user) {
			console.log("pase por ConfirmDeleteUser");
			this.user = user;	
			this.deleteUserDialog = true;
		},
		async deleteUser() {
			console.log("pase por deleteUser");	
			console.log(this.user.id)	;	
      		const response = await axios.delete(DELETE + this.user.id);
			console.log(response);
			this.loadData();

			this.deleteUserDialog = false;
			this.user = {}; 
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Usuario eliminado', life: 3000 });
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.users.length; i++) {
				if (this.users[i].id === id) {
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
			this.deleteUsersDialog = true;
		},
		async deleteSelectedUsers() {
			console.log("pase por ConfirmDeleteUsers");
			await axios.delete(API_URL, this.users);
			this.deleteUsersDialog = false;
			this.loadData();

			this.selectedUsers = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
		},
		initFilters() {
			this.filters = {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			}
		},
		loadData() {
			axios.get(API_URL).then(
			(data) => {
				this.users = data.data;
			}
			);
			axios.get(DIRECTION).then(
			(data) => {
				this.directions = data.data;
			}
			);			
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
