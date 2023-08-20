import { useSettingStore } from "~/stores";

export default defineNuxtRouteMiddleware(async (to, _) => {
  const settingsStore = useSettingStore();
  settingsStore.setHeader(to.meta.title as string);
});
