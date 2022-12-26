<script setup lang="ts">
  const props = defineProps(["text"]);
</script>

<template>
  <h1
    class="mb-3 text-xl font-bold text-red-600 rounded-xl p-3 text-center uppercase mb-6"
  >
    {{ props.text }}
  </h1>
</template>
