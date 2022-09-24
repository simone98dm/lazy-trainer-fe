import { IPlan } from "./../models/Plan";
import { ISession } from "./../models/Session";
import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

import { retrieve, save } from "./localStoragePlugin";
import { useUserStore } from "./user";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    plan: undefined as IPlan | undefined,
    duplicateWarmup: undefined as IActivity[] | undefined,
    headerText: "Trainer",
  }),
  getters: {
    getSessionActivities: (state) => (sessionId: string) => {
      return state.plan?.sessions
        .find((session) => session.id === sessionId)
        ?.activities.filter((item) => !item.warmup)
        .sort((a, b) => a.order - b.order);
    },
    getWarmUpActivities: (state) => (sessionId: string) => {
      return state.plan?.sessions
        .find((session) => session.id === sessionId)
        ?.activities.filter((item) => item.warmup)
        .sort((a, b) => a.order - b.order);
    },
    getSession: (state) => (sessionId: string) => {
      return state.plan?.sessions.find((session) => session.id === sessionId);
    },
    getWeek(state) {
      return state.plan?.sessions.sort((x, y) =>
        x.dayOfWeek < y.dayOfWeek ? -1 : 1
      );
    },
    getHeaderText(state) {
      return state.headerText;
    },
  },
  actions: {
    restoreSession() {
      const userStore = useUserStore();
      if (userStore.isLogged) {
        if (!this.plan) {
          const storage = retrieve();
          if (!storage) {
            return userStore
              .getUserActivities()
              .then((plan) => (this.plan = plan))
              .then(() => save(this.plan));
          } else {
            this.plan = storage;
            return Promise.resolve(storage);
          }
        } else {
          return Promise.resolve(this.plan);
        }
      }

      return Promise.reject();
    },
    addActivity(sessionId: string, activity: IActivity) {
      if (this.plan) {
        const index =
          this.plan.sessions.findIndex((obj) => obj.id === sessionId) ?? -1;
        if (index >= 0) {
          if (activity.id) {
            const existingActivity =
              this.plan?.sessions[index].activities.findIndex(
                (act) => act.id === activity.id
              ) ?? -1;
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
      }
    },
    removeActivity(sessionId: string, activityId: string) {
      if (this.plan) {
        const index = this.plan.sessions.findIndex(
          (obj) => obj.id === sessionId
        );
        if (index >= 0) {
          if (activityId) {
            const newActivity = this.plan.sessions[index].activities.filter(
              (act) => act.id !== activityId
            );

            this.plan.sessions[index].activities = newActivity;
          }
        }
        save(this.plan);
      }
    },
    addSession(session: ISession) {
      if (this.plan) {
        const existingIndex = this.plan.sessions.findIndex(
          (x) => x.id === session.id
        );
        if (existingIndex < 0) {
          this.plan.sessions.push(session);
          save(this.plan);
        } else {
          this.plan.sessions[existingIndex].dayOfWeek = session.dayOfWeek;
        }
      }
    },
    deleteSession(sessionId: string) {
      if (this.plan) {
        this.plan.sessions = this.plan.sessions.filter(
          (x) => x.id !== sessionId
        );
      }
      save(this.plan);
    },
    setDuplicateWarmup(warmUpActivities: IActivity[] | undefined) {
      if (warmUpActivities) {
        this.duplicateWarmup = warmUpActivities;
      }
    },
    setHeader(str: string) {
      this.headerText = str;
    },
  },
});
