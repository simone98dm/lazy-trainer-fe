<script setup lang="ts">
  import { ref, watch } from "vue";

  interface TimePickerProps {
    value?: number;
  }
  const props = defineProps<TimePickerProps>();

  const emit = defineEmits(["select"]);
  const listNumbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  ];
  const selectedNumber = ref(props.value ?? 0);

  function selectElement(selection: number) {
    if (typeof selection !== "undefined") {
      selectedNumber.value = selection;
    }
  }

  watch(
    () => [selectedNumber.value],
    ([minutes]) => emit("select", minutes),
  );
</script>

<template>
  <div class="w-full text-center">
    <div class="column">
      <ul class="bg-gray-50 dark:bg-gray-900">
        <li
          v-for="n of listNumbers"
          :key="`m${n}`"
          :class="{ active: selectedNumber === n }"
          @click="() => selectElement(n)"
        >
          {{ n }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .column {
    max-height: 250px;
    overflow-y: scroll;
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  .active {
    background-color: rgb(79 70 229);
    color: white;
    border-radius: 4px;
    font-weight: 700;
  }
  li {
    list-style: none;
    padding: 5px;
    cursor: pointer;
  }
</style>
