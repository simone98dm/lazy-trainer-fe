<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from "vue";

  interface BaseModalProps {
    title?: string;
  }

  withDefaults(defineProps<BaseModalProps>(), {
    title: "",
  });

  interface BaseModalEmits {
    (e: "close"): void;
    (e: "confirm"): void;
  }

  defineEmits<BaseModalEmits>();

  const isMobile = ref<boolean>(false);

  onMounted(() => {
    isMobile.value = window.innerWidth <= 640;
    window.addEventListener("resize", updateIsMobile);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateIsMobile);
  });

  function updateIsMobile() {
    isMobile.value = window.innerWidth <= 640;
  }
</script>

<template>
  <div
    class="fixed z-10 inset-0 flex items-center justify-center overflow-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>
    <div
      class="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-full mx-auto transition-all transform"
      :class="{
        'sm:max-w-lg': !isMobile,
        'sm:max-w-screen-sm': isMobile,
        'top-0': isMobile,
        'sm:top-auto': !isMobile,
        'left-0': !isMobile,
        'sm:left-auto': isMobile,
        'right-0': !isMobile,
        'sm:right-auto': isMobile,
        'h-auto': !isMobile,
        'max-h-screen': isMobile,
        'w-full': !isMobile,
        'max-w-500': !isMobile,
      }"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div class="bg-gray-50 dark:bg-gray-900 px-4 pt-5 pb-4 sm:p-6">
        <div class="flex justify-between">
          <h1 class="text-lg font-bold">{{ title }}</h1>
          <button class="float-right" @click="$emit('close')">&#x2715;</button>
        </div>
        <div class="flex sm:text-left p-4">
          <slot name="content" />
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-900 px-4 py-3 mb-0 sm:px-6 flex flex-row-reverse gap-3">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
