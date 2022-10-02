<script setup lang="ts">
  import { useSettingStore } from "~/stores/settings";
  import { useUserStore } from "~/stores/user";
  import Loading from "../Loading/Loading.vue";
  const settingsStore = useSettingStore();
  const user = useUserStore();
</script>

<template>
  <div
    :class="[
      'absolute z-50 top-0 left-0 flex w-full min-h-screen justify-center items-center opacity-50 duration-700',
      {
        'bg-indigo-600': !user.isTrainer,
      },
      {
        'bg-purple-600': user.isTrainer,
      },
    ]"
    v-if="settingsStore.isGlobalLoading"
  >
    <Loading></Loading>
  </div>
</template>
