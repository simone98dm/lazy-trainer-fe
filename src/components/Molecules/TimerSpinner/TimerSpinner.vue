<script setup lang="ts">
  defineProps({
    strokeDasharray: {
      type: String,
      default: "283",
    },
    remainingPathColor: {
      type: String,
      default: "green",
    },
    baseTimerLabel: {
      type: String,
      default: "00:00",
    },
    size: {
      type: String,
      default: "medium",
    },
  });
</script>

<template>
  <div class="mb-6">
    <div class="box">
      <div
        :class="[
          'base-timer xl:w-2/5',
          { 'w-24': size === 'small' },
          { 'w-3/5': size === 'large' },
        ]"
      >
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
              id="base-timer-path-remaining"
              :stroke-dasharray="strokeDasharray"
              :class="['base-timer__path-remaining', remainingPathColor]"
              d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
            ></path>
          </g>
        </svg>
        <span
          id="base-timer-label"
          :class="[
            'base-timer__label text-2xl md:text-7xl lg:text-6xl',
            { 'text-2xl': size === 'small' },
            { 'text-6xl': size === 'large' },
          ]"
        >
          {{ baseTimerLabel }}
        </span>
      </div>
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
    stroke: rgb(223, 223, 223);
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
    color: rgb(31, 184, 115);
  }

  .base-timer__path-remaining.orange {
    color: rgb(192, 133, 25);
  }

  .base-timer__path-remaining.red {
    color: rgb(220, 57, 57);
  }

  .base-timer__label {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
