import Vue from "vue";
import VueRouter from "vue-router";
//import download from "../views/download.vue";
//import registered from "../views/registered.vue";
import registeredNew from "../views/registeredNew.vue";
import tips from "../views/tips.vue";

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
  // },
  {
    path: "/tips",
    name: "tips",
    component: tips
  }
];

const router = new VueRouter({
  routes
});

export default router;
