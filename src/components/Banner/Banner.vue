<script setup lang="ts">
  defineProps(["text"]);
</script>

<template>
  <div class="fixed bottom-18 left-0 w-full">
    <div class="bg-red-400 text-white text-center py-1 lg:px-4">
      <p class="p-2">
        {{ text }}
      </p>
    </div>
    <div class="absolute top-0 right-0 p-3">
      <button @click="$emit('close')">
        <Icon component="close" class="text-white" />
      </button>
    </div>
  </div>
</template>

<style scoped>
  .bottom-18 {
    bottom: 4.5rem;
  }
</style>
