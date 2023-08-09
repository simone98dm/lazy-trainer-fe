<script setup lang="ts">
  interface InputProps {
    value: string;
    label: string;
    error: string;
    id: string;
    name: string;
    type: string;
    hasError: boolean;
    disabled: boolean;
  }

  withDefaults(defineProps<InputProps>(), {
    value: "",
    label: "",
    error: "",
    id: "",
    name: "",
    type: "text",
    hasError: false,
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
    :class="['font-bold mb-2', { 'text-red-600': hasError }, { 'text-gray-800': !hasError }]"
    :for="name"
  >
    {{ label }}
  </label>
  <input
    :value="value"
    :class="[
      'appearance-none block w-full bg-white border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-indigo-500',
      { 'border-red-600': hasError },
    ]"
    :name="name"
    :id="id"
    @change="$emit('change', (($event.target as any) || undefined)?.value)"
    @input="$emit('change', (($event.target as any) || undefined)?.value)"
    @click="$emit('click')"
    @keyup="$emit('keyup', $event, (($event.target as any) || undefined)?.value)"
    :disabled="disabled"
    :type="type"
    autocomplete="off"
  />
  <span v-if="hasError" class="text-red-600">{{ error }}</span>
</template>
