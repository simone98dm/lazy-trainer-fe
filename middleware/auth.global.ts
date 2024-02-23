import { useWorkoutClient } from "~/composable/useWorkoutClient";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.env.VITE_DEV) {
    if (to.name !== "not-found" && to.name !== "login") {
      const {
        data: { session },
      } = await useWorkoutClient().auth.getSession();

      if (to.meta.requireAuth && !session) {
        return navigateTo({ name: "login" });
      }
    }
  }
});
