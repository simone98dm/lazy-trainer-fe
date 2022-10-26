<script setup lang="ts">
  defineProps([
    "value",
    "label",
    "hasError",
    "error",
    "id",
    "name",
    "type",
    "disabled",
  ]);
  console.log();
  defineEmits(["change", "click"]);
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
      'appearance-none block w-full bg-white border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none',
      { 'border-red-600': hasError },
    ]"
    :name="name"
    :id="id"
    @change="$emit('change', (($event.target as any) || undefined)?.value)"
    @input="$emit('change', (($event.target as any) || undefined)?.value)"
    @click="$emit('click')"
    :disabled="disabled"
    :type="type ?? 'text'"
  />
  <span v-if="hasError" class="text-red-600">{{ error }}</span>
</template>
