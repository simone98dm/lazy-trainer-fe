import { defineStore } from "pinia";
import { getStorage, saveStorage } from "~/helpers/storage";

export const useSettingStore = defineStore("settings", {
  state: () => ({
    headerText: "Trainer",
    globalLoading: false,
    audioDisabled: false,
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
  },
  actions: {
    setHeader(text: string) {
      this.headerText = text;
    },
    loading(status: boolean) {
      this.globalLoading = status;
    },
    disableAudio(status: boolean) {
      this.audioDisabled = status;
      this.saveSettings();
    },
    saveSettings() {
      saveStorage("_settings", {
        audioDisabled: this.audioDisabled,
      });
    },
    loadSettings() {
      const settings = getStorage<{ audioDisabled: boolean }>("_settings");
      if (settings) {
        this.audioDisabled = settings.audioDisabled;
      }
    },
  },
});
