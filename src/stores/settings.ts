import { defineStore } from "pinia";
import { getStorage, saveStorage } from "~/helpers/storage";
import { SettingStorage } from "~/utils";

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
    saveSettings() {
      saveStorage("_settings", {
        audioDisabled: this.audioDisabled,
        easyMode: this.easyMode,
      });
    },
    loadSettings() {
      const settings = getStorage<SettingStorage>("_settings");
      if (settings) {
        this.audioDisabled = settings.audioDisabled;
        this.easyMode = settings.easyMode;
      }
    },
  },
});
