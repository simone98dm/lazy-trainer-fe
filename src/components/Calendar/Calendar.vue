<script setup lang="ts">
  const props = defineProps(["completion"]);

  const attr = [
    {
      key: "today",
      highlight: {
        class: "bg-indigo-500",
        fillMode: "outline",
      },
      dates: new Date(),
    },
  ];

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
</script>

<template>
  <v-calendar is-expanded :attributes="attr" />
</template>
