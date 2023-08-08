<script setup lang="ts">
  import { Color } from "~/utils";

  interface BaseBannerProps {
    text?: string;
    color?: Color;
  }

  interface BaseBannerEmits {
    (e: "close"): void;
  }

  withDefaults(defineProps<BaseBannerProps>(), {
    color: "primary",
    text: "",
  });

  defineEmits<BaseBannerEmits>();
</script>

<template>
  <div
    :class="[
      'fixed bottom-16 left-0 w-full text-lg text-white text-center py-1 lg:px-4',
      { 'bg-red-300 text-red-700': color === 'danger' },
      { 'bg-yellow-300 text-yellow-700': color === 'warning' },
      { 'bg-purple-300 text-purple-700': color === 'purple' },
      { 'bg-indigo-300 text-indigo-700': color === 'primary' },
      { 'bg-slate-300 text-slate-700': color === 'dark' },
      { 'bg-white text-black': color === 'light' },
      { 'bg-green-300 text-green-700': color === 'success' },
    ]"
  >
    <div v-if="text">
      <p v-if="text" class="p-2">
        {{ text }}
      </p>
      <div class="absolute top-0 right-0 p-4">
        <button @click="$emit('close')">
          <MaterialIcon
            component="close"
            :class="[
              { 'text-red-700': color === 'danger' },
              { 'text-yellow-700': color === 'warning' },
              { 'text-purple-700': color === 'purple' },
              { 'text-indigo-700': color === 'primary' },
              { 'text-slate-700': color === 'dark' },
              { 'text-black': color === 'light' },
              { 'text-green-700': color === 'success' },
            ]"
          />
        </button>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<style scoped>
  .bottom-16 {
    bottom: 4rem;
  }
</style>
