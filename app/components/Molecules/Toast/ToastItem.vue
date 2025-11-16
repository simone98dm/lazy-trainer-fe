<script setup lang="ts">
import type { Color, MaterialIcons } from '~/utils';

interface Toast {
  id: string;
  message: string;
  type: Color;
  duration?: number;
}

interface ToastItemProps {
  toast: Toast;
}

const { toast } = defineProps<ToastItemProps>();

interface ToastItemEmits {
  remove: [id: string];
}

const emit = defineEmits<ToastItemEmits>();

const isVisible = ref(true);

onMounted(() => {
  if (toast.duration) {
    setTimeout(() => {
      isVisible.value = false;
      setTimeout(() => emit('remove', toast.id), 300);
    }, toast.duration);
  }
});

function handleClose() {
  isVisible.value = false;
  setTimeout(() => emit('remove', toast.id), 300);
}

const iconMap: Record<string, MaterialIcons> = {
  success: 'check',
  danger: 'error',
  warning: 'error',
  primary: 'check',
};
</script>

<template>
  <div
    :class="[
      'flex items-start gap-3 p-4 rounded-2xl shadow-soft-lg backdrop-blur-lg border transition-all duration-300 min-w-[320px] max-w-md',
      {
        'translate-x-0 opacity-100': isVisible,
        'translate-x-full opacity-0': !isVisible,
      },
      {
        'bg-primary-50/95 dark:bg-primary-900/95 border-primary-200 dark:border-primary-800':
          toast.type === 'primary' || toast.type === 'success',
      },
      {
        'bg-red-50/95 dark:bg-red-900/95 border-red-200 dark:border-red-800':
          toast.type === 'danger',
      },
      {
        'bg-yellow-50/95 dark:bg-yellow-900/95 border-yellow-200 dark:border-yellow-800':
          toast.type === 'warning',
      },
      {
        'bg-secondary-50/95 dark:bg-secondary-900/95 border-secondary-200 dark:border-secondary-800':
          toast.type === 'purple',
      },
    ]"
  >
    <!-- Icon -->
    <MaterialIcon
      :component="iconMap[toast.type] || 'check'"
      :class="[
        'flex-shrink-0 mt-0.5',
        {
          'text-primary-600 dark:text-primary-400':
            toast.type === 'primary' || toast.type === 'success',
        },
        { 'text-red-600 dark:text-red-400': toast.type === 'danger' },
        { 'text-yellow-600 dark:text-yellow-400': toast.type === 'warning' },
        {
          'text-secondary-600 dark:text-secondary-400': toast.type === 'purple',
        },
      ]"
    />

    <!-- Message -->
    <p
      :class="[
        'flex-1 text-sm font-medium leading-relaxed',
        {
          'text-primary-800 dark:text-primary-200':
            toast.type === 'primary' || toast.type === 'success',
        },
        { 'text-red-800 dark:text-red-200': toast.type === 'danger' },
        { 'text-yellow-800 dark:text-yellow-200': toast.type === 'warning' },
        {
          'text-secondary-800 dark:text-secondary-200': toast.type === 'purple',
        },
      ]"
    >
      {{ toast.message }}
    </p>

    <!-- Close Button -->
    <button
      @click="handleClose"
      :class="[
        'flex-shrink-0 p-1 rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-black/20',
        {
          'text-primary-600 dark:text-primary-400':
            toast.type === 'primary' || toast.type === 'success',
        },
        { 'text-red-600 dark:text-red-400': toast.type === 'danger' },
        { 'text-yellow-600 dark:text-yellow-400': toast.type === 'warning' },
        {
          'text-secondary-600 dark:text-secondary-400': toast.type === 'purple',
        },
      ]"
      aria-label="Close notification"
    >
      <MaterialIcon component="close" />
    </button>
  </div>
</template>
