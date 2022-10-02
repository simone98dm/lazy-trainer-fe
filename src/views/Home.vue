<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { ISession } from "~/models/Session";
  import { getDayOfTheWeek } from "~/utils";
  import Flow from "../components/Flow/Flow.vue";
  import { useActivityStore } from "~/stores/activity";
  import { useSettingStore } from "~/stores/settings";
  import { useUserStore } from "~/stores/user";

  const isLoading = ref(true);
  const textToShow = ref("");
  const block = ref(false);
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const userStore = useUserStore();

  settingsStore.setHeader(`Hello ${userStore.getUsername} 👋`);

  const router = useRouter();
  const route = useRoute();
  const sessions = ref([] as ISession[] | undefined);

  if (userStore.isTrainer && route.params.planId) {
    activityStore
      .getUserActivities(route.params.planId as string)
      .then((response) => {
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
    textToShow.value = "Client session:";

    block.value = false;
  } else if (!userStore.isTrainer) {
    activityStore
      .restoreSession()
      .then(() => {
        sessions.value = activityStore.getWeek;

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
    textToShow.value = "Your session:";
    block.value = false;
  } else {
    textToShow.value = "Nothing to see here ⚠️";
    isLoading.value = false;

    block.value = true;
  }
</script>

<template>
  <h1 class="mb-3 text-3xl font-bold">{{ textToShow }}</h1>
  <Flow v-if="!block" :list="sessions" :loading="isLoading"></Flow>
</template>
