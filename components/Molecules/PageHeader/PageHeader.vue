<script setup lang="ts">
  import { type Activity } from "~/models/Activity";
  import { useActivityStore, useSettingStore, useUserStore } from "~/stores";
  import { computed } from "vue";

  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  const activityStore = useActivityStore();
  const route = useRoute();
  const isDashboard = computed(() => route.name === "home");

  function prevPage() {
    const router = useRouter();
    router.push(route.meta.prevPage as string);
  }

  const isDetailPage = computed(() => route.name === "details");
  const isEditPage = computed(() => route.name === "edit");

  async function addActivity() {
    const activity: Activity = {
      name: "New activity",
      description: "",
      reps: 0,
      requestChange: false,
      time: 0,
      order_index: -1,
      sessionId: route.params.session as string,
    };
    activityStore.setSelectedActivity(activity);

    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
</script>

<template>
  <header
    :class="[
      'flex justify-between items-center w-full rounded-b-xl p-3 text-white',
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
        v-if="isDetailPage"
        :to="{ name: 'edit', params: { session: activityStore.selectedSession?.id } }"
      >
        <MaterialIcon component="edit" />
      </RouterLink>

      <span
        v-if="isEditPage && activityStore.selectedSession?.id && !activityStore.selectedActivity"
        @click="addActivity"
      >
        <MaterialIcon component="add" />
      </span>
    </span>
  </header>
</template>
