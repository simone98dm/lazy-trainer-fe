<script setup lang="ts">
import { ref } from "vue";
import { useTimerStore } from "../../stores/timer";

const timerStore = useTimerStore();

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const activity = timerStore.getCurrentActivity;

const TIME_LIMIT = activity.time / 1000;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval: any = null;
let remainingPathColor = ref(COLOR_CODES.info.color);

let baseTimerLabel = ref(formatTime(timeLeft));

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (timerStore.isRunning) {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      baseTimerLabel.value = formatTime(timeLeft);
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft === 0) {
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
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  const raw = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  return raw;
}
let strokeDasharray = ref(`283`);
function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  strokeDasharray.value = circleDasharray;
}
</script>

<template>
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
          :class="`base-timer__path-remaining ${remainingPathColor}`"
          d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">{{
      baseTimerLabel
    }}</span>
  </div>
</template>

<style>
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
