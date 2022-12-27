import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import { Role } from "../utils/enum";

import Home from "../views/Home.vue";
import Details from "../views/Details.vue";
import Activity from "../views/Activity.vue";
import Timer from "../views/Timer.vue";
import Session from "../views/Session.vue";
import Login from "../views/Login.vue";
import Settings from "../views/Settings.vue";
import Group from "../views/Group.vue";
import NotFound from "../views/NotFound.vue";
import About from "../views/About.vue";
import License from "../views/License.vue";
import Landing from "../views/Landing.vue";
import User from "../views/User.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";

const routes = [
  {
    name: "home",
    path: "/:planId?",
    component: Home,
    meta: {
      title: `Trainer`,
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "details",
    path: "/details/:sessionId",
    component: Details,
    meta: {
      title: `Details`,
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "activity",
    path: "/activity/:sessionId/:activityId?",
    component: Activity,
    meta: {
      title: `Activities`,
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "timer",
    path: "/timer/:sessionId/:activityId?",
    component: Timer,
    meta: {
      title: `Timer`,
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "session",
    path: "/session/:sessionId?",
    component: Session,
    meta: {
      title: `Sessions`,
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      title: `Login`,
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    name: "settings",
    path: "/settings",
    component: Settings,
    meta: {
      title: `Settings`,
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "group",
    path: "/group",
    component: Group,
    meta: {
      title: `Groups`,
      requireAuth: true,
      requireAdmin: true,
    },
  },
  {
    name: "not-found",
    path: "/not-found",
    component: NotFound,
    meta: {
      title: `Not Found`,
      empty: true,
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: {
      requireAuth: false,
      empty: true,
      requireAdmin: false,
    },
  },
  {
    name: "about",
    path: "/about",
    component: About,
    meta: {
      title: `About`,
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    name: "license",
    path: "/license",
    component: License,
    meta: {
      title: `Licence`,
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    path: "/home",
    name: "landing",
    component: Landing,
    meta: {
      title: `Home`,
      empty: true,
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: User,
    meta: {
      title: `Dashboard`,
      empty: false,
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: PrivacyPolicy,
    meta: {
      title: `Privacy Policy`,
      empty: false,
      requireAuth: false,
      requireAdmin: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: "bg-slate-100 text-indigo-600",
});

router.beforeEach((to) => {
  document.title = `${to.meta.title} • Lazy Trainer`;
  if (to.name !== "not-found" && to.name !== "login") {
    const userStore = useUserStore();
    if (to.meta.requireAuth && !userStore.isLogged) {
      return "/login";
    }

    if (to.meta.requireAdmin && userStore.role !== Role.TRAINER) {
      return "/not-found";
    }
  }
});

export default router;
