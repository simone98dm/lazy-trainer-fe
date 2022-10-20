<script setup lang="ts">
  import { useUserStore } from "~/stores/user";
  import { ButtonColor, ButtonSize } from "~/utils";
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
  const user = useUserStore();
</script>

<template>
  <button
    :class="[
      'flex',
      'justify-center',
      'item-center',
      'appearance-none',
      'block',
      'font-bold',
      'rounded-lg',
      'py-3',
      'px-3',
      'shadow-lg',
      'mb-2',
      { 'w-full xl:w-1/3 lg:w-1/2 md:w-4/5': props.full ?? false },
      { 'w-full sm:w-fit': !props.full },
      {
        'bg-indigo-600 hover:bg-indigo-500 text-gray-100':
          (!props.color || props.color === ButtonColor.PRIMARY) &&
          !user.isTrainer,
      },
      {
        'bg-purple-600 hover:bg-purple-500 text-gray-100':
          (!props.color || props.color === ButtonColor.PRIMARY) &&
          user.isTrainer,
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
        'bg-purple-600 hover:bg-purple-500 text-gray-100':
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
        'text-xl': props.size === ButtonSize.LARGE,
      },
      {
        'text-md': props.size === ButtonSize.MEDIUM,
      },
      {
        'text-sm': props.size === ButtonSize.SMALL,
      },
    ]"
    type="button"
    @click="emit('click')"
  >
    <Loading v-if="props.loading" :small="true"></Loading>
    <div v-else class="flex align-center">
      <Icon v-if="props.icon" :component="props.icon" />
      <slot />
      <span class="ml-2" v-if="props.label">{{ props.label }}</span>
    </div>
  </button>
</template>
