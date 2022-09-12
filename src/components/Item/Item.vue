<script setup lang="ts">
import image from "../../assets/exercise.png";
const props = defineProps(["item"]);
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
  <div class="flex space-x-4 rounded-xl bg-white p-3 shadow-sm">
    <img
      class="aspect-square w-16 rounded-lg bg-center object-cover"
      :src="image"
      alt=""
    />
    <div>
      <h4 class="font-semibold text-gray-600">
        {{ props.item.name }}
      </h4>
      <p class="text-sm text-slate-400">
        {{ props.item.description }}
      </p>
      <span class="text-sm text-slate-200">
        {{ millisToMinutesAndSeconds(props.item.time) }}
      </span>
    </div>
    <div>
      <button
        type="button"
        class="rounded bg-slate-50 px-2 text-xl text-slate-500 hover:bg-slate-100"
      >
        &times;
      </button>
    </div>
  </div>
</template>
