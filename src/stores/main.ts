import { IPlan } from './../models/Plan';
import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

import fakeData from "../assets/db.json";

export const useStore = defineStore("main", {
  state: () => ({
    plan: fakeData as IPlan,
  }),
  getters: {
    getActivities(state) {
      return state.plan.data;
    },
  },
  actions: {
    addActivity(activity: IActivity) {
    },
    removeActivity(a: IActivity) {
    },
  },
});
