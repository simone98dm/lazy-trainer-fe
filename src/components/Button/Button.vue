<script setup lang="ts">
const props = defineProps(["full", "size"]);
const emit = defineEmits(["click"]);
</script>

<template>
  <button
    :class="[
      { 'w-full': props.full ?? false },
      'appearance-none block bg-indigo-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-indigo-500 flex justify-center align-middle',
    ]"
    type="button"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
