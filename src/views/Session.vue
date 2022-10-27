<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import { ISession } from "~/models/Session";
  import { useActivityStore, useSettingStore } from "~/stores";

  const router = useRouter();
  const route = useRoute();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  settingsStore.setHeader("Session");

  const { sessionId } = route.params;
  const session = activityStore.getSession(sessionId as string);

  function cleanDuplicateActivities() {
    activityStore.duplicateActivities = undefined;
  }

  function onBackPageHandler() {
    cleanDuplicateActivities();
    router.back();
  }

  async function addSession(session: ISession) {
    await activityStore.addSession(session);
    cleanDuplicateActivities();
    router.back();
  }

  async function deleteSession(sessionId: string) {
    if (!confirm("Are you sure you want to delete this session?")) {
      return;
    }
    await activityStore.deleteSession(sessionId);
    router.push({
      name: "home",
    });
  }
</script>
<template>
  <div class="mb-6">
    <BackButton @click="onBackPageHandler" />
  </div>
  <span v-if="activityStore.getMissingDays.length <= 0">No days available</span>
  <div
    class="flex xl:flex-col flex-wrap justify-center max-w-screen-lg mx-auto"
    v-else
  >
    <SessionForm
      @save="addSession"
      @remove="deleteSession"
      :id="sessionId"
      :day-of-week="session?.dayOfWeek"
    />
  </div>
</template>
