<script setup lang="ts">
import { ref, computed } from 'vue';

interface InputProps {
  value?: string;
  label?: string;
  error?: string;
  required?: boolean;
  id: string;
  name: string;
  type?: string;
  disabled?: boolean;
}

const {
  id,
  name,
  value = '',
  error = '',
  label = '',
  type = 'text',
  disabled = false,
  required = false,
} = defineProps<InputProps>();

interface InputEmits {
  change: [data: string];
  click: [];
  keyup: [data: string];
}

defineEmits<InputEmits>();

const isFocused = ref(false);
const hasValue = computed(() => value && value.length > 0);
</script>

<template>
  <div class="relative w-full group">
    <input
      :value="value"
      :class="[
        'peer w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ease-out',
        'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
        'placeholder-transparent focus:outline-none',
        'shadow-soft focus:shadow-soft-lg',
        {
          'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20':
            error,
        },
        {
          'border-slate-200 dark:border-slate-700 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 dark:focus:ring-primary-400/20':
            !error,
        },
        { 'opacity-50 cursor-not-allowed': disabled },
      ]"
      :name="name"
      :id="id"
      :placeholder="label"
      @change="$emit('change', (($event.target as any) || undefined)?.value)"
      @keyup="$emit('change', (($event.target as any) || undefined)?.value)"
      @click="$emit('click')"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :disabled="disabled"
      :type="type"
      autocomplete="off"
    >
    <label
      :for="id"
      :class="[
        'absolute left-4 transition-all duration-300 ease-out pointer-events-none',
        'peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base',
        'peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:px-1',
        '-top-2.5 left-3 text-xs px-1',
        'bg-white dark:bg-slate-800 rounded',
        {
          'text-red-500 peer-focus:text-red-500': error,
        },
        {
          'text-slate-600 dark:text-slate-400 peer-focus:text-primary-600 dark:peer-focus:text-primary-400':
            !error,
        },
        { 'font-semibold': isFocused || hasValue },
      ]"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      > * </span>
    </label>
    <p
      v-if="error"
      class="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1 animate-slide-down"
    >
      <MaterialIcon
        component="error"
        class="text-base"
      />
      {{ error }}
    </p>
  </div>
</template>
