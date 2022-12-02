<script setup lang="ts">
  import { ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { ISession } from "~/models/Session";
  import { ButtonColor, getDayOfTheWeek, days } from "~/utils";
  import { useActivityStore, useUserStore } from "~/stores";
  import { IActivity } from "~/models/Activity";

  const props = defineProps(["id", "dayOfWeek", "existingForm"]);
  const emits = defineEmits(["save", "remove"]);

  const activityStore = useActivityStore();
  const userStore = useUserStore();

  const uuid = uuidv4();

  let currentDayOfWeek = ref(props.dayOfWeek || -1);
  let dayOfWeek = ref(props.dayOfWeek || -1);
  let id = ref(props.id || uuid);
  let activityList = ref(undefined as any[] | undefined);
  let warmupList = ref(undefined as any[] | undefined);

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
      session.activities = [...props.existingForm];
      session.id = uuidv4();
    }

    emits("save", session);
  }

  function isNew() {
    return !Boolean(props.id);
  }

  function remove() {
    if (!isNew()) {
      emits("remove", props.id);
    }
  }

  function selectDay(dayIndex: number) {
    dayOfWeek.value = dayIndex;
  }

  function isDaySelected(dayIndex: number) {
    return dayIndex === dayOfWeek.value;
  }

  function sortActivities(listActivities: IActivity[], isWarmup: boolean) {
    activityStore.moveActivity(id.value, listActivities, isWarmup);
  }

  let showModal = ref(false);
  function duplicateActivities(activities: IActivity[]) {
    activityStore.setDuplicateWarmup(activities);
    showModal.value = true;
  }

  function duplicateSession(param: {
    dayOfWeek: number;
    activities: IActivity[];
  }) {
    showModal.value = false;
    save(param.dayOfWeek, param.activities);
  }
</script>

<template>
  <div class="flex justify-center w-full">
    <Card>
      <form class="w-full" @submit.prevent>
        <div>
          <h1 v-if="isNew()" class="mb-3 text-2xl mb-6">
            Create a new day session:
          </h1>
          <h1 v-else class="mb-3 text-2xl mb-6">
            Edit
            <strong>{{ getDayOfTheWeek(currentDayOfWeek) }}</strong> session:
          </h1>

          <span class="text-md">
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
                  'bg-indigo-600 text-slate-50':
                    isDaySelected(day) && !userStore.isTrainer,
                },
                {
                  'bg-purple-600 text-slate-50':
                    isDaySelected(day) && userStore.isTrainer,
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
            <ActivityList
              title="Warmup"
              no-found-message="No warmup activities found"
              :activities="warmupList"
              :is-warmup="true"
              :session-id="id"
              :allow-drag="true"
              :enable-run="false"
              :enable-duplicate="true"
              :compat-list="true"
              @move="sortActivities"
              @duplicate="duplicateActivities"
            />
            <hr />
            <ActivityList
              title="Activities"
              no-found-message="No activities found"
              :activities="activityList"
              :session-id="id"
              :allow-drag="true"
              :enable-run="false"
              :enable-duplicate="true"
              :compat-list="true"
              @move="sortActivities"
              @duplicate="duplicateActivities"
            />
          </div>
        </div>
        <div class="w-full flex flex-col sm:flex-row justify-center px-3 gap-3">
          <Button
            v-if="dayOfWeek !== -1"
            full="true"
            :icon="!isNew() ? 'save' : 'add'"
            :label="!isNew() ? 'Save' : 'Create'"
            :color="ButtonColor.SUCCESS"
            @click="save"
          />
          <Button
            full="true"
            v-if="!isNew()"
            icon="delete"
            :color="ButtonColor.DANGER"
            label="Delete"
            @click="remove"
          />
        </div>
      </form>
    </Card>
    <DuplicateActivities
      :show="showModal"
      :day-of-week="dayOfWeek"
      :is-trainer="userStore.isTrainer"
      :missing-days="activityStore.getMissingDays"
      :existing-form="activityStore.duplicateActivities"
      @close="showModal = false"
      @duplicate="duplicateSession"
    />
  </div>
</template>
