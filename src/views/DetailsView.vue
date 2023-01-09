<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import { ButtonColor, getDayOfTheWeek, LinkType } from "~/utils";
  import { useUserStore, useTimerStore, useSettingStore, useActivityStore } from "~/store";
  import { ref } from "vue";
  import { IActivity } from "~/models/Activity";

  const route = useRoute();
  const router = useRouter();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  const timerStore = useTimerStore();

  const sessionId = route.params.sessionId as string;
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
    router.push({ name: "timer", params: { sessionId } });
  }
  function runActivities() {
    timerStore.setListActivities(activityList.value);
    router.push({ name: "timer", params: { sessionId } });
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
          name: 'home',
          params: { planId: userStore.isTrainer ? activityStore.plan?.id : '' },
        })
      "
    />
  </div>
  <div class="max-w-screen-xl mx-auto">
    <div class="flex mb-6 gap-2" v-if="userStore.isTrainer || userStore.isSelfMadeMan">
      <Link
        id="edit-session"
        :to="{ name: 'session', params: { sessionId } }"
        label="Edit"
        :color="userStore.isTrainer ? ButtonColor.PURPLE : ButtonColor.PRIMARY"
        :type="LinkType.BUTTON"
        icon="edit"
      />
      <Link
        v-if="canUserCreateActivity()"
        id="add-activity"
        icon="add"
        :color="ButtonColor.SUCCESS"
        :to="{ name: 'activity', params: { sessionId } }"
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
