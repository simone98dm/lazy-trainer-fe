import { IPlan } from "./../models/Plan";
import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

import fakeData from "../assets/db.json";

export const useStore = defineStore("main", {
  state: () => ({
    plan: fakeData as IPlan,
  }),
  getters: {
    getActivities: (state) => (dayOfWeek: number) => {
      return state.plan.data.find((session) => session.dayOfWeek === dayOfWeek)
        ?.activities;
    },
    getWeek(state) {
      return state.plan.data;
    },
  },
  actions: {
    addActivity(dayOfWeek: number, activity: IActivity) {
      if (!this.plan.data[dayOfWeek]) {
        this.plan.data[dayOfWeek] = {
          dayOfWeek,
          activities: [],
        };
      }
      this.plan.data[dayOfWeek].activities.push(activity);
    },
    removeActivity(dayOfWeek: number, activity: IActivity) {
      if (this.plan.data[dayOfWeek]) {
        this.plan.data[dayOfWeek].activities = this.plan.data[
          dayOfWeek
        ].activities.filter((act) => act.id === activity.id);
      }
    },
  },
});
