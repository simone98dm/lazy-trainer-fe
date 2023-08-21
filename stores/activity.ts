import { useSettingStore, useUserStore } from "~/stores";
import { Plan } from "~/models/Plan";
import { Session } from "~/models/Session";
import { defineStore } from "pinia";
import { Activity } from "~/models/Activity";
import { DataAction, OrderRequest, Role } from "~/utils";
import { v4 as uuid } from "uuid";
import { Completion } from "~/models/Completion";
import { useWorkoutClient } from "~/composable/useWorkoutClient";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    plan: null as Plan | null,
    duplicateActivities: null as Activity[] | null,
    completionDates: null as Completion[] | null,
  }),
  getters: {
    getSessionActivities: (state) => (sessionId: string) => {
      return state.plan?.sessions
        .find((session) => session.id === sessionId)
        ?.activities.filter((item) => !item.warmup)
        .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
    },
    getWarmUpActivities: (state) => (sessionId: string) => {
      return state.plan?.sessions
        .find((session) => session.id === sessionId)
        ?.activities.filter((item) => item.warmup)
        .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
    },
    getSession: (state) => (sessionId: string) => {
      return state.plan?.sessions.find((session) => session.id === sessionId);
    },
    getWeek(state) {
      return state.plan?.sessions.sort((x, y) => (x.dayOfWeek < y.dayOfWeek ? -1 : 1));
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
    getCompletedWorkouts(state): Completion[] | null {
      return state.completionDates;
    },
  },
  actions: {
    async restoreSession() {
      try {
        const { $workout } = useNuxtApp();
        const user = useSupabaseUser();
        this.plan = await $workout.getUserPlan(user.value.id);
        if (!this.plan) {
          this.plan = generateBlankPlan();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async bulkSaveActivities(sessionId: string, activities: Activity[]) {
      for (const activity of activities) {
        await this.addActivity(sessionId, activity);
      }
    },
    async addActivity(sessionId: string, activity: Activity) {
      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();
      settingsStore.loading(true);

      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      const index = this.plan.sessions.findIndex((obj) => obj.id === sessionId) ?? -1;
      if (index >= 0) {
        if (activity.id) {
          const existingActivity =
            this.plan?.sessions[index].activities.findIndex((act) => act.id === activity.id) ?? -1;
          if (existingActivity >= 0) {
            this.plan.sessions[index].activities[existingActivity] = activity;
            await $workout.updateActivity(activity, activity.id);
            settingsStore.loading(false);
          } else {
            activity.order_index = this.plan.sessions[index].activities.length;
            this.plan.sessions[index].activities.push(activity);
            await $workout.addActivity(activity, sessionId);
            settingsStore.loading(false);
          }
        } else {
          activity.order_index = this.plan.sessions[index].activities.length;
          this.plan.sessions[index].activities.push(activity);
          await $workout.addActivity(activity, sessionId);
          settingsStore.loading(false);
        }
      }
    },
    async removeActivity(sessionId: string, activityId: string) {
      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();

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

      await $workout.deleteActivity(activityId);
      settingsStore.loading(false);
    },
    async addSession(session: Session) {
      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();
      settingsStore.loading(true);

      if (session.dayOfWeek === -1 && session.dayOfWeek >= 7) {
        return;
      }

      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      const existingIndex = this.plan.sessions.findIndex((s) => s.id === session.id);

      if (existingIndex < 0) {
        if (!this.getMissingDays.includes(session.dayOfWeek)) {
          return;
        }
        this.plan.sessions.push(session);
        await $workout.addSession(this.plan.id, {
          id: session.id,
          dayOfWeek: session.dayOfWeek,
          activities: session.activities,
        });
      } else {
        this.plan.sessions[existingIndex].dayOfWeek = session.dayOfWeek;
        await $workout.updateSession(this.plan.id, {
          id: session.id,
          dayOfWeek: session.dayOfWeek,
        });
      }
      settingsStore.loading(false);
    },
    async deleteSession(sessionId: string) {
      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();
      settingsStore.loading(true);

      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      this.plan.sessions = this.plan.sessions.filter((x) => x.id !== sessionId);
      await $workout.deleteSession(sessionId);
      settingsStore.loading(false);
    },
    setDuplicateWarmup(activitiesToDuplicate: Activity[] | undefined) {
      if (activitiesToDuplicate) {
        this.duplicateActivities = activitiesToDuplicate.map((activity) => ({
          ...activity,
          id: uuid(),
        }));
      }
    },
    async getUserActivities(planId: string) {
      const { $workout } = useNuxtApp();
      const plan = await $workout.getPlan(planId);

      if (plan) {
        this.plan = plan;
      }

      return plan?.sessions
        .sort((x: Session, y: Session) => (x.dayOfWeek < y.dayOfWeek ? -1 : 1))
        .map(parseSessions);
    },
    async moveActivity(
      sessionId: string | undefined,
      listActivities: Activity[],
      isWarmup: boolean
    ) {
      if (!sessionId) {
        return;
      }

      if (this.plan) {
        const sessionIndex = this.plan.sessions.findIndex((session) => session.id === sessionId);
        if (sessionIndex >= 0) {
          const activities = this.plan.sessions[sessionIndex].activities;

          const warmUp = activities.filter((x) => x.warmup);
          const workout = activities.filter((x) => !x.warmup);
          const newList = [];
          if (isWarmup) {
            newList.push(...listActivities, ...workout);
          } else {
            newList.push(...warmUp, ...listActivities);
          }
          this.plan.sessions[sessionIndex].activities = newList;

          let externalIndex = 0;

          this.plan.sessions.map((session) => {
            session.activities.map((activity) => {
              activity.order_index = externalIndex;
              externalIndex++;
            });
          });

          const { $workout } = useNuxtApp();
          const settingsStore = useSettingStore();
          settingsStore.loading(true);

          const data = this.plan.sessions[sessionIndex].activities.map(
            (item) =>
              ({
                id: item.id,
                order_index: item.order_index,
              } as OrderRequest)
          );
          await $workout.sortActivities(data);
          settingsStore.loading(false);
        }
      }
    },
    async sync() {
      const { $workout } = useNuxtApp();
      const settingsStore = useSettingStore();
      settingsStore.loading(true);
      const user = useSupabaseUser();
      this.plan = await $workout.getUserPlan(user.value.id);
      if (!this.plan) {
        this.plan = generateBlankPlan();
      }
      settingsStore.loading(false);
    },
    async completeSession(sessionId: string) {
      const settingsStore = useSettingStore();
      settingsStore.loading(true);
      const user = useSupabaseUser();
      const { $workout } = useNuxtApp();
      await $workout.completeWorkout(user.value.id);
      const d = new Date();
      if (!this.completionDates) {
        this.completionDates = [];
      }
      const alradyExists = this.completionDates?.find((x) =>
        checkCompleteDate(
          x.stats.completion.map((k) => new Date(k)),
          d
        )
      );
      if (!alradyExists) {
        this.completionDates.map((x) => x.stats.completion.push(d.toISOString()));
      }
      settingsStore.loading(false);
    },
    async retrieveUserStats() {
      const settingsStore = useSettingStore();
      settingsStore.loading(true);
      const user = useSupabaseUser();
      const { $workout } = useNuxtApp();
      this.completionDates = await $workout.getUserStats([user.value.id]);
      settingsStore.loading(false);
    },
  },
});

function checkCompleteDate(completionDates: Date[], currentDate: Date) {
  return completionDates.filter(
    (date) =>
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
  );
}
