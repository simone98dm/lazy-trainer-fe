<script setup lang="ts">
  const attr = [
    {
      key: "today",
      highlight: {
        class: "bg-indigo-500",
        fillMode: "outline",
      },
      dates: new Date(),
    },
    {
      key: "completed",
      dot: true,
      dates: new Date(2022, 11, 2),
    },
  ];
</script>

<template>
  <v-calendar is-expanded :attributes="attr" />
</template>
