<script setup lang="ts">
  import { Color, MaterialIcons, ButtonSizes, Variants } from "~/utils";

  interface BaseButtonProps {
    full?: boolean;
    size?: ButtonSizes;
    label?: string;
    color?: Color;
    icon?: MaterialIcons;
    loading?: boolean;
    variant?: Variants;
  }

  withDefaults(defineProps<BaseButtonProps>(), {
    full: false,
    size: "medium",
    label: "",
    color: "primary",
    loading: false,
    variant: "smooth",
  });

  interface BaseButtonEmits {
    (e: "click"): void;
  }

  defineEmits<BaseButtonEmits>();
</script>

<template>
  <button
    :class="[
      'flex justify-center items-center font-bold hover:drop-shadow-lg transition duration-300',
      {
        'bg-green-600 hover:bg-green-500 text-gray-100': !color || color === 'primary',
      },
      { 'bg-purple-600 hover:bg-purple-500 text-gray-100': color === 'purple' },
      { 'bg-red-600 hover:bg-red-500 text-gray-100': color === 'danger' },
      { 'bg-slate-800 hover:bg-slate-500 text-gray-100': color === 'dark' },
      { 'bg-white hover:bg-slate-100 text-black': color === 'light' },
      { 'bg-green-600 hover:bg-green-500 text-gray-100': color === 'success' },
      {
        'bg-yellow-600 hover:bg-yellow-500 text-gray-100': color === 'warning',
      },
      { 'hover:bg-slate-50 text-black': color === 'trasparent' },
      { 'rounded-full': variant === 'circular' },
      { 'rounded-lg': variant === 'smooth' },
      { 'w-full': full ?? false },
      {
        'shadow-lg': color !== 'trasparent',
      },
      {
        'py-4 md:py-3 px-4 md:px-8 text-sm': !size || size === 'medium',
      },
      {
        'py-2 md:py-1 px-2 md:px-4 text-xs': size === 'small',
      },
      {
        'py-6 md:py-5 px-6 md:px-10 text-xl': size === 'large',
      },
    ]"
    type="button"
    @click="$emit('click', $event)"
  >
    <Loading v-if="loading" :color="color" :small="true"></Loading>
    <div v-else class="flex justify-center items-center">
      <MaterialIcon v-if="icon" :component="icon" class="float-left inline" />
      <span :class="['ml-2 float-left sm:inline', { hidden: !full }]" v-if="label">
        {{ label }}
      </span>
    </div>
  </button>
</template>
