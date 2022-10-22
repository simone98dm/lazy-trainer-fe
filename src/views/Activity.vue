<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import { useActivityStore } from "~/stores/activity";
  import { useSettingStore } from "~/stores/settings";
  import { IActivity } from "~/models/Activity";
  import { ButtonColor } from "~/utils";
  import { defineAsyncComponent } from "vue";
  import { ref } from "vue";
  import { v4 as uuidv4 } from "uuid";

  const route = useRoute();
  const router = useRouter();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  let repeatFor = ref(1);

  const { sessionId, activityId } = route.params;
  const session = activityStore.getSession(sessionId as string);

  settingsStore.setHeader("Activity");

  if (!session) {
    router.back();
  }

  let multiActivities = ref([] as IActivity[]);

  if (activityId) {
    const existingActivity = session?.activities.find(
      (act) => act.id === activityId
    );
    if (existingActivity) {
      multiActivities.value.push(existingActivity);
    }
  } else {
    addActivityForm();
  }

  function redirectToList() {
    router.push({
      name: "details",
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
    redirectToList();
  }

  async function removeActivity(activityId: string) {
    if (confirm("Are you sure you want to delete this activity?")) {
      if (activityId) {
        await activityStore.removeActivity(sessionId as string, activityId);
        redirectToList();
      } else {
        multiActivities.value = multiActivities.value.filter(
          (act) => act.id !== activityId
        );
      }
    }
  }

  function updateActivity(a: any) {
    const { activityId, activity } = a;
    if (!activityId) {
      multiActivities.value.push(activity);
    } else {
      const index = multiActivities.value.findIndex(
        (act) => act.id === activityId
      );
      if (index !== -1) {
        multiActivities.value[index] = activity;
      } else {
        multiActivities.value.push(activity);
      }
    }
  }

  function addActivityForm() {
    multiActivities.value.push({
      description: "",
      id: uuidv4(),
      name: "",
      time: 0,
      videoUrl: "",
      warmup: false,
      order: 0,
      reps: 0,
      requestChange: false,
    });
  }
</script>
<template>
  <div class="mb-6">
    <BackButton
      @click="router.push({ name: 'details', params: { id: sessionId } })"
    />
  </div>
  <div class="w-full flex flex-col sm:flex-row w-full px-3 gap-3 mb-6">
    <Button
      id="save-activity"
      :color="ButtonColor.SUCCESS"
      icon="save"
      :label="!activityId ? 'Create' : 'Save'"
      @click="saveActivity"
    />
  </div>
  <div class="">
    <div v-for="(act, i) in multiActivities" :key="i">
      <ActivityForm
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
    </div>

    <div
      class="w-full flex flex-col sm:flex-row w-full px-6 justify-center gap-3 mb-6"
    >
      <Button
        id="concat-activity"
        label="Concat"
        :color="ButtonColor.PRIMARY"
        icon="add"
        @click="addActivityForm"
      ></Button>
      <Button
        id="duplicate-activity"
        :label="`Repeat for ${repeatFor} times`"
        :color="ButtonColor.PRIMARY"
        icon="content_copy"
        @click="() => (repeatFor += 1)"
      ></Button>
    </div>
  </div>
</template>
