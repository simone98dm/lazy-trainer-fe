import Home from "../pages/Home.vue";
import Details from "../pages/Details.vue";
import Activity from "../pages/Activity.vue";
import Setting from "../pages/Setting.vue";
import { createRouter, createWebHistory } from "vue-router";
import Timer from "../pages/Timer.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    meta: {
      showFooter: true,
    },
  },
  {
    name: "details",
    path: "/details/:id",
    component: Details,
    meta: {
      showFooter: true,
    },
  },
  {
    name: "activity",
    path: "/activity/:sessionId/:activityId?",
    component: Activity,
    meta: {
      showFooter: true,
    },
  },
  {
    name: "setting",
    path: "/setting",
    component: Setting,
    meta: {
      showFooter: true,
    },
  },
  {
    name: "timer",
    path: "/timer/:sessionId/:activityId?",
    component: Timer,
    meta: {
      showFooter: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "bg-slate-100 text-indigo-600",
});

export default router;
