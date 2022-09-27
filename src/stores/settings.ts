import { useUserStore } from "./user";
import { defineStore } from "pinia";
import { Role } from "../utils";

export const useSettingStore = defineStore("settings", {
  state: () => ({
    headerText: "Trainer",
    globalLoading: false,
  }),
  getters: {
    getHeaderText(state) {
      return state.headerText;
    },
    isGlobalLoading(state) {
      return state.globalLoading;
    },
  },
  actions: {
    setHeader(text: string) {
      this.headerText = text;
    },
    loading(status: boolean) {
      this.globalLoading = status;
    },
  },
});
