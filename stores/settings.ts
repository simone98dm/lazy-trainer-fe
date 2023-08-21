import { defineStore } from "pinia";
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
      if (document) {
        if (this.darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      this.saveSettings();
    },
    async saveSettings() {
      const userSettings = {
        audioDisabled: this.audioDisabled,
        easyMode: this.easyMode,
        darkMode: this.darkMode,
      };

      const { $user } = useNuxtApp();
      const { user } = useUserStore();
      await $user.saveConfiguration(user.id, userSettings);

      await saveStorage("_settings", userSettings);
    },
    async loadSettings() {
      const userStore = useUserStore();

      if (userStore.user) {
        this.audioDisabled = userStore.user.configurations?.audioDisabled ?? false;
        this.easyMode = userStore.user.configurations?.easyMode ?? false;
        this.darkMode = userStore.user.configurations?.darkMode ?? false;

        if (document) {
          if (this.darkMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      }
    },
  },
});
