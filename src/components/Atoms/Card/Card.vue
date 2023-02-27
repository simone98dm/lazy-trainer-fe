<script setup lang="ts">
  defineProps({
    padding: {
      type: String,
      required: false,
      default: "medium",
    },
    highlight: {
      type: Boolean,
      required: false,
      default: false,
    },
  });
</script>

<template>
  <div
    :class="[
      'rounded-xl shadow-lg mb-2 w-full',
      {
        'p-0': padding === 'none',
        'p-2': padding === 'small',
        'p-4': padding || padding === 'medium',
        'p-6': padding === 'large',
      },
      {
        'dark:bg-slate-800 dark:text-slate-200 dark:border-slate-500 border-slate-800 text-slate-600 bg-white':
          !highlight,
      },
      {
        'border-2 bg-orange-200 border-orange-300 dark:bg-orange-800 dark:border-orange-900':
          highlight,
      },
      { 'dark:bg-slate-800 bg-white': !highlight },
    ]"
  >
    <slot />
  </div>
</template>
