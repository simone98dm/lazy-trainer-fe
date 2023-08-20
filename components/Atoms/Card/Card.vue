<script setup lang="ts">
  import { CardSizes } from "~/utils";

  interface CardProps {
    padding?: CardSizes;
    highlight?: boolean;
  }

  withDefaults(defineProps<CardProps>(), {
    highlight: false,
    padding: "medium",
  });
</script>

<template>
  <div
    :class="[
      'rounded-xl shadow-lg mb-2',
      {
        'p-0': padding === 'none',
        'p-2': padding === 'small',
        'p-4': padding === 'medium',
        'p-6': padding === 'large',
      },
      {
        'dark:bg-slate-800 dark:text-slate-200 dark:border-slate-500 border-slate-800 text-slate-600 bg-white':
          !highlight,
      },
      {
        'border-2 bg-green-200 border-green-300 dark:bg-green-600 dark:border-green-700': highlight,
      },
      { 'dark:bg-slate-800 bg-white': !highlight },
    ]"
  >
    <div class="flex flex-col">
      <slot name="default" />

      <div>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
