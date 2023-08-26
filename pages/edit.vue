<script setup lang="ts">
  import { Activity } from "~/models/Activity";
  import { useActivityStore, useUserStore } from "~/stores";

  const route = useRoute();
  const activityStore = useActivityStore();
  const userStore = useUserStore();

  const sessionId = route.params.session as string;

  await activityStore.restoreSession();

  if (sessionId) {
    const session = activityStore.getSession(sessionId);
    if (!session) {
      const router = useRouter();
      router.push({ name: "home" });
    }
    activityStore.setSelectedSession(session ?? null);
  } else {
    activityStore.setSelectedSession({
      activities: [],
      dayOfWeek: -1,
    });
  }

  function sortActivities(activities: Activity[] | undefined, isWarmup: boolean) {
    if (activities) {
      activityStore.moveActivity(sessionId, activities, isWarmup);
    }
  }

  async function addActivity() {
    const activity: Activity = {
      name: "New activity",
      description: "",
      reps: 0,
      requestChange: false,
      time: 0,
      order_index: -1,
      sessionId: sessionId,
    };
    activityStore.setSelectedActivity(activity);

    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
</script>
<template>
  <div
    class="flex xl:flex-col flex-wrap justify-center max-w-screen-xl mx-auto dark:text-slate-200 text-slate-600"
  >
    <SessionForm v-if="activityStore.selectedSession" :session="activityStore.selectedSession" />

    <ActivityForm
      class="mt-4"
      v-if="activityStore.selectedActivity"
      :activity="activityStore.selectedActivity"
    />

    <BaseButton
      v-if="!userStore.isNormal && !activityStore.selectedActivity"
      id="add-activity"
      icon="add"
      color="success"
      label="Add"
      variant="circular"
      class="floating-button py-2 px-4"
      @click="addActivity"
    />

    <div class="w-full px-3 mb-6">
      <div class="flex flex-col justify-center">
        <div class="my-4">
          <ActivityList
            title="Warmup"
            :activities="activityStore.getSelectedWarmUpActivities"
            :is-warmup="true"
            :session-id="sessionId"
            :allow-drag="true"
            :allow-delete="true"
            :enable-run="false"
            :allow-edit="true"
            :compat-list="false"
            :allow-add="true"
            @move="sortActivities"
          />
        </div>
        <div class="my-4">
          <ActivityList
            title="Activities"
            :activities="activityStore.getSelectedActivities"
            :session-id="sessionId"
            :allow-drag="true"
            :allow-delete="true"
            :allow-edit="true"
            :enable-run="false"
            :compat-list="false"
            :allow-add="true"
            @move="sortActivities"
          />
        </div>
      </div>
    </div>
  </div>
</template>
