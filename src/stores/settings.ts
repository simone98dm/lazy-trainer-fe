import { useUserStore } from "./user";
import { defineStore } from "pinia";
import { Role } from "../utils";

export const useSettingStore = defineStore("settings", {
  state: () => ({
    headerText: "Trainer",
  }),
  getters: {
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
