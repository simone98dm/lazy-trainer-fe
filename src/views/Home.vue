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
  let p = {
    title: "Loading...",
    subtitle: "Please wait...",
    style: "mb-6",
    block: false,
  };
  const options = ref(p);
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

    p = {
      ...p,
      title: "Client sessions",
      subtitle: "",
    };
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

    p = { ...p, title: "Your session", subtitle: "here's your weekly plan" };
  } else {
    isLoading.value = false;
    p = {
      title: "Nothing to see here",
      subtitle: "Go to groups and open your client plan",
      block: true,
      style: "text-center mt-10",
    };
  }
  options.value = p;
</script>

<template>
  <div :class="options.style">
    <h1 class="mb-3 text-3xl font-bold">{{ options.title }}</h1>
    <h4 class="mb-3 text-xl text-slate-600 font-bold">
      {{ options.subtitle }}
    </h4>
  </div>
  <Flow v-if="!options.block" :list="sessions" :loading="isLoading"></Flow>
</template>
