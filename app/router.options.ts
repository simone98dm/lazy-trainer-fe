import { type RouterConfig } from "nuxt/schema";

export const routes = [
  {
    name: "home",
    path: "/:plan?",
    component: () => import("~/pages/index.vue"),
    meta: {
      title: "Home",
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "details",
    path: "/details/:session",
    component: () => import("~/pages/details.vue"),
    meta: {
      title: "Details",
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "timer",
    path: "/timer",
    component: () => import("~/pages/timer.vue"),
    meta: {
      title: "Timer",
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "edit",
    path: "/edit/:session?",
    component: () => import("~/pages/edit.vue"),
    meta: {
      title: "Edit",
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "login",
    path: "/login",
    component: () => import("~/pages/login.vue"),
    meta: {
      title: "Login",
      requireAuth: false,
      requireAdmin: false,
      layout: "empty",
      hideHeader: true,
      hideFooter: true,
    },
  },
  {
    name: "settings",
    path: "/settings",
    component: () => import("~/pages/settings.vue"),
    meta: {
      title: "Settings",
      requireAuth: true,
      requireAdmin: false,
    },
  },
  {
    name: "not-found",
    path: "/not-found",
    component: () => import("~/pages/notfound.vue"),
    meta: {
      title: "Not Found",
      hideHeader: true,
      hideFooter: true,
      layout: "empty",
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("~/pages/notfound.vue"),
    meta: {
      requireAuth: false,
      requireAdmin: false,
      layout: "empty",
      hideHeader: true,
      hideFooter: true,
    },
  },
  {
    name: "about",
    path: "/about",
    component: () => import("~/pages/about.vue"),
    meta: {
      title: "About",
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    name: "license",
    path: "/license",
    component: () => import("~/pages/license.vue"),
    meta: {
      title: "Licence",
      requireAuth: false,
      requireAdmin: false,
    },
  },
  {
    path: "/home",
    name: "landing",
    component: () => import("~/pages/landing.vue"),
    meta: {
      title: "Home",
      requireAuth: false,
      requireAdmin: false,
      layout: "empty",
      hideFooter: true,
      hideHeader: true,
    },
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () => import("~/pages/privacy-policy.vue"),
    meta: {
      title: "Privacy Policy",
      requireAuth: false,
      requireAdmin: false,
    },
  },
];

// const router = createRouter({
//   routes: routes,
//   history: createWebHistory(),
//   linkExactActiveClass: "dark:bg-slate-700 bg-slate-100 text-green-600 dark:text-green-300",
// });

export default {
  routes: () => routes,
} as RouterConfig;
