<script setup lang="ts">
import { RouterLink } from "vue-router";
import { LinkType, ButtonColor } from "../../utils/enum";
const props = defineProps(["to", "full", "type", "label", "color"]);
const emit = defineEmits(["click"]);

const css =
  props.type === LinkType.BUTTON
    ? [
        "flex",
        "justify-center",
        "item-center",
        { "w-full": props.full ?? false },
        { "w-full sm:w-fit": !props.full },
        "appearance-none",
        "block",
        {
          "bg-indigo-600 hover:bg-indigo-500":
            !props.color || props.color === ButtonColor.PRIMARY,
        },
        { "bg-red-600 hover:bg-red-500": props.color === ButtonColor.DANGER },
        {
          "bg-green-600 hover:bg-green-500":
            props.color === ButtonColor.SUCCESS,
        },
        {
          "bg-orange-600 hover:bg-orange-500":
            props.color === ButtonColor.WARNING,
        },
        {
          "bg-slate-800 hover:bg-slate-500":
            props.color === ButtonColor.DARK,
        },
        {
          "bg-white hover:bg-slate-100 text-black":
            props.color === ButtonColor.LIGHT,
        },
        "text-gray-100",
        "font-bold",
        "border",
        "border-gray-200",
        "rounded-lg",
        "py-3",
        "px-3",
      ]
    : "";
</script>

<template>
  <router-link :to="to" :class="css" @click="emit('click')">
    <slot />
    <span class="ml-2" v-if="props.label">{{ props.label }}</span>
  </router-link>
</template>
