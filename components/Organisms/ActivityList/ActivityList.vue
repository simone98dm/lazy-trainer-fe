<script setup lang="ts">
  import { useUserStore } from "~~/stores";
  import draggable from "vuedraggable";
  import { Color, GaCustomEvents, LinkType } from "~~/utils";
  import { getAnalytics, logEvent } from "@firebase/analytics";
  import { IActivity } from "~~/models/Activity";

  const props = defineProps({
    activities: {
      type: Array<IActivity>,
      default: () => [],
    },
    sessionId: {
      type: String,
      default: "",
    },
    isWarmup: {
      type: Boolean,
      default: false,
    },
    allowDrag: {
      type: Boolean,
      default: false,
    },
    allowDelete: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    enableRun: {
      type: Boolean,
      default: false,
    },
    enableDuplicate: {
      type: Boolean,
      default: false,
    },
    noFoundMessage: {
      type: String,
      default: "No activities found",
    },
    opened: {
      type: Boolean,
      default: true,
    },
    compatList: {
      type: Boolean,
      default: false,
    },
  });
  const userStore = useUserStore();
  const emits = defineEmits(["move", "delete", "run", "duplicate"]);

  function runWorkout() {
    logEvent(getAnalytics(), GaCustomEvents.RUN_ACTIVITY);
    emits("run");
  }

  function moveItem() {
    emits("move", props.activities, props.isWarmup);
  }
</script>

<template>
  <div v-if="props.activities">
    <div class="flex items-center justify-between gap-2">
      <h4 v-if="props.title" class="text-4xl sm:text-5xl font-bold mr-auto">
        {{ props.title }}
      </h4>
      <BaseButton
        v-if="props.enableRun"
        id="run-timer"
        :color="Color.SUCCESS"
        icon="play_arrow"
        :type="LinkType.BUTTON"
        :circular="true"
        label="Start"
        @click="runWorkout"
      />
      <BaseButton
        id="duplicate-warmup"
        v-if="(userStore.isTrainer || userStore.isSelfMadeMan) && props.enableDuplicate"
        :color="Color.LIGHT"
        icon="content_copy"
        label="Duplicate"
        @click="emits('duplicate', props.activities)"
      />
    </div>
    <draggable v-if="allowDrag" class="mt-4" :list="props.activities" item-key="id" @end="moveItem">
      <template #item="{ element }">
        <ButtonLink
          :to="{
            path: '/activity',
            params: {
              session: props.sessionId,
              activity: element.id,
            },
          }"
        >
          <Item
            :id="element.id"
            :name="element.name"
            :description="element.description"
            :time="Number(element.time)"
            :reps="Number(element.reps)"
            :request-change="element.requestChange"
            :no-card="props.compatList"
            :allow-delete="props.allowDelete"
            @delete="$emit('delete', $event)"
          >
            <template #actions>
              <BaseButton
                v-if="props.allowDelete"
                id="delete-activity"
                :color="Color.DANGER"
                icon="delete"
                class="float-right ml-2"
                :circular="true"
                @click.prevent="$emit('delete', element.id)"
              />
            </template>
          </Item>
        </ButtonLink>
      </template>
    </draggable>
    <Item
      v-else
      v-for="activity in props.activities"
      :id="activity.id"
      :key="activity.id"
      :no-card="props.compatList"
      :name="activity.name"
      :description="activity.description"
      :time="Number(activity.time)"
      :reps="Number(activity.reps)"
      @delete="$emit('delete-activity', activity)"
    />
  </div>
  <ErrorBanner v-else :text="props.noFoundMessage"></ErrorBanner>
</template>
