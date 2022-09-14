<script setup lang="ts">
import { useRouter } from "vue-router";
import { useActivityStore } from "../../stores/activity";
import { getDayOfTheWeek } from "../../utils/dates";
import Item from "../Item/Item.vue";
const store = useActivityStore();
const router = useRouter();

function formatDescription(len: number) {
  if (len === 0) {
    return "No activity found";
  }
  return `${len} ${len > 1 ? "activities" : "activity"}`;
}
function showDetails(id: string) {
  router.push({
    name: "details",
    params: {
      id: id,
    },
  });
}
</script>

<template>
  <section>
    <div v-for="activity in store.getWeek">
      <Item
        :name="getDayOfTheWeek(activity.dayOfWeek)"
        :description="formatDescription(activity.activities.length)"
        :id="activity.id"
        @click="showDetails"
        :key="activity.dayOfWeek"
      />
    </div>
  </section>
</template>
