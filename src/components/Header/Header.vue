<script setup lang="ts">
  import { useSettingStore, useUserStore } from "~/stores";

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
        <h3 class="text-3xl font-semibold">
          {{ settingsStore.getHeaderText }}
        </h3>
      </div>
    </div>
  </div>
</template>
