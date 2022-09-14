import Home from "../pages/Home.vue";
import Details from "../pages/Details.vue";
import Activity from "../pages/Activity.vue";
import Setting from "../pages/Setting.vue";
import { createRouter, createWebHistory } from "vue-router";
import Timer from "../pages/Timer.vue";

const routes = [
  { name: "home", path: "/", component: Home },
  { name: "details", path: "/details/:id", component: Details },
  {
    name: "activity",
    path: "/activity/:sessionId/:activityId?",
    component: Activity,
  },
  { name: "setting", path: "/setting", component: Setting },
  { name: "timer", path: "/timer/:sessionId/:activityId?", component: Timer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "bg-slate-100 text-indigo-600",
});

export default router;
