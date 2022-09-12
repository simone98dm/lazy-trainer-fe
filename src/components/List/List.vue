<script setup lang="ts">
import Item from "../Item/Item.vue";
const props = defineProps(["list"]);
console.log("🚀 ~ file: List.vue ~ line 4 ~ props", props)
</script>

<template>
  <div v-for="activity in props.list">
    <Item :item="activity" :key="activity.id"></Item>
  </div>
</template>
