<script setup lang="ts">
const props = defineProps(["full", "size", "label"]);
const emit = defineEmits(["click"]);
</script>

<template>
  <button
    :class="[
      'flex',
      'justify-center',
      'item-center',
      { 'w-full': props.full ?? false },
      { 'w-full sm:w-1/2': !props.full },
      'appearance-none',
      'block',
      'bg-indigo-600',
      'text-gray-100',
      'font-bold',
      'border',
      'border-gray-200',
      'rounded-lg',
      'py-3',
      'px-3',
      'hover:bg-indigo-500',
    ]"
    type="button"
    @click="emit('click')"
  >
    <slot />
    <span class="ml-2" v-if="props.label">{{ props.label }}</span>
  </button>
</template>
