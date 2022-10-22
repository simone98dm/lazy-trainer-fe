<script setup lang="ts">
  defineProps(["component", "class"]);
</script>

<template>
  <div :class="class">
    <span class="material-icons-outlined">{{ component }}</span>
  </div>
</template>
