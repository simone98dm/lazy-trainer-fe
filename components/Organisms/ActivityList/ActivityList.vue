<script setup lang="ts">
  import { useUserStore } from "~/stores";
  import draggable from "vuedraggable";
  import { GaCustomEvents, LinkType } from "~/utils";
  import { IActivity } from "~/models/Activity";

  interface ActivityListProps {
    activities?: IActivity[];
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

  const props = withDefaults(defineProps<ActivityListProps>(), {
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
    (e: "move", activities: IActivity[] | undefined, isWarmup: boolean): void;
    (e: "delete", id: string): void;
    (e: "run"): void;
    (e: "duplicate", activities: IActivity[] | undefined): void;
    (e: "delete-activity", activity: IActivity): void;
  }

  const emits = defineEmits<ActivityListEmits>();

  function runWorkout() {
    emits("run");
  }

  function moveItem() {
    emits("move", props.activities, props.isWarmup);
  }
</script>

<template>
  <div v-if="props.activities">
    <div class="flex items-center justify-between gap-2">
      <h4 v-if="props.title" class="text-5xl font-bold mr-auto">
        {{ props.title }}
      </h4>
      <BaseButton
        v-if="props.enableRun"
        id="run-timer"
        color="success"
        icon="play_arrow"
        :type="LinkType.BUTTON"
        variant="circular"
        label="Start"
        @click="runWorkout"
      />
      <BaseButton
        id="duplicate-warmup"
        v-if="(userStore.isTrainer || userStore.isSelfMadeMan) && props.enableDuplicate"
        color="light"
        icon="content_copy"
        label="Duplicate"
        @click="emits('duplicate', props.activities)"
      />
    </div>
    <draggable v-if="allowDrag" class="mt-4" :list="props.activities" item-key="id" @end="moveItem">
      <template #item="{ element }">
        <ButtonLink
          :to="{
            name: 'activity',
            params: {
              session: props.sessionId,
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
            :no-card="props.compatList"
            :allow-delete="props.allowDelete"
          >
            <template #actions>
              <BaseButton
                v-if="props.allowDelete"
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
      v-for="activity in props.activities"
      :key="activity.id"
      :id="activity.id"
      :no-card="props.compatList"
      :name="activity.name"
      :description="activity.description"
      :time="Number(activity.time)"
      :reps="Number(activity.reps)"
      @delete="emits('delete-activity', activity)"
    />
  </div>
  <ErrorBanner v-else :text="props.noFoundMessage"></ErrorBanner>
</template>
