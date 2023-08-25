<script setup lang="ts">
  import { useActivityStore, useUserStore } from "~/stores";
  import { LinkType } from "~/utils";
  import { Activity } from "~/models/Activity";
  import draggable from "vuedraggable";

  interface ActivityListProps {
    activities?: Activity[];
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
    <!-- <draggable
      v-if="allowDrag"
      class="mt-4"
      :list="activities"
      item-key="id"
      @end="emits('move', activities, isWarmup)"
    >
      <template #item="{ element }">
        <ButtonLink
          :to="{
            name: 'activity',
            params: {
              session: sessionId,
              activity: element.id,
            },
          }"
        >
          <ActivityItem
            :id="element.id"
            :name="element.name"
            :description="element.description"
            :time="Number(element.time)"
            :reps="Number(element.reps)"
            :request-change="element.requestChange"
            :no-card="compatList"
            :allow-delete="allowDelete"
          >
            <template #actions>
              <BaseButton
                v-if="allowDelete"
                id="delete-activity"
                color="danger"
                icon="delete"
                class="float-right ml-2"
                variant="circular"
                @click.prevent="emits('delete', element.id)"
              />
              <BaseButton
                v-if="allowEdit"
                id="edit-activity"
                color="warning"
                icon="edit"
                class="float-right ml-2"
                variant="circular"
                @click.prevent="() => activityStore.editActivity(element.id)"
              />
            </template>
          </ActivityItem>
        </ButtonLink>
      </template>
    </draggable> -->
    <div v-for="activity in activities" :key="activity.id">
      <ActivityForm
        v-if="activityStore.selectedActivity?.id === activity.id"
        :activity="activityStore.selectedActivity"
        :allow-delete="Boolean(activityStore.selectedActivity?.id)"
      />
      <ActivityItem
        v-else
        :id="activity.id"
        :name="activity.name"
        :description="activity.description"
        :time="Number(activity.time)"
        :reps="Number(activity.reps)"
        :request-change="activity.requestChange"
        :no-card="compatList"
        :allow-delete="true"
      >
        <template #actions>
          <BaseButton
            v-if="allowDelete"
            id="delete-activity"
            color="danger"
            icon="delete"
            class="float-right ml-2"
            variant="circular"
            @click.prevent="() => activityStore.deleteActivity(activity.id)"
          />
          <BaseButton
            v-if="allowEdit"
            id="edit-activity"
            color="warning"
            icon="edit"
            class="float-right ml-2"
            variant="circular"
            @click.prevent="() => activityStore.setSelectedActivity(activity)"
          />
        </template>
      </ActivityItem>
    </div>
  </div>
  <ErrorBanner v-else :text="noFoundMessage"></ErrorBanner>
  <div v-if="!userStore.isNormal" class="flex mb-6 gap-2">
    <ButtonLink
      v-if="allowAdd && (activityStore.getSessionActivities(props.sessionId)?.length ?? 100)"
      id="add-activity"
      icon="add"
      :full="true"
      color="success"
      :to="{ name: 'activity', params: { session: sessionId } }"
      :type="LinkType.BUTTON"
      label="Add"
    />
  </div>
</template>
