<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  defineProps({
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  });
  const emit = defineEmits(["select"]);
  const minutes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  ];
  const seconds = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  ];
  const formattedText = computed(
    () =>
      `${selectedMinutes.value <= 9 ? `0${selectedMinutes.value}` : selectedMinutes.value}:${
        selectedSeconds.value <= 9 ? `0${selectedSeconds.value}` : selectedSeconds.value
      }`
  );
  const selectedMinutes = ref(0);
  const selectedSeconds = ref(0);

  function selectElement(selection: { minutes?: number; seconds?: number }) {
    const { minutes, seconds } = selection;
    if (typeof minutes !== "undefined") {
      selectedMinutes.value = minutes;
    }
    if (typeof seconds !== "undefined") {
      selectedSeconds.value = seconds;
    }
  }

  watch(
    () => [selectedMinutes.value, selectedSeconds.value],
    ([minutes, seconds]) => emit("select", { minutes, seconds })
  );
</script>

<template>
  <div class="text-center mb-6">
    <span class="text-6xl font-bold timepicker mx-3">{{ formattedText }}</span>
  </div>
  <div class="flex text-center">
    <div class="w-full mx-2">
      <span class="font-bold">Minutes</span>
      <div class="minutes-list column">
        <ul>
          <li
            v-for="minute of minutes"
            :key="`m${minute}`"
            :class="{ active: selectedMinutes === minute }"
            @click="selectElement({ minutes: minute })"
          >
            {{ minute }}
          </li>
        </ul>
      </div>
    </div>
    <div class="w-full mx-2">
      <span class="font-bold">Seconds</span>
      <div class="seconds-list column">
        <ul>
          <li
            v-for="second of seconds"
            :key="`s${second}`"
            :class="{ active: selectedSeconds === second }"
            @click="selectElement({ seconds: second })"
          >
            {{ second }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  .timepicker {
    width: 100%;
  }
  .select-list {
    display: flex;
    max-height: 250px;
    z-index: 100;
  }
  .column {
    max-height: 250px;
    overflow-y: scroll;
    width: 100%;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
  }
  .active {
    background-color: rgb(79 70 229 / var(--tw-bg-opacity));
    color: white;
    border-radius: 5px;
    font-weight: 700;
  }
  li {
    list-style: none;
    padding: 5px;
    cursor: pointer;
  }
</style>
