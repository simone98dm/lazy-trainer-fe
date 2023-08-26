<script setup lang="ts">
  import { Activity } from "~/models/Activity";
  import { MaterialIcons, millisToMinutesAndSeconds } from "~/utils";

  interface ItemProps {
    activity: Activity;
    icon?: MaterialIcons;
  }

  const props = defineProps<ItemProps>();

  const time = computed(() => millisToMinutesAndSeconds(props.activity.time));
</script>

<template>
  <div
    class="flex justify-between border-b-2 border-dashed mt-3 dark:text-slate-200 text-slate-600"
  >
    <div :class="['flex items-center justify-between w-full ', { 'pr-5': $slots.actions }]">
      <MaterialIcon v-if="icon" class="pr-2 sm:block flex-left inline" :component="icon" />
      <h4 class="font-semibold text-3xl">
        {{ activity.name }}
      </h4>

      <h4 v-if="activity.time" class="font-bold text-4xl">
        {{ time }}
      </h4>
      <h4 v-else class="font-bold text-4xl">{{ activity.reps }}r</h4>

      <p v-if="activity.requestChange" class="text-red-600">
        Client request to change this activity
      </p>
    </div>
    <div class="flex items-center">
      <slot name="actions" />
    </div>
  </div>
</template>
