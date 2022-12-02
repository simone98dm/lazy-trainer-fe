<script setup lang="ts">
  import { computed, ref } from "vue";
  import { ButtonColor } from "~/utils";

  const props = defineProps([
    "id",
    "name",
    "description",
    "time",
    "reps",
    "icon",
    "requestChange",
    "highlight",
    "class",
    "caption",
    "noCard",
    "allowDelete",
  ]);

  const showFullDescription = ref(false);
  const itemDescription = computed(() => {
    if (props.description && !showFullDescription) {
      return props.description.substring(0, 100);
    }
    return props.description;
  });

  function millisToMinutesAndSeconds(millis: number) {
    const minutes: number = Math.floor(millis / 60000);
    const seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
    if (minutes === 0) {
      return `${(seconds < 10 ? "0" : "") + seconds}"`;
    }
    return `${minutes}'${(seconds < 10 ? "0" : "") + seconds}"`;
  }
</script>

<template>
  <div
    :class="[
      'flex flex-col mb-2',
      { 'rounded-xl p-4 shadow-lg': !noCard },
      { 'border-b-2 border-dashed mt-3': noCard },
      { 'bg-white': !props.highlight },
      { 'bg-orange-200 border-2 border-orange-300': props.highlight },
      props.class,
    ]"
    @click="showFullDescription = !showFullDescription"
  >
    <div class="flex flex-row items-center justify-between inline">
      <div>
        <p v-if="props.highlight" class="text-slate-500 italic text-sm">
          {{ props.highlight }}
        </p>
        <Icon
          v-if="props.icon"
          class="pr-2 hidden sm:block flex-left inline"
          :component="props.icon"
        />
        <h4
          :class="[
            'text-slate-600 flex-left inline text-3xl sm:text-4xl',
            { 'font-semibold': props.description },
            { 'font-bold': !props.description },
          ]"
        >
          {{ props.name }}
        </h4>
        <p class="text-xs text-slate-600 my-2">
          {{ props.caption }}
        </p>
      </div>
      <div>
        <h4
          v-if="props.time"
          class="font-bold text-5xl sm:text-4xl text-slate-600"
        >
          {{ millisToMinutesAndSeconds(props.time) }}
        </h4>
        <h4
          v-else-if="props.reps"
          class="font-bold text-5xl sm:text-4xl text-slate-600"
        >
          {{ props.reps }}r
        </h4>
      </div>
      <Button
        v-if="props.allowDelete"
        icon="delete"
        :color="ButtonColor.DANGER"
        @click.prevent="$emit('delete', props.id)"
      />
    </div>

    <p
      v-if="props.description"
      class="text-sm text-slate-600 truncate whitespace-nowrap overflow-hidden"
    >
      {{ itemDescription }}
    </p>

    <p v-if="props.requestChange" class="text-red-600">
      Client request to change this activity
    </p>
    <slot class="mt-3" name="actions"></slot>
  </div>
</template>
