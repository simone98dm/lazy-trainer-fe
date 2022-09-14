<script setup lang="ts">
const props = defineProps(["label"]);
const emit = defineEmits(["click"]);
</script>

<template>
  <button
    class="appearance-none block w-full bg-indigo-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-indigo-500"
    type="button"
    @click="emit('click')"
  >
    {{ props.label }}
  </button>
</template>
