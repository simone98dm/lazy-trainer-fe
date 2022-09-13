<script setup lang="ts">
import image from "../../assets/exercise.png";
const props = defineProps(["id", "name", "description", "time"]);
const emits = defineEmits(["click"]);

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
    class="flex flex-col justify-evenly rounded-xl bg-white p-3 shadow-sm mb-2"
    @click="emits('click', props.id)"
  >
    <h4 class="font-semibold text-gray-600">
      {{ props.name }}
    </h4>
    <p class="text-sm text-slate-500">
      {{ props.description }}
    </p>
    <span class="text-sm text-slate-400" v-if="props.time">
      {{ millisToMinutesAndSeconds(props.time) }}
    </span>
  </div>
</template>
