<script setup lang="ts">
  import { ref } from "vue";
  import { IActivity } from "~/models/Activity";
  import { getDayOfTheWeek } from "~/utils";

  const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
    dayOfWeek: {
      type: Number,
      required: false,
      default: -1,
    },
    existingForm: {
      type: Array<IActivity>,
      required: true,
    },
    isTrainer: {
      type: Boolean,
      required: true,
    },
    missingDays: {
      type: Array<number>,
      required: true,
    },
  });

  const dayOfWeek = ref(props.dayOfWeek || -1);

  function selectDay(dayIndex: number) {
    dayOfWeek.value = dayIndex;
  }

  function isDaySelected(dayIndex: number) {
    return dayIndex === dayOfWeek.value;
  }
</script>

<template>
  <BaseModal v-if="props.show" title="Duplicate warmup">
    <template #content>
      <div class="flex flex-col">
        <div class="w-full flex flex-wrap justify-center mb-3">
          <button
            v-for="day in missingDays"
            :key="day"
            :class="[
              {
                'bg-green-600 text-slate-50': isDaySelected(day) && !isTrainer,
              },
              {
                'bg-purple-600 text-slate-50': isDaySelected(day) && isTrainer,
              },
              { 'bg-gray-200 text-grey-50': !isDaySelected(day) },
              'w-fit duration-200 rounded-full px-4 py-2 m-2',
            ]"
            @click="() => selectDay(day)"
          >
            {{ getDayOfTheWeek(day) }}
          </button>
        </div>
        <p class="mb-6">
          You are about to duplicate the warmup from the other session. The follwing activities will
          be duplicate
        </p>
        <div class="w-full flex flex-wrap justify-center gap-3">
          <span
            v-for="activity in props.existingForm"
            :key="activity.id"
            class="bg-purple-600 rounded-lg p-2 text-white"
          >
            {{ activity.name }}
          </span>
        </div>
      </div>
    </template>
    <template #actions>
      <BaseButton
        :full="true"
        icon="cancel"
        color="danger"
        label="Cancel"
        @click="$emit('close')"
      />
      <BaseButton
        :full="true"
        icon="save"
        color="success"
        label="Duplicate"
        @click="
          $emit('duplicate', {
            dayOfWeek: dayOfWeek,
            activities: props.existingForm,
          })
        "
      />
    </template>
  </BaseModal>
</template>
