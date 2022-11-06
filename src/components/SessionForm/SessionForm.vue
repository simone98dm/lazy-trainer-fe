<script setup lang="ts">
  import { ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { ISession } from "~/models/Session";
  import { ButtonColor, getDayOfTheWeek } from "~/utils";
  import { useActivityStore, useUserStore } from "~/stores";
  import { IActivity } from "~/models/Activity";
  import { useRouter } from "vue-router";

  const props = defineProps(["id", "dayOfWeek", "existingForm"]);
  const emits = defineEmits(["save", "remove"]);

  const activityStore = useActivityStore();
  const userStore = useUserStore();
  const router = useRouter();

  const uuid = uuidv4();

  let dayOfWeek = ref(props.dayOfWeek || -1);
  let id = ref(props.id || uuid);
  let activityList = ref(undefined as any[] | undefined);
  let warmupList = ref(undefined as any[] | undefined);

  if (id.value) {
    warmupList.value = activityStore.getWarmUpActivities(id.value);
    activityList.value = activityStore.getSessionActivities(id.value);
  }

  function save() {
    const session: ISession = {
      id: id.value,
      dayOfWeek: dayOfWeek.value,
      activities: [],
    };

    if (props.existingForm) {
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
  function sortActivities(evt: any) {
    const { newDraggableIndex, oldDraggableIndex } = evt;
    activityStore.moveActivity(id.value, newDraggableIndex, oldDraggableIndex);
  }
  let showModal = ref(false);
  function duplicateActivities(activities: IActivity[]) {
    activityStore.setDuplicateWarmup(activities);
    showModal.value = true;
  }
  async function runDuplicate(param: {
    dayOfWeek: number;
    activities: IActivity[];
  }) {
    const newSessionId = uuidv4();
    await activityStore.addSession({
      id: newSessionId,
      dayOfWeek: param.dayOfWeek,
      activities: param.activities,
    });
    showModal.value = false;
    router.push({
      name: "home",
    });
  }
</script>

<template>
  <div class="flex justify-center w-full">
    <form class="bg-white rounded-lg shadow-md p-6 w-full" @submit.prevent>
      <div>
        <h1 v-if="isNew()" class="mb-3 text-2xl font-bold mb-6">
          Create a new day session:
        </h1>
        <h1 v-else class="mb-3 text-2xl font-bold mb-6">
          Edit {{ getDayOfTheWeek(dayOfWeek) }} session:
        </h1>
        <span v-if="activityStore.getMissingDays.length <= 0"
          >No days available</span
        >
        <div v-else class="flex xl:flex-row flex-col justify-center gap-3 mb-6">
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
      <div class="w-full px-3 mb-6">
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
    <DuplicateActivities
      :show="showModal"
      :day-of-week="dayOfWeek"
      :is-trainer="userStore.isTrainer"
      :missing-days="activityStore.getMissingDays"
      :existing-form="activityStore.duplicateActivities"
      @close="showModal = false"
      @duplicate="runDuplicate"
    />
  </div>
</template>
