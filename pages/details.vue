<script setup lang="ts">
  import { getDayOfTheWeek } from "~/utils";
  import { useTimerStore, useSettingStore, useActivityStore } from "~/stores";
  import { ref } from "vue";

  const route = useRoute();
  const router = useRouter();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const timerStore = useTimerStore();

  definePageMeta({
    middleware: "restore",
  });

  const sessionId = route.params.session as string;
  const session = activityStore.getSession(sessionId);
  settingsStore.setHeader(getDayOfTheWeek(session?.dayOfWeek));

  activityStore.setSelectedSession(session ?? null);

  const activityList = ref();
  const warmupList = ref();

  if (sessionId) {
    warmupList.value = activityStore.getWarmUpActivities(sessionId);
    activityList.value = activityStore.getActivities(sessionId);
  }

  function runWarmUp() {
    timerStore.setListActivities(warmupList.value);
    timerStore.startTime = new Date().getTime();
    router.push({ name: "timer" });
  }

  function runActivities() {
    timerStore.setListActivities(activityList.value);
    timerStore.startTime = new Date().getTime();
    router.push({ name: "timer" });
  }
</script>
<template>
  <div class="max-w-screen-xl mx-auto">
    <div class="flex flex-col gap-8 justify-center">
      <div class="flex flex-col">
        <BaseButton
          v-if="warmupList.length > 0"
          id="run-timer"
          color="success"
          icon="play_arrow"
          :type="LinkType.BUTTON"
          label="Start"
          class="float-right"
          @click="runWarmUp"
        />
        <ActivityList title="Warmup" :activities="warmupList" :is-warmup="true" />
      </div>
      <div class="flex flex-col">
        <BaseButton
          v-if="activityList.length > 0"
          id="run-timer"
          color="success"
          icon="play_arrow"
          :type="LinkType.BUTTON"
          label="Start"
          class="float-right"
          @click="runActivities"
        />
        <ActivityList title="Activities" :activities="activityList" />
      </div>
    </div>
  </div>
</template>
