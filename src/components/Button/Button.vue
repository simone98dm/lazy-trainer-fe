<script setup lang="ts">
  import { useUserStore } from "~/stores/user";
  import { ButtonColor } from "~/utils";
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
      'shadow-lg',
      'font-bold',
      'text-sm',
      'rounded-lg',
      'py-2 md:py-3',
      'px-2 md:px-8',
      { 'w-full': props.full ?? false },
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
    ]"
    type="button"
    @click="emit('click')"
  >
    <Loading v-if="props.loading" :small="true"></Loading>
    <div v-else>
      <Icon
        v-if="props.icon"
        :component="props.icon"
        class="float-left inline"
      />
      <span
        :class="['ml-2 float-left inline', { 'hidden sm:block': !props.full }]"
        v-if="props.label"
      >
        {{ props.label }}
      </span>
    </div>
  </button>
</template>
