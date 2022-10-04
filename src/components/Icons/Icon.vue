<script setup lang="ts">
  const props = defineProps(["component", "size"]);
</script>

<template>
  <span class="material-icons-outlined">{{ props.component }}</span>
</template>
