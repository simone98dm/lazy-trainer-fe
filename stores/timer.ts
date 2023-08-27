import { useActivityStore, useSettingStore } from "~/stores";
import { defineStore } from "pinia";
import { Activity } from "~/models/Activity";

export const useTimerStore = defineStore("timer", {
  state: () => ({
    currentActivity: null as Activity | null,
    nextActivity: null as Activity | null,
    listActivities: [] as Activity[],
    running: false,
    runningTimer: 0,
  }),
  getters: {
    isRunning(state) {
      return state.running;
    },
    isTimerBasedActivity(state) {
      if (state.currentActivity) {
        return state.currentActivity?.time > 0;
      }
      return false;
    },
    hasNextActivity(state) {
      return state.nextActivity !== undefined;
    },
  },
  actions: {
    setListActivities(activities: Activity[] | null) {
      if (activities) {
        this.listActivities = activities;
      }
    },
    setCurrentActivity(activity: Activity | null) {
      this.currentActivity = activity;
      this.runningTimer = activity?.time ?? -1;
    },
    setNextActivity(activity: Activity | null) {
      this.nextActivity = activity;
    },
    stop() {
      this.running = false;
    },
    start() {
      this.running = true;
    },
    toggle() {
      this.running = !this.running;
    },
    reset() {
      this.running = false;
      this.runningTimer = 0;
      this.currentActivity = null;
      this.nextActivity = null;
    },
    async requestChange(sessionId: string) {
      const settingsStore = useSettingStore();
      settingsStore.openLoading();

      const { $workout } = useNuxtApp();
      await $workout.requestActivityChange(this.currentActivity?.id ?? "");

      const activity = useActivityStore();
      if (this.currentActivity) {
        const newActivity = { ...this.currentActivity, requestChange: true };
        activity.addActivity(newActivity);
        this.setCurrentActivity(newActivity);
      }
      settingsStore.dismissLoading();
    },
  },
});
