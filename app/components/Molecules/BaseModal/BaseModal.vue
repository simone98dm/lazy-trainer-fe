<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface BaseModalProps {
  title?: string;
}

const { title = '' } = defineProps<BaseModalProps>();

interface BaseModalEmits {
  close: [];
  confirm: [];
}

defineEmits<BaseModalEmits>();

const isMobile = ref<boolean>(false);

onMounted(() => {
  isMobile.value = window.innerWidth <= 640;
  window.addEventListener('resize', updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile);
});

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 640;
}
</script>

<template>
  <div
    class="fixed z-50 inset-0 flex items-center justify-center p-4 animate-fade-in"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Backdrop with blur -->
    <div
      class="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity"
      aria-hidden="true"
      @click="$emit('close')"
    />

    <!-- Modal Container -->
    <div
      class="relative bg-white dark:bg-slate-800 rounded-3xl shadow-soft-lg max-w-full mx-auto transition-all transform animate-scale-in border border-slate-200 dark:border-slate-700 overflow-hidden"
      :class="{
        'w-full max-w-lg': !isMobile,
        'w-full max-w-screen-sm min-h-screen sm:min-h-0': isMobile,
      }"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <!-- Header -->
      <div
        class="sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-6 py-4 z-10"
      >
        <div class="flex items-center justify-between">
          <h1
            class="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"
          >
            {{ title }}
          </h1>
          <button
            class="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 active:scale-95"
            @click="$emit('close')"
            aria-label="Close modal"
          >
            <MaterialIcon component="close" />
          </button>
        </div>
      </div>

      <!-- Content -->
      <div
        class="px-6 py-6 max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar"
      >
        <div class="text-slate-700 dark:text-slate-300">
          <slot name="content" />
        </div>
      </div>

      <!-- Footer Actions -->
      <div
        v-if="$slots.actions"
        class="sticky bottom-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 px-6 py-4"
      >
        <div class="flex flex-row-reverse gap-3 flex-wrap">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-slate-100 dark:bg-slate-800 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-300 dark:bg-slate-600 rounded-full hover:bg-slate-400 dark:hover:bg-slate-500;
}
</style>
