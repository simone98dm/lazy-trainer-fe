<script setup lang="ts">
  import { computed, ref } from "vue";
  import { millisToMinutesAndSeconds } from "~/utils";

  const props = defineProps({
    id: {
      type: String,
      required: false,
      default: "",
    },
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
    highlight: {
      type: String,
      required: false,
      default: "",
    },
    caption: {
      type: String,
      required: false,
      default: "",
    },
    noCard: {
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
    :class="[
      'mb-2',
      { 'rounded-xl p-4 shadow-lg h-[250px] xl:w-[400px] w-full': !noCard },
      { 'border-b-2 border-dashed mt-3': noCard },
      { 'dark:bg-slate-800 bg-white': !props.highlight },
      {
        'border-2 bg-orange-200 border-orange-300 dark:bg-orange-800 dark:border-orange-900':
          props.highlight,
      },
    ]"
  >
    <Icon v-if="props.icon" class="pr-2 sm:block flex-left inline" :component="props.icon" />
    <div :class="['flex flex-col dark:text-slate-200 text-slate-600']">
      <div class="flex flex-row items-center justify-between">
        <div>
          <p v-if="props.highlight" class="italic text-sm">
            {{ props.highlight }}
          </p>
          <h4
            :class="[
              'flex-left inline',
              { 'font-semibold text-3xl': props.description },
              { 'font-bold text-4xl': !props.description },
            ]"
            name="item-name"
          >
            {{ props.name }}
          </h4>
          <p class="text-xs my-2" name="item-caption">
            {{ props.caption }}
          </p>
        </div>
        <div>
          <h4 v-if="props.time" class="font-bold text-5xl sm:text-4xl" name="item-time">
            {{ millisToMinutesAndSeconds(props.time) }}
          </h4>
          <h4 v-else-if="props.reps" class="font-bold text-5xl sm:text-4xl" name="item-reps">
            {{ props.reps }}r
          </h4>
        </div>
      </div>
      <p
        v-if="props.description"
        class="text-sm truncate whitespace-nowrap overflow-hidden"
        name="item-description"
      >
        {{ itemDescription }}
      </p>

      <p v-if="props.requestChange" class="text-red-600" name="item-request-changes">
        Client request to change this activity
      </p>
    </div>
    <slot name="actions"></slot>
    <slot name="image"></slot>
  </div>
</template>
