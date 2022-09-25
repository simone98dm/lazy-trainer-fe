import { useUserStore } from "./user";
import { defineStore } from "pinia";

export const useSettingStore = defineStore("settings", {
  state: () => ({
    headerText: "Trainer",
  }),
  getters: {
    getBaseColor(state) {
      const user = useUserStore();
      if (user.role === 1) {
        return "bg-orange-600";
      }
      return "bg-indigo-600";
    },
    getHeaderText(state) {
      return state.headerText;
    },
  },
  actions: {
    setHeader(text: string) {
      this.headerText = text;
    },
  },
});
