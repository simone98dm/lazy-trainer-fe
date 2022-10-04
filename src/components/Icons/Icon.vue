<script setup lang="ts">
  const props = defineProps(["component", "size"]);
</script>

<template>
  <span class="material-icons-outlined">{{ props.component }}</span>
</template>

<style>
  .icn__small {
    width: 16px;
    height: 16px;
  }
  .icn__medium {
    width: 24px;
    height: 24px;
  }
  .icn__large {
    width: 40px;
    height: 40px;
  }
</style>
