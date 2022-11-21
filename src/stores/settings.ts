import { defineStore } from "pinia";
import { getConfiguration, saveConfiguration } from "~/helpers/http";
import { getStorage, saveStorage } from "~/helpers/storage";
import { SettingStorage } from "~/utils";
import { useUserStore } from "./user";

export const useSettingStore = defineStore("settings", {
  state: () => ({
    headerText: "Trainer",
    globalLoading: false,
    audioDisabled: false,
    easyMode: false,
  }),
  getters: {
    getHeaderText(state) {
      return state.headerText;
    },
    isGlobalLoading(state) {
      return state.globalLoading;
    },
    isAudioDisabled(state) {
      return state.audioDisabled;
    },
    isEasyModeEnabled(state) {
      return state.easyMode;
    },
  },
  actions: {
    setHeader(text: string) {
      this.headerText = text;
    },
    loading(status: boolean) {
      this.globalLoading = status;
    },
    toggleAudioEffects(status: boolean) {
      this.audioDisabled = status;
      this.saveSettings();
    },
    toggleEasyMode(status: boolean) {
      this.easyMode = status;
      this.saveSettings();
    },
    async saveSettings() {
      const userStore = useUserStore();
      await saveConfiguration(userStore.token, {
        audioDisabled: this.audioDisabled,
        easyMode: this.easyMode,
      });

      saveStorage("_settings", {
        audioDisabled: this.audioDisabled,
        easyMode: this.easyMode,
      });
    },
    async loadSettings() {
      const userStore = useUserStore();
      const settings = await getConfiguration(userStore.token);

      if (settings) {
        this.audioDisabled = settings.audioDisabled;
        this.easyMode = settings.easyMode;
      }
    },
  },
});
