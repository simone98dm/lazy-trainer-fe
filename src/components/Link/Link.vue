<script setup lang="ts">
import { RouterLink } from "vue-router";
import { LinkType } from "../../utils/enum";
const props = defineProps(["to", "full", "type", "label"]);
const emit = defineEmits(["click"]);

const css =
  props.type === LinkType.BUTTON
    ? [
        "flex",
        "justify-center",
        "item-center",
        { "w-full": props.full ?? false },
        { "w-full sm:w-1/2": !props.full },
        "appearance-none",
        "block",
        "bg-indigo-600",
        "text-gray-100",
        "font-bold",
        "border",
        "border-gray-200",
        "rounded-lg",
        "py-3",
        "px-3",
        "hover:bg-indigo-500",
      ]
    : "";
</script>

<template>
  <router-link :to="to" :class="css" @click="emit('click')">
    <slot />
    <span class="ml-2" v-if="props.label">{{ props.label }}</span>
  </router-link>
</template>
