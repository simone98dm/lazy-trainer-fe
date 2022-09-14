import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

import fakeData from "../assets/db.json";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    plan: fakeData,
  }),
  getters: {
    getSessionActivities: (state) => (sessionId: string) => {
      return state.plan.sessions.find((session) => session.id === sessionId)?.activities;
    },
    getSession: (state) => (sessionId: string) => {
      return state.plan.sessions.find((session) => session.id === sessionId);
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
