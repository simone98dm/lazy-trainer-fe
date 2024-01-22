import { useWorkoutClient } from "~/composable/useWorkoutClient";

export default defineNuxtRouteMiddleware(async (to, _) => {
  if (to.name !== "not-found" && to.name !== "login") {
    const client = useWorkoutClient();
    const user = await client.auth.getUser();
    if (to.meta.requireAuth && !user.data.user) {
      return navigateTo({ name: "login" });
    }
  }
});
