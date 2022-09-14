<script setup lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "../stores/main";
import ActivityForm from "../components/ActivityForm/ActivityForm.vue";
const route = useRoute();
const store = useStore();
const { sessionId, activityId } = route.params;
const session = store.getSession(sessionId as string);
const activities = session?.activities.find((act) => act.id === activityId);
function saveActivity(id: string) {
  console.log("🚀 ~ file: Activity.vue ~ line 12 ~ saveActivity ~ id", id);
}
</script>
<template>
  <section class="p-5">
    <div class="space-y-2">
      <ActivityForm
        :name="activities?.name"
        :description="activities?.description"
        :time="activities?.time"
        :day-of-week="session?.dayOfWeek"
        @save="saveActivity"
      ></ActivityForm>
    </div>
  </section>
</template>
