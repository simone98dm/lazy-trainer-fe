import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

import fakeData from "../assets/db.json";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    plan: fakeData,
  }),
  getters: {
    getSessionActivities: (state) => (sessionId: string) => {
      return state.plan.sessions.find((session) => session.id === sessionId)
        ?.activities;
    },
    getSession: (state) => (sessionId: string) => {
      return state.plan.sessions.find((session) => session.id === sessionId);
    },
    getWeek(state) {
      return state.plan.sessions;
    },
  },
  actions: {
    addActivity(sessionId: string, activity: IActivity) {
      const index = this.plan.sessions.findIndex((obj) => obj.id === sessionId);
      if (index >= 0) {
        if (activity.id) {
          const existingActivity = this.plan.sessions[
            index
          ].activities.findIndex((act) => act.id === activity.id);
          if (existingActivity >= 0) {
            this.plan.sessions[index].activities[existingActivity] = activity;
          } else {
            this.plan.sessions[index].activities.push(activity);
          }
        } else {
          this.plan.sessions[index].activities.push(activity);
        }
      }
    },
    removeActivity(sessionId: string, activityId: string) {
      const index = this.plan.sessions.findIndex((obj) => obj.id === sessionId);
      console.log("🚀 ~ file: activity.ts ~ line 42 ~ removeActivity ~ index", index)
      if (index >= 0) {
        if (activityId) {
          console.log("🚀 ~ file: activity.ts ~ line 45 ~ removeActivity ~ activityId", activityId)
          const newActivity = this.plan.sessions[index].activities.filter(
            (act) => act.id !== activityId
          );

          this.plan.sessions[index].activities = newActivity;
        }
      }
    },
  },
});
