<script setup lang="ts">
  import { ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { Session } from "~/models/Session";
  import { getDayOfTheWeek } from "~/utils";
  import { useActivityStore } from "~/stores";
  import { Activity } from "~/models/Activity";

  interface SessionFormProps {
    id?: string;
    dayOfWeek?: number;
    existingForm?: Activity;
  }

  const props = withDefaults(defineProps<SessionFormProps>(), {
    id: "",
    dayOfWeek: -1,
    existingForm: undefined,
  });

  interface SessionFormEmits {
    (e: "save", session: Session): void;
    (e: "remove", id: string): void;
  }

  const emits = defineEmits<SessionFormEmits>();

  const activityStore = useActivityStore();

  const currentDayOfWeek = ref(props.dayOfWeek || -1);
  const dayOfWeek = ref(props.dayOfWeek || -1);
  const id = ref(props.id || uuidv4());
  const isNew = computed(() => !props.id);

  function save(day?: number, activities?: Activity[]) {
    const session: Session = {
      id: id.value,
      dayOfWeek: dayOfWeek.value,
      activities: [],
    };

    if (day && activities) {
      session.id = uuidv4();
      session.dayOfWeek = day;
      session.activities = activities;
    } else if (props.existingForm) {
      session.id = uuidv4();
      session.activities = [];
      session.activities.push(props.existingForm);
    }

    emits("save", session);
  }
  function remove() {
    if (!isNew) {
      emits("remove", props.id);
    }
  }
  function selectDay(dayIndex: number) {
    dayOfWeek.value = dayIndex;
  }
  function isDaySelected(dayIndex: number) {
    return dayIndex === dayOfWeek.value;
  }
  const title = computed(() => {
    if (activityStore.getMissingDays.length <= 0) {
      return "No days available";
    }
    return isNew ? "Select day to this session" : "Move this session to:";
  });
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="w-full">
      <div>
        <h1 v-if="isNew" class="text-4xl mb-6">Create a new day session:</h1>
        <h1 v-else class="text-4xl mb-6">
          Edit
          <strong>{{ getDayOfTheWeek(currentDayOfWeek) }}</strong> session:
        </h1>

        <span class="text-2xl"> {{ title }} </span>
        <div class="flex justify-center gap-3 mb-6 mt-3">
          <button
            v-for="day in activityStore.getMissingDays"
            :key="day"
            :class="[
              {
                'bg-gray-200 text-gray-800 dark:bg-slate-800 dark:text-slate-50':
                  !isDaySelected(day),
              },
              'w-full duration-200 rounded-full px-4 py-2',
            ]"
            @click="() => selectDay(day)"
          >
            {{ getDayOfTheWeek(day) }}
          </button>
        </div>
      </div>
      <div class="w-full flex flex-col sm:flex-row justify-center px-3 gap-3">
        <BaseButton
          v-if="dayOfWeek !== -1"
          :full="true"
          :icon="!isNew ? 'save' : 'add'"
          :label="!isNew ? 'Save' : 'Create'"
          color="success"
          @click="save"
        />
        <BaseButton
          :full="true"
          v-if="!isNew"
          icon="delete"
          color="danger"
          label="Delete"
          @click="remove"
        />
      </div>
    </div>
  </div>
</template>
