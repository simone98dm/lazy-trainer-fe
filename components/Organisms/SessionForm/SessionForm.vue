<script setup lang="ts">
  import { Session } from "~/models/Session";
  import { getDayOfTheWeek } from "~/utils";
  import { useActivityStore } from "~/stores";

  interface SessionFormProps {
    session: Session | null;
  }

  const props = withDefaults(defineProps<SessionFormProps>(), {
    session: null,
  });

  interface SessionFormEmits {
    (e: "save", session: Session): void;
    (e: "delete", id: string): void;
  }

  defineEmits<SessionFormEmits>();

  const activityStore = useActivityStore();

  const isNew = computed(() => !props.session?.id);

  function isDaySelected(selectedDay: number) {
    return props.session?.dayOfWeek === selectedDay;
  }
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="w-full">
      <div>
        <span v-if="isNew" class="text-2xl"> Create new session </span>
        <span v-else class="text-2xl">
          Editing session: <strong>{{ getDayOfTheWeek(session?.dayOfWeek) }}</strong>
        </span>

        <div class="flex justify-center gap-3 mb-6 mt-3">
          <button
            v-for="day in activityStore.missingDays"
            :key="day"
            :class="[
              {
                'bg-gray-200 text-gray-800 dark:bg-slate-800 dark:text-slate-50':
                  !isDaySelected(day),
              },
              'w-full duration-200 rounded-full px-4 py-2',
            ]"
            @click="() => activityStore.updateSessionValue('dayOfWeek', day)"
          >
            {{ getDayOfTheWeek(day) }}
          </button>
        </div>
      </div>
      <div class="w-full flex flex-col sm:flex-row justify-center px-3 gap-3">
        <BaseButton
          v-if="session?.dayOfWeek !== -1"
          :full="true"
          :icon="!isNew ? 'save' : 'add'"
          :label="!isNew ? 'Save' : 'Create'"
          color="success"
          @click="() => activityStore.addSession(activityStore.selectedSession)"
        />
        <BaseButton
          :full="true"
          v-if="!isNew"
          icon="delete"
          color="danger"
          label="Delete"
          @click="() => (activityStore.selectedSession = null)"
        />
      </div>
    </div>
  </div>
</template>
