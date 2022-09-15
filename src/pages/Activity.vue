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

function redirectToList() {
  router.push({
    name: "details",
    params: {
      id: sessionId,
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
  <h1 class="mb-3 text-2xl font-bold" v-if="Boolean(!activityId)">Add new activity:</h1>
  <h1 class="mb-3 text-2xl font-bold" v-else>Edit activity:</h1>
  <ActivityForm
    :name="activity?.name"
    :id="activity?.id"
    :description="activity?.description"
    :time="activity?.time"
    :day-of-week="session?.dayOfWeek"
    @save="saveActivity"
    @remove="removeActivity"
  ></ActivityForm>
</template>
