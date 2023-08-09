<script setup lang="ts">
  import { ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { ISession } from "~/models/Session";
  import { getDayOfTheWeek } from "~/utils";
  import { useActivityStore, useUserStore } from "~/stores";
  import { IActivity } from "~/models/Activity";

  interface SessionFormProps {
    id?: string;
    dayOfWeek?: number;
    existingForm?: IActivity;
  }

  const props = withDefaults(defineProps<SessionFormProps>(), {
    id: "",
    dayOfWeek: -1,
    existingForm: undefined,
  });

  interface SessionFormEmits {
    (e: "save", session: ISession): void;
    (e: "remove", id: string): void;
  }

  const emits = defineEmits<SessionFormEmits>();

  const activityStore = useActivityStore();
  const userStore = useUserStore();

  const currentDayOfWeek = ref(props.dayOfWeek || -1);
  const dayOfWeek = ref(props.dayOfWeek || -1);
  const id = ref(props.id || uuidv4());
  const activityList = ref(undefined as IActivity[] | undefined);
  const warmupList = ref(undefined as IActivity[] | undefined);

  if (id.value) {
    warmupList.value = activityStore.getWarmUpActivities(id.value);
    activityList.value = activityStore.getSessionActivities(id.value);
  }

  function save(day?: number, activities?: IActivity[]) {
    const session: ISession = {
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

  function isNew() {
    return !props.id;
  }

  function remove() {
    if (!isNew()) {
      emits("remove", props.id);
    }
  }

  function removeActivity(activityId: string) {
    activityStore.removeActivity(id.value, activityId);
  }

  function selectDay(dayIndex: number) {
    dayOfWeek.value = dayIndex;
  }

  function isDaySelected(dayIndex: number) {
    return dayIndex === dayOfWeek.value;
  }

  function sortActivities(activities: IActivity[] | undefined, isWarmup: boolean) {
    if (activities) {
      activityStore.moveActivity(id.value, activities, isWarmup);
    }
  }

  const showDuplicateModal = ref(false);

  function duplicateActivities(activities: IActivity[] | undefined) {
    activityStore.setDuplicateWarmup(activities);
    showDuplicateModal.value = true;
  }

  function duplicateSession(param: { dayOfWeek: number; activities: IActivity[] }) {
    showDuplicateModal.value = false;
    save(param.dayOfWeek, param.activities);
  }
</script>

<template>
  <div class="flex justify-center w-full">
    <form class="w-full" @submit.prevent>
      <div>
        <h1 v-if="isNew()" class="text-4xl mb-6">Create a new day session:</h1>
        <h1 v-else class="text-4xl mb-6">
          Edit
          <strong>{{ getDayOfTheWeek(currentDayOfWeek) }}</strong> session:
        </h1>

        <span class="text-2xl">
          {{
            activityStore.getMissingDays.length <= 0
              ? "No days available"
              : isNew()
              ? "Select day to this session"
              : "Move this session to:"
          }}
        </span>
        <div class="flex xl:flex-row flex-col justify-center gap-3 mb-6 mt-3">
          <button
            v-for="day in activityStore.getMissingDays"
            :key="day"
            :class="[
              {
                'bg-indigo-600 text-slate-50': isDaySelected(day) && !userStore.isTrainer,
              },
              {
                'bg-purple-600 text-slate-50': isDaySelected(day) && userStore.isTrainer,
              },
              { 'bg-gray-200 text-grey-50': !isDaySelected(day) },
              'w-full duration-200 rounded-full px-4 py-2 ',
            ]"
            @click="() => selectDay(day)"
          >
            {{ getDayOfTheWeek(day) }}
          </button>
        </div>
      </div>
      <div class="w-full px-3 mb-6" v-if="!isNew()">
        <div class="flex flex-col justify-center">
          <div class="my-4">
            <ActivityList
              title="Warmup"
              no-found-message="No warmup activities found"
              :activities="warmupList"
              :is-warmup="true"
              :session-id="id"
              :allow-drag="true"
              :allow-delete="true"
              :enable-run="false"
              :enable-duplicate="true"
              :compat-list="false"
              @move="sortActivities"
              @duplicate="duplicateActivities"
              @delete="removeActivity"
            />
          </div>
          <hr />
          <div class="my-4">
            <ActivityList
              title="Activities"
              no-found-message="No activities found"
              :activities="activityList"
              :session-id="id"
              :allow-drag="true"
              :allow-delete="true"
              :enable-run="false"
              :enable-duplicate="true"
              :compat-list="false"
              @move="sortActivities"
              @duplicate="duplicateActivities"
              @delete="removeActivity"
            />
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col sm:flex-row justify-center px-3 gap-3">
        <BaseButton
          v-if="dayOfWeek !== -1"
          :full="true"
          :icon="!isNew() ? 'save' : 'add'"
          :label="!isNew() ? 'Save' : 'Create'"
          color="success"
          @click="save"
        />
        <BaseButton
          :full="true"
          v-if="!isNew()"
          icon="delete"
          color="danger"
          label="Delete"
          @click="remove"
        />
      </div>
    </form>
    <DuplicateActivities
      :show="showDuplicateModal"
      :day-of-week="dayOfWeek"
      :is-trainer="userStore.isTrainer"
      :missing-days="activityStore.getMissingDays"
      :existing-form="activityStore.duplicateActivities || []"
      @close="showDuplicateModal = false"
      @duplicate="duplicateSession"
    />
  </div>
</template>
