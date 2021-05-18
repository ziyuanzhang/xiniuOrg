import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/reset.css";
import "@/assets/font/iconfont.css";
import Axios from "axios";
import utls from "./utils/utils";
Axios.defaults.baseURL = "http://xz2021.cn:8080/loan";
Vue.prototype.$ajax = Axios;
import Toast from "./component/global/toastJS";

Vue.prototype.$toast = Toast;

Vue.config.productionTip = false;

Vue.prototype.$majia = "jiguangfenqi";

Vue.prototype.$clientType = utls.isAndroid() ? 1 : 2;

Vue.prototype.$channelNo = utls.GetUrlParam("channelNo")
  ? utls.GetUrlParam("channelNo")
  : "test";

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
