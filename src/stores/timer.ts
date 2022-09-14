import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

export const useTimerStore = defineStore("timer", {
  state: () => ({
    currentActivity: {} as IActivity,
    nextActivity: {} as IActivity,
    running: false,
  }),
  getters: {
    isRunning(state) {
      return state.running;
    },
    getCurrentActivity(state) {
      return state.currentActivity;
    },
    getNextActivity(state) {
      return state.nextActivity;
    },
  },
  actions: {
    setCurrentActivity(activity: IActivity) {
      this.currentActivity = activity;
    },
    setNextActivity(activity: IActivity) {
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
  },
});
