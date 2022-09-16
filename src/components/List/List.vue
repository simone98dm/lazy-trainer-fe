<script setup lang="ts">
import Item from "@/components/Item/Item.vue";

const props = defineProps(["list"]);
</script>

<template>
  <div v-for="activity in props.list">
    <Item
      :name="activity.name"
      :description="activity.description"
      :time="activity.time"
      :key="activity.id"
    />
  </div>
</template>
