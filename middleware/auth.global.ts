export default defineNuxtRouteMiddleware(async (to, _) => {
  if (to.name !== "not-found" && to.name !== "login") {
    const user = useSupabaseUser();
    if (to.meta.requireAuth && !user.value) {
      return navigateTo({ name: "login" });
    }
  }
});
