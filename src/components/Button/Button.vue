<script setup lang="ts">
import { ButtonSize } from "../../utils/enum";

const props = defineProps(["full", "size"]);
const emit = defineEmits(["click"]);

let size = "";
switch (props.size) {
  case ButtonSize.LARGE:
    size = "h-32";
    break;
  case ButtonSize.MEDIUM:
    size = "h-16";
    break;
  case ButtonSize.SMALL:
    size = "h-8";
    break;
  default:
    break;
}
</script>

<template>
  <button
    :class="[
      size,
      { 'w-full': props.full ?? false },
      'appearance-none block bg-indigo-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-indigo-500 flex justify-center align-middle',
    ]"
    type="button"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
