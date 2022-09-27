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
  const textToShow = ref("");
  const block = ref(false);

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
    textToShow.value = "Client session:";

    block.value = false;
  } else if (!user.isTrainer) {
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
  <div v-if="!block">
    <Flow :list="sessions" :loading="isLoading"></Flow>
  </div>
</template>
