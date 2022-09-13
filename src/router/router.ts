import Home from "../pages/Home.vue";
import Details from "../pages/Details.vue";
import Activity from "../pages/Activity.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "home", path: "/", component: Home },
  { name: "details", path: "/details/:id", component: Details },
  { name: "activity", path: "/activity/:dayOfWeek/:id", component: Activity },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
