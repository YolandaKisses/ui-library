import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import VXETable from "vxe-table";
import "vxe-table/lib/style.css";


Vue.config.productionTip = false;

Vue.use(VXETable);
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
