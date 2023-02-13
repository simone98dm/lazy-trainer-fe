<script setup lang="ts">
  defineProps({
    padding: {
      type: String,
      required: false,
      default: "medium",
    },
  });
</script>

<template>
  <div
    :class="[
      'rounded-xl shadow-lg mb-2 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-500 border-slate-800 text-slate-600 bg-white w-full',
      {
        'p-0': padding === 'none',
        'p-2': padding === 'small',
        'p-4': padding || padding === 'medium',
        'p-6': padding === 'large',
      },
    ]"
  >
    <slot />
  </div>
</template>
