<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <h1 class="mb-3 text-xl font-bold text-red-600 rounded-xl p-4 text-center uppercase mb-6">
    {{ props.text }}
  </h1>
</template>
