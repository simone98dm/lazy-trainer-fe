<script setup lang="ts">
  defineProps(["time", "hasError"]);
  defineEmits(["timeSelected"]);
</script>

<template>
  <Input
    :value="time"
    @change="(v) => $emit('timeSelected', v * 1000)"
    id="activityTimer"
    name="activityTimerField"
    :has-error="hasError"
    error="Time not valid"
  />
</template>
