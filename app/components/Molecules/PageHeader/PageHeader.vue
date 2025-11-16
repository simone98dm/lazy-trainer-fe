<script setup lang="ts">
import { type Activity } from '~/models/Activity';
import { useActivityStore, useSettingStore, useUserStore } from '~/stores';
import { computed } from 'vue';

const settingsStore = useSettingStore();
const userStore = useUserStore();
const activityStore = useActivityStore();
const route = useRoute();
const isDashboard = computed(() => route.name === 'index');

function prevPage() {
  const router = useRouter();
  router.push(route.meta.prevPage as string);
}

const isDetailPage = computed(() => route.name === 'details');
const isEditPage = computed(() => route.name === 'edit');

async function addActivity() {
  const params = route.params as Record<string, string | string[]>;
  const sessionParam = params.session;
  const sessionId =
    typeof sessionParam === 'string'
      ? sessionParam
      : Array.isArray(sessionParam)
        ? sessionParam[0]
        : '';

  const activity: Activity = {
    name: 'New activity',
    description: '',
    reps: 0,
    requestChange: false,
    time: 0,
    order_index: -1,
    sessionId,
  };
  activityStore.setSelectedActivity(activity);

  window?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-40 w-full backdrop-blur-md border-b transition-all duration-300',
      'shadow-soft',
      {
        'bg-gradient-to-r from-primary-500/95 to-primary-600/95 dark:from-primary-600/95 dark:to-primary-700/95 border-primary-600/20':
          !userStore.isTrainer,
      },
      {
        'bg-gradient-to-r from-secondary-500/95 to-secondary-600/95 dark:from-secondary-600/95 dark:to-secondary-700/95 border-secondary-600/20':
          userStore.isTrainer,
      },
    ]"
  >
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 sm:h-20">
        <!-- Left Action -->
        <div class="flex items-center w-16">
          <button
            v-if="!isDashboard"
            @click="prevPage"
            class="p-2 rounded-xl text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
            aria-label="Go back"
          >
            <MaterialIcon component="arrow_back" />
          </button>
        </div>

        <!-- Center Title -->
        <h1
          class="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center truncate px-4"
        >
          {{ settingsStore.getHeaderText }}
        </h1>

        <!-- Right Actions -->
        <div class="flex items-center gap-2 w-16 justify-end">
          <RouterLink
            v-if="isDetailPage"
            :to="{
              name: 'edit',
              params: { session: activityStore.selectedSession?.id },
            }"
            class="p-2 rounded-xl text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
            aria-label="Edit session"
          >
            <MaterialIcon component="edit" />
          </RouterLink>

          <button
            v-if="
              isEditPage &&
                activityStore.selectedSession?.id &&
                !activityStore.selectedActivity
            "
            @click="addActivity"
            class="p-2 rounded-xl text-white hover:bg-white/10 transition-all duration-200 active:scale-95"
            aria-label="Add activity"
          >
            <MaterialIcon component="add" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
