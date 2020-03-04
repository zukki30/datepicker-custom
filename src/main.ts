import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/scss/reset.scss";

Vue.use(ElementUI);

Vue.config.productionTip = false;

import vClickOutside from "v-click-outside";
Vue.use(vClickOutside);

require("@/assets/scss/index.scss");

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
