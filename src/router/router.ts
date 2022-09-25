import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./../stores/user";
import Home from "../views/Home.vue";
import Details from "../views/Details.vue";
import Activity from "../views/Activity.vue";
import Settings from "../views/Settings.vue";
import Timer from "../views/Timer.vue";
import Session from "../views/Session.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    meta: {
      showFooter: true,
      requireAuth: true,
    },
  },
  {
    name: "details",
    path: "/details/:sessionId",
    component: Details,
    meta: {
      showFooter: true,
      requireAuth: true,
    },
  },
  {
    name: "activity",
    path: "/activity/:sessionId/:activityId?",
    component: Activity,
    meta: {
      showFooter: true,
      requireAuth: true,
    },
  },
  {
    name: "timer",
    path: "/timer/:sessionId/:activityId?",
    component: Timer,
    meta: {
      showFooter: false,
      requireAuth: true,
    },
  },
  {
    name: "session",
    path: "/session/:sessionId?",
    component: Session,
    meta: {
      showFooter: false,
      requireAuth: true,
    },
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      showFooter: false,
      requireAuth: false,
    },
  },
  {
    name: "settings",
    path: "/settings",
    component: Settings,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "bg-slate-100 text-indigo-600",
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  if (to.meta.requireAuth && !userStore.isLogged) {
    return "/login";
  }
});

export default router;
