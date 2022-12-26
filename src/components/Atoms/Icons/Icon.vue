<script setup lang="ts">
  const props = defineProps(["component", "class"]);
</script>

<template>
  <span :class="'material-icons-outlined ' + props.class">{{ component }}</span>
</template>
