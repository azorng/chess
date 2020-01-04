import Vue from 'vue'
import App from './App.vue'
import { store } from '~/front/store'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

Vue.use(Notifications)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')





