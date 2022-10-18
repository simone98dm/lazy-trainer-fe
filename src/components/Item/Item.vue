<script setup lang="ts">
  import Icon from "~/components/Icons/Icon.vue";

  const props = defineProps([
    "id",
    "name",
    "description",
    "time",
    "reps",
    "icon",
    "requestChange",
  ]);

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
  <div class="flex flex-col rounded-xl bg-white p-3 shadow-lg mb-2">
    <div class="flex flex-row items-center justify-between">
      <div class="flex">
        <div
          v-if="props.icon"
          class="p-2 hidden sm:block flex justify-center align-center"
        >
          <Icon :component="props.icon" />
        </div>
        <div
          v-if="props.name"
          class="sm:ml-2 flex flex-col justify-center pl-2"
        >
          <h4
            :class="[
              'text-gray-600',
              { 'font-semibold text-2xl sm:text-3xl': props.description },
              { 'font-bold text-3xl sm:text-4xl': !props.description },
            ]"
          >
            {{ props.name }}
          </h4>
          <p class="text-sm text-slate-500" v-if="props.description">
            {{ props.description }}
          </p>
        </div>
      </div>
      <div>
        <h4
          v-if="props.time"
          class="font-bold text-5xl sm:text-4xl text-slate-500"
        >
          {{ millisToMinutesAndSeconds(props.time) }}
        </h4>
        <h4
          v-else-if="props.reps"
          class="font-bold text-5xl sm:text-4xl text-slate-500"
        >
          {{ props.reps }}r
        </h4>
      </div>
    </div>
    <div>
      <p v-if="props.requestChange" class="text-red-600">
        Client request to change this activity
      </p>
    </div>
  </div>
</template>
