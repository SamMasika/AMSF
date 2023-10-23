import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import Notifications from 'vue-notification';

Vue.use(Notifications);
import Toasted from 'vue-toasted'

Vue.use(Toasted)
// import SweetAlert from './plugins/sweetalert'
// import VueApexCharts from 'vue-apexcharts';
// import '@/assets/css/global.css';
// Vue.component('apexchart', VueApexCharts);
// Vue.use(SweetAlert);

// import 'vuetify/dist/vuetify.min.css'

require ('@/store/subscribe')

Vue.use(vuetify, {
  iconfont: 'md',
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: '#90CAF9',
        secondary: '#BDBDBD',
        accent: '#FF4081',
      },
    },
  },
})



// axios.defaults.baseURL='http://41.59.227.181/AMS/public/api'
axios.defaults.baseURL='http://127.0.0.1:8000/api/AMS'

Vue.config.productionTip = false

// Vue.prototype.$hasPermission = function(permission) {
//   return this.$store.getters['auth/hasPermission'](permission);
// };


store.dispatch('auth/attempt',localStorage.getItem('access_token'))
.then(()=>{
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})

