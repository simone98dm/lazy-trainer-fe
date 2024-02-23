<script setup lang="ts">
  import { type Activity } from "~/models/Activity";
  import { type MaterialIcons, millisToMinutesAndSeconds } from "~/utils";
  import { computed } from "vue";

  interface ItemProps {
    activity: Activity;
    icon?: MaterialIcons;
  }

  const props = defineProps<ItemProps>();

  const time = computed(() => millisToMinutesAndSeconds(props.activity.time));
</script>

<template>
  <div class="flex justify-between border-b-2 border-dashed mt-3 pb-1">
    <div
      :class="['w-full flex flex-row-reverse items-center justify-end', { 'pr-5': $slots.actions }]"
    >
      <!-- <MaterialIcon v-if="icon" class="pr-2 sm:block flex-left inline" :component="icon" /> -->
      <h4 class="sm:text-2xl mr-4 text-xl">
        {{ activity.name }}
      </h4>

      <h4 v-if="activity.time" class="font-bold mr-4 sm:text-4xl text-3xl">
        {{ time }}
      </h4>
      <h4 v-else class="font-bold mr-4 sm:text-4xl text-3xl">{{ activity.reps }}r</h4>
    </div>
    <div class="flex items-center">
      <slot name="actions" />
    </div>
  </div>
</template>
