import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

export const useTimerStore = defineStore("timer", {
  state: () => ({
    currentActivity: {} as IActivity | undefined,
    nextActivity: {} as IActivity | undefined,
    listActivities: [] as IActivity[],
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
    getListActivities(state) {
      return state.listActivities;
    },
  },
  actions: {
    setListActivities(activities: IActivity[] | undefined) {
      if (activities) {
        this.listActivities = activities;
      }
    },
    setCurrentActivity(activity: IActivity | undefined) {
      this.currentActivity = activity;
      this.runningTimer = activity?.time ?? -1;
    },
    setNextActivity(activity: IActivity | undefined) {
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
  },
});
