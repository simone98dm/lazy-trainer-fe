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
function showDetails(dayOfWeek: number) {
  router.push({
    name: "details",
    params: {
      id: dayOfWeek,
    },
  });
}
</script>

<template>
  <section class="p-5">
    <div class="space-y-2">
      <div v-for="activity in store.getWeek">
        <Item
          :name="getDayOfTheWeek(activity.dayOfWeek)"
          :description="formatDescription(activity.activities.length)"
          :id="activity.dayOfWeek"
          @click="showDetails"
          :key="activity.dayOfWeek"
        />
      </div>
    </div>
  </section>
</template>
