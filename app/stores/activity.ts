import { defineStore } from 'pinia';
import { useSettingStore } from '~/stores';
import { useWorkoutClient } from '~/composables/useWorkoutClient';
import type { Plan } from '~/models/Plan';
import type { Session } from '~/models/Session';
import type { Activity } from '~/models/Activity';
import type { OrderRequest } from '~/utils';
import type { Completion } from '~/models/Completion';

export const useActivityStore = defineStore('activity', {
  state: () => ({
    plan: null as Plan | null,
    completionDates: null as Completion[] | null,
    selectedSession: null as Session | null,
    selectedActivity: null as Activity | null,
  }),
  getters: {
    getActivities: (state) => (sessionId: string) => {
      return (
        state.plan?.sessions
          .find((session) => session.id === sessionId)
          ?.activities.filter((item) => !item.warmup) ?? []
      );
    },
    getWarmUpActivities: (state) => (sessionId: string) => {
      return (
        state.plan?.sessions
          .find((session) => session.id === sessionId)
          ?.activities.filter((item) => item.warmup) ?? []
      );
    },
    getActivity: (state) => (activityId: string) => {
      const activities = state.plan?.sessions.map((x) => x.activities).flat();
      return activities?.find((activity) => activity.id === activityId) ?? [];
    },
    getSelectedActivities: (state) => {
      return (
        state.selectedSession?.activities?.filter((item) => !item.warmup) ?? []
      );
    },
    getSelectedWarmUpActivities: (state) => {
      return (
        state.selectedSession?.activities?.filter((item) => item.warmup) ?? []
      );
    },
    sortedWeek(state) {
      return state.plan?.sessions.sort((x, y) =>
        x.dayOfWeek < y.dayOfWeek ? -1 : 1,
      );
    },
    missingDays(state) {
      if (state.plan) {
        const days = state.plan?.sessions?.map((item) => item.dayOfWeek);
        const missingDays = [];
        for (let i = 0; i < 7; i++) {
          if (!days?.includes(i)) {
            missingDays.push(i);
          }
        }
        return missingDays;
      }
      return [];
    },
  },
  actions: {
    async restoreSession() {
      if (this.plan) {
        return this.plan;
      }
      const { $workout } = useNuxtApp();
      const client = useWorkoutClient();

      await client.auth.refreshSession();

      const { data, error } = await client.auth.getSession();
      if (error) {
        // Silent error handling
        return this.plan;
      }

      if (data.session?.user) {
        this.plan = await $workout.getUserPlan(data.session?.user.id);
      }

      if (!this.plan) {
        this.plan = generateBlankPlan();
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
      settingsStore.openLoading();

      if (!this.plan) {
        this.plan = generateBlankPlan();
      }

      if (!activity.id) {
        const data = await $workout.addActivity(activity);
        if (data) {
          this.plan = {
            ...this.plan,
            sessions: this.plan.sessions.map((session) => {
              if (session.id === data.sessionId) {
                if (!session.activities) {
                  session.activities = [];
                }
                session.activities.push(data);
              }
              return session;
            }),
          };
          // if (this.selectedSession) {
          //   this.selectedSession?.activities.push(data);
          // }
        }
      }

      settingsStore.dismissLoading();
      this.selectedActivity = null;
    },
    async deleteActivity(activityId?: string) {
      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();
      settingsStore.openLoading();

      if (activityId) {
        await $workout.deleteActivity(activityId);

        if (this.plan) {
          this.plan = {
            ...this.plan,
            sessions:
              this.plan.sessions.map((session) => ({
                ...session,
                activities: session.activities.filter(
                  (activity) => activity.id !== activityId,
                ),
              })) ?? [],
          };
          if (this.selectedSession) {
            this.selectedSession = {
              ...this.selectedSession,
              activities:
                this.selectedSession?.activities.filter(
                  (activity) => activity.id !== activityId,
                ) ?? [],
            };
          }
        }
      }
      settingsStore.dismissLoading();
      this.selectedActivity = null;
    },
    async updateActivity(updatedActivity: Activity | null) {
      if (updatedActivity?.id) {
        const settingsStore = useSettingStore();
        const { $workout } = useNuxtApp();
        settingsStore.openLoading();
        await $workout.updateActivity(updatedActivity, updatedActivity.id);
        settingsStore.dismissLoading();
      }
    },
    async addSession(session: Session | null) {
      if (!session) {
        return null;
      }

      if (session.dayOfWeek === -1 && session.dayOfWeek >= 7) {
        return null;
      }

      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();
      settingsStore.openLoading();

      if (!this.plan) {
        // Unable to create session - plan is missing
        return null;
      }

      const data = await $workout.addSession({
        ...session,
        planId: this.plan.id,
      });
      if (data) {
        this.plan?.sessions.push(data);
      }
      this.setSelectedSession(data);
      settingsStore.dismissLoading();
      return data;
    },
    async deleteSession(sessionId?: string) {
      if (sessionId) {
        const settingsStore = useSettingStore();
        const { $workout } = useNuxtApp();
        settingsStore.openLoading();
        await $workout.deleteSession(sessionId);
        if (this.plan) {
          this.plan.sessions = this.plan.sessions.filter(
            (session) => session.id !== sessionId,
          );
        }
        settingsStore.dismissLoading();
      }
      this.selectedSession = null;
    },
    async updateSession(session: Session | null) {
      const settingsStore = useSettingStore();
      const { $workout } = useNuxtApp();
      settingsStore.openLoading();
      if (session) {
        await $workout.updateSession(session);
      }
      settingsStore.dismissLoading();
    },
    async moveActivity(
      sessionId: string | undefined,
      listActivities: Activity[],
      isWarmup: boolean,
    ) {
      if (!sessionId) {
        return;
      }

      if (this.plan) {
        const sessionIndex = this.plan.sessions.findIndex(
          (session) => session.id === sessionId,
        );
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
          settingsStore.openLoading();

          const data = this.plan.sessions[sessionIndex].activities.map(
            (item) =>
              ({
                id: item.id,
                order_index: item.order_index,
              }) as OrderRequest,
          );
          await $workout.sortActivities(data);
          settingsStore.dismissLoading();
        }
      }
    },
    setSelectedSession(session: Session | null) {
      this.selectedSession = session;
    },
    setSelectedActivity(activity: Activity | null) {
      this.selectedActivity = activity;
    },
    updateSessionValue(attribute: keyof Session, value: any) {
      if (this.selectedSession) {
        // @ts-expect-error - Dynamic property assignment from keyof Session
        this.selectedSession[attribute] = value;
      }
    },
    updateActivityValue(attribute: keyof Activity, value: any) {
      if (this.selectedActivity) {
        // @ts-expect-error - Dynamic property assignment from keyof Activity
        this.selectedActivity[attribute] = value;
      }
    },
    getSession(sessionId: string) {
      return (
        this.plan?.sessions.find((session) => session.id === sessionId) ?? null
      );
    },
  },
});
