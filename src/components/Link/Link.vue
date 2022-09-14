<script setup lang="ts">
import { RouterLink } from "vue-router";
import { LinkType } from "../../utils/enum";
const props = defineProps(["to", "full", "type"]);
const emit = defineEmits(["click"]);

const css =
  props.type === LinkType.BUTTON
    ? [
        { "w-full": props.full ?? false },
        { "w-full sm:w-1/2": !props.full ?? false },
        "appearance-none block bg-indigo-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-indigo-500 flex justify-center align-middle",
      ]
    : "";
</script>

<template>
  <router-link :to="to" :class="css" @click="emit('click')">
    <slot />
  </router-link>
</template>
