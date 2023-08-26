import { useSettingStore } from "~/stores";
import { Plan } from "~/models/Plan";
import { Session } from "~/models/Session";
import { defineStore } from "pinia";
import { Activity } from "~/models/Activity";
import { OrderRequest } from "~/utils";
import { Completion } from "~/models/Completion";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    plan: null as Plan | null,
    completionDates: null as Completion[] | null,
    selectedSession: null as Session | null,
    selectedActivity: null as Activity | null,
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
    getActivity: (state) => (activityId: string) => {
      const activities = state.plan?.sessions.map((x) => x.activities).flat();
      return activities?.find((activity) => activity.id === activityId);
    },
    sortedWeek(state) {
      return state.plan?.sessions.sort((x, y) => (x.dayOfWeek < y.dayOfWeek ? -1 : 1));
    },
    missingDays(state) {
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
    async restoreSession() {
      try {
        const { $workout } = useNuxtApp();
        const user = useSupabaseUser();
        if (user.value) {
          this.plan = await $workout.getUserPlan(user.value?.id);
        }
        if (!this.plan) {
          this.plan = generateBlankPlan();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async bulkSaveActivities(sessionId: string, activities: Activity[]) {
      for (const activity of activities) {
        await this.addActivity({ ...activity, sessionId });
      }
    },
    async addActivity(activity: Activity) {
      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();
      settingsStore.loading(true);

      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      const data = await $workout.addActivity(activity);

      if (data) {
        this.plan.sessions.find((x) => x.id === activity.id)?.activities.push(data);
      }

      settingsStore.loading(false);
      return data;
    },
    async deleteActivity(activityId?: string) {
      if (activityId) {
        const settingsStore = useSettingStore();
        const { $workout } = useNuxtApp();
        settingsStore.loading(true);
        await $workout.deleteActivity(activityId);
        settingsStore.loading(false);
      }
      this.selectedActivity = null;
    },
    async updateActivity(activity: Activity) {
      if (activity.id) {
        const settingsStore = useSettingStore();
        const { $workout } = useNuxtApp();
        settingsStore.loading(true);
        await $workout.updateActivity(activity, activity.id);
        settingsStore.loading(false);
      }
    },
    async addSession(session: Session | null) {
      if (!session) {
        return;
      }

      if (session.dayOfWeek === -1 && session.dayOfWeek >= 7) {
        return;
      }

      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();
      settingsStore.loading(true);
      const data = await $workout.addSession({ ...session, planId: this.plan?.id });
      settingsStore.loading(false);
      return data;
    },
    async deleteSession(sessionId?: string) {
      if (sessionId) {
        const settingsStore = useSettingStore();
        const { $workout } = useNuxtApp();
        settingsStore.loading(true);
        await $workout.deleteSession(sessionId);
        settingsStore.loading(false);
      }
      this.selectedSession = null;
    },
    async updateSession(session: Session) {
      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();
      settingsStore.loading(true);
      await $workout.updateSession(session, session.id);
      settingsStore.loading(false);
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
    async completeSession() {
      const settingsStore = useSettingStore();
      settingsStore.loading(true);
      const user = useSupabaseUser();
      const { $workout } = useNuxtApp();
      if (user.value) {
        await $workout.completeWorkout(user.value.id);
      }
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
      const { $workout } = useNuxtApp();
      const user = useSupabaseUser();
      if (user.value) {
        this.completionDates = await $workout.getUserStats([user.value.id]);
      }
      settingsStore.loading(false);
    },
    setSelectedSession(session: Session | null) {
      this.selectedSession = session;
    },
    setSelectedActivity(activity: Activity | null) {
      this.selectedActivity = activity;
    },
    updateSessionValue(attribute: keyof Session, value: any) {
      if (this.selectedSession) {
        this.selectedSession[attribute] = value;
      }
    },
    updateActivityValue(attribute: keyof Activity, value: any) {
      if (this.selectedActivity) {
        this.selectedActivity[attribute] = value;
      }
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
