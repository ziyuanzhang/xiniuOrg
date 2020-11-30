import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/reset.css";
import Axios from "axios";
Axios.defaults.baseURL = "http://boss.cj713.cn:8080/loan";
Vue.prototype.$ajax = Axios;

Vue.config.productionTip = false;

let u = navigator.userAgent;

if (u.indexOf("Android") > -1 || u.indexOf("Adr") > -1) {
  Vue.prototype.$clientType = 1;
} else {
  Vue.prototype.$clientType = 2;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
