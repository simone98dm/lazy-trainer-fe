export default defineNuxtRouteMiddleware(async (to, from) => {
  to.meta.prevPage = from.fullPath;
});
