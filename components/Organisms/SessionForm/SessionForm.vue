<script setup lang="ts">
  import { type Session } from "~/models/Session";
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
    (e: "delete", session: Session): void;
  }

  defineEmits<SessionFormEmits>();

  const activityStore = useActivityStore();

  const isNew = computed(() => !props.session?.id);

  function isDaySelected(selectedDay: number) {
    return props.session?.dayOfWeek === selectedDay;
  }

  async function saveSession() {
    if (activityStore.selectedSession && !activityStore.selectedSession.id) {
      const returnedSession = await activityStore.addSession(activityStore.selectedSession);
      if (returnedSession) {
        const router = useRouter();
        router.push({
          name: "edit",
          params: {
            session: returnedSession.id,
          },
        });
      }
    } else {
      await activityStore.updateSession(activityStore.selectedSession);
    }
  }
  async function deleteSession() {
    if (!confirm("Are you sure you want to delete this session?")) {
      return;
    }
    await activityStore.deleteSession(activityStore.selectedSession?.id);
    const router = useRouter();
    router.push({
      name: "home",
    });
  }
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="w-full">
      <div>
        <div class="text-center">
          <span v-if="isNew" class="text-2xl"> Create new session </span>
          <span v-else class="text-2xl">
            Editing session: <strong>{{ getDayOfTheWeek(session?.dayOfWeek) }}</strong>
          </span>
        </div>

        <div class="flex flex-wrap justify-center gap-2 mb-6 mt-3">
          <button
            v-for="day in activityStore.missingDays"
            :key="day"
            :class="[
              {
                'bg-slate-200 border-slate-200 text-gray-900 dark:bg-slate-700 dark:text-gray-50 dark:border-slate-700':
                  !isDaySelected(day),
              },
              {
                'bg-green-200 border-green-400 text-green-900 dark:bg-slate-700 dark:text-green-50 dark:border-green-700':
                  isDaySelected(day),
              },
              'duration-200 rounded-full px-2 py-1 md:px-6 md:py-4 font-bold border-solid border-2',
            ]"
            @click="() => activityStore.updateSessionValue('dayOfWeek', day)"
          >
            {{ getDayOfTheWeek(day) }}
          </button>
        </div>
      </div>
      <div class="flex justify-center gap-3">
        <BaseButton
          v-if="session?.dayOfWeek !== -1"
          :full="true"
          :icon="!isNew ? 'save' : 'add'"
          :label="!isNew ? 'Save session' : 'Create session'"
          color="success"
          size="small"
          @click="saveSession"
        />
        <BaseButton
          :full="true"
          v-if="!isNew"
          icon="delete"
          color="danger"
          label="Delete session"
          size="small"
          @click="deleteSession"
        />
      </div>
    </div>
  </div>
</template>
