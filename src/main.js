import Vue from "vue";
import { Laue } from 'laue';
import App from "./App.vue";
import vuetify from './plugins/vuetify';

Vue.use(Laue);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
