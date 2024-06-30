import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import Confirm from "@/components/Confirm"
import Alert from "@/components/Alert"

Vue.component('Confirm', Confirm)
Vue.component('Alert', Alert)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
