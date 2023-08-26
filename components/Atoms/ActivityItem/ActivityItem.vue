<script setup lang="ts">
  import { Activity } from "~/models/Activity";
  import { MaterialIcons, millisToMinutesAndSeconds } from "~/utils";

  interface ItemProps {
    activity: Activity;
    icon?: MaterialIcons;
  }

  defineProps<ItemProps>();
</script>

<template>
  <div
    class="flex justify-between mb-2 border-b-2 border-dashed mt-3 dark:text-slate-200 text-slate-600"
  >
    <div :class="['flex items-center justify-between w-full', { 'pr-10': $slots.actions }]">
      <MaterialIcon v-if="icon" class="pr-2 sm:block flex-left inline" :component="icon" />

      <div>
        <h4
          :class="[
            { 'font-semibold text-2xl': activity.description },
            { 'font-bold text-3xl': !activity.description },
          ]"
        >
          {{ activity.name }}
        </h4>
        <p v-if="activity.description" class="text-sm truncate whitespace-nowrap overflow-hidden">
          {{
            activity.description && activity.description.length > 100
              ? `${activity.description.substring(0, 97)}...`
              : activity.description
          }}
        </p>
      </div>

      <div class="font-bold text-5xl">
        <h4 v-if="activity.time">
          {{ millisToMinutesAndSeconds(activity.time) }}
        </h4>
        <h4 v-else-if="activity.reps">{{ activity.reps }}r</h4>
      </div>

      <p v-if="activity.requestChange" class="text-red-600">
        Client request to change this activity
      </p>
    </div>
    <slot name="actions" />
  </div>
</template>
