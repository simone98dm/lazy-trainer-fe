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
    <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
      <Loading></Loading>
    </span>
  </div>
</template>
