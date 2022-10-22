<script setup lang="ts">
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
  <div class="flex flex-col rounded-xl bg-white p-6 md:p-4 shadow-lg mb-2">
    <div class="flex flex-row items-center justify-between">
      <div class="flex">
        <Icon
          v-if="props.icon"
          class="p-2 hidden sm:block flex justify-center align-center"
          :component="props.icon"
        />
        <h4
          :class="[
            'text-gray-600',
            { 'font-semibold text-2xl sm:text-3xl': props.description },
            { 'font-bold text-3xl sm:text-4xl': !props.description },
          ]"
        >
          {{ props.name }}
        </h4>
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

    <p
      class="text-sm text-slate-500 truncate whitespace-nowrap overflow-hidden"
      v-if="props.description"
    >
      {{ props.description }}
    </p>
    <div>
      <p v-if="props.requestChange" class="text-red-600">
        Client request to change this activity
      </p>
    </div>
  </div>
</template>
