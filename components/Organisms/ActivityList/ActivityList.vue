<script setup lang="ts">
  import { useActivityStore, useUserStore } from "~/stores";
  import { LinkType } from "~/utils";
  import { Activity } from "~/models/Activity";
  import draggable from "vuedraggable";

  interface ActivityListProps {
    activities: Activity[];
    sessionId?: string;
    isWarmup?: boolean;
    allowDrag?: boolean;
    allowDelete?: boolean;
    allowAdd?: boolean;
    allowEdit?: boolean;
    title?: string;
    enableRun?: boolean;
    noFoundMessage?: string;
    opened?: boolean;
    compatList?: boolean;
  }

  interface ActivityListEmits {
    (e: "move", activities: Activity[] | undefined, isWarmup: boolean): void;
    (e: "delete", id: string): void;
    (e: "edit", id: string): void;
    (e: "run"): void;
    (e: "delete-activity", activity: Activity): void;
  }

  const props = withDefaults(defineProps<ActivityListProps>(), {
    sessionId: "",
    isWarmup: false,
    allowDrag: false,
    allowDelete: false,
    allowAdd: false,
    allowEdit: false,
    title: "",
    enableRun: false,
    noFoundMessage: "No activities found",
    opened: true,
    compatList: false,
  });

  const emits = defineEmits<ActivityListEmits>();

  const userStore = useUserStore();
  const activityStore = useActivityStore();

  async function addActivity() {
    let order_index = 0;
    if (props.isWarmup) {
      order_index = activityStore.getWarmUpActivities?.length + 1;
    } else {
      order_index = activityStore.getSessionActivities?.length + 1;
    }
    const activity: Activity = {
      description: "",
      name: "",
      reps: 0,
      requestChange: false,
      warmup: props.isWarmup,
      time: 0,
      order_index,
      sessionId: props.sessionId,
    };
    const returnActivity = await activityStore.addActivity(activity);
    activityStore.setSelectedActivity(returnActivity);
  }
</script>

<template>
  <div v-if="activities">
    <div class="flex items-center justify-between gap-2">
      <h4 v-if="title" class="text-5xl font-bold mr-auto">
        {{ title }}
      </h4>
      <BaseButton
        v-if="enableRun"
        id="run-timer"
        color="success"
        icon="play_arrow"
        :type="LinkType.BUTTON"
        variant="circular"
        label="Start"
        @click="emits('run')"
      />
    </div>
    <draggable
      v-if="allowDrag"
      class="mt-4"
      :list="activities"
      item-key="id"
      @end="emits('move', activities, isWarmup)"
    >
      <template #item="{ element }">
        <ActivityForm
          v-if="activityStore.selectedActivity?.id === element.id"
          :activity="activityStore.selectedActivity"
          :allow-delete="Boolean(activityStore.selectedActivity?.id)"
        />
        <ActivityItem v-else :activity="element">
          <template #actions>
            <BaseButton
              v-if="allowDelete"
              id="delete-activity"
              color="danger"
              icon="delete"
              class="float-right ml-2"
              variant="circular"
              @click.prevent="() => activityStore.deleteActivity(element.id)"
            />
            <BaseButton
              v-if="allowEdit"
              id="edit-activity"
              color="warning"
              icon="edit"
              class="float-right ml-2"
              variant="circular"
              @click.prevent="() => activityStore.setSelectedActivity(element)"
            />
          </template>
        </ActivityItem>
      </template>
    </draggable>
    <ActivityItem v-else v-for="activity in activities" :key="activity.id" :activity="activity" />
  </div>
  <ErrorBanner v-else :text="noFoundMessage"></ErrorBanner>
  <div v-if="!userStore.isNormal" class="flex mb-6 gap-2">
    <BaseButton
      v-if="allowAdd"
      id="add-activity"
      icon="add"
      color="success"
      label="Add"
      @click="addActivity"
    />
  </div>
</template>
