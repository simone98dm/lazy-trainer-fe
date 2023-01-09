<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <h1 class="text-xl font-bold text-red-600 rounded-xl p-4 text-center uppercase mb-6">
    {{ text }}
  </h1>
</template>
