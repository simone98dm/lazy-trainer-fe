import { useActivityStore } from "~/stores";

export default defineNuxtRouteMiddleware(async () => {
  await useActivityStore().restoreSession();
});
