<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import ActivityForm from "@/components/ActivityForm/ActivityForm.vue";
import BackButton from "@/components/BackButton/BackButton.vue";
import { useActivityStore } from "../stores/activity";
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
  warmup: false,
  order: 0,
  reps: 0,
};

if (activityId) {
  const existingActivity = session?.activities.find(
    (act) => act.id === activityId
  );
  if (existingActivity) {
    activity = existingActivity;
  }
}

function redirectToList() {
  router.push({
    name: "details",
    params: {
      sessionId,
    },
  });
}

function saveActivity(activity: IActivity) {
  store.addActivity(sessionId as string, activity);
  redirectToList();
}

function removeActivity(activityId: string) {
  store.removeActivity(sessionId as string, activityId);
  redirectToList();
}
</script>
<template>
  <div class="mb-6">
    <BackButton @click="router.back()" />
  </div>
  <div class="mb-6">
    <ActivityForm
      :name="activity?.name"
      :id="activity?.id"
      :description="activity?.description"
      :time="activity?.time"
      :day-of-week="session?.dayOfWeek"
      :warmup="activity?.warmup"
      :order="activity?.order"
      :reps="activity?.reps"
      @save="saveActivity"
      @remove="removeActivity"
    />
  </div>
</template>
