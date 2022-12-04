<script setup lang="ts">
  const props = defineProps(["completion"]);
  console.log("🚀 ~ file: Calendar.vue:3 ~ props", props.completion);

  interface Marker {
    key: string;
    highlight?: {
      class: string;
      fillMode: string;
    };
    dot?: boolean;
    dates: Date;
    popover?: {
      label: string;
    };
  }

  const attr: Marker[] = [
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
    props.completion?.forEach((item: string) => {
      attr.push({
        key: "completed",
        dot: true,
        dates: new Date(item),
        popover: {
          label: "Workout completed 🎉",
        },
      });
    });
  }
</script>

<template>
  <v-calendar is-expanded :attributes="attr" />
</template>
