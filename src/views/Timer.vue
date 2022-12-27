<script setup lang="ts">
  import { computed, inject, ref } from "vue";
  import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
  import ding from "~/assets/audio/ding.mp3";
  import horn from "~/assets/audio/horn.mp3";
  import {
    type TimerActivity,
    COLOR_CODES,
    FULL_DASH_ARRAY,
    ButtonColor,
    logOptions,
  } from "~/utils";
  import { IActivity } from "~/models/Activity";
  import {
    useTimerStore,
    useSettingStore,
    useUserStore,
    useActivityStore,
  } from "~/stores";
  const $log = inject("$logger") as logOptions;

  const route = useRoute();
  const router = useRouter();
  const settingsStore = useSettingStore();
  const timerStore = useTimerStore();
  const userStore = useUserStore();
  const activityStore = useActivityStore();

  settingsStore.setHeader("Timer");

  let timerInterval: any = null;
  let timePassed = 0;
  let TIME_LIMIT = ref(0);
  let timeLeft = ref(TIME_LIMIT.value);

  let remainingPathColor = ref(COLOR_CODES.info.color);
  let strokeDasharray = ref(`283`);
  let baseTimerLabel = ref(formatTime(timeLeft.value));

  const { sessionId, activityId } = route.params;

  const isNextVideo = computed(() => {
    return timerStore.getNextActivity?.videoUrl;
  });

  setupTimer(activityId as string);

  onBeforeRouteLeave(() => {
    if (timerStore.hasNextActivity) {
      const answer = confirm(
        "Do you really want to leave? You will lose your progress."
      );
      if (!answer) {
        return false;
      }
    }
    $log("User quit the session", "info");
    timerStore.reset();
    clearInterval(timerInterval);
  });

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

  function formatTime(time: number): string {
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

  let audio = new Audio();
  function playAudio(audioSrc: string) {
    if (!settingsStore.audioDisabled) {
      audio.pause();
      audio = new Audio(audioSrc);
      audio.play();
    }
  }

  function onTimesUp() {
    clearInterval(timerInterval);

    timePassed = 0;
    timeLeft.value = TIME_LIMIT.value;
    remainingPathColor.value = COLOR_CODES.info.color;
    strokeDasharray.value = `283`;
    baseTimerLabel.value = formatTime(timeLeft.value);

    const nextActivity = timerStore.getNextActivity;
    if (nextActivity) {
      playAudio(ding);
      const activityId = nextActivity.id;
      router.push({
        name: "timer",
        params: {
          sessionId,
          activityId,
        },
      });

      setupTimer(activityId);
      runTimer();
    } else {
      playAudio(horn);
      $log("User complete the session", "info");
      activityStore.completeSession(sessionId as string);
      timerStore.reset();
      router.push({
        name: "details",
        params: {
          sessionId,
        },
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

  function redirectToActivity() {
    router.push({
      name: "details",
      params: {
        sessionId,
      },
    });
  }

  async function sendChangeRequest() {
    $log("User send change request", "info");
    await timerStore.requestChange(sessionId as string);
  }

  function skipActivity() {
    $log("User skip the activity", "info");
    onTimesUp();
  }
</script>

<template>
  <div>
    <div class="flex flex-row justify-between mb-3">
      <BackButton @click="redirectToActivity"></BackButton>
      <button
        v-if="
          !timerStore.getCurrentActivity?.requestChange &&
          !(userStore.isTrainer || userStore.isSelfMadeMan)
        "
        class="text-red-800 cursor-pointer"
        @click="sendChangeRequest"
      >
        Request change
      </button>
    </div>
    <div v-if="timerStore.getCurrentActivity" class="text-center mb-6">
      Current activity:
      <h1 class="text-4xl font-bold">
        {{ timerStore.getCurrentActivity.name }}
      </h1>
    </div>

    <div
      v-if="timerStore.isTimerBasedActivity"
      :class="[
        'w-full',
        {
          'flex flex-col justify-center': isNextVideo,
        },
      ]"
    >
      <TimerSpinner
        :stroke-dasharray="strokeDasharray"
        :remaining-path-color="remainingPathColor"
        :base-timer-label="baseTimerLabel"
        :size="isNextVideo ? 'small' : 'large'"
      />
      <ImageLoader :src="timerStore.getNextActivity?.videoUrl || ''" />
    </div>
    <h1 class="flex flex-col text-center my-20 text-pink-600" v-else>
      <span class="text-4xl">Total reps:</span>
      <span class="text-9xl font-bold">
        {{ timerStore.getCurrentActivity?.reps }}
      </span>
    </h1>

    <div class="w-full flex flex-col justify-center mb-3">
      <div class="mb-3">
        <Button
          :icon="
            timerStore.isTimerBasedActivity
              ? timerStore.isRunning
                ? 'stop_circle'
                : 'play_circle'
              : 'skip_next'
          "
          :color="
            timerStore.isRunning ? ButtonColor.DANGER : ButtonColor.PRIMARY
          "
          :label="
            timerStore.isTimerBasedActivity
              ? timerStore.isRunning
                ? 'Stop'
                : 'Play'
              : 'Next'
          "
          :full="true"
          @click="toggleTimer"
        />
      </div>
      <div class="mb-3">
        <Button
          v-if="settingsStore.isEasyModeEnabled"
          label="Skip"
          :full="true"
          @click="skipActivity"
          :color="ButtonColor.LIGHT"
        />
      </div>
    </div>
    <div
      class="text-center mb-3"
      v-if="timerStore.getCurrentActivity?.requestChange"
    >
      <p class="text-red-600">Change request sended, wait for changes...</p>
    </div>
    <div class="text-center text-slate-500 mb-3">
      Next activty:
      <h1 v-if="timerStore.getNextActivity" class="text-4xl font-bolder">
        {{ timerStore.getNextActivity.name }}
      </h1>
      <h1 v-else class="text-4xl font-bolder">End of session</h1>
    </div>
  </div>
</template>
