<script setup lang="ts">
  import { Session } from "~/models/Session";
  import { useActivityStore } from "~/stores";

  const router = useRouter();
  const route = useRoute();
  const activityStore = useActivityStore();

  const sessionId = route.params.session as string;
  const session = activityStore.getSession(sessionId);

  function cleanDuplicateActivities() {
    activityStore.duplicateActivities = undefined;
  }

  // function backPage() {
  //   cleanDuplicateActivities();
  //   if (!sessionId) {
  //     backHomePage();
  //   } else {
  //     router.push({
  //       name: "details",
  //       params: { session: sessionId },
  //     });
  //   }
  // }

  async function addSession(session: Session) {
    await activityStore.addSession(session);
    cleanDuplicateActivities();
    backHomePage();
  }

  async function deleteSession(sessionId: string) {
    if (!confirm("Are you sure you want to delete this session?")) {
      return;
    }
    await activityStore.deleteSession(sessionId);
    backHomePage();
  }

  function backHomePage() {
    router.push({
      name: "home",
      params: { plan: activityStore.plan?.id },
    });
  }
</script>
<template>
  <!-- <div class="mb-6">
    <BackButton @click="backPage" />
  </div> -->
  <div class="flex xl:flex-col flex-wrap justify-center max-w-screen-xl mx-auto">
    <SessionForm
      @save="addSession"
      @remove="deleteSession"
      :id="sessionId"
      :day-of-week="session?.dayOfWeek"
    />
  </div>
</template>
