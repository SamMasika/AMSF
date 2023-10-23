
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Auth/Login.vue'
import Dashboard from '@/components/Layout/Dashboard.vue'
import Main from '@/components/Layout/Main.vue'
import Section from '@/components/Staff/Section.vue'
import Staff from '@/components/Staff/Staff.vue'
import Office from '@/components/Staff/Office.vue'
import Asset from '@/components/Asset/Asset.vue'
import Report from '@/components/Asset/Report.vue'
import Byoffice from '@/components/Report/Byoffice.vue'
import Bysection from '@/components/Report/Bysection.vue'
import Bystaff from '@/components/Report/Bystaff.vue'
import AssetStore from '@/components/Asset/AssetStore.vue'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({ name: 'dashboard' });
      }
      next();
    }
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
          if (!store.getters['auth/authenticated']) {
            return next({ name: 'login' });
          }
          next();
        }
      },
      {path: '/section-list',name: 'section', component: Section},
      {path: '/office-list',name: 'office', component: Office},
      {path: '/staff-list',name: 'staff',component: Staff},
      {path: '/asset-list',name: 'asset',component: Asset},
      {path: '/asset-store',name: 'asset',component: AssetStore},
      {path: '/reports',name: 'report',component: Report},
      {path: '/by-staff',name: 'bystaff',component: Bystaff},
      {path: '/by-section',name: 'bysection',component: Bysection},
      {path: '/by-office',name: 'byoffice',component: Byoffice},
     
    ]
  }
]

const router = new VueRouter({
  routes,
  // mode: 'history',
})

export default router
