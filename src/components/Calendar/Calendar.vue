<script setup lang="ts">
  import { CalendarMarker } from "~/models/CalendarMarker";
  import { useUserStore } from "~/stores";
  const props = defineProps(["completion"]);
  const userStore = useUserStore();

  const attr: CalendarMarker[] = [
    {
      key: "today",
      highlight: {
        class: "bg-indigo-500",
        fillMode: "outline",
      },
      dates: new Date(),
    },
  ];
  if (props.completion) {
    props.completion?.forEach(
      (statistics: {
        userId: string;
        userName: string;
        stats: { completion: string[] };
      }) => {
        const { userId, userName, stats } = statistics;
        let label = `${userName} complete the workout 🎉`;
        if (userStore.userId === userId) {
          label = "You have completed this workout";
        }
        stats.completion.forEach((item) => {
          attr.push({
            key: "completed",
            dot: true,
            dates: new Date(item),
            popover: {
              label,
            },
          });
        });
      }
    );
  }
</script>

<template>
  <v-calendar is-expanded :attributes="attr" />
</template>
