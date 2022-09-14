<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useActivityStore } from "../stores/activity";
import ActivityForm from "../components/ActivityForm/ActivityForm.vue";
import { IActivity } from "../models/Activity";
const route = useRoute();
const router = useRouter();
const store = useActivityStore();
const { sessionId, activityId } = route.params;
const session = store.getSession(sessionId as string);

if (!session) {
  router.back();
}

let activity: IActivity = {
  description: "",
  id: "",
  name: "",
  time: 0,
  videoUrl: "",
};

if (activityId) {
  const existingActivity = session?.activities.find(
    (act) => act.id === activityId
  );
  if (existingActivity) {
    activity = existingActivity;
  }
}

function saveActivity(sessionId: string) {
  store.addActivity(sessionId, activity);
}
</script>
<template>
  <section class="p-5">
    <div class="space-y-2">
      <ActivityForm
        :name="activity?.name"
        :description="activity?.description"
        :time="activity?.time"
        :day-of-week="session?.dayOfWeek"
        @save="saveActivity"
      ></ActivityForm>
    </div>
  </section>
</template>
