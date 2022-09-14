<script setup lang="ts">
const props = defineProps(["component", "size"]);
</script>

<template>
  <component :is="props.component" :class="props.size"></component>
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
