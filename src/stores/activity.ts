import { IPlan } from "./../models/Plan";
import { ISession } from "./../models/Session";
import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

import fakeData from "../assets/db.json";
import { retrieve, save } from "./localStoragePlugin";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    plan: {} as IPlan,
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
    restoreSession() {
      retrieve();
      if (this.plan.name === undefined) {
        this.plan = fakeData;
      }
    },
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
      save(this.plan);
    },
    removeActivity(sessionId: string, activityId: string) {
      const index = this.plan.sessions.findIndex((obj) => obj.id === sessionId);
      if (index >= 0) {
        if (activityId) {
          const newActivity = this.plan.sessions[index].activities.filter(
            (act) => act.id !== activityId
          );

          this.plan.sessions[index].activities = newActivity;
        }
      }
      save(this.plan);
    },
    addSession(session: ISession) {
      this.plan.sessions.push(session);
      save(this.plan);
    },
    deleteSession(sessionId: string) {
      this.plan.sessions = this.plan.sessions.filter((x) => x.id !== sessionId);
      save(this.plan);
    },
  },
});
