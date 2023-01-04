<script setup lang="ts">
  defineProps({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  });
  defineEmits(["toggle"]);
</script>

<template>
  <label :for="id" class="flex items-center cursor-pointer">
    <div class="relative">
      <input
        type="checkbox"
        class="sr-only"
        :id="id"
        :name="name"
        :checked="checked"
        @change="$emit('toggle', (($event.target as any) || undefined)?.checked)"
      />
      <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
      <div
        class="dot absolute w-6 h-6 bg-gray-200 rounded-full shadow -left-1 -top-1 transition"
      ></div>
    </div>
  </label>
</template>

<style>
  input:checked ~ .dot {
    transform: translateX(100%);
    background-color: rgb(79 70 229 / var(--tw-bg-opacity));
  }
</style>
