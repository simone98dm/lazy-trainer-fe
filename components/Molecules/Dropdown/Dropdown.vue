<script setup lang="ts">
  import { ref } from "vue";

  const showDropdown = ref(false);
</script>

<template>
  <div class="relative">
    <div
      class="flex flex-row items-center w-full text-sm font-semibold text-left bg-transparent rounded-lg text-white"
    >
      <BaseButton
        icon="more_vert"
        color="trasparent"
        @click="() => (showDropdown = !showDropdown)"
      />
    </div>
    <div
      v-if="showDropdown"
      class="absolute right-0 w-fit origin-top-right rounded-md shadow-lg -mt-2"
    >
      <div class="p-2 bg-white rounded-md shadow">
        <slot />
      </div>
    </div>
  </div>
</template>
