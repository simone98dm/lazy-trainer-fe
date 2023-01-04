<script setup lang="ts">
  defineProps({
    padding: {
      type: String,
      required: false,
      default: "medium",
    },
    title: {
      type: String,
      required: false,
      default: undefined,
    },
    description: {
      type: String,
      required: false,
      default: undefined,
    },
  });
</script>

<template>
  <div
    :class="[
      'rounded-xl shadow-lg mb-2 bg-white w-full',
      {
        'p-0': padding === 'none',
        'p-2': padding === 'small',
        'p-4': padding || padding === 'medium',
        'p-6': padding === 'large',
      },
    ]"
  >
    <h1 class="text-slate-800 font-bold text-4xl" v-if="title">{{ title }}</h1>
    <h3 class="text-slate-400 font-bolder text-2xl" v-if="description">
      {{ description }}
    </h3>
    <slot />
  </div>
</template>
