import { defineStore } from "pinia";
import { getConfiguration, saveConfiguration } from "~/helpers/http";
import { saveStorage } from "~/helpers/storage";
import { useUserStore } from "./user";

export const useSettingStore = defineStore("settings", {
  state: () => ({
    headerText: "Lazy Trainer",
    globalLoading: false,
    audioDisabled: false,
    easyMode: false,
    darkMode: undefined || false,
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
    isDarkModeEnabled(state) {
      return state.darkMode;
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
    toggleDarkMode(theme?: boolean) {
      if (theme) {
        this.darkMode = theme;
      } else {
        this.darkMode = !this.darkMode;
      }
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      this.saveSettings();
    },
    async saveSettings() {
      const userStore = useUserStore();

      const userSettings = {
        audioDisabled: this.audioDisabled,
        easyMode: this.easyMode,
        darkMode: this.darkMode,
      };

      await saveConfiguration(userStore.token, userSettings);
      await saveStorage("_settings", userSettings);
    },
    async loadSettings() {
      const userStore = useUserStore();
      const settings = await getConfiguration(userStore.token);

      if (settings) {
        this.audioDisabled = settings.audioDisabled;
        this.easyMode = settings.easyMode;
        this.darkMode = settings.darkMode;
        if (this.darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    },
  },
});
