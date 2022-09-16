<script setup lang="ts">
import Bench from "@/components/Icons/Bench.vue";
import Icon from "@/components/Icons/Icon.vue";
import { IconSize } from "../../utils";

const props = defineProps(["id", "name", "description", "time", "reps"]);

function millisToMinutesAndSeconds(millis: number) {
  const minutes: number = Math.floor(millis / 60000);
  const seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
  if (minutes === 0) {
    return `${(seconds < 10 ? "0" : "") + seconds}"`;
  }
  return `${minutes}' ${(seconds < 10 ? "0" : "") + seconds}"`;
}
</script>

<template>
  <div
    class="flex flex-row items-center justify-between rounded-xl bg-white p-3 shadow-sm mb-2"
  >
    <div class="flex">
      <div class="p-2 hidden sm:block">
        <Icon :class="IconSize.LARGE" :component="Bench"></Icon>
      </div>
      <div class="sm:ml-4">
        <h4 class="font-semibold text-2xl text-gray-600">
          {{ props.name }}
        </h4>
        <p class="text-sm text-slate-500">
          {{ props.description }}
        </p>
      </div>
    </div>
    <div>
      <h4
        v-if="props.time"
        class="font-bold text-6xl sm:text-4xl text-slate-500"
      >
        {{ millisToMinutesAndSeconds(props.time) }}
      </h4>
      <h4
        v-else-if="props.reps"
        class="font-bold text-6xl sm:text-4xl text-slate-500"
      >
        {{ props.reps }}r
      </h4>
    </div>
  </div>
</template>
