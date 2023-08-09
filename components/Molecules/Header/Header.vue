<script setup lang="ts">
  import { getAnalytics, logEvent } from "@firebase/analytics";
  import { useSettingStore, useUserStore } from "~/stores";
  import { GaCustomEvents } from "~/utils";

  const settingsStore = useSettingStore();
  const userStore = useUserStore();
</script>

<template>
  <div
    :class="[
      'w-full rounded-b-xl p-5 text-white',
      { 'bg-indigo-600': !userStore.isTrainer },
      { 'bg-purple-600': userStore.isTrainer },
    ]"
  >
    <div>
      <div class="text-center">
        <h3
          class="text-3xl font-semibold"
          @click="logEvent(getAnalytics(), GaCustomEvents.CLICK, { to: 'page title' })"
        >
          {{ settingsStore.getHeaderText }}
        </h3>
      </div>
    </div>
  </div>
</template>
