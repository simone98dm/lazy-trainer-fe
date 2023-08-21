<script setup lang="ts">
  import { ref } from "vue";
  import { CustomSession } from "~/models/Session";
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

  settingsStore.loadSettings();

  const sessions = ref([] as CustomSession[] | undefined);
  const route = useRoute();

  if (userStore.isTrainer && route.params.plan) {
    activityStore
      .getUserActivities(route.params.planId as string)
      .then((response) => (sessions.value = response))
      .finally(() => (isLoading.value = false));

    pageOptions = {
      ...pageOptions,
      title: "Clients session",
    };
  } else if (!userStore.isTrainer) {
    activityStore
      .restoreSession()
      .then(() => (sessions.value = activityStore.getWeek?.map(parseSessions)))
      .catch(() => {
        const router = useRouter();
        router.push({ name: "login" });
      })
      .finally(() => (isLoading.value = false));
    pageOptions = { ...pageOptions, title: "Your sessions" };
  } else {
    isLoading.value = false;
    pageOptions = {
      title: "Welcome",
      subtitle: "Click on the group icon to view your clients",
      block: true,
      style: "text-center mt-10",
    };
  }
  options.value = pageOptions;
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <div :class="options.style">
      <h1 class="mb-3 text-3xl font-bold dark:text-slate-100">{{ options.title }}</h1>
      <h4 class="mb-3 text-xl text-slate-600 dark:text-slate-100 font-bold">
        {{ options.subtitle }}
      </h4>
    </div>
    <UserFlow v-if="!options.block" :list="sessions" :loading="isLoading" />
  </div>
</template>
