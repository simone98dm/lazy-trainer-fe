<script setup lang="ts">
  import { ref } from "vue";
  import { ButtonColor } from "~/utils";

  defineProps(["time", "hasError"]);
  let showModal = ref(false);
  defineEmits(["timeSelected"]);
</script>

<template>
  <Modal :show="showModal" @close="showModal = false" button-text="Select">
    <div class="w-full">
      <h1>Enter the time</h1>
      <Input
        id="activityTimer"
        name="activityTimerField"
        error="Time not valid"
        :value="time"
        :has-error="hasError"
        :disabled="false"
        @click="() => (showModal = true)"
        @change="(v) => $emit('timeSelected', v * 1000)"
      />
    </div>
  </Modal>
  <Button
    :color="ButtonColor.LIGHT"
    @click="showModal = true"
    label="Open time"
  ></Button>
</template>
