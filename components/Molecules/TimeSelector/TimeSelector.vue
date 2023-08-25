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
    () => `${selectedTime.value.minutes} min, ${selectedTime.value.seconds} sec`
  );

  const selectedTime = ref({
    minutes: 0,
    seconds: 0,
  });
  const convertObjectToSeconds = () => selectedTime.value.minutes * 60 + selectedTime.value.seconds;

  const minutes = Math.floor(props.time / 60);
  const seconds = props.time - minutes * 60;
  selectedTime.value = {
    minutes,
    seconds,
  };

  watch(selectedTime, () => emits("timeSelected", convertObjectToSeconds()));
</script>

<template>
  <BaseModal v-if="showModal" @close="showModal = false" title="Select time" button-text="Select">
    <template #content>
      <div class="w-full">
        <TimePicker @select="(v: any) => (selectedTime = v)" />
      </div>
    </template>
    <template #actions>
      <BaseButton label="Select" @click="showModal = false" icon="check" color="success" />
    </template>
  </BaseModal>
  <div class="ml-2 w-full">
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
