<script setup lang="ts">
  import { useUserStore } from "~/stores";
  import draggable from "vuedraggable";
  import { ButtonColor, GaCustomEvents, LinkType } from "~/utils";
  import { getAnalytics, logEvent } from "@firebase/analytics";
  import { ref } from "vue";

  const props = defineProps([
    "activities",
    "sessionId",
    "isWarmup",
    "allowDrag",
    "title",
    "enableRun",
    "enableDuplicate",
    "noFoundMessage",
    "opened",
    "compatList",
  ]);
  const userStore = useUserStore();
  const emits = defineEmits(["move", "delete", "run", "duplicate"]);
  function runWorkout() {
    logEvent(getAnalytics(), GaCustomEvents.RUN_ACTIVITY);
    emits("run");
  }
  const showList = ref(props.opened ?? true);
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
      <Button
        :color="ButtonColor.TRASPARENT"
        :icon="showList ? 'expand_more' : 'expand_less'"
        @click="showList = !showList"
      />
    </div>
    <draggable
      v-if="allowDrag"
      :list="props.activities"
      item-key="id"
      class="mx-2 mt-3"
      @end="emits('move', $event)"
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
            :name="element.name"
            :description="element.description"
            :time="element.time"
            :id="element.id"
            :reps="element.reps"
            :request-change="element.requestChange"
            :no-card="props.compatList"
            class="mx-2"
          />
        </Link>
      </template>
    </draggable>
    <div v-else>
      <Item
        v-if="showList"
        v-for="activity in props.activities"
        :no-card="props.compatList"
        :name="activity.name"
        :description="activity.description"
        :time="activity.time"
        :id="activity.id"
        :reps="activity.reps"
        :key="activity.id"
        class="mx-2"
        checkable="true"
      />
    </div>
  </div>
  <ErrorBanner v-else :text="props.noFoundMessage"></ErrorBanner>
</template>
