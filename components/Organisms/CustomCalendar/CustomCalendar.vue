<script setup lang="ts">
  import { CalendarMarker } from "~/models/CalendarMarker";
  import { ICompletion } from "~/models/Completion";
  import { useUserStore } from "~/stores";

  const props = defineProps({
    completion: {
      type: Array<ICompletion>,
      required: false,
      default: [],
    },
  });
  const userStore = useUserStore();

  const attr: CalendarMarker[] = [
    {
      key: "today",
      highlight: {
        class: "bg-green-500",
        fillMode: "outline",
      },
      dates: new Date(),
    },
  ];

  const colors = [
    "red",
    "green",
    "yellow",
    "green",
    "teal",
    "blue",
    "green",
    "purple",
    "pink",
    "gray",
  ];
  if (props.completion) {
    props.completion?.forEach((statistics: ICompletion, index: number) => {
      const { userId, userName, stats } = statistics;
      let label = `${userName} complete the workout 🎉`;
      if (userStore.userId === userId) {
        label = "You have completed this workout";
      }
      stats.completion.forEach((item) => {
        attr.push({
          key: "completed",
          dot: colors[index < colors.length ? index : 0],
          dates: new Date(item),
          popover: {
            label,
          },
        });
      });
    });
  }
</script>

<template>
  <h1>WIP😅</h1>
  <!-- <VCalendar is-expanded :attributes="attr" /> -->
</template>
