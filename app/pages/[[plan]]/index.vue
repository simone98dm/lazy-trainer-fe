<script setup lang="ts">
import { ref } from 'vue';
import type { CustomSession } from '~/models/Session';
import { parseSessions } from '~/utils';
import { useActivityStore } from '~/stores';

const isLoading = ref(true);
let pageOptions = {
  title: 'Loading...',
  style: 'mb-6',
  block: false,
};
const options = ref(pageOptions);
const activityStore = useActivityStore();
const settingsStore = useSettingStore();

settingsStore.loadSettings();

const sessions = ref([] as CustomSession[]);

activityStore
  .restoreSession()
  .then(
    () => (sessions.value = activityStore.sortedWeek?.map(parseSessions) ?? []),
  )
  .catch(() => {
    useRouter().push({ name: 'login' });
  })
  .finally(() => (isLoading.value = false));
pageOptions = { ...pageOptions, title: 'Your sessions' };
options.value = pageOptions;
</script>

<template>
  <div class="max-w-screen-xl mx-auto">
    <div :class="options.style">
      <h1 class="mb-3 text-xl font-bold dark:text-slate-100">
        {{ options.title }}
      </h1>
    </div>
    <UserFlow
      v-if="!options.block"
      :list="sessions"
      :loading="isLoading"
    />
  </div>
</template>
