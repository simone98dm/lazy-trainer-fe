<script setup lang="ts">
const props = defineProps(["item"]);
</script>

<template>
  <div>
    <h1>{{ props.item.name }}</h1>
    <h4>{{ props.item.description }}</h4>
    <p>{{ props.item.time }}</p>
  </div>
</template>
