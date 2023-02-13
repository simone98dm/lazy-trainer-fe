<script setup lang="ts">
  defineProps({
    component: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <span class="material-icons-outlined">{{ component }}</span>
</template>
