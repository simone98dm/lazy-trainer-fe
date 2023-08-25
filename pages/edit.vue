<script setup lang="ts">
  import { Activity } from "~/models/Activity";
  import { Session } from "~/models/Session";
  import { useActivityStore, useUserStore } from "~/stores";

  const router = useRouter();
  const route = useRoute();
  const activityStore = useActivityStore();

  const sessionId = route.params.session as string;

  const session = activityStore.getSession(sessionId);
  const isNew = computed(() => !sessionId);
  const activityList = ref();
  const warmupList = ref();

  await activityStore.restoreSession();

  if (sessionId) {
    warmupList.value = activityStore.getWarmUpActivities(sessionId);
    activityList.value = activityStore.getSessionActivities(sessionId);
  }

  function sortActivities(activities: Activity[] | undefined, isWarmup: boolean) {
    if (activities) {
      activityStore.moveActivity(sessionId, activities, isWarmup);
    }
  }
  async function addSession(session: Session) {
    await activityStore.addSession(session);
    router.push({
      name: "home",
      params: { plan: activityStore.plan?.id },
    });
  }
  async function removeActivity(activityId: string) {
    if (!confirm("Are you sure you want to delete this activity?")) {
      return;
    }
    await activityStore.deleteActivity(sessionId, activityId);
  }
  async function deleteSession(sessionId: string) {
    if (!confirm("Are you sure you want to delete this session?")) {
      return;
    }
    await activityStore.deleteSession(sessionId);
    router.push({
      name: "home",
      params: { plan: activityStore.plan?.id },
    });
  }
</script>
<template>
  <div
    class="flex xl:flex-col flex-wrap justify-center max-w-screen-xl mx-auto dark:text-slate-200 text-slate-600"
  >
    <SessionForm
      @save="addSession"
      @remove="deleteSession"
      :id="sessionId"
      :day-of-week="session?.dayOfWeek"
    />
    <div v-if="!isNew" class="w-full px-3 mb-6">
      <div class="flex flex-col justify-center">
        <div class="my-4">
          <ActivityList
            title="Warmup"
            no-found-message="No warmup activities found"
            :activities="warmupList"
            :is-warmup="true"
            :session-id="sessionId"
            :allow-drag="true"
            :allow-delete="true"
            :enable-run="false"
            :allow-edit="true"
            :compat-list="false"
            @move="sortActivities"
            @delete="removeActivity"
          />
        </div>
        <hr />
        <div class="my-4">
          <ActivityList
            title="Activities"
            no-found-message="No activities found"
            :activities="activityList"
            :session-id="sessionId"
            :allow-drag="true"
            :allow-delete="true"
            :allow-edit="true"
            :enable-run="false"
            :compat-list="false"
            @move="sortActivities"
            @delete="removeActivity"
          />
        </div>
      </div>
    </div>
  </div>
</template>
