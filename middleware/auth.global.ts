import { useWorkoutClient } from "~/composable/useWorkoutClient";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.name !== "not-found" && to.name !== "login") {
    const client = useWorkoutClient();
    const {
      data: { session },
    } = await client.auth.getSession();

    if (to.meta.requireAuth && !session) {
      return navigateTo({ name: "login" });
    }
  }
});
