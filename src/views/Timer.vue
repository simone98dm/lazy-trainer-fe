<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import Button from "~/components/Button/Button.vue";
  import StopIcon from "~/components/Icons/StopIcon.vue";
  import SkipIcon from "~/components/Icons/SkipIcon.vue";
  import PlayIcon from "~/components/Icons/PlayIcon.vue";
  import BackButton from "~/components/BackButton/BackButton.vue";
  import {
    type TimerActivity,
    ButtonSize,
    COLOR_CODES,
    FULL_DASH_ARRAY,
  } from "../utils";
  import TimerSpinner from "../components/TimerSpinner/TimerSpinner.vue";
  import { IActivity } from "../models/Activity";
  import { useSettingStore } from "~/stores/settings";
  import { useTimerStore } from "~/stores/timer";

  const route = useRoute();
  const router = useRouter();
  const settingsStore = useSettingStore();
  const timerStore = useTimerStore();

  let timerInterval: any = null;
  let timePassed = 0;
  settingsStore.setHeader("Timer");
  let TIME_LIMIT = ref(0);
  let timeLeft = ref(TIME_LIMIT.value);

  let remainingPathColor = ref(COLOR_CODES.info.color);
  let strokeDasharray = ref(`283`);
  let baseTimerLabel = ref(formatTime(timeLeft.value));

  const { sessionId, activityId } = route.params;

  setupTimer(activityId as string);
  startTimer();

  function setupTimer(activityId: string) {
    const activities = timerStore.getListActivities;

    if (!activities || activities.length <= 0) {
      router.back();
    } else {
      const acts: TimerActivity = getActivity(activities, activityId);
      if (acts) {
        timerStore.setCurrentActivity(acts.firstActivity);
        timerStore.setNextActivity(acts.secondActivity);
        TIME_LIMIT.value = timerStore.currentActivityTimer / 1000;
        timeLeft.value = TIME_LIMIT.value;
        baseTimerLabel.value = formatTime(timeLeft.value);
      }
    }
  }

  function getActivity(
    activities: IActivity[],
    activityId: string
  ): TimerActivity {
    let obj: TimerActivity;
    if (!activityId && activities.length > 0) {
      obj = { firstActivity: activities[0], secondActivity: undefined };
      if (activities.length > 1) {
        obj = { ...obj, secondActivity: activities[1] };
      }
      return obj;
    }

    const firstActivityIndex =
      activities?.findIndex((act) => act.id === activityId) ?? undefined;
    const secondActivityIndex = firstActivityIndex + 1;

    const firstActivity = activities[firstActivityIndex];
    obj = { firstActivity, secondActivity: undefined };
    if (secondActivityIndex < activities.length) {
      obj = { ...obj, secondActivity: activities[secondActivityIndex] };
      return obj;
    }

    return obj;
  }

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  function setRemainingPathColor(timeLeft: number) {
    const { alert, warning } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      remainingPathColor.value = alert.color;
    } else if (timeLeft <= warning.threshold) {
      remainingPathColor.value = warning.color;
    }
  }

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft.value / TIME_LIMIT.value;
    const raw =
      rawTimeFraction - (1 / TIME_LIMIT.value) * (1 - rawTimeFraction);
    return raw;
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    strokeDasharray.value = circleDasharray;
  }

  function onTimesUp() {
    clearInterval(timerInterval);

    timePassed = 0;
    timeLeft.value = TIME_LIMIT.value;
    remainingPathColor.value = COLOR_CODES.info.color;
    strokeDasharray.value = `283`;
    baseTimerLabel.value = formatTime(timeLeft.value);

    if (timerStore.getNextActivity) {
      const activityId = timerStore.getNextActivity.id;
      router.push({
        name: "timer",
        params: {
          sessionId,
          activityId,
        },
      });

      setupTimer(activityId);
      startTimer();
    } else {
      timerStore.reset();
      router.push({
        name: "details",
        params: {
          sessionId,
        },
      });
    }
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      if (timerStore.isRunning) {
        timePassed = timePassed += 1;
        timeLeft.value = TIME_LIMIT.value - timePassed;
        baseTimerLabel.value = formatTime(timeLeft.value);
        setCircleDasharray();
        setRemainingPathColor(timeLeft.value);

        if (timeLeft.value === 0) {
          onTimesUp();
        }
      }
    }, 1000);
  }

  function toggleTimer() {
    if (timerStore.isTimerBasedActivity) {
      timerStore.toggle();
    } else {
      onTimesUp();
    }
  }

  function redirectToActivity() {
    timerStore.reset();
    router.push({
      name: "details",
      params: {
        sessionId,
      },
    });
  }

  async function sendChangeRequest() {
    await timerStore.requestChange(sessionId as string);
  }
</script>

<template>
  <div>
    <div class="flex flex-row justify-between mb-3">
      <BackButton @click="redirectToActivity"></BackButton>
      <button class="text-red-800 cursor-pointer" @click="sendChangeRequest">
        Request change
      </button>
    </div>
    <div v-if="timerStore.getCurrentActivity" class="text-center mb-6">
      Current activity:
      <h1 class="text-4xl font-bold">
        {{ timerStore.getCurrentActivity.name }}
      </h1>
    </div>

    <div v-if="timerStore.isTimerBasedActivity">
      <timer-spinner
        :stroke-dasharray="strokeDasharray"
        :remaining-path-color="remainingPathColor"
        :base-timer-label="baseTimerLabel"
      ></timer-spinner>
    </div>
    <div v-else>
      <h1 class="flex flex-col text-center my-20 text-pink-600">
        <span class="text-4xl">Total reps:</span>
        <span class="text-9xl font-bold">
          {{ timerStore.getCurrentActivity?.reps }}
        </span>
      </h1>
    </div>

    <div class="mb-3 flex justify-center">
      <Button
        :icon="
          timerStore.isTimerBasedActivity
            ? timerStore.isRunning
              ? 'stop_circle'
              : 'play_circle'
            : SkipIcon
        "
        :label="
          timerStore.isTimerBasedActivity
            ? timerStore.isRunning
              ? 'Stop'
              : 'Play'
            : 'Next'
        "
        :size="ButtonSize.LARGE"
        full="true"
        @click="toggleTimer"
      />
    </div>
    <div
      class="text-center mb-6"
      v-if="timerStore.getCurrentActivity?.requestChange"
    >
      <p class="text-red-600">Change request sended, wait for changes...</p>
    </div>
    <hr class="mb-6" />
    <div class="text-center text-slate-500 mb-6">
      Next activty:
      <h1 v-if="timerStore.getNextActivity" class="text-4xl font-bolder">
        {{ timerStore.getNextActivity.name }}
      </h1>
      <h1 v-else class="text-4xl font-bolder">End of session</h1>
    </div>
  </div>
</template>
