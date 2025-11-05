<script setup lang="ts">
import { type CardSizes } from '~/utils';

interface CardProps {
  padding?: CardSizes;
  highlight?: boolean;
}

const { highlight = false, padding = 'medium' } = defineProps<CardProps>();
</script>

<template>
  <div
    :class="[
      'rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 ease-out mb-4 border backdrop-blur-sm',
      'transform hover:-translate-y-1',
      {
        'p-0': padding === 'none',
        'p-3': padding === 'small',
        'p-5': padding === 'medium',
        'p-7': padding === 'large',
      },
      {
        'bg-white/95 dark:bg-slate-800/95 border-slate-200/50 dark:border-slate-700/50':
          !highlight,
      },
      {
        'bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30':
          highlight,
        'border-primary-200 dark:border-primary-700/50': highlight,
        'shadow-glow-primary dark:shadow-glow-primary': highlight,
      },
    ]"
  >
    <div class="flex flex-col gap-4">
      <div class="text-slate-900 dark:text-slate-100">
        <slot name="default" />
      </div>

      <div
        v-if="$slots.footer"
        class="border-t border-slate-200 dark:border-slate-700 pt-4"
      >
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
