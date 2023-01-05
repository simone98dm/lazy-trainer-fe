<script setup lang="ts">
  import { getAnalytics, logEvent } from "@firebase/analytics";
  import { useRoute, useRouter } from "vue-router";
  import { ISession } from "~/models/Session";
  import { useActivityStore, useSettingStore } from "~/stores";
  import { GaCustomEvents } from "~/utils";

  const router = useRouter();
  const route = useRoute();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  settingsStore.setHeader("Session");

  const sessionId = route.params.sessionId as string;
  const session = activityStore.getSession(sessionId);

  function cleanDuplicateActivities() {
    activityStore.duplicateActivities = undefined;
  }

  function backPage() {
    cleanDuplicateActivities();
    if (!sessionId) {
      backHomePage();
    } else {
      router.push({
        name: "details",
        params: { sessionId },
      });
    }
  }

  async function addSession(session: ISession) {
    await activityStore.addSession(session);
    cleanDuplicateActivities();
    logEvent(getAnalytics(), GaCustomEvents.ADD_SESSION);
    backHomePage();
  }

  async function deleteSession(sessionId: string) {
    if (!confirm("Are you sure you want to delete this session?")) {
      return;
    }
    await activityStore.deleteSession(sessionId);
    logEvent(getAnalytics(), GaCustomEvents.REMOVE_SESSION);
    backHomePage();
  }

  function backHomePage() {
    router.push({
      name: "home",
      params: { planId: activityStore.plan?.id },
    });
  }
</script>
<template>
  <div class="mb-6">
    <BackButton @click="backPage" />
  </div>
  <div class="flex xl:flex-col flex-wrap justify-center max-w-screen-xl mx-auto">
    <SessionForm
      @save="addSession"
      @remove="deleteSession"
      :id="sessionId"
      :day-of-week="session?.dayOfWeek"
    />
  </div>
</template>
