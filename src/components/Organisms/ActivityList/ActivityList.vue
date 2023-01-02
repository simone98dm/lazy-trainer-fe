<script setup lang="ts">
  import { useUserStore } from "~/stores";
  import draggable from "vuedraggable";
  import { ButtonColor, GaCustomEvents, LinkType } from "~/utils";
  import { getAnalytics, logEvent } from "@firebase/analytics";
  import { ref } from "vue";
  import { IActivity } from "~/models/Activity";

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
  const showList = ref(props.opened ?? true);

  function moveItem(evt: any) {
    emits("move", props.activities, props.isWarmup);
  }
</script>

<template>
  <div v-if="props.activities && props.activities.length > 0">
    <div
      v-if="props.activities.length > 0"
      class="flex items-center justify-between gap-2"
    >
      <h4
        v-if="props.title"
        class="text-4xl sm:text-5xl font-bold mr-auto text-black"
      >
        {{ props.title }}
      </h4>
      <Button
        v-if="props.enableRun"
        id="run-timer"
        :color="ButtonColor.PRIMARY"
        icon="play_arrow"
        :type="LinkType.BUTTON"
        :circular="true"
        label="Start"
        @click="runWorkout"
      />
      <Button
        id="duplicate-warmup"
        v-if="
          (userStore.isTrainer || userStore.isSelfMadeMan) &&
          props.enableDuplicate
        "
        :color="ButtonColor.LIGHT"
        icon="content_copy"
        label="Duplicate"
        @click="emits('duplicate', props.activities)"
      />
      <!-- <Button
        :color="ButtonColor.TRASPARENT"
        :icon="showList ? 'expand_more' : 'expand_less'"
        circular="true"
        @click="showList = !showList"
      /> -->
    </div>
    <draggable
      v-if="allowDrag"
      class="mt-4"
      :list="props.activities"
      item-key="id"
      @end="moveItem"
    >
      <template #item="{ element }">
        <Link
          :to="{
            name: 'activity',
            params: {
              sessionId: props.sessionId,
              activityId: element.id,
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
            class="mx-2"
          >
            <template #actions>
              <div>
                <Button
                  v-if="props.allowDelete"
                  id="delete-activity"
                  :color="ButtonColor.DANGER"
                  icon="delete"
                  class="float-right ml-2"
                  :circular="true"
                  @click.prevent="$emit('delete', element.id)"
                />
              </div>
            </template>
          </Item>
        </Link>
      </template>
    </draggable>
    <div v-else>
      <Item
        v-for="activity in props.activities"
        :id="activity.id"
        :key="activity.id"
        :no-card="props.compatList"
        :name="activity.name"
        :description="activity.description"
        :time="Number(activity.time)"
        :reps="Number(activity.reps)"
        class="mx-2"
        @delete="$emit('delete-activity', activity)"
      />
    </div>
  </div>
  <ErrorBanner v-else :text="props.noFoundMessage"></ErrorBanner>
</template>
