<script setup lang="ts">
  import { ref, watch } from "vue";
  import { computed } from "@vue/reactivity";

  interface TimeSelectorProps {
    time: number;
    error?: string;
  }

  const props = defineProps<TimeSelectorProps>();

  const emits = defineEmits(["timeSelected"]);

  const showModal = ref(false);
  const seletedText = computed(
    () => `${selectedTime.value.minutes} min, ${selectedTime.value.seconds} sec`,
  );

  const selectedTime = ref({
    minutes: Math.floor(props.time / 60),
    seconds: props.time - Math.floor(props.time / 60) * 60,
  });

  const convertObjectToSeconds = () =>
    (selectedTime.value.minutes * 60 + selectedTime.value.seconds) * 1000;

  const formatTime = (value: number) => `${value <= 9 ? `0${value}` : value}`;

  const formattedText = computed(
    () => `${formatTime(selectedTime.value.minutes)}:${formatTime(selectedTime.value.seconds)}`,
  );

  watch(selectedTime, () => emits("timeSelected", convertObjectToSeconds()));
</script>

<template>
  <BaseModal v-if="showModal" @close="showModal = false" title="Select time" button-text="Select">
    <template #content>
      <div class="w-full">
        <div class="text-center mb-6">
          <span class="text-6xl font-bold timepicker mx-3">{{ formattedText }}</span>
        </div>
        <div class="flex">
          <div class="flex flex-col gap-4 w-full p-2">
            <span>Minutes:</span>
            <TimePicker
              :value="selectedTime.minutes"
              @select="(v: number) => (selectedTime.minutes = v)"
            />
          </div>
          <div class="flex flex-col gap-4 w-full p-2">
            <span>Seconds:</span>
            <TimePicker
              :value="selectedTime.seconds"
              @select="(v: number) => (selectedTime.seconds = v)"
            />
          </div>
        </div>
      </div>
    </template>
    <template #actions>
      <BaseButton label="Select" @click="() => (showModal = false)" icon="check" color="success" />
    </template>
  </BaseModal>
  <div class="w-full">
    <BaseButton
      color="primary"
      :full="true"
      icon="timer"
      :label="seletedText"
      @click="() => (showModal = true)"
    />
  </div>
  <span v-if="error" class="text-red-600">{{ error }}</span>
</template>
