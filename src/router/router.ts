import Home from "../pages/Home.vue";
import Details from "../pages/Details.vue";
import Activity from "../pages/Activity.vue";
import Setting from "../pages/Setting.vue";
import { createRouter, createWebHistory } from "vue-router";
import Timer from "../pages/Timer.vue";
import Session from "../pages/Session.vue";

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
    path: "/details/:sessionId",
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
    name: "timer",
    path: "/timer/:sessionId/:activityId?",
    component: Timer,
    meta: {
      showFooter: false,
    },
  },
  {
    name: "session",
    path: "/session/:sessionId?",
    component: Session,
    meta: {
      showFooter: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // linkExactActiveClass: "bg-slate-100 text-indigo-600",
  linkExactActiveClass: "",
});

export default router;
