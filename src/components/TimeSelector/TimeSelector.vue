<script setup lang="ts">
  import { ref } from "vue";
  import { ButtonColor } from "~/utils";

  import VueTimepicker from "vue3-timepicker";

  defineProps(["time", "hasError"]);
  let showModal = ref(false);
  defineEmits(["timeSelected"]);
</script>

<template>
  <Modal
    :show="showModal"
    @close="showModal = false"
    title="Time selector"
    button-text="Select"
  >
    <div class="w-full">
      <h1>Enter the time</h1>
      <!-- <TimePicker
        name="timeField"
        id="time"
        class="appearance-none block w-full bg-white border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
      /> -->
      <VueTimepicker></VueTimepicker>
    </div>
  </Modal>
  <Button
    :color="ButtonColor.LIGHT"
    @click="showModal = true"
    label="Open time"
  />
</template>

<style>
  .vue__time-picker-input {
    width: 100%;
  }
  .select-list {
    display: flex;
    max-height: 250px;
    z-index: 100;
  }
  .hours {
    max-height: 250px;
    overflow-y: scroll;
    width: 100%;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
  }
  .minutes {
    max-height: 250px;
    overflow-y: scroll;
    width: 100%;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
  }
</style>
