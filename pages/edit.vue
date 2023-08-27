<script setup lang="ts">
  import { Activity } from "~/models/Activity";
  import { useActivityStore } from "~/stores";

  const route = useRoute();
  const activityStore = useActivityStore();

  const sessionId = route.params.session as string;

  await activityStore.restoreSession();

  if (sessionId) {
    const session = activityStore.getSession(sessionId);
    if (!session) {
      const router = useRouter();
      router.push({ name: "home" });
    }
    activityStore.setSelectedSession(session);
  } else {
    activityStore.setSelectedSession({
      activities: [],
      dayOfWeek: -1,
    });
  }

  function moveActivities(activities: Activity[] | undefined, isWarmup: boolean) {
    if (activities) {
      activityStore.moveActivity(sessionId, activities, isWarmup);
    }
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

    <div v-if="activityStore.selectedSession?.id" class="w-full px-3 mb-6">
      <div class="flex flex-col justify-center">
        <div class="my-4">
          <ActivityList
            title="Warmup"
            :activities="activityStore.getSelectedWarmUpActivities"
            :is-warmup="true"
            :allow-drag="true"
            :allow-delete="true"
            :allow-edit="true"
            @move="moveActivities"
          />
        </div>
        <div class="my-4">
          <ActivityList
            title="Activities"
            :activities="activityStore.getSelectedActivities"
            :allow-drag="true"
            :allow-delete="true"
            :allow-edit="true"
            @move="moveActivities"
          />
        </div>
      </div>
    </div>
  </div>
</template>
