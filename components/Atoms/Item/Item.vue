<script setup lang="ts">
  import { computed } from "vue";
  import { millisToMinutesAndSeconds } from "~/utils";
  import MaterialIcon from "~/components/Atoms/MaterialIcon/MaterialIcon.vue";

  const props = defineProps({
    name: {
      type: String,
      required: false,
      default: "",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    time: {
      type: Number,
      required: false,
      default: 0,
    },
    reps: {
      type: Number,
      required: false,
      default: 0,
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
    requestChange: {
      type: Boolean,
      required: false,
      default: false,
    },
  });

  const itemDescription = computed(() => {
    if (props.description && props.description.length > 100) {
      return `${props.description.substring(0, 97)}...`;
    }
    return props.description;
  });
</script>

<template>
  <div
    class="flex justify-between mb-2 border-b-2 border-dashed mt-3 dark:text-slate-200 text-slate-600"
  >
    <div :class="['flex justify-between w-full', { 'pr-10': $slots.actions }]">
      <MaterialIcon
        v-if="props.icon"
        class="pr-2 sm:block flex-left inline"
        :component="props.icon"
      />

      <div>
        <h4
          :class="[
            { 'font-semibold text-3xl': props.description },
            { 'font-bold text-4xl': !props.description },
          ]"
        >
          {{ props.name }}
        </h4>
        <p v-if="props.description" class="text-sm truncate whitespace-nowrap overflow-hidden">
          {{ itemDescription }}
        </p>
      </div>

      <div class="font-bold text-5xl">
        <h4 v-if="props.time">
          {{ millisToMinutesAndSeconds(props.time) }}
        </h4>
        <h4 v-else-if="props.reps">{{ props.reps }}r</h4>
      </div>

      <p v-if="props.requestChange" class="text-red-600">Client request to change this activity</p>
    </div>
    <slot name="actions"></slot>
  </div>
</template>
