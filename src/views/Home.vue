<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { ISession } from "../models/Session";
  import { useActivityStore } from "../stores/activity";
  import { useUserStore } from "../stores/user";
  import { getDayOfTheWeek } from "../utils";
  import { useSettingStore } from "../stores/settings";
  import Flow from "../components/Flow/Flow.vue";

  const store = useActivityStore();
  const isLoading = ref(true);

  const user = useUserStore();

  const settings = useSettingStore();
  settings.setHeader(`Hello ${user.getUsername} 👋`);

  const router = useRouter();
  const route = useRoute();
  const sessions = ref([] as ISession[] | undefined);

  if (user.isTrainer && route.params.planId) {
    store.getUserActivities(route.params.planId as string).then((response) => {
      sessions.value = response?.sessions.sort((x: ISession, y: ISession) =>
        x.dayOfWeek < y.dayOfWeek ? -1 : 1
      );

      sessions.value = sessions.value?.map((session) => {
        return {
          ...session,
          description: `${session.activities.length} ${
            session.activities.length > 1 ? "activities" : "activity"
          }`,
          name: getDayOfTheWeek(session.dayOfWeek),
        };
      });
      isLoading.value = false;
    });
  } else {
    store
      .restoreSession()
      .then(() => {
        sessions.value = store.getWeek;

        sessions.value = sessions.value?.map((session) => {
          return {
            ...session,
            description: `${session.activities.length} ${
              session.activities.length > 1 ? "activities" : "activity"
            }`,
            name: getDayOfTheWeek(session.dayOfWeek),
          };
        });

        isLoading.value = false;
      })
      .catch(() => {
        router.push({ name: "login" });
      });
  }
</script>

<template>
  <h1 class="mb-3 text-2xl font-bold" v-if="user.isTrainer">Client session:</h1>
  <h1 class="mb-3 text-2xl font-bold" v-else>Your session:</h1>
  <Flow :list="sessions" :loading="isLoading"></Flow>
</template>
