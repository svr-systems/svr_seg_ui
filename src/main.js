import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import store from "@/store";
import router from "@/router";
import App from "@/App.vue";
import Alert from "@/components/Alert";
import Confirm from "@/components/Confirm";

Vue.component("Alert", Alert);
Vue.component("Confirm", Confirm);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
