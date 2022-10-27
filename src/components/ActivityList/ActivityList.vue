<script setup lang="ts">
  import { useUserStore } from "~/stores";
  import draggable from "vuedraggable";
  import { ButtonColor, LinkType } from "~/utils";

  const props = defineProps([
    "activities",
    "sessionId",
    "isWarmup",
    "allowDrag",
    "title",
    "enableRun",
    "enableDuplicate",
  ]);
  const userStore = useUserStore();
  const emits = defineEmits(["move", "delete", "run", "duplicate"]);
</script>

<template>
  <div v-if="props.activities && props.activities.length > 0" class="p-3 mb-6">
    <div
      v-if="props.activities.length > 0"
      class="flex justify-between mb-3 gap-2"
    >
      <h4 v-if="props.title" class="text-4xl font-bold mr-auto">
        {{ props.title }}
      </h4>
      <Button
        v-if="props.enableRun"
        id="run-timer"
        :color="ButtonColor.PRIMARY"
        icon="play_arrow"
        :type="LinkType.BUTTON"
        label="Start"
        @click="emits('run')"
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
    </div>
    <div v-if="allowDrag">
      <draggable
        :list="props.activities"
        item-key="id"
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
            />
          </Link>
        </template>
      </draggable>
    </div>
    <div v-else>
      <Item
        v-for="activity in props.activities"
        :name="activity.name"
        :description="activity.description"
        :time="activity.time"
        :id="activity.id"
        :reps="activity.reps"
        :key="activity.id"
      />
    </div>
  </div>
  <ErrorBanner v-else text="No activity found"></ErrorBanner>
</template>
