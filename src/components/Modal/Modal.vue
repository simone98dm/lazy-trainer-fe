<script setup lang="ts">
  defineProps(["show", "title"]);
  defineEmits(["close", "confirm"]);
</script>

<template>
  <div>
    <div
      v-if="show"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex justify-center pt-4 px-4 text-center sm:block">
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block my-auto bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle sm:max-w-lg w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 w-full">
            <div class="flex justify-between">
              <h1 class="text-lg font-bold">{{ title }}</h1>
              <button class="float-right" @click="$emit('close')">
                &#x2715;
              </button>
            </div>
            <div class="flex text-center sm:text-left p-4 w-full">
              <slot name="content" />
            </div>
          </div>
          <div
            class="bg-gray-50 px-4 py-3 mb-0 sm:px-6 flex flex-row-reverse gap-3"
          >
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
