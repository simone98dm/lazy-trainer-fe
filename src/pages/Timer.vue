<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import TimerSpinner from "../components/Timer/TimerSpinner.vue";
import { useActivityStore } from "../stores/activity";
import { useTimerStore } from "../stores/timer";
import Button from "../components/Button/Button.vue";
import PlayIcon from "../components/Icon/PlayIcon.vue";
import StopIcon from "../components/Icon/StopIcon.vue";
import { ButtonSize } from "../utils/enum";

const route = useRoute();
const router = useRouter();
const { sessionId, activityId } = route.params;
const timerStore = useTimerStore();
const activityStore = useActivityStore();

const activities = activityStore.getSessionActivities(sessionId as string);
if (!activities || activities.length <= 0) {
  router.back();
} else {
  const activity = activities?.find((act) => act.id === activityId) ?? null;
  if (activity) {
    timerStore.setCurrentActivity(activity);
  } else {
    const first = activities[0];
    timerStore.setCurrentActivity(first);
  }
}
</script>

<template>
  <div>
    <timer-spinner></timer-spinner>
    <Button @click="timerStore.toggle" full="true" :size="ButtonSize.MEDIUM">
      <stop-icon v-if="timerStore.isRunning"></stop-icon>
      <play-icon v-else></play-icon>
    </Button>
  </div>
</template>
