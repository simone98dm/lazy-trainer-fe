<script setup lang="ts">
  import { useSettingStore, useUserStore } from "~/stores";

  const settingsStore = useSettingStore();
  const user = useUserStore();
</script>

<template>
  <div
    v-if="settingsStore.isGlobalLoading"
    id="loading-screen"
    :class="[
      'w-full h-full fixed block top-0 left-0 bg-white opacity-25 z-50',
      {
        'bg-indigo-600': !user.isTrainer,
      },
      {
        'bg-purple-600': user.isTrainer,
      },
    ]"
  >
    <span
      class="text-green-500 opacity-75 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Loading :color="user.isTrainer ? 'purple' : 'primary'" />
    </span>
  </div>
</template>
