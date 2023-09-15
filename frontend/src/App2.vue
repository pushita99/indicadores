<template>
  <a-config-provider :locale="es_ES" style="height: 100%">
      <div>
          <Home v-if="auth"/>
          <Login v-else/>
      </div>
  </a-config-provider>

<div :class="containerClass" @click="onWrapperClick">
      <AppTopBar @menu-toggle="onMenuToggle" />
      <div class="layout-sidebar" @click="onSidebarClick">
          <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
      </div>

      <div class="layout-main-container">
          <div class="layout-main">
                  <router-view />
          </div>
          <AppFooter />
      </div>

  <!-- <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" /> -->
      <transition name="layout-mask">
          <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
      </transition>
</div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';

export default {
  emits: ['change-theme'],
  data() {
      return {
          layoutMode: 'static',
          staticMenuInactive: false,
          overlayMenuActive: false,
          mobileMenuActive: false,
          menu : [
              {
                  label: 'Principal',
                  items: [{
                      label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/'
                  }]
              },
              {
        label: 'Planificación', icon: 'pi pi-fw pi-sitemap',
        items: [
          {label: 'Planificación anual', icon: 'pi pi-fw pi-calendar', to: '/planificacion'},
      
        ]
      },
      {
        label: 'Indicadores', icon: 'pi pi-fw pi-sitemap',
        items: [
          {label: 'Indicadores del mes', icon: 'pi pi-fw pi-chart-bar', to: '/indicatorcompanydirection'},
      
        ]
      },
              {
                  label: 'Nomencladoress',
                  items: [
                     {label: 'Empresas', icon: 'pi pi-fw  pi-list', to: '/companies'},
                      { label: 'Direcciones', icon: 'pi pi-fw  pi-list', to: '/directions'} ,
                     { label: 'Tipos de indicadores', icon: 'pi pi-fw  pi-list', to: '/indicators'},
                     { label: 'Unidades de medida', icon: 'pi pi-fw  pi-list', to: '/unidades'}
                     
                  ]
              },{
        label: 'Seguridad', icon: 'pi pi-fw pi-sitemap',
        items: [
          {label: 'Usurios', icon: 'pi pi-fw pi-users', to: '/usuarios'},
                      {label: 'Bitacora', icon: 'pi pi-fw pi-shield', to: '/bitacora'},
                      {label: 'Fecha límite ', icon: 'pi pi-fw pi-history', to: '/bitacora'},
      
        ]
      },                
          ]
      }
  },
  watch: {
      $route() {
          this.menuActive = false;
          this.$toast.removeAllGroups();
      }
  },
  methods: {
      onWrapperClick() {
          if (!this.menuClick) {
              this.overlayMenuActive = false;
              this.mobileMenuActive = false;
          }

          this.menuClick = false;
      },
      onMenuToggle() {
          this.menuClick = true;

          if (this.isDesktop()) {
              if (this.layoutMode === 'overlay') {
        if(this.mobileMenuActive === true) {
          this.overlayMenuActive = true;
        }

                  this.overlayMenuActive = !this.overlayMenuActive;
        this.mobileMenuActive = false;
              }
              else if (this.layoutMode === 'static') {
                  this.staticMenuInactive = !this.staticMenuInactive;
              }
          }
          else {
              this.mobileMenuActive = !this.mobileMenuActive;
          }

          event.preventDefault();
      },
      onSidebarClick() {
          this.menuClick = true;
      },
      onMenuItemClick(event) {
          if (event.item && !event.item.items) {
              this.overlayMenuActive = false;
              this.mobileMenuActive = false;
          }
      },
  onLayoutChange(layoutMode) {
    this.layoutMode = layoutMode;
  },
      addClass(element, className) {
          if (element.classList)
              element.classList.add(className);
          else
              element.className += ' ' + className;
      },
      removeClass(element, className) {
          if (element.classList)
              element.classList.remove(className);
          else
              element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      },
      isDesktop() {
          return window.innerWidth >= 992;
      },
      isSidebarVisible() {
          if (this.isDesktop()) {
              if (this.layoutMode === 'static')
                  return !this.staticMenuInactive;
              else if (this.layoutMode === 'overlay')
                  return this.overlayMenuActive;
          }

          return true;
      }
  },
  computed: {
      containerClass() {
          return ['layout-wrapper', {
              'layout-overlay': this.layoutMode === 'overlay',
              'layout-static': this.layoutMode === 'static',
              'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
              'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
              'layout-mobile-sidebar-active': this.mobileMenuActive,
      'p-input-filled': this.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': this.$primevue.config.ripple === false
          }];
      },
      logo() {
          return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
      }
  },
  beforeUpdate() {
      if (this.mobileMenuActive)
          this.addClass(document.body, 'body-overflow-hidden');
      else
          this.removeClass(document.body, 'body-overflow-hidden');
  },
  components: {
      'AppTopBar': AppTopBar,
      'AppMenu': AppMenu,
      'AppConfig': AppConfig,
      'AppFooter': AppFooter,
      Login, Home,
  }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
