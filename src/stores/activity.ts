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
      return state.plan.sessions
        .find((session) => session.id === sessionId)
        ?.activities.filter((item) => !item.warmup)
        .sort((a, b) => a.order - b.order);
    },
    getWarmUpActivities: (state) => (sessionId: string) => {
      return state.plan.sessions
        .find((session) => session.id === sessionId)
        ?.activities.filter((item) => item.warmup)
        .sort((a, b) => a.order - b.order);
    },
    getSession: (state) => (sessionId: string) => {
      return state.plan.sessions.find((session) => session.id === sessionId);
    },
    getWeek(state) {
      return state.plan.sessions.sort((x, y) =>
        x.dayOfWeek < y.dayOfWeek ? -1 : 1
      );
    },
  },
  actions: {
    restoreSession() {
      this.plan = fakeData;
      const existingData = retrieve();
      if (existingData) {
        this.plan = existingData;
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
            activity.order = this.plan.sessions[index].activities.length;
            this.plan.sessions[index].activities.push(activity);
          }
        } else {
          activity.order = this.plan.sessions[index].activities.length;
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
      const existingIndex = this.plan.sessions.findIndex(
        (x) => x.dayOfWeek === session.dayOfWeek
      );
      if (existingIndex < 0) {
        this.plan.sessions.push(session);
        save(this.plan);
      }
    },
    deleteSession(sessionId: string) {
      this.plan.sessions = this.plan.sessions.filter((x) => x.id !== sessionId);
      save(this.plan);
    },
  },
});
