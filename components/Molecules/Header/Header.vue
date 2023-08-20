<script setup lang="ts">
  import { useSettingStore, useUserStore } from "~/stores";

  const settingsStore = useSettingStore();
  const userStore = useUserStore();

  function prevPage() {
    const router = useRouter();
    const route = useRoute();
    router.push(route.meta.prevPage as string);
  }
</script>

<template>
  <div
    :class="[
      'flex justify-between items-center w-full rounded-b-xl p-5 text-white',
      { 'bg-green-600': !userStore.isTrainer },
      { 'bg-purple-600': userStore.isTrainer },
    ]"
  >
    <BackButton @click="prevPage" />
    <h3 class="text-3xl font-semibold">
      {{ settingsStore.getHeaderText }}
    </h3>
    <span></span>
  </div>
</template>
