import { useWorkoutClient } from "~/composable/useWorkoutClient";

export default defineNuxtRouteMiddleware(async (to) => {
  // const c = useCookie("user_session");
  // if (c.value) {
  //   const [access_token, refresh_token] = c.value!.split(":");
  //   useWorkoutClient().auth.setSession({ access_token, refresh_token });
  // }

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
