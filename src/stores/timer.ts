import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

export const useTimerStore = defineStore("timer", {
  state: () => ({
    currentActivity: {} as IActivity,
    nextActivity: {} as IActivity,
    running: false,
    runningTimer: 0,
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
    currentActivityTimer(state) {
      return state.runningTimer;
    },
  },
  actions: {
    setCurrentActivity(activity: IActivity | undefined) {
      if (activity) {
        this.currentActivity = activity;
        this.runningTimer = activity.time;
      }
    },
    setNextActivity(activity: IActivity | undefined) {
      if (activity) {
        this.nextActivity = activity;
      }
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
