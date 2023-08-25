<script setup lang="ts">
  import { useActivityStore, useSettingStore, useUserStore } from "~/stores";

  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  const activityStore = useActivityStore();
  const route = useRoute();
  const isDashboard = computed(() => route.name === "home");

  function prevPage() {
    const router = useRouter();
    router.push(route.meta.prevPage as string);
  }
</script>

<template>
  <div
    :class="[
      'flex justify-between items-center w-full rounded-b-xl p-5 text-white',
      { 'bg-emerald-600': !userStore.isTrainer },
      { 'bg-purple-600': userStore.isTrainer },
    ]"
  >
    <span>
      <BackButton v-if="!isDashboard" @click="prevPage" />
    </span>
    <h3 class="text-3xl font-semibold">
      {{ settingsStore.getHeaderText }}
    </h3>
    <span>
      <RouterLink
        v-if="activityStore.selectedSession"
        :to="{ name: 'edit', params: { session: activityStore.selectedSession?.id } }"
      >
        <MaterialIcon component="edit" />
      </RouterLink>
    </span>
  </div>
</template>
