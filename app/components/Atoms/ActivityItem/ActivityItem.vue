<script setup lang="ts">
import { type Activity } from '~/models/Activity';
import { type MaterialIcons, millisToMinutesAndSeconds } from '~/utils';
import { computed } from 'vue';

interface ItemProps {
  activity: Activity;
  icon?: MaterialIcons;
}

const { activity } = defineProps<ItemProps>();

const time = computed(() => millisToMinutesAndSeconds(activity.time));
</script>

<template>
  <div
    class="group flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
  >
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <div
        class="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white shadow-soft group-hover:shadow-soft-lg transition-all duration-300"
      >
        <span class="text-2xl font-bold">
          {{ activity.time ? time : `${activity.reps}` }}
        </span>
      </div>

      <div class="flex-1 min-w-0">
        <h4
          class="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 truncate mb-1"
        >
          {{ activity.name }}
        </h4>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          {{ activity.time ? 'Duration' : 'Repetitions' }}
        </p>
      </div>
    </div>

    <div
      v-if="$slots.actions"
      class="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <slot name="actions" />
    </div>
  </div>
</template>
