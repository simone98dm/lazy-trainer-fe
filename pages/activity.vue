<script setup lang="ts">
  import { useActivityStore, useSettingStore, useUserStore } from "~/stores";
  import { IActivity } from "~/models/Activity";
  import { DeepPartial, MAX_ACTIVITY_FORM } from "~/utils";
  import { ref } from "vue";
  import { v4 as uuidv4 } from "uuid";

  const route = useRoute();
  const router = useRouter();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const { isTrainer } = useUserStore();

  const sessionId = route.params.session;
  const activityId = route.params.activity;

  const currentSession = activityStore.getSession(sessionId as string);
  const repeatFor = ref(1);

  if (!currentSession) {
    router.back();
  }

  const multiActivities = ref([] as IActivity[]);

  if (activityId) {
    const existingActivity = currentSession?.activities.find((act) => act.id === activityId);
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
        session: sessionId,
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
    if (!confirm("Are you sure you want to delete this activity?")) {
      return;
    }
    if (activityId) {
      await activityStore.removeActivity(sessionId as string, activityId);
      redirectToList();
    } else {
      multiActivities.value = multiActivities.value.filter((act) => act.id !== activityId);
    }
  }

  function updateActivity(a: { activityId?: string; activity: IActivity }) {
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
    if (multiActivities.value.length > MAX_ACTIVITY_FORM) {
      alert(`You can't add more than ${MAX_ACTIVITY_FORM} activities at once`);
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
  <div class="max-w-screen-xl mx-auto">
    <ActivityForm
      v-for="(activity, i) in multiActivities"
      :key="activity.id"
      :i="i"
      :name="activity.name"
      :id="activity.id"
      :description="activity.description"
      :time="activity.time"
      :day-of-week="currentSession?.dayOfWeek"
      :warmup="activity.warmup"
      :order="activity.order_index"
      :reps="activity.reps"
      :video-url="activity.videoUrl"
      :allow-detele="Boolean(activityId)"
      @update="updateActivity"
      @remove="removeActivity"
    />

    <div class="w-full flex flex-col sm:flex-row px-6 justify-between gap-3 mb-6">
      <div class="flex gap-2">
        <BaseButton
          v-if="!settingsStore.isGlobalLoading"
          id="concat-rest-activity"
          label="Add 15 sec rest"
          :color="isTrainer ? 'purple' : 'primary'"
          icon="self_improvement"
          @click="() => addActivityForm(restActivityTemplate)"
        />
        <BaseButton
          v-if="!settingsStore.isGlobalLoading"
          id="concat-activity"
          label="Concat"
          :color="isTrainer ? 'purple' : 'primary'"
          icon="exposure_plus_1"
          @click="addActivityForm"
        />
        <BaseButton
          v-if="!settingsStore.isGlobalLoading"
          id="increase-activity-count"
          :label="`Repeat for ${repeatFor} times`"
          :color="isTrainer ? 'purple' : 'primary'"
          icon="replay"
          @click="() => (repeatFor < 10 ? (repeatFor += 1) : (repeatFor = repeatFor))"
        />
        <BaseButton
          v-if="!settingsStore.isGlobalLoading && repeatFor > 1"
          id="increase-activity-count"
          :label="`Decrease repeat count`"
          color="light"
          icon="remove"
          @click="() => (repeatFor > 1 ? (repeatFor -= 1) : (repeatFor = repeatFor))"
        />
      </div>
      <div>
        <BaseButton
          v-if="!settingsStore.isGlobalLoading"
          id="save-activity"
          color="success"
          icon="save"
          :label="!activityId ? 'Create' : 'Save'"
          @click="saveActivity"
        />
      </div>
    </div>
  </div>
</template>
