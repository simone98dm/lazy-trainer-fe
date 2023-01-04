<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import { useActivityStore, useSettingStore } from "~/stores";
  import { IActivity } from "~/models/Activity";
  import { ButtonColor, DeepPartial, GaCustomEvents, MAX_ACTIIVITY_FORM } from "~/utils";
  import { ref } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { getAnalytics, logEvent } from "@firebase/analytics";

  const route = useRoute();
  const router = useRouter();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();

  const { sessionId, activityId } = route.params;
  const session = activityStore.getSession(sessionId as string);
  let repeatFor = ref(1);

  settingsStore.setHeader("Activity");

  if (!session) {
    router.back();
  }

  let multiActivities = ref([] as IActivity[]);

  if (activityId) {
    const existingActivity = session?.activities.find((act) => act.id === activityId);
    if (existingActivity) {
      multiActivities.value.push(existingActivity);
    }
  } else {
    addActivityForm();
  }

  function redirectToList() {
    router.push({
      name: "session",
      params: {
        sessionId,
      },
    });
  }

  async function saveActivity() {
    let multi = [...multiActivities.value];
    if (repeatFor.value > 1 && !activityId) {
      for (let i = 1; i < repeatFor.value; i++) {
        multiActivities.value = multiActivities.value.map((act) => {
          return {
            ...act,
            id: uuidv4(),
          };
        });
        multi = [...multi, ...multiActivities.value];
      }
    }
    await activityStore.bulkSaveActivities(sessionId as string, multi);
    logEvent(getAnalytics(), GaCustomEvents.ADD_ACTIVITY, {
      activity_counter: multiActivities.value.length,
    });
    redirectToList();
  }

  async function removeActivity(activityId: string) {
    if (!confirm("Are you sure you want to delete this activity?")) {
      return;
    }
    if (activityId) {
      await activityStore.removeActivity(sessionId as string, activityId);
      logEvent(getAnalytics(), GaCustomEvents.REMOVE_ACTIVITY);
      redirectToList();
    } else {
      multiActivities.value = multiActivities.value.filter((act) => act.id !== activityId);
    }
  }

  function updateActivity(a: any) {
    const { activityId, activity } = a;
    if (!activityId) {
      multiActivities.value.push(activity);
    } else {
      const index = multiActivities.value.findIndex((act) => act.id === activityId);
      if (index !== -1) {
        multiActivities.value[index] = activity;
      } else {
        multiActivities.value.push(activity);
      }
    }
  }

  const restActivityTemplate: DeepPartial<IActivity> = {
    name: "Rest",
    description: "Take a break ⏱",
    time: 15000,
    requestChange: false,
  };

  function addActivityForm(injectActivity?: DeepPartial<IActivity>) {
    if (multiActivities.value.length > MAX_ACTIIVITY_FORM) {
      alert(`You can't add more than ${MAX_ACTIIVITY_FORM} activities at once`);
      return;
    }

    let activity = {
      description: "",
      id: uuidv4(),
      name: "",
      time: 0,
      videoUrl: "",
      warmup: false,
      order: 0,
      reps: 0,
      requestChange: false,
    };

    if (injectActivity) {
      activity = {
        ...activity,
        ...injectActivity,
      };
    }

    multiActivities.value.push(activity);
  }
</script>
<template>
  <div class="mb-6">
    <BackButton @click="router.push({ name: 'details', params: { id: sessionId } })" />
  </div>
  <div class="max-w-screen-lg mx-auto">
    <ActivityForm
      v-for="(act, i) in multiActivities"
      :key="act.id"
      :i="i"
      :name="act?.name"
      :id="act?.id"
      :description="act?.description"
      :time="act?.time"
      :day-of-week="session?.dayOfWeek"
      :warmup="act?.warmup"
      :order="act?.order"
      :reps="act?.reps"
      :video-url="act?.videoUrl"
      :allow-detele="Boolean(activityId)"
      @update="updateActivity"
      @remove="removeActivity"
    />

    <div class="w-full flex flex-col sm:flex-row w-full px-6 justify-between gap-3 mb-6">
      <div class="flex gap-2">
        <Button
          v-if="!settingsStore.isGlobalLoading"
          id="concat-rest-activity"
          label="Add 15 sec rest"
          :color="ButtonColor.PRIMARY"
          icon="self_improvement"
          @click="() => addActivityForm(restActivityTemplate)"
        />
        <Button
          v-if="!settingsStore.isGlobalLoading"
          id="concat-activity"
          label="Concat"
          :color="ButtonColor.PRIMARY"
          icon="exposure_plus_1"
          @click="addActivityForm"
        />
        <Button
          v-if="!settingsStore.isGlobalLoading"
          id="increase-activity-count"
          :label="`Repeat for ${repeatFor} times`"
          :color="ButtonColor.PRIMARY"
          icon="replay"
          @click="() => (repeatFor < 10 ? (repeatFor += 1) : (repeatFor = repeatFor))"
        />
        <Button
          v-if="!settingsStore.isGlobalLoading && repeatFor > 1"
          id="increase-activity-count"
          :label="`Decrease repeat count`"
          :color="ButtonColor.LIGHT"
          icon="remove"
          @click="() => (repeatFor > 1 ? (repeatFor -= 1) : (repeatFor = repeatFor))"
        />
      </div>
      <div>
        <Button
          v-if="!settingsStore.isGlobalLoading"
          id="save-activity"
          :color="ButtonColor.SUCCESS"
          icon="save"
          :label="!activityId ? 'Create' : 'Save'"
          @click="saveActivity"
        />
      </div>
    </div>
  </div>
</template>
