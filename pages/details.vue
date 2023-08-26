<script setup lang="ts">
  import { getDayOfTheWeek } from "~/utils";
  import { useUserStore, useTimerStore, useSettingStore, useActivityStore } from "~/stores";
  import { ref } from "vue";

  const route = useRoute();
  const router = useRouter();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  const timerStore = useTimerStore();

  await activityStore.restoreSession();

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
    router.push({ name: "timer", params: { session: sessionId } });
  }

  function runActivities() {
    timerStore.setListActivities(activityList.value);
    router.push({ name: "timer", params: { session: sessionId } });
  }
</script>
<template>
  <div class="max-w-screen-xl mx-auto">
    <div class="flex flex-col justify-center">
      <Card id="warmup-activities" padding="medium">
        <BaseButton
          v-if="warmupList.length > 0"
          id="run-timer"
          color="success"
          icon="play_arrow"
          :type="LinkType.BUTTON"
          label="Start"
          @click="runWarmUp"
        />
        <ActivityList
          title="Warmup"
          no-found-message="No warmup activities found"
          :activities="warmupList"
          :is-warmup="true"
          :session-id="sessionId"
          :enable-run="!userStore.isTrainer"
          :allow-drag="false"
          :opened="true"
          :compat-list="true"
        />
      </Card>
      <Card id="list-activities">
        <BaseButton
          v-if="activityList.length > 0"
          id="run-timer"
          color="success"
          icon="play_arrow"
          :type="LinkType.BUTTON"
          label="Start"
          @click="runActivities"
        />
        <ActivityList
          title="Activities"
          no-found-message="No activities found"
          :activities="activityList"
          :session-id="sessionId"
          :enable-run="!userStore.isTrainer"
          :allow-drag="false"
          :opened="false"
          :compat-list="true"
        />
      </Card>
    </div>
  </div>
</template>
