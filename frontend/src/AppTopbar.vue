<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<span>INDICADORES</span>
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<!-- <li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-calendar"></i>
					<span>Events</span>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-cog"></i>
					<span>Settings</span>
				</button>
			</li> -->
			<li>
				<Menu ref="menu" :model="overlayMenuItems" :popup="true" />
				<button class="p-link layout-topbar-button" @click="toggleMenu">
					<i class="pi pi-user"></i>
					<span>Profile</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapActions } from 'pinia';
import { useAuthStore } from './store/auth.store';

export default {
	data() {
		return {
			overlayMenuItems: [
					{
						label: 'Editar usuario',
						icon: 'pi pi-user-edit',
						
					},
					{
						separator: true
					},
					{
						label: 'Salir',
						icon: 'pi pi-exit',
						command: () => {
							this.logout();
						}
					},
				],
		}
	},
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		topbarImage() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		},
		toggleMenu(event) {
				this.$refs.menu.toggle(event);
			},
			...mapActions(useAuthStore,['logout']),

    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>