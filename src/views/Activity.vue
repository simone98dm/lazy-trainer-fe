<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import ActivityForm from "~/components/ActivityForm/ActivityForm.vue";
  import BackButton from "~/components/BackButton/BackButton.vue";
  import { useActivityStore } from "~/stores/activity";
  import { useSettingStore } from "~/stores/settings";
  import { IActivity } from "../models/Activity";

  const route = useRoute();
  const router = useRouter();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();

  const { sessionId, activityId } = route.params;
  const session = activityStore.getSession(sessionId as string);

  settingsStore.setHeader("Activity");

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
    requestChange: false,
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

  async function saveActivity(activity: IActivity) {
    await activityStore.addActivity(sessionId as string, activity);
    redirectToList();
  }

  async function removeActivity(activityId: string) {
    await activityStore.removeActivity(sessionId as string, activityId);
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
