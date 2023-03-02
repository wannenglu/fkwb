import Vue from "vue";
import Router from "vue-router";
import wenben from "@/components/wenben";
import pindao from "@/components/pindao";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "wenben",
      component: wenben
    },
    {
      path: "/pindao",
      name: "pindao",
      component: pindao
    }
  ]
});
