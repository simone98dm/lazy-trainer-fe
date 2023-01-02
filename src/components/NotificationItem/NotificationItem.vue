<script setup lang="ts">
  defineProps(["title", "description", "caption", "isRead", "type"]);
</script>

<template>
  <Card :highlight="type === 1">
    <span
      class="relative rounded-full h-3 w-3 bg-red-500 ml-auto"
      v-if="true"
    ></span>
    <h4 class="text-gray-700 font-bold text-3xl inline mb-2" v-if="title">
      {{ title }}
    </h4>
    <p class="text-slate-600 text-md mb-2" v-if="description">
      {{ description }}
    </p>
    <p class="text-xs text-gray-400 mb-2">
      {{ caption }}
    </p>
  </Card>
</template>
