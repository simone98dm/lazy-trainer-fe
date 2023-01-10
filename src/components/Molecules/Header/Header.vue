<script setup lang="ts">
  import { getAnalytics, logEvent } from "@firebase/analytics";
  import { useSettingStore, useUserStore } from "~/store";
  import { GaCustomEvents } from "~/utils";
  const { getHeaderText } = useSettingStore();
  const { isTrainer } = useUserStore();
</script>

<template>
  <div
    :class="[
      'w-full rounded-b-xl p-5 text-white',
      { 'bg-indigo-600': !isTrainer },
      { 'bg-purple-600': isTrainer },
    ]"
  >
    <div>
      <div class="text-center">
        <h3
          class="text-3xl font-semibold"
          @click="logEvent(getAnalytics(), GaCustomEvents.CLICK, { to: 'page title' })"
        >
          {{ getHeaderText }}
        </h3>
      </div>
    </div>
  </div>
</template>
