<script setup lang="ts">
  const props = defineProps({
    component: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
      default: "",
    },
  });
</script>

<template>
  <span :class="`material-icons-outlined ${props.customClass}`">{{ component }}</span>
</template>
