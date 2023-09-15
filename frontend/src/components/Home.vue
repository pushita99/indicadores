<template>
  
    <Sidebar v-model:visible="visibleLeft">
        Content
    </Sidebar>
    
    <Button icon="pi pi-arrow-right" @click="visibleLeft = true" />
<Footer></Footer>
    </template>
    <script >
      
    import Sidebar from 'primevue/sidebar';
    import Footer from './nav/footer_ban.vue'
    import Button from 'primevue/button';
    
    export default {
      data() {
        return {
          visibleLeft: false
        }
      },
      components: {
        Sidebar,
        Button,
        Footer,
      }
    }
    </script>
    