<script setup lang="ts">
  import { useUserStore } from "~/stores/user";
  import draggable from "vuedraggable";
  import { ButtonColor, LinkType, ButtonSize } from "~/utils";
  import Button from "~/components/Button/Button.vue";
  import Link from "~/components/Link/Link.vue";
  import Item from "~/components/Item/Item.vue";
  import ErrorBanner from "~/components/ErrorBanner/ErrorBanner.vue";

  const props = defineProps(["activities", "sessionId", "isWarmup"]);
  const userStore = useUserStore();
  const allowEdit = userStore.isTrainer || userStore.isSelfMadeMan;
  const emits = defineEmits(["move", "delete", "run", "duplicate"]);
</script>

<template>
  <div v-if="props.activities && props.activities.length > 0" class="p-3 mb-6">
    <div
      v-if="props.activities.length > 0"
      class="flex justify-between mb-3 gap-2"
    >
      <Button
        id="run-timer"
        :color="ButtonColor.PRIMARY"
        icon="play_arrow"
        :size="ButtonSize.MEDIUM"
        :type="LinkType.BUTTON"
        label="Start"
        @click="emits('run')"
      ></Button>
      <Button
        id="duplicate-warmup"
        v-if="
          props.isWarmup && (userStore.isTrainer || userStore.isSelfMadeMan)
        "
        :color="ButtonColor.LIGHT"
        icon="content_copy"
        :size="ButtonSize.MEDIUM"
        label="Duplicate"
        @click="emits('duplicate')"
      ></Button>
    </div>
    <div v-if="allowEdit">
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
              icon="fitness_center"
              :reps="element.reps"
              :request-change="element.requestChange"
            />
          </Link>
        </template>
      </draggable>
    </div>
    <div v-else>
      <div v-for="activity in props.activities">
        <Item
          :name="activity.name"
          :description="activity.description"
          :time="activity.time"
          :id="activity.id"
          :reps="activity.reps"
          :key="activity.id"
        />
      </div>
    </div>
  </div>
  <ErrorBanner v-else text="No activity found"></ErrorBanner>
</template>
