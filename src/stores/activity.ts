import { IPlan } from "./../models/Plan";
import { ISession } from "./../models/Session";
import { defineStore } from "pinia";
import { IActivity } from "../models/Activity";

import { retrieve, save } from "./localStoragePlugin";
import { useUserStore } from "./user";
import { v4 as uuid } from "uuid";
import { getPlan, getUserActivities, sendToTrainer } from "./httpClient";

function generateBlankPlan(): IPlan {
  return {
    id: uuid(),
    name: "New plan",
    sessions: [],
    trainerId: "",
  };
}

enum DataAction {
  SESSION_DELETE,
  SESSION_UPDATE,
  SESSION_CREATE,
  ACTIVITY_DELETE,
  ACTIVITY_UPDATE,
  ACTIVITY_CREATE,
}

export const useActivityStore = defineStore("activity", {
  state: () => ({
    plan: undefined as IPlan | undefined,
    duplicateWarmup: undefined as IActivity[] | undefined,
  }),
  getters: {
    getSessionActivities: (state) => (sessionId: string) => {
      return state.plan?.sessions
        .find((session) => session.id === sessionId)
        ?.activities.filter((item) => !item.warmup)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },
    getWarmUpActivities: (state) => (sessionId: string) => {
      return state.plan?.sessions
        .find((session) => session.id === sessionId)
        ?.activities.filter((item) => item.warmup)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    },
    getSession: (state) => (sessionId: string) => {
      return state.plan?.sessions.find((session) => session.id === sessionId);
    },
    getWeek(state) {
      return state.plan?.sessions.sort((x, y) =>
        x.dayOfWeek < y.dayOfWeek ? -1 : 1
      );
    },
  },
  actions: {
    restoreSession() {
      const userStore = useUserStore();
      if (userStore.isLogged) {
        if (!this.plan) {
          const storage = retrieve();
          if (!storage) {
            try {
              return getPlan(userStore.token).then((plan) => {
                if (plan.error) {
                  this.plan = generateBlankPlan();
                } else {
                  this.plan = plan;
                }
                save(this.plan);
              });
            } catch (error) {
              console.error(error);
            }

            this.plan = generateBlankPlan();
            save(this.plan);
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
    async addActivity(sessionId: string, activity: IActivity) {
      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      const index =
        this.plan.sessions.findIndex((obj) => obj.id === sessionId) ?? -1;
      if (index >= 0) {
        const user = useUserStore();
        if (activity.id) {
          const existingActivity =
            this.plan?.sessions[index].activities.findIndex(
              (act) => act.id === activity.id
            ) ?? -1;
          if (existingActivity >= 0) {
            this.plan.sessions[index].activities[existingActivity] = activity;

            await sendToTrainer(user.token, {
              data: activity,
              activityId: activity.id,
              action: DataAction.ACTIVITY_UPDATE,
            });
          } else {
            activity.order = this.plan.sessions[index].activities.length;
            this.plan.sessions[index].activities.push(activity);

            await sendToTrainer(user.token, {
              data: activity,
              sessionId,
              action: DataAction.ACTIVITY_CREATE,
            });
          }
        } else {
          activity.order = this.plan.sessions[index].activities.length;
          this.plan.sessions[index].activities.push(activity);

          await sendToTrainer(user.token, {
            data: activity,
            sessionId,
            action: DataAction.ACTIVITY_CREATE,
          });
        }
      }

      save(this.plan);
    },
    async removeActivity(sessionId: string, activityId: string) {
      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      const index = this.plan.sessions.findIndex((obj) => obj.id === sessionId);
      if (index >= 0) {
        if (activityId) {
          const newActivity = this.plan.sessions[index].activities.filter(
            (act) => act.id !== activityId
          );

          this.plan.sessions[index].activities = newActivity;
        }
      }

      const user = useUserStore();

      await sendToTrainer(user.token, {
        activityId,
        action: DataAction.ACTIVITY_DELETE,
      });

      save(this.plan);
    },
    async addSession(session: ISession) {
      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      const existingIndex = this.plan.sessions.findIndex(
        (s) => s.id === session.id
      );

      const user = useUserStore();
      if (existingIndex < 0) {
        this.plan.sessions.push(session);

        await sendToTrainer(user.token, {
          data: session,
          planId: this.plan.id,
          action: DataAction.SESSION_CREATE,
        });
      } else {
        this.plan.sessions[existingIndex].dayOfWeek = session.dayOfWeek;

        await sendToTrainer(user.token, {
          data: session,
          sessionId: session.id,
          action: DataAction.SESSION_UPDATE,
        });
      }

      save(this.plan);
    },
    async deleteSession(sessionId: string) {
      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      this.plan.sessions = this.plan.sessions.filter((x) => x.id !== sessionId);

      const user = useUserStore();

      await sendToTrainer(user.token, {
        sessionId,
        action: DataAction.SESSION_DELETE,
      });

      save(this.plan);
    },
    setDuplicateWarmup(warmUpActivities: IActivity[] | undefined) {
      if (warmUpActivities) {
        this.duplicateWarmup = warmUpActivities;
      }
    },
    async getUserActivities(id: string) {
      const userStore = useUserStore();
      return await getUserActivities(userStore.token, id).then((plan) => {
        if (plan.error) {
          this.plan = generateBlankPlan();
        } else {
          this.plan = plan;
        }
        return plan;
      });
    },
  },
});
