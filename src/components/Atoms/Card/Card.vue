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
      'rounded-xl shadow-lg mb-2 bg-white w-full',
      {
        'p-0': padding === 'none',
        'p-2': padding === 'small',
        'p-4': padding || padding === 'medium',
        'p-6': padding === 'large',
      },
      { 'bg-orange-200 border-2 border-orange-300': highlight },
    ]"
  >
    <slot />
  </div>
</template>
