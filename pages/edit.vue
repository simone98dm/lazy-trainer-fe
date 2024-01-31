<script setup lang="ts">
  import type { Activity } from "~/models/Activity";
  import { useActivityStore } from "~/stores";

  const route = useRoute();
  const activityStore = useActivityStore();
  const { selectedSession, selectedActivity } = storeToRefs(activityStore);

  const sessionId = route.params.session as string;

  await activityStore.restoreSession();
  const allowDrag = ref(false);

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
      planId: activityStore.plan!.id,
    });
  }

  function moveActivities(activities: Activity[] | undefined, isWarmup: boolean) {
    if (activities) {
      activityStore.moveActivity(sessionId, activities, isWarmup);
    }
  }
</script>
<template>
  <div class="flex xl:flex-col flex-wrap justify-center max-w-screen-xl mx-auto">
    <SessionForm v-if="selectedSession" :session="selectedSession" />
    <ActivityForm v-if="selectedActivity" :activity="selectedActivity" />
    <div class="float-right">
      Allow drag:
      <Switch
        id="allow-drag-drop-switch"
        name="drag-drop-switch"
        :checked="allowDrag"
        @toggle="(v: boolean) => (allowDrag = v)"
      />
    </div>
    <div v-if="selectedSession?.id" class="w-full px-3 mb-6">
      <div class="flex flex-col justify-center">
        <div class="my-4">
          <ActivityList
            title="Warmup"
            :activities="activityStore.getSelectedWarmUpActivities"
            :is-warmup="true"
            :allow-drag="allowDrag"
            :allow-delete="true"
            :allow-edit="true"
            @move="moveActivities"
          />
        </div>
        <div class="my-4">
          <ActivityList
            title="Activities"
            :activities="activityStore.getSelectedActivities"
            :allow-drag="allowDrag"
            :allow-delete="true"
            :allow-edit="true"
            @move="moveActivities"
          />
        </div>
      </div>
    </div>
  </div>
</template>
