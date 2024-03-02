import { useSettingStore } from "~/stores";

export default defineNuxtRouteMiddleware(async (to) => {
  const settingsStore = useSettingStore();
  settingsStore.setHeader(to.meta.title as string);
});
