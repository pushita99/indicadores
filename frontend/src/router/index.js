import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth.store';
import App from '../App.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/',
      name: 'home',
      component: App,
      children: [
        {
          path: '/companies',
          name: 'companies',
          component: () => import('../views/Companies.vue')
        },
        {
          path: '/directions',
          name: 'directions',
          component: () => import('../views/Directions.vue'),
        },
        {
          path: '/indicators',
          name: 'indicators',
          component: () => import('../views/Indicators.vue')
        },       
        {
          path: '/planification',
          name: 'planification',
          component: () => import('../views/Planification.vue')
        },      
        {
          path: '/indicatordirection',
          name: 'indicatordirection',
          component: () => import('../views/Indicatordirection.vue')
        },  
        {
          path: '/companydirection',
          name: 'companydirection',
          component: () => import('../views/Companydirection.vue')
        },  
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/Users.vue')
        }, 
        {
          path: '/reportes',
          name: 'reportes',
          component: () => import('../components/reports/generalreport.vue')
        },  
        {
          path: '/binnacle',
          name: 'binnacle',
          component: () => import('../views/Binnacle.vue')
        },  
        {
          path: '/indicatorcompanydirection',
          name: 'indicatorcompanydirection',
          component: () => import('../views/Indicatorcompanydirection.vue')
        },
        {
          path: '/measurementunits',
          name: 'measurementunits',
          component: () => import('../views/Measurementunits.vue')
        } 
      ]
    },
    

  ]
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore().user;
  if (auth){
    if (authRequired && !auth.user) {
      //auth.returnUrl = to.fullPath;
      return '/login';  
    }
  }  
});
export default router
