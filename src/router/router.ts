import { Role } from "./../utils/enum";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./../stores/user";
import Home from "../views/Home.vue";
import Details from "../views/Details.vue";
import Activity from "../views/Activity.vue";
import Settings from "../views/Settings.vue";
import Timer from "../views/Timer.vue";
import Session from "../views/Session.vue";
import Login from "../views/Login.vue";
import Trainer from "../views/Trainer.vue";
import Group from "../views/Group.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    name: "home",
    path: "/:planId?",
    component: Home,
    meta: {
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "details",
    path: "/details/:sessionId",
    component: Details,
    meta: {
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "activity",
    path: "/activity/:sessionId/:activityId?",
    component: Activity,
    meta: {
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "timer",
    path: "/timer/:sessionId/:activityId?",
    component: Timer,
    meta: {
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "session",
    path: "/session/:sessionId?",
    component: Session,
    meta: {
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    name: "settings",
    path: "/settings",
    component: Settings,
    meta: {
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "trainer",
    path: "/trainer/:planId",
    component: Trainer,
    meta: {
      requireAuth: true,
      requireAdmin: true,
    },
  },
  {
    name: "group",
    path: "/group",
    component: Group,
    meta: {
      requireAuth: true,
      requireAdmin: true,
    },
  },
  {
    name: "not-found",
    path: "/not-found",
    component: NotFound,
    meta: {
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: {
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

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  if (to.meta.requireAuth && !userStore.isLogged) {
    return "/login";
  }

  if (to.meta.requireAdmin) {
    if (userStore.role === Role.TRAINER) {
      if (
        !["trainer", "group", "settings"].includes(to.name?.toString() ?? "")
      ) {
        return "/not-found";
      }
    } else {
      return "/not-found";
    }
  }
});

export default router;
