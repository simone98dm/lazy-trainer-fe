<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import SessionForm from "@/components/SessionForm/SessionForm.vue";
  import BackButton from "@/components/BackButton/BackButton.vue";
  import { ISession } from "../models/Session";
  import { useActivityStore } from "../stores/activity";
  import { IActivity } from "../models/Activity";
  import { useSettingStore } from "../stores/settings";

  const store = useActivityStore();
  const settings = useSettingStore();
  settings.setHeader("Session");
  const router = useRouter();
  const route = useRoute();

  const { sessionId } = route.params;
  const { d } = route.query;

  let duplicateWarmupActivities: IActivity[] | undefined = undefined;
  if (d && store.duplicateWarmup) {
    duplicateWarmupActivities = store.duplicateWarmup;
  }

  if (d && !store.duplicateWarmup) {
    router.push({
      name: "home",
    });
  }

  const session = store.getSession(sessionId as string);

  function cleanDuplicateWarmup() {
    store.duplicateWarmup = undefined;
  }
  function onBackPageHandler() {
    cleanDuplicateWarmup();
    router.back();
  }

  async function addSession(session: ISession) {
    await store.addSession(session);
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
