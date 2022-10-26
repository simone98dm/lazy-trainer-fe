<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { ISession } from "~/models/Session";
  import { parseSessions } from "~/utils";
  import { useActivityStore, useSettingStore, useUserStore } from "~/stores";

  const isLoading = ref(true);
  let pageOptions = {
    title: "Loading...",
    subtitle: "",
    style: "mb-6",
    block: false,
  };
  const options = ref(pageOptions);
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const userStore = useUserStore();

  settingsStore.setHeader(`Hello ${userStore.getUsername} 👋`);
  settingsStore.loadSettings();

  const router = useRouter();
  const route = useRoute();
  const sessions = ref([] as ISession[] | undefined);

  if (userStore.isTrainer && route.params.planId) {
    activityStore
      .getUserActivities(route.params.planId as string)
      .then((response) => (sessions.value = response))
      .finally(() => (isLoading.value = false));

    pageOptions = {
      ...pageOptions,
      title: "Client sessions",
    };
  } else if (!userStore.isTrainer) {
    activityStore
      .restoreSession()
      .then(() => (sessions.value = activityStore.getWeek?.map(parseSessions)))
      .catch(() => router.push({ name: "login" }))
      .finally(() => (isLoading.value = false));

    pageOptions = { ...pageOptions, title: "Your session" };
  } else {
    isLoading.value = false;
    pageOptions = {
      title: "Nothing to see here",
      subtitle: "Go to groups and open your client plan",
      block: true,
      style: "text-center mt-10",
    };
  }
  options.value = pageOptions;
</script>

<template>
  <div class="max-w-screen-lg mx-auto">
    <div :class="options.style">
      <h1 class="mb-3 text-3xl font-bold">{{ options.title }}</h1>
      <h4 class="mb-3 text-xl text-slate-600 font-bold">
        {{ options.subtitle }}
      </h4>
    </div>
    <Flow v-if="!options.block" :list="sessions" :loading="isLoading"></Flow>
  </div>
</template>
