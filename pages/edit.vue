<script setup lang="ts">
  import { Activity } from "~/models/Activity";
  import { Session } from "~/models/Session";
  import { useActivityStore } from "~/stores";

  const router = useRouter();
  const route = useRoute();
  const activityStore = useActivityStore();

  const sessionId = route.params.session as string;

  const activityList = ref();
  const warmupList = ref();

  await activityStore.restoreSession();

  if (sessionId) {
    const session = activityStore.getSession(sessionId);
    activityStore.setSelectedSession(session ?? null);

    warmupList.value = activityStore.selectedSession?.activities.filter((x) => x.warmup);
    activityList.value = activityStore.selectedSession?.activities.filter((x) => !x.warmup);
  } else {
    activityStore.setSelectedSession({
      activities: [],
      dayOfWeek: -1,
      id: "",
    });
  }

  function sortActivities(activities: Activity[] | undefined, isWarmup: boolean) {
    if (activities) {
      activityStore.moveActivity(sessionId, activities, isWarmup);
    }
  }

  async function addSession(session: Session) {
    const returnedSession = await activityStore.addSession(session);

    if (returnedSession) {
      router.push({
        name: "edit",
        params: {
          session: returnedSession.id,
        },
      });
    }
  }

  async function removeActivity(activityId: string) {
    if (!confirm("Are you sure you want to delete this activity?")) {
      return;
    }

    await activityStore.deleteActivity(activityId);
  }

  async function deleteSession(session: Session) {
    if (!confirm("Are you sure you want to delete this session?")) {
      return;
    }

    await activityStore.deleteSession(session.id);

    router.push({
      name: "home",
    });
  }
</script>
<template>
  <div
    class="flex xl:flex-col flex-wrap justify-center max-w-screen-xl mx-auto dark:text-slate-200 text-slate-600"
  >
    <SessionForm
      @save="addSession"
      @delete="deleteSession"
      :session="activityStore.selectedSession"
    />

    <div class="w-full px-3 mb-6">
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
            :allow-add="true"
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
            :allow-add="true"
            @move="sortActivities"
            @delete="removeActivity"
          />
        </div>
      </div>
    </div>
  </div>
</template>
