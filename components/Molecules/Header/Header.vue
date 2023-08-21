<script setup lang="ts">
  import { useSettingStore, useUserStore } from "~/stores";

  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  const route = useRoute();

  function prevPage() {
    const router = useRouter();
    router.push(route.meta.prevPage as string);
  }

  const isDashboard = computed(() => route.name === "home");
</script>

<template>
  <div
    :class="[
      'flex justify-between items-center w-full rounded-b-xl p-5 text-white',
      { 'bg-green-600': !userStore.isTrainer },
      { 'bg-purple-600': userStore.isTrainer },
    ]"
  >
    <span>
      <BackButton v-if="!isDashboard" @click="prevPage" />
    </span>
    <h3 class="text-3xl font-semibold">
      {{ settingsStore.getHeaderText }}
    </h3>
    <span></span>
  </div>
</template>
