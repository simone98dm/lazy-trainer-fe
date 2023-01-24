<script setup lang="ts">
  import { computed, PropType, ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { ISession } from "~/models/Session";
  import { Color, getDayOfTheWeek } from "~/utils";
  import { useActivityStore, useUserStore } from "~/store";
  import { IActivity } from "~/models/Activity";

  const props = defineProps({
    id: {
      type: String,
      required: false,
      default: "",
    },
    dayOfWeek: {
      type: Number,
      required: false,
      default: -1,
    },
    existingForm: {
      type: Object as PropType<IActivity | undefined>,
      required: false,
      default: undefined,
    },
  });
  const emits = defineEmits(["save", "remove"]);

  const activityStore = useActivityStore();
  const userStore = useUserStore();

  const uuid = uuidv4();

  const currentDayOfWeek = ref(props.dayOfWeek || -1);
  const dayOfWeek = ref(props.dayOfWeek || -1);
  const id = ref(props.id || uuid);
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
      session.activities = [];
      session.activities.push(props.existingForm);
      session.id = uuidv4();
    }

    emits("save", session);
  }

  const isNew = computed(() => {
    return !props.id;
  });

  function remove() {
    if (!isNew.value) {
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

  function sortActivities(listActivities: IActivity[], isWarmup: boolean) {
    activityStore.moveActivity(id.value, listActivities, isWarmup);
  }

  const showDuplicateModal = ref(false);
  function duplicateActivities(activities: IActivity[]) {
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
      <Card
        :title="
          isNew ? 'Create a new day session' : `Edit ${getDayOfTheWeek(currentDayOfWeek)} session`
        "
      >
        <hr />
        <span class="text-2xl">
          {{
            activityStore.getMissingDays.length <= 0
              ? "No days available"
              : isNew
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
        <Button
          v-if="dayOfWeek !== -1"
          :icon="!isNew ? 'save' : 'add'"
          :label="!isNew ? 'Save this session' : 'Create new session'"
          :color="Color.SUCCESS"
          @click="save"
          class="float-right"
        />
        <Button
          v-if="!isNew"
          icon="delete"
          :color="Color.DANGER"
          label="Delete this session"
          @click="remove"
          class="float-right"
        />
      </Card>
      <div class="flex flex-col xl:flex-row justify-between my-6" v-if="!isNew">
        <div class="px-4 w-full xl:border-r-2 border-slate-200">
          <ActivityList
            title="Warmup"
            no-found-message="No warmup activities found"
            :activities="warmupList"
            :is-warmup="true"
            :session-id="id"
            :allow-drag="true"
            :allow-edit="true"
            :allow-delete="true"
            :enable-run="false"
            :enable-duplicate="true"
            :compat-list="false"
            @move="sortActivities"
            @duplicate="duplicateActivities"
            @delete="removeActivity"
          />
        </div>
        <div class="px-4 w-full xl:border-l-2 border-slate-200">
          <ActivityList
            title="Activities"
            no-found-message="No activities found"
            :activities="activityList"
            :session-id="id"
            :allow-drag="true"
            :allow-edit="true"
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
