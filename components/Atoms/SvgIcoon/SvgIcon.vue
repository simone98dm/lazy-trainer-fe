<script lang="ts" setup>
  import { defineAsyncComponent, PropType } from "vue";

  export type SvgAvailableIcons =
    | "working_out_re_nhkg"
    | "fitness_tracker_3033"
    | "healthy_habit_m1a9"
    | "indoor_bike_pwa4"
    | "personal_trainer_re_cnua"
    | "pilates_ftsd"
    | "runner_start_x-0-uu"
    | "fitness_stats_sht6";

  const props = defineProps({
    name: {
      type: String as PropType<SvgAvailableIcons>,
      required: true,
    },
  });

  const icon = defineAsyncComponent(() => import(`../../assets/svg/${props.name}.svg`));
</script>

<template>
  <component :is="icon" class="fill-current" />
</template>
