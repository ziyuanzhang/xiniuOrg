import Vue from "vue";
import VueRouter from "vue-router";
//import registered from "../views/registered.vue";
import registeredNew from "../views/registeredNew.vue";
import registerComplete from "../views/registerComplete.vue";
//import download from "../views/download.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "download",
  //   component: download
  // },
  {
    path: "/",
    name: "registeredNew",
    component: registeredNew
  },
  // {
  //   path: "/",
  //   name: "registered",
  //   component: registered
  // },
  // {
  //   path: "/download",
  //   name: "download",
  //   component: download
  // }
  {
    path: "/registerComplete",
    name: "registerComplete",
    component: registerComplete
  }
];

const router = new VueRouter({
  routes
});

export default router;
