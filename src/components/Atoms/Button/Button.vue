<script setup lang="ts">
  import { computed, PropType } from "vue";
  import { Color, Size } from "~/utils";
  const props = defineProps({
    full: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: Number as PropType<Size>,
      required: false,
      default: Size.MEDIUM,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    color: {
      type: Number as PropType<Color>,
      required: false,
      default: Color.PRIMARY,
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    circular: {
      type: Boolean,
      required: false,
      default: false,
    },
  });
  const emit = defineEmits(["click"]);

  const buttonColor = computed(() => {
    switch (props.color) {
      case Color.PURPLE:
        return "bg-purple-600 hover:bg-purple-500 text-gray-100";
      case Color.DANGER:
        return "bg-red-600 hover:bg-red-500 text-gray-100";
      case Color.DARK:
        return "bg-slate-800 hover:bg-slate-500 text-gray-100";
      case Color.LIGHT:
        return "bg-white hover:bg-slate-100 text-black";
      case Color.SUCCESS:
        return "bg-green-600 hover:bg-green-500 text-gray-100";
      case Color.WARNING:
        return "bg-yellow-600 hover:bg-yellow-500 text-gray-100";
      case Color.TRASPARENT:
        return "hover:bg-slate-50 text-black";
      default:
        return "bg-indigo-600 hover:bg-indigo-500 text-gray-100";
    }
  });
</script>

<template>
  <button
    :class="[
      'flex justify-center items-center font-bold hover:drop-shadow-lg transition duration-300 ',
      buttonColor,
      { 'rounded-full': circular },
      { 'rounded-lg': !circular },
      { 'w-full': props.full ?? false },
      {
        'shadow-lg': props.color !== Color.TRASPARENT,
      },
      {
        'py-4 md:py-3 px-4 md:px-8 text-sm': !props.size || props.size === Size.MEDIUM,
      },
      {
        'py-2 md:py-1 px-2 md:px-4 text-xs': props.size === Size.SMALL,
      },
      {
        'py-6 md:py-5 px-6 md:px-10 text-xl': props.size === Size.LARGE,
      },
    ]"
    type="button"
    @click="emit('click', $event)"
  >
    <Loading v-if="props.loading" :color="color" :small="true"></Loading>
    <div v-else class="flex justify-center items-center">
      <Icon v-if="props.icon" :component="props.icon" class="float-left inline" />
      <span :class="['ml-2 float-left sm:inline', { hidden: !props.full }]" v-if="props.label">
        {{ props.label }}
      </span>
    </div>
  </button>
</template>
