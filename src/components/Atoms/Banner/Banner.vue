<script setup lang="ts">
  import { PropType } from "vue";
  import { Color } from "~/utils";

  defineProps({
    text: {
      type: String,
      required: false,
      default: "",
    },
    color: {
      type: Number as PropType<Color>,
      required: false,
      default: Color.PRIMARY,
    },
  });
</script>

<template>
  <div
    :class="[
      'fixed bottom-16 left-0 w-full text-lg text-white text-center py-1 lg:px-4',
      { 'bg-red-300 text-red-700': color === Color.DANGER },
      { 'bg-yellow-300 text-yellow-700': color === Color.WARNING },
      { 'bg-purple-300 text-purple-700': color === Color.PURPLE },
      { 'bg-indigo-300 text-indigo-700': color === Color.PRIMARY },
      { 'bg-slate-300 text-slate-700': color === Color.DARK },
      { 'bg-white text-black': color === Color.LIGHT },
      { 'bg-green-300 text-green-700': color === Color.SUCCESS },
    ]"
  >
    <div v-if="text">
      <p v-if="text" class="p-2">
        {{ text }}
      </p>
      <div class="absolute top-0 right-0 p-4">
        <button @click="$emit('close')">
          <Icon
            component="close"
            :class="[
              { 'text-red-700': color === Color.DANGER },
              { 'text-yellow-700': color === Color.WARNING },
              { 'text-purple-700': color === Color.PURPLE },
              { 'text-indigo-700': color === Color.PRIMARY },
              { 'text-slate-700': color === Color.DARK },
              { 'text-black': color === Color.LIGHT },
              { 'text-green-700': color === Color.SUCCESS },
            ]"
          />
        </button>
      </div>
    </div>
    <slot v-else name="customContent" />
  </div>
</template>

<style scoped>
  .bottom-16 {
    bottom: 4rem;
  }
</style>
