import { createRouter, createWebHistory, RouteComponent } from "vue-router";
import { useUserStore } from "../stores/user";
import { Role } from "../utils/enum";

const Home = (): Promise<RouteComponent> => import("../views/Home.vue");
const Details = (): Promise<RouteComponent> => import("../views/Details.vue");
const Activity = (): Promise<RouteComponent> => import("../views/Activity.vue");
const Timer = (): Promise<RouteComponent> => import("../views/Timer.vue");
const Session = (): Promise<RouteComponent> => import("../views/Session.vue");
const Login = (): Promise<RouteComponent> => import("../views/Login.vue");
const Settings = (): Promise<RouteComponent> => import("../views/Settings.vue");
const Group = (): Promise<RouteComponent> => import("../views/Group.vue");
const NotFound = (): Promise<RouteComponent> => import("../views/NotFound.vue");
const About = (): Promise<RouteComponent> => import("../views/About.vue");
const License = (): Promise<RouteComponent> => import("../views/License.vue");

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
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    path: "/license",
    name: "license",
    component: License,
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

router.beforeEach((to) => {
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
