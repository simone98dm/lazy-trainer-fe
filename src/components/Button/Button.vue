<script setup lang="ts">
  import { ButtonColor, Theme, IconSize } from "../../utils";
  import Icon from "../Icons/Icon.vue";
  import Loading from "../Loading/Loading.vue";
  const props = defineProps([
    "full",
    "size",
    "label",
    "color",
    "icon",
    "theme",
    "loading",
  ]);
  const emit = defineEmits(["click"]);
</script>

<template>
  <button
    :class="[
      'flex',
      'justify-center',
      'item-center',
      { 'w-full': props.full ?? false },
      { 'w-full sm:w-fit': !props.full },
      'appearance-none',
      'block',
      {
        'bg-indigo-600 hover:bg-indigo-500 text-gray-100':
          !props.color || props.color === ButtonColor.PRIMARY,
      },
      {
        'bg-red-600 hover:bg-red-500 text-gray-100':
          props.color === ButtonColor.DANGER,
      },
      {
        'bg-green-600 hover:bg-green-500 text-gray-100':
          props.color === ButtonColor.SUCCESS,
      },
      {
        'bg-orange-600 hover:bg-orange-500 text-gray-100':
          props.color === ButtonColor.WARNING,
      },
      {
        'bg-slate-800 hover:bg-slate-500 text-gray-100':
          props.color === ButtonColor.DARK,
      },
      {
        'bg-white hover:bg-slate-100 text-black':
          props.color === ButtonColor.LIGHT,
      },
      {
        'bg-trasparent hover:bg-slate-100 text-black':
          props.color === ButtonColor.TRASPARENT,
      },
      {
        'text-black': props.theme === Theme.LIGHT,
      },
      {
        'text-white': props.theme === Theme.DARK,
      },
      'font-bold',
      'rounded-lg',
      'py-3',
      'px-3',
      'hover:bg-indigo-500',
      'mb-2',
    ]"
    type="button"
    @click="emit('click')"
  >
    <Loading v-if="props.loading"></Loading>
    <div v-else class="flex align-center">
      <Icon v-if="props.icon" :component="props.icon" :size="IconSize.MEDIUM" />
      <slot />
      <span class="ml-2" v-if="props.label">{{ props.label }}</span>
    </div>
  </button>
</template>
