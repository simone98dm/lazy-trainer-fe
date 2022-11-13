<script setup lang="ts">
  defineProps(["title", "description", "caption", "isRead"]);
</script>
<template>
  <div class="flex flex-col rounded-xl p-4 shadow-lg mb-2 bg-white">
    <span
      class="relative rounded-full h-3 w-3 bg-red-500 ml-auto"
      v-if="!isRead"
    ></span>
    <p class="text-xs text-gray-500 mb-2">
      {{ caption }}
    </p>
    <h4 class="text-gray-600 font-bold text-3xl inline mb-2">{{ title }}</h4>
    <p class="text-slate-500 text-md mb-2">
      {{ description }}
    </p>
  </div>
</template>
