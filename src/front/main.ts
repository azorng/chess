import Vue from 'vue'
import App from './App.vue'
import { store } from '~/front/store'
import Vuetify from 'vuetify'
import '~/front/registerServiceWorker'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')





