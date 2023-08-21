import { useActivityStore, useSettingStore } from "~/stores";
import { defineStore } from "pinia";
import { Activity } from "~/models/Activity";

export const useTimerStore = defineStore("timer", {
  state: () => ({
    currentActivity: {} as Activity | undefined,
    nextActivity: {} as Activity | undefined,
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
    getCurrentActivity(state) {
      return state.currentActivity;
    },
    getNextActivity(state) {
      return state.nextActivity;
    },
    currentActivityTimer(state) {
      return state.runningTimer;
    },
    getListActivities(state) {
      return state.listActivities;
    },
    hasNextActivity(state) {
      return state.nextActivity !== undefined;
    },
  },
  actions: {
    setListActivities(activities: Activity[] | undefined) {
      if (activities) {
        this.listActivities = activities;
      }
    },
    setCurrentActivity(activity: Activity | undefined) {
      this.currentActivity = activity;
      this.runningTimer = activity?.time ?? -1;
    },
    setNextActivity(activity: Activity | undefined) {
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
      this.currentActivity = undefined;
      this.nextActivity = undefined;
    },
    async requestChange(sessionId: string) {
      const settingsStore = useSettingStore();
      settingsStore.loading(true);

      const { $workout } = useNuxtApp();
      await $workout.requestActivityChange(this.currentActivity?.id ?? "");

      const activity = useActivityStore();
      if (this.currentActivity) {
        const newActivity = { ...this.currentActivity, requestChange: true };
        activity.addActivity(sessionId, newActivity);
        this.setCurrentActivity(newActivity);
      }
      settingsStore.loading(false);
    },
  },
});
