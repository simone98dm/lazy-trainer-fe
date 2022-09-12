<script setup lang="ts">
import { useStore } from "../../stores/main";
import List from "../List/List.vue";
const store = useStore();
</script>

<template>
  <section class="p-5">
    <div class="space-y-2">
      <List :list="store.getActivities" />
    </div>
  </section>
</template>
