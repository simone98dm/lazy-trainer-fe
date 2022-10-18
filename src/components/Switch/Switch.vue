<script setup lang="ts">
  defineProps(["id", "name", "checked"]);
  defineEmits(["toggle"]);
</script>

<template>
  <div
    class="relative inline-block w-14 mr-2 align-middle select-none transition duration-200 ease-in"
  >
    <input
      :id="id"
      class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-2 appearance-none cursor-pointer"
      :name="name"
      type="checkbox"
      :checked="checked"
      @change="$emit('toggle', (($event.target as any) || undefined)?.checked)"
    />
    <label
      class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"
      for="toggle"
    ></label>
  </div>
</template>
