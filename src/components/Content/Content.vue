<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../../stores/main";
import Item from "../Item/Item.vue";
const store = useStore();
const router = useRouter();
function getDayOfTheWeek(day: number) {
  var days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  if (day > days.length) {
    return null;
  }
  var dayName = days[day];
  return dayName;
}
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
