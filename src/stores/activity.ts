import { useSettingStore } from "./settings";
import { useUserStore } from "./user";
import { IPlan } from "~/models/Plan";
import { ISession } from "~/models/Session";
import { defineStore } from "pinia";
import { IActivity } from "~/models/Activity";
import { DataAction, parseSessions } from "~/utils";
import { getStorage, saveStorage } from "~/helpers/storage";
import { v4 as uuid } from "uuid";
import { getPlan, getUserActivities, sendToTrainer } from "~/helpers/http";

function generateBlankPlan(): IPlan {
  return {
    id: uuid(),
    name: "New plan",
    sessions: [],
    trainerId: "",
  };
}

export const useActivityStore = defineStore("activity", {
  state: () => ({
    plan: undefined as IPlan | undefined,
    duplicateActivities: undefined as IActivity[] | undefined,
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
    getMissingDays(state) {
      const days = state.plan?.sessions.map((item) => item.dayOfWeek);
      const missingDays = [];
      for (let i = 0; i < 7; i++) {
        if (!days?.includes(i)) {
          missingDays.push(i);
        }
      }
      return missingDays;
    },
  },
  actions: {
    restoreSession() {
      const userStore = useUserStore();
      if (userStore.isLogged) {
        if (!this.plan) {
          const storage = getStorage<IPlan>("_plan");
          if (!storage) {
            try {
              return getPlan(userStore.token).then((plan) => {
                if (plan.error) {
                  this.plan = generateBlankPlan();
                } else {
                  this.plan = plan;
                }
                saveStorage("_plan", this.plan);
              });
            } catch (error) {
              console.error(error);
            }

            this.plan = generateBlankPlan();
            saveStorage("_plan", this.plan);
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
    async bulkSaveActivities(sessionId: string, activities: IActivity[]) {
      for (const activity of activities) {
        await this.addActivity(sessionId, activity);
      }
    },
    async addActivity(sessionId: string, activity: IActivity) {
      const settingsStore = useSettingStore();
      const userStore = useUserStore();
      settingsStore.loading(true);

      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

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

            await sendToTrainer(userStore.token, {
              data: activity,
              activityId: activity.id,
              action: DataAction.ACTIVITY_UPDATE,
            }).then(() => settingsStore.loading(false));
          } else {
            activity.order = this.plan.sessions[index].activities.length;
            this.plan.sessions[index].activities.push(activity);

            await sendToTrainer(userStore.token, {
              data: activity,
              sessionId,
              action: DataAction.ACTIVITY_CREATE,
            }).then(() => settingsStore.loading(false));
          }
        } else {
          activity.order = this.plan.sessions[index].activities.length;
          this.plan.sessions[index].activities.push(activity);

          await sendToTrainer(userStore.token, {
            data: activity,
            sessionId,
            action: DataAction.ACTIVITY_CREATE,
          }).then(() => settingsStore.loading(false));
        }
      }

      saveStorage("_plan", this.plan);
    },
    async removeActivity(sessionId: string, activityId: string) {
      const settingsStore = useSettingStore();
      const userStore = useUserStore();

      settingsStore.loading(true);

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

      await sendToTrainer(userStore.token, {
        activityId,
        action: DataAction.ACTIVITY_DELETE,
      }).then(() => settingsStore.loading(false));

      saveStorage("_plan", this.plan);
    },
    async addSession(session: ISession) {
      const settingsStore = useSettingStore();
      const userStore = useUserStore();
      settingsStore.loading(true);

      if (session.dayOfWeek === -1 && session.dayOfWeek >= 7) {
        return;
      }

      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      const existingIndex = this.plan.sessions.findIndex(
        (s) => s.id === session.id
      );

      if (existingIndex < 0) {
        if (!this.getMissingDays.includes(session.dayOfWeek)) {
          return;
        }

        this.plan.sessions.push(session);

        await sendToTrainer(userStore.token, {
          data: {
            id: session.id,
            dayOfWeek: session.dayOfWeek,
            warmup: session.activities,
          },
          planId: this.plan.id,
          action: DataAction.SESSION_CREATE,
        }).then(() => settingsStore.loading(false));
      } else {
        this.plan.sessions[existingIndex].dayOfWeek = session.dayOfWeek;

        await sendToTrainer(userStore.token, {
          data: {
            id: session.id,
            dayOfWeek: session.dayOfWeek,
          },
          sessionId: session.id,
          action: DataAction.SESSION_UPDATE,
        }).then(() => settingsStore.loading(false));
      }

      saveStorage("_plan", this.plan);
    },
    async deleteSession(sessionId: string) {
      const settingsStore = useSettingStore();
      const userStore = useUserStore();
      settingsStore.loading(true);

      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      this.plan.sessions = this.plan.sessions.filter((x) => x.id !== sessionId);

      await sendToTrainer(userStore.token, {
        sessionId,
        action: DataAction.SESSION_DELETE,
      }).then(() => settingsStore.loading(false));

      saveStorage("_plan", this.plan);
    },
    setDuplicateWarmup(activitiesToDuplicate: IActivity[] | undefined) {
      if (activitiesToDuplicate) {
        this.duplicateActivities = activitiesToDuplicate.map((activity) => ({
          ...activity,
          id: uuid(),
        }));
      }
    },
    async getUserActivities(id: string) {
      const userStore = useUserStore();
      return await getUserActivities(userStore.token, id)
        .then((plan) => {
          if (plan.error) {
            this.plan = generateBlankPlan();
          } else {
            this.plan = plan;
          }
          return plan;
        })
        .then((plan) =>
          plan.sessions
            .sort((x: ISession, y: ISession) =>
              x.dayOfWeek < y.dayOfWeek ? -1 : 1
            )
            .map(parseSessions)
        );
    },
    moveActivity(
      sessionId: string | undefined,
      newIndex: number,
      oldIndex: number
    ) {
      if (!sessionId) {
        return;
      }

      if (this.plan) {
        const sessionIndex = this.plan.sessions.findIndex(
          (session) => session.id === sessionId
        );
        if (sessionIndex >= 0) {
          const existingActivity =
            this.plan.sessions[sessionIndex].activities[oldIndex];
          if (existingActivity) {
            this.plan.sessions[sessionIndex].activities.splice(oldIndex, 1);
            this.plan.sessions[sessionIndex].activities.splice(
              newIndex,
              0,
              existingActivity
            );

            let externalIndex = 0;

            this.plan.sessions.map((session) => {
              session.activities.map((activity) => {
                activity.order = externalIndex;
                externalIndex++;
              });
            });

            saveStorage("_plan", this.plan);
            this.addActivity(sessionId, {
              ...existingActivity,
              order: newIndex,
            });
          }
        }
      }
    },
    async sync() {
      const userStore = useUserStore();
      this.plan = await getPlan(userStore.token);
      if (!this.plan) {
        generateBlankPlan();
      }
    },
  },
});
