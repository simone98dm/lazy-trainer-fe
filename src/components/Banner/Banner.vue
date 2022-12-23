<script setup lang="ts">
  defineProps(["text", "color"]);
</script>

<template>
  <div class="fixed bottom-16 left-0 w-full">
    <div
      :class="[
        { 'bg-red-400': color === 'error' },
        { 'bg-green-300': color === 'success' },
        'text-white text-center py-1 lg:px-4',
      ]"
    >
      <div v-if="text">
        <p v-if="text" class="p-2">
          {{ text }}
        </p>
        <div class="absolute top-0 right-0 p-3">
          <button @click="$emit('close')">
            <Icon component="close" class="text-white" />
          </button>
        </div>
      </div>
      <slot v-else name="customContent" />
    </div>
  </div>
</template>

<style scoped>
  .bottom-16 {
    bottom: 4rem;
  }
</style>
