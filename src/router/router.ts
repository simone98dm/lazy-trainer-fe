import Home from "../pages/Home.vue";
import Details from "../pages/Details.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "home", path: "/", component: Home },
  { name: "details", path: "/details/:id", component: Details },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
