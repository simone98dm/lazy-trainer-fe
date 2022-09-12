<script setup lang="ts">
import Item from "../Item/Item.vue";
const props = defineProps(["list"]);
</script>

<template>
  <div v-for="activity in props.list">
    <Item :item="activity" :key="activity.id" />
  </div>
</template>
