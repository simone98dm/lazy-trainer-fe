<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import SessionForm from "~/components/SessionForm/SessionForm.vue";
  import BackButton from "~/components/BackButton/BackButton.vue";
  import { ISession } from "~/models/Session";
  import { IActivity } from "../models/Activity";
  import { useActivityStore } from "~/stores/activity";
  import { useSettingStore } from "~/stores/settings";

  const router = useRouter();
  const route = useRoute();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  settingsStore.setHeader("Session");

  const { sessionId } = route.params;
  const { d } = route.query;

  let duplicateWarmupActivities: IActivity[] | undefined = undefined;
  if (d && activityStore.duplicateWarmup) {
    duplicateWarmupActivities = activityStore.duplicateWarmup;
  }

  if (d && !activityStore.duplicateWarmup) {
    router.push({
      name: "home",
    });
  }

  const session = activityStore.getSession(sessionId as string);

  function cleanDuplicateWarmup() {
    activityStore.duplicateWarmup = undefined;
  }
  function onBackPageHandler() {
    cleanDuplicateWarmup();
    router.back();
  }

  async function addSession(session: ISession) {
    await activityStore.addSession(session);
    cleanDuplicateWarmup();
    router.back();
  }
</script>
<template>
  <div class="mb-6">
    <BackButton @click="onBackPageHandler"></BackButton>
  </div>
  <div class="flex xl:flex-col flex-wrap justify-center">
    <SessionForm
      @save="addSession"
      :id="sessionId"
      :existing-form="duplicateWarmupActivities"
      :day-of-week="session?.dayOfWeek"
    ></SessionForm>
  </div>
</template>
