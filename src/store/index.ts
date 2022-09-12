import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

export const useStore = defineStore("main", {
  state: () => ({
    activity: [] as IActivity[],
  }),
  getters: {
    getActivities(state) {
      return state.activity;
    },
  },
  actions: {
    addActivity(activity: IActivity) {
      this.activity.push(activity);
    },
    removeActivity(a: IActivity) {
      this.activity = this.activity.filter((activity) => activity.id !== a.id);
    },
  },
});
