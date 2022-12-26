<script setup lang="ts">
  defineProps({
    value: {
      type: String,
      required: false,
      default: "",
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    error: {
      type: String,
      required: false,
      default: "",
    },
    id: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: false,
      default: "",
    },
    hasError: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  });
  defineEmits(["change", "click", "keyup"]);
</script>

<template>
  <label
    :class="[
      'font-bold mb-2',
      { 'text-red-600': hasError },
      { 'text-gray-800': !hasError },
    ]"
    for="activityName"
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
    @keyup="$emit('keyup', $event)"
    :disabled="disabled"
    :type="type ?? 'text'"
  />
  <span v-if="hasError" class="text-red-600">{{ error }}</span>
</template>
