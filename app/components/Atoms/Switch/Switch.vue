<script setup lang="ts">
interface SwitchProps {
  id: string;
  name: string;
  checked?: boolean;
}

const { id, name, checked = false } = defineProps<SwitchProps>();

interface SwitchEvents {
  toggle: [status: boolean];
}

defineEmits<SwitchEvents>();
</script>

<template>
  <label
    :for="id"
    class="relative inline-flex items-center cursor-pointer group"
  >
    <input
      type="checkbox"
      class="sr-only peer"
      :id="id"
      :name="name"
      :checked="checked"
      @change="$emit('toggle', (($event.target as any) || undefined)?.checked)"
    >
    <div
      class="w-14 h-8 bg-slate-200 dark:bg-slate-700 rounded-full peer transition-all duration-300 ease-out peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-primary-600 peer-focus:ring-4 peer-focus:ring-primary-500/20 dark:peer-focus:ring-primary-400/20 shadow-inner-soft group-hover:shadow-soft"
    >
      <div
        class="absolute top-1 left-1 bg-white dark:bg-slate-300 w-6 h-6 rounded-full transition-all duration-300 ease-out shadow-soft peer-checked:translate-x-6 peer-checked:shadow-soft-lg flex items-center justify-center"
      >
        <span
          class="material-icons text-xs text-slate-400 dark:text-slate-600 peer-checked:text-primary-600 transition-all duration-300"
        >
          {{ checked ? 'check' : '' }}
        </span>
      </div>
    </div>
  </label>
</template>

<style scoped>
/* Modern iOS-style toggle with smooth animations */
input[type='checkbox']:checked ~ div > div {
  transform: translateX(1.5rem);
}
</style>
