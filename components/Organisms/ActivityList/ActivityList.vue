<script setup lang="ts">
  import { useUserStore } from "~/stores";
  import draggable from "vuedraggable";
  import { LinkType } from "~/utils";
  import { Activity } from "~/models/Activity";

  interface ActivityListProps {
    activities?: Activity[];
    sessionId?: string;
    isWarmup?: boolean;
    allowDrag?: boolean;
    allowDelete?: boolean;
    title?: string;
    enableRun?: boolean;
    enableDuplicate?: boolean;
    noFoundMessage?: string;
    opened?: boolean;
    compatList?: boolean;
  }

  withDefaults(defineProps<ActivityListProps>(), {
    sessionId: "",
    isWarmup: false,
    allowDrag: false,
    allowDelete: false,
    title: "",
    enableRun: false,
    enableDuplicate: false,
    noFoundMessage: "No activities found",
    opened: true,
    compatList: false,
  });

  const userStore = useUserStore();

  interface ActivityListEmits {
    (e: "move", activities: Activity[] | undefined, isWarmup: boolean): void;
    (e: "delete", id: string): void;
    (e: "run"): void;
    (e: "duplicate", activities: Activity[] | undefined): void;
    (e: "delete-activity", activity: Activity): void;
  }

  const emits = defineEmits<ActivityListEmits>();
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
      <BaseButton
        id="duplicate-warmup"
        v-if="(userStore.isTrainer || userStore.isSelfMadeMan) && enableDuplicate"
        color="light"
        icon="content_copy"
        label="Duplicate"
        @click="emits('duplicate', activities)"
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
                :circular="true"
                @click.prevent="emits('delete', element.id)"
              />
            </template>
          </ActivityItem>
        </ButtonLink>
      </template>
    </draggable>
    <ActivityItem
      v-else
      v-for="activity in activities"
      :key="activity.id"
      :id="activity.id"
      :no-card="compatList"
      :name="activity.name"
      :description="activity.description"
      :time="Number(activity.time)"
      :reps="Number(activity.reps)"
      @delete="emits('delete-activity', activity)"
    />
  </div>
  <ErrorBanner v-else :text="noFoundMessage"></ErrorBanner>
</template>
