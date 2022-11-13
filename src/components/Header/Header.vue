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
    <div class="flex items-center justify-between">
      <!-- <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
      >
        <Icon component="person" class="-pb-3" />
      </div> -->
      <div></div>
      <h3
        class="text-3xl font-semibold"
        @click="
          logEvent(getAnalytics(), GaCustomEvents.CLICK, { to: 'page title' })
        "
      >
        {{ settingsStore.getHeaderText }}
      </h3>
      <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
      >
        <Link :to="{ name: 'notifications' }">
          <Icon component="notifications" class="-pb-3" />
        </Link>
      </div>
    </div>
  </div>
</template>
