<script setup lang="ts">
import type {
  Color,
  MaterialIcons,
  ButtonSizes,
  ButtonVariants,
} from '~/utils';

interface BaseButtonProps {
  full?: boolean;
  size?: ButtonSizes;
  label?: string;
  color?: Color;
  icon?: MaterialIcons;
  loading?: boolean;
  variant?: ButtonVariants;
}

const {
  full = false,
  size = 'medium',
  label = '',
  color = 'primary',
  icon,
  loading = false,
  variant = 'smooth',
} = defineProps<BaseButtonProps>();
</script>

<template>
  <button
    :class="[
      'group relative flex justify-center items-center font-semibold transition-all duration-300 ease-out transform active:scale-95',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      {
        'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-soft hover:shadow-soft-lg focus:ring-primary-500':
          !color || color === 'primary',
      },
      {
        'bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400 text-white shadow-soft hover:shadow-soft-lg focus:ring-secondary-500':
          color === 'purple',
      },
      {
        'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-soft hover:shadow-soft-lg focus:ring-red-500':
          color === 'danger',
      },
      {
        'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white shadow-soft hover:shadow-soft-lg focus:ring-slate-600':
          color === 'dark',
      },
      {
        'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-soft hover:shadow-soft-lg focus:ring-slate-400':
          color === 'light',
      },
      {
        'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-soft hover:shadow-soft-lg focus:ring-primary-500':
          color === 'success',
      },
      {
        'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white shadow-soft hover:shadow-soft-lg focus:ring-yellow-500':
          color === 'warning',
      },
      {
        'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-none':
          color === 'trasparent',
      },
      { 'rounded-full': variant === 'circular' },
      { 'rounded-xl': variant === 'smooth' },
      {
        'bg-transparent hover:bg-transparent text-slate-700 dark:text-slate-300 shadow-none rounded-full':
          variant === 'clean',
      },
      { 'w-full': full ?? false },
      {
        'py-3 px-6 text-sm md:text-base': !size || size === 'medium',
      },
      {
        'py-2 px-4 text-xs md:text-sm': size === 'small',
      },
      {
        'py-4 px-8 text-base md:text-lg': size === 'large',
      },
    ]"
    type="button"
  >
    <Loading
      v-if="loading"
      :color="color"
      :small="true"
    />
    <div
      v-else
      class="flex justify-center items-center gap-2"
    >
      <MaterialIcon
        v-if="icon"
        :component="icon"
        class="transition-transform group-hover:scale-110"
      />
      <span
        v-if="label"
        :class="['font-semibold', { 'hidden sm:inline': !full }]"
      >
        {{ label }}
      </span>
    </div>
  </button>
</template>
