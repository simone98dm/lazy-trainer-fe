<script setup lang="ts">
  import { getDayOfTheWeek, LinkType } from "~/utils";
  import { useUserStore, useTimerStore, useSettingStore, useActivityStore } from "~/stores";
  import { ref } from "vue";
  import { IActivity } from "~/models/Activity";

  const route = useRoute();
  const router = useRouter();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  const timerStore = useTimerStore();

  const sessionId = route.params.session as string;
  const session = activityStore.getSession(sessionId);
  settingsStore.setHeader(getDayOfTheWeek(session?.dayOfWeek));

  const activityList = ref(undefined as IActivity[] | undefined);
  const warmupList = ref(undefined as IActivity[] | undefined);

  if (sessionId) {
    warmupList.value = activityStore.getWarmUpActivities(sessionId);
    activityList.value = activityStore.getSessionActivities(sessionId);
  }

  function runWarmUp() {
    timerStore.setListActivities(warmupList.value);
    router.push({ path: "/timer", params: { session: sessionId } });
  }
  function runActivities() {
    timerStore.setListActivities(activityList.value);
    router.push({ path: "/timer", params: { session: sessionId } });
  }
  function canUserCreateActivity() {
    const freeActivitySlot = activityStore.getSessionActivities(sessionId)?.length ?? 100;
    return (userStore.isTrainer || userStore.isSelfMadeMan) && freeActivitySlot < 100;
  }
</script>
<template>
  <div class="mb-6">
    <BackButton
      @click="
        router.push({
          path: '/',
          params: { planId: userStore.isTrainer ? activityStore.plan?.id : '' },
        })
      "
    />
  </div>
  <div class="max-w-screen-xl mx-auto">
    <div class="flex mb-6 gap-2" v-if="userStore.isTrainer || userStore.isSelfMadeMan">
      <ButtonLink
        id="edit-session"
        :to="{ path: '/session', params: { session: sessionId } }"
        label="Edit"
        :color="userStore.isTrainer ? 'purple' : 'primary'"
        :type="LinkType.BUTTON"
        icon="edit"
      />
      <ButtonLink
        v-if="canUserCreateActivity()"
        id="add-activity"
        icon="add"
        color="success"
        :to="{ path: '/activity', params: { session: sessionId } }"
        :type="LinkType.BUTTON"
        label="Add"
      />
    </div>
    <div class="flex flex-col justify-center">
      <Card id="warmup-activities" padding="medium">
        <ActivityList
          title="Warmup"
          no-found-message="No warmup activities found"
          :activities="warmupList"
          :is-warmup="true"
          :session-id="sessionId"
          :enable-run="!userStore.isTrainer"
          :enable-duplicate="false"
          :allow-drag="false"
          :opened="true"
          :compat-list="true"
          @run="runWarmUp"
        />
      </Card>
      <Card id="list-activities">
        <ActivityList
          title="Activities"
          no-found-message="No activities found"
          :activities="activityList"
          :session-id="sessionId"
          :enable-run="!userStore.isTrainer"
          :enable-duplicate="false"
          :allow-drag="false"
          :opened="false"
          :compat-list="true"
          @run="runActivities"
        />
      </Card>
    </div>
  </div>
</template>
