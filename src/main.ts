import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

import "@/assets/scss/reset.scss";

Vue.config.productionTip = false;

import vClickOutside from "v-click-outside";
Vue.use(vClickOutside);

require("@/assets/scss/index.scss");

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
