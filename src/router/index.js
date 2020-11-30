import Vue from "vue";
import VueRouter from "vue-router";
import download from "../views/download.vue";
import registered from "../views/registered.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "registered",
    component: registered
  },
  {
    path: "/download",
    name: "download",
    component: download
  }
];

const router = new VueRouter({
  routes
});

export default router;
