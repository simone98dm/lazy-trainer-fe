<script setup lang="ts">
  import { ButtonColor } from "~/utils";
  import { ref, watch } from "vue";
  import { computed } from "@vue/reactivity";

  const props = defineProps({
    time: {
      type: Number,
      required: true,
    },
  });
  const emits = defineEmits(["timeSelected"]);

  let showModal = ref(false);
  let seletedText = computed(
    () => `${selectedTime.value.minutes} min, ${selectedTime.value.seconds} sec`
  );

  let selectedTime = ref({
    minutes: 0,
    seconds: 0,
  });
  const convertObjectToSeconds = () =>
    selectedTime.value.minutes * 60 + selectedTime.value.seconds;

  const minutes = Math.floor(props.time / 60);
  const seconds = props.time - minutes * 60;
  selectedTime.value = {
    minutes,
    seconds,
  };

  watch(selectedTime, () => emits("timeSelected", convertObjectToSeconds()));
</script>

<template>
  <Modal
    :show="showModal"
    @close="showModal = false"
    title="Select time"
    button-text="Select"
  >
    <template #content>
      <div class="w-full">
        <TimePicker @select="(v: any) => (selectedTime = v)" />
      </div>
    </template>
    <template #actions>
      <Button
        label="Select"
        @click="showModal = false"
        icon="check"
        :color="ButtonColor.SUCCESS"
      />
    </template>
  </Modal>
  <div class="ml-2 w-full">
    <Button
      :color="ButtonColor.PRIMARY"
      :full="true"
      :icon="'timer'"
      :label="seletedText"
      @click="() => (showModal = true)"
    />
  </div>
</template>
