<script setup lang="ts">
  import { useActivityStore, useSettingStore } from "~/stores";

  const settingsStore = useSettingStore();
  const activityStore = useActivityStore();
  activityStore.retrieveUserStats();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-full"
    v-if="settingsStore.isGlobalLoading"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <Icon component="query_stats" class="text-6xl text-gray-500" />
        <h3 class="text-2xl text-gray-500 mt-4">Loading...</h3>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="text-bold text-2xl">User calendar</h1>
    <Calendar :completion="activityStore.getCompletedWorkouts" />
  </div>
</template>
