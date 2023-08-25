<script setup lang="ts">
  interface InputProps {
    value?: string;
    label?: string;
    error?: string;
    id: string;
    name: string;
    type?: string;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<InputProps>(), {
    value: "",
    error: "",
    label: "",
    type: "text",
    disabled: false,
  });

  interface InputEmits {
    (e: "change", data: string): void;
    (e: "click"): void;
    (e: "keyup", data: string): void;
  }

  defineEmits<InputEmits>();
</script>

<template>
  <label
    :class="[
      'font-bold mb-2',
      { 'text-red-600': error },
      { 'text-gray-800 dark:text-gray-400': !error },
    ]"
    :for="name"
  >
    {{ label }}
  </label>
  <input
    :value="value"
    :class="[
      'appearance-none block w-full bg-gray-100 dark:bg-slate-800 border text-slate-800 dark:text-gray-100 border-gray-400 dark:border-gray-700 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-green-500',
      { 'border-red-600': error },
    ]"
    :name="name"
    :id="id"
    @change="$emit('change', (($event.target as any) || undefined)?.value)"
    @keyup="$emit('change', (($event.target as any) || undefined)?.value)"
    @click="$emit('click')"
    :disabled="disabled"
    :type="type"
    autocomplete="off"
  />
  <span v-if="error" class="text-red-600">{{ error }}</span>
</template>
