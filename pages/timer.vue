<script setup lang="ts">
  import { ref } from "vue";
  import { COLOR_CODES, FULL_DASH_ARRAY } from "~/utils";
  import { useTimerStore, useSettingStore } from "~/stores";

  definePageMeta({
    layout: "fulltimer",
  });

  const router = useRouter();
  const settingsStore = useSettingStore();
  const timerStore = useTimerStore();

  const TIME_LIMIT = ref(0);
  const timeLeft = ref(TIME_LIMIT.value);
  const remainingPathColor = ref(COLOR_CODES.info.color);
  const strokeDasharray = ref("283");
  const baseTimerLabel = ref(formatTime(timeLeft.value));

  let timerInterval: any;
  let timePassed = 0;

  settingsStore.setHeader(
    `${new Date().getTime() - timerStore.startTime} • ${(timerStore.listActivities.length * (timerStore.currentActivity?._index ?? 0)) / 100}%`,
  );

  setupTimer();

  onBeforeRouteLeave(() => {
    if (timerStore.hasNextActivity) {
      const answer = confirm("Do you really want to leave? You will lose your progress.");
      if (!answer) {
        return false;
      }
    }
    timerStore.reset();
    clearInterval(timerInterval);
  });

  window.addEventListener(
    "beforeunload",
    (event: any) => {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to leave the page?");
    },
    { capture: true },
  );

  function setupTimer() {
    let firstActivity = null,
      secondActivity = null;

    if (timerStore.currentActivity && timerStore.nextActivity) {
      const nextActivityIndex = timerStore.listActivities.findIndex(
        (activity) => activity.id === timerStore.nextActivity?.id,
      );
      const secondActivityIndex = nextActivityIndex + 1;
      firstActivity = timerStore.listActivities[nextActivityIndex];
      if (secondActivityIndex <= timerStore.listActivities.length) {
        secondActivity = timerStore.listActivities[secondActivityIndex];
      }
    } else {
      firstActivity = timerStore.listActivities[0];
      secondActivity = timerStore.listActivities[1];
    }

    timerStore.setCurrentActivity(firstActivity);
    timerStore.setNextActivity(secondActivity);
    TIME_LIMIT.value = timerStore.runningTimer / 1000;
    timeLeft.value = TIME_LIMIT.value;
    baseTimerLabel.value = formatTime(timeLeft.value);
  }

  function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
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
    const raw = rawTimeFraction - (1 / TIME_LIMIT.value) * (1 - rawTimeFraction);
    return raw;
  }

  function setCircleDasharray() {
    const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
    strokeDasharray.value = circleDasharray;
  }

  function onTimesUp() {
    clearInterval(timerInterval);

    timePassed = 0;
    timeLeft.value = TIME_LIMIT.value;
    remainingPathColor.value = COLOR_CODES.info.color;
    strokeDasharray.value = "283";
    baseTimerLabel.value = formatTime(timeLeft.value);

    const nextActivity = timerStore.nextActivity;
    if (nextActivity) {
      setupTimer();
      runTimer();
    } else {
      timerStore.reset();
      router.push({
        name: "home",
      });
    }
  }

  function runTimer() {
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
      if (!timerInterval) {
        runTimer();
      }
    } else {
      onTimesUp();
    }
  }
</script>

<template>
  <div v-if="timerStore.currentActivity" class="text-center mb-6">
    Current activity:
    <h1 class="text-4xl font-bold">
      {{ timerStore.currentActivity.name }}
    </h1>
  </div>

  <div v-if="timerStore.isTimerBasedActivity" class="w-full">
    <TimerSpinner
      :stroke-dasharray="strokeDasharray"
      :remaining-path-color="remainingPathColor"
      :base-timer-label="baseTimerLabel"
      size="large"
    />
  </div>
  <h1 class="flex flex-col text-center my-20 text-pink-600" v-else>
    <span class="text-2xl">Total reps:</span>
    <span class="text-7xl font-bold">
      {{ timerStore.currentActivity?.reps }}
    </span>
  </h1>

  <div class="w-full flex flex-col justify-center mb-3">
    <div class="mb-3">
      <BaseButton
        :icon="
          timerStore.isTimerBasedActivity
            ? timerStore.isRunning
              ? 'stop_circle'
              : 'play_circle'
            : 'skip_next'
        "
        :color="timerStore.isRunning ? 'danger' : 'primary'"
        :label="timerStore.isTimerBasedActivity ? (timerStore.isRunning ? 'Stop' : 'Play') : 'Next'"
        :full="true"
        @click="toggleTimer"
      />
    </div>
    <div class="mb-3">
      <BaseButton
        v-if="settingsStore.isEasyModeEnabled"
        label="Skip"
        :full="true"
        @click="onTimesUp"
        color="light"
      />
    </div>
  </div>
  <div class="text-center text-slate-500 mb-3 dark:text-slate-500 text-slate-300">
    Next activty:
    <h1 v-if="timerStore.nextActivity" class="text-4xl font-bolder">
      {{ timerStore.nextActivity.name }}
    </h1>
    <h1 v-else class="text-4xl font-bolder">End of session</h1>
  </div>
</template>
