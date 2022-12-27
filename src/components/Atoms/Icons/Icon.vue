<script setup lang="ts">
  const props = defineProps({
    component: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: false,
      default: "",
    },
  });
</script>

<template>
  <span :class="`material-icons-outlined ${props.class}`">{{ component }}</span>
</template>
