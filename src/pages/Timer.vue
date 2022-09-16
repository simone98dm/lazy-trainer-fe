<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useActivityStore } from "../stores/activity";
import { useTimerStore } from "../stores/timer";
import Button from "../components/Button/Button.vue";
import StopIcon from "../components/Icons/StopIcon.vue";
import PlayIcon from "../components/Icons/PlayIcon.vue";
import { ButtonSize, IconSize } from "../utils/enum";
import Icon from "../components/Icons/Icon.vue";
import { IActivity } from "../models/Activity";
import { COLOR_CODES, FULL_DASH_ARRAY } from "../utils/constants";
import { ref } from "vue";
import BackButton from "../components/BackButton/BackButton.vue";
import { Act } from "../utils/types";
import { getActivity } from "../utils";

const route = useRoute();
const router = useRouter();

const timerStore = useTimerStore();
const activityStore = useActivityStore();

const { sessionId, activityId } = route.params;

let TIME_LIMIT = ref(0);
setupTimer(sessionId as string, activityId as string);
let timerInterval: any = null;
let timePassed = 0;
let timeLeft = ref(TIME_LIMIT.value);
let remainingPathColor = ref(COLOR_CODES.info.color);
let strokeDasharray = ref(`283`);
let baseTimerLabel = ref(formatTime(timeLeft.value));
startTimer();

function setupTimer(sessionId: string, activityId: string) {
  const activities = timerStore.getListActivities;

  if (!activities || activities.length <= 0) {
    router.back();
  } else {
    const acts: Act = getActivity(activities, activityId);
    if (acts) {
      timerStore.setCurrentActivity(acts.firstActivity);
      timerStore.setNextActivity(acts.secondActivity);
      TIME_LIMIT.value = timerStore.currentActivityTimer / 1000;
    }
  }
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

    setupTimer(sessionId as string, activityId);
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
  const raw = rawTimeFraction - (1 / TIME_LIMIT.value) * (1 - rawTimeFraction);
  return raw;
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  strokeDasharray.value = circleDasharray;
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
</script>

<template>
  <div>
    <BackButton @click="redirectToActivity"></BackButton>
    <div v-if="timerStore.getCurrentActivity" class="text-center mb-6">
      Current activity:
      <h1 class="text-4xl font-bold">
        {{ timerStore.getCurrentActivity.name }}
      </h1>
    </div>
    <div class="mb-6">
      <div class="box">
        <div class="base-timer">
          <svg
            class="base-timer__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g class="base-timer__circle">
              <circle
                class="base-timer__path-elapsed"
                cx="50"
                cy="50"
                r="45"
              ></circle>
              <path
                id="base-timer-path-remaining"
                :stroke-dasharray="strokeDasharray"
                :class="['base-timer__path-remaining', remainingPathColor]"
                d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
              ></path>
            </g>
          </svg>
          <span id="base-timer-label" class="base-timer__label">
            {{ baseTimerLabel }}
          </span>
        </div>
      </div>
    </div>
    <div class="mb-6 flex justify-center">
      <Button @click="timerStore.toggle" full="true" :size="ButtonSize.LARGE">
        <Icon
          v-if="timerStore.isRunning"
          :component="StopIcon"
          :class="IconSize.MEDIUM"
        ></Icon>
        <Icon v-else :component="PlayIcon" :class="IconSize.MEDIUM"></Icon>
      </Button>
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

<style>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.base-timer {
  position: relative;
  width: 300px;
  height: 300px;
}

.base-timer__svg {
  transform: scaleX(-1);
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}

.base-timer__path-remaining.green {
  color: rgb(65, 184, 131);
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

.base-timer__label {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}
</style>
