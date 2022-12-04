<script setup lang="ts">
  import { useActivityStore, useSettingStore } from "~/stores";

  const settingsStore = useSettingStore();
  const activityStore = useActivityStore();
  activityStore.retrieveUserStats();
</script>

<template>
  <PlaceholderCard v-if="settingsStore.isGlobalLoading" />
  <div v-else>
    <div v-if="activityStore.getCompletedWorkouts">
      <h1 class="mb-3 text-3xl font-bold">Your calendar</h1>
      <Calendar :completion="activityStore.getCompletedWorkouts" />
    </div>
    <div class="flex flex-col items-center justify-center h-full" v-else>
      <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center">
          <Icon component="event_busy" class="text-6xl text-gray-500" />
          <h3 class="text-2xl text-gray-500 mt-4">No data found</h3>
        </div>
      </div>
    </div>
  </div>
</template>
