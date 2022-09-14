import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

import fakeData from "../assets/db.json";

export const useStore = defineStore("main", {
  state: () => ({
    plan: fakeData,
  }),
  getters: {
    getActivities: (state) => (id: string) => {
      return state.plan.sessions.find((session) => session.id === id)?.activities;
    },
    getSession: (state) => (id: string) => {
      return state.plan.sessions.find((session) => session.id === id);
    },
    getWeek(state) {
      return state.plan.sessions;
    },
  },
  actions: {
    addActivity(id: string, activity: IActivity) {
      const index = this.plan.sessions.findIndex((obj) => obj.id === id);
      if (index >= 0) {
        this.plan.sessions[index].activities.push(activity);
      }
    },
    removeActivity(dayOfWeek: number, activity: IActivity) {
      if (this.plan.sessions[dayOfWeek]) {
        this.plan.sessions[dayOfWeek].activities = this.plan.sessions[
          dayOfWeek
        ].activities.filter((act) => act.id === activity.id);
      }
    },
  },
});
