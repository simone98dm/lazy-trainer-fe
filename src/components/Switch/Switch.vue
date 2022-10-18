<script setup lang="ts">
  defineProps(["id", "name", "checked"]);
  defineEmits(["toggle"]);
</script>

<template>
  <!-- <div
    class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
  > -->
  <input
    type="checkbox"
    :id="id"
    :name="name"
    :checked="checked"
    @change="$emit('toggle', (($event.target as any) || undefined)?.checked)"
    class="w-6 h-6 rounded-full bg-white"
  />
  <!-- class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" -->
  <!-- <label
      :for="id"
      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
    ></label>
  </div> -->
</template>
