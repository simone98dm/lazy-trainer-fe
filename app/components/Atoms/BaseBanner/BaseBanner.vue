<script setup lang="ts">
import { type Color } from '~/utils';

interface BaseBannerProps {
  text?: string;
  color?: Color;
}

interface BaseBannerEmits {
  close: [];
}

const { color = 'primary', text = '' } = defineProps<BaseBannerProps>();

defineEmits<BaseBannerEmits>();
</script>

<template>
  <div
    :class="[
      'fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4',
      'rounded-2xl shadow-soft-lg backdrop-blur-lg border animate-slide-up',
      'transition-all duration-300 ease-out',
      {
        'bg-red-50/95 dark:bg-red-900/95 border-red-200 dark:border-red-800':
          color === 'danger',
      },
      {
        'bg-yellow-50/95 dark:bg-yellow-900/95 border-yellow-200 dark:border-yellow-800':
          color === 'warning',
      },
      {
        'bg-secondary-50/95 dark:bg-secondary-900/95 border-secondary-200 dark:border-secondary-800':
          color === 'purple',
      },
      {
        'bg-primary-50/95 dark:bg-primary-900/95 border-primary-200 dark:border-primary-800':
          color === 'primary' || color === 'success',
      },
      {
        'bg-slate-50/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800':
          color === 'dark',
      },
      {
        'bg-white/95 dark:bg-slate-800/95 border-slate-200 dark:border-slate-700':
          color === 'light',
      },
    ]"
  >
    <div
      v-if="text"
      class="flex items-start gap-3 p-4"
    >
      <MaterialIcon
        :component="
          color === 'danger'
            ? 'error'
            : color === 'warning'
              ? 'error'
              : color === 'success' || color === 'primary'
                ? 'check'
                : 'error'
        "
        :class="[
          'flex-shrink-0 mt-0.5',
          { 'text-red-600 dark:text-red-400': color === 'danger' },
          { 'text-yellow-600 dark:text-yellow-400': color === 'warning' },
          { 'text-secondary-600 dark:text-secondary-400': color === 'purple' },
          {
            'text-primary-600 dark:text-primary-400':
              color === 'primary' || color === 'success',
          },
          { 'text-slate-600 dark:text-slate-400': color === 'dark' },
          {
            'text-slate-900 dark:text-slate-100': color === 'light',
          },
        ]"
      />
      <p
        :class="[
          'flex-1 text-sm font-medium leading-relaxed',
          { 'text-red-800 dark:text-red-200': color === 'danger' },
          { 'text-yellow-800 dark:text-yellow-200': color === 'warning' },
          { 'text-secondary-800 dark:text-secondary-200': color === 'purple' },
          {
            'text-primary-800 dark:text-primary-200':
              color === 'primary' || color === 'success',
          },
          { 'text-slate-800 dark:text-slate-200': color === 'dark' },
          { 'text-slate-900 dark:text-slate-100': color === 'light' },
        ]"
      >
        {{ text }}
      </p>
      <button
        @click="$emit('close')"
        :class="[
          'flex-shrink-0 p-1 rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-black/20',
          { 'text-red-600 dark:text-red-400': color === 'danger' },
          { 'text-yellow-600 dark:text-yellow-400': color === 'warning' },
          { 'text-secondary-600 dark:text-secondary-400': color === 'purple' },
          {
            'text-primary-600 dark:text-primary-400':
              color === 'primary' || color === 'success',
          },
          { 'text-slate-600 dark:text-slate-400': color === 'dark' },
          { 'text-slate-900 dark:text-slate-100': color === 'light' },
        ]"
      >
        <MaterialIcon component="close" />
      </button>
    </div>
    <slot v-else />
  </div>
</template>
