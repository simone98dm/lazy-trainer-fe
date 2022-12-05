<script setup lang="ts">
  defineProps(["padding"]);
</script>

<template>
  <div
    :class="[
      'rounded-xl p-4 shadow-lg mb-2 bg-white w-full',
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
