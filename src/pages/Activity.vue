<script setup lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "../stores/main";
import ActivityForm from "../components/ActivityForm/ActivityForm.vue";
const route = useRoute();
const store = useStore();
const dayOfWeek = route.params.dayOfWeek;
const queryParam = route.params.id;
const activities = store.getActivities(Number(dayOfWeek));
const activity = activities?.find((act) => act.id === queryParam);
function saveActivity(id: string) {
  console.log("🚀 ~ file: Activity.vue ~ line 12 ~ saveActivity ~ id", id);
}
</script>
<template>
  <section class="p-5">
    <div class="space-y-2">
      <ActivityForm
        :name="activity?.name"
        :description="activity?.description"
        :time="activity?.time"
        :day-of-week="dayOfWeek"
        @save="saveActivity"
      ></ActivityForm>
    </div>
  </section>
</template>
