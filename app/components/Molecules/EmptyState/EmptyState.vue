<script setup lang="ts">
import type { MaterialIcons } from '~/utils';

interface EmptyStateProps {
  icon?: MaterialIcons;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: MaterialIcons;
}

const {
  icon = 'inventory',
  title = 'No data yet',
  description = '',
  actionLabel = '',
  actionIcon,
} = defineProps<EmptyStateProps>();

interface EmptyStateEmits {
  action: [];
}

defineEmits<EmptyStateEmits>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in"
  >
    <!-- Icon Container -->
    <div
      class="w-24 h-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center mb-6 shadow-soft"
    >
      <MaterialIcon
        :component="icon"
        class="text-5xl text-slate-400 dark:text-slate-500"
      />
    </div>

    <!-- Title -->
    <h3
      class="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3"
    >
      {{ title }}
    </h3>

    <!-- Description -->
    <p
      v-if="description"
      class="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-md mb-6"
    >
      {{ description }}
    </p>

    <!-- Action Button -->
    <BaseButton
      v-if="actionLabel"
      :label="actionLabel"
      :icon="actionIcon"
      color="primary"
      size="medium"
      @click="$emit('action')"
    />

    <!-- Slot for custom content -->
    <div
      v-if="$slots.default"
      class="mt-6"
    >
      <slot />
    </div>
  </div>
</template>
