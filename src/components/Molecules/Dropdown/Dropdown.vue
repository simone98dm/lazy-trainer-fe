<script setup lang="ts">
  import { ref } from "vue";
  import { ButtonColor } from "~/utils";

  let showDropdown = ref(false);
</script>

<template>
  <div class="relative">
    <div
      class="flex flex-row items-center w-full text-sm font-semibold text-left bg-transparent rounded-lg text-white"
    >
      <Button
        icon="more_vert"
        :color="ButtonColor.TRASPARENT"
        @click="() => (showDropdown = !showDropdown)"
      ></Button>
    </div>
    <div
      v-if="showDropdown"
      class="absolute right-0 w-fit mt-2 origin-top-right rounded-md shadow-lg -mt-2"
    >
      <div class="p-2 bg-white rounded-md shadow">
        <slot />
      </div>
    </div>
  </div>
</template>
