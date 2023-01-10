<script setup lang="ts">
  import { computed, ref } from "vue";

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
    customClass: {
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

  const showFullDescription = ref(false);
  const itemDescription = computed(() => {
    if (props.description && !showFullDescription.value) {
      return `${props.description.substring(0, 97)}...`;
    }
    return props.description;
  });

  function millisToMinutesAndSeconds(millis: number) {
    if (!millis) {
      return `0'00"`;
    }

    const minutes: number = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    if (minutes === 0) {
      return `${(seconds < 10 ? "0" : "") + seconds}"`;
    }
    return `${minutes}'${(seconds < 10 ? "0" : "") + seconds}"`;
  }
</script>

<template>
  <div
    :class="[
      'flex flex-col mb-2 dark:text-slate-200 text-slate-600',
      { 'rounded-xl p-4 shadow-lg': !noCard },
      { 'border-b-2 border-dashed mt-3': noCard },
      { 'dark:bg-slate-800 bg-white ': !props.highlight },
      {
        ' border-2 bg-orange-200 border-orange-300 dark:bg-orange-800 dark:border-orange-900':
          props.highlight,
      },
      props.customClass,
    ]"
    @click="showFullDescription = !showFullDescription"
  >
    <div class="flex flex-row items-center justify-between">
      <div>
        <p v-if="props.highlight" class="italic text-sm">
          {{ props.highlight }}
        </p>
        <Icon
          v-if="props.icon"
          custom-class="pr-2 sm:block flex-left inline"
          :component="props.icon"
        />
        <h4
          :class="[
            'flex-left inline text-3xl sm:text-4xl',
            { 'font-semibold': props.description },
            { 'font-bold': !props.description },
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
    <slot class="mt-3" name="actions"></slot>
  </div>
</template>
