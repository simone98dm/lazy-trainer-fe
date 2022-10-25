<script setup lang="ts">
  import { useRoute } from "vue-router";
  import router from "~/router/router";
  import { ButtonColor, ButtonSize, getDayOfTheWeek, LinkType } from "~/utils";
  import { useUserStore } from "~/stores/user";
  import { useTimerStore } from "~/stores/timer";
  import { useSettingStore } from "~/stores/settings";
  import { useActivityStore } from "~/stores/activity";
  import { ref, defineAsyncComponent } from "vue";

  const route = useRoute();
  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  const timerStore = useTimerStore();

  const sessionId = route.params.sessionId as string;

  let session = activityStore.getSession(sessionId);
  let activityList = ref(undefined as any[] | undefined);
  let warmupList = ref(undefined as any[] | undefined);
  const showSwitch = userStore.isTrainer || userStore.isSelfMadeMan;
  const allowEdit = ref(false);

  warmupList.value = activityStore.getWarmUpActivities(sessionId);
  activityList.value = activityStore.getSessionActivities(sessionId);

  settingsStore.setHeader(getDayOfTheWeek(session?.dayOfWeek));

  async function deleteSession() {
    await activityStore.deleteSession(sessionId);
    router.back();
  }

  function runWarmUp() {
    timerStore.setListActivities(warmupList.value);
    router.push({ name: "timer", params: { sessionId } });
  }

  function runActivities() {
    timerStore.setListActivities(activityList.value);
    router.push({ name: "timer", params: { sessionId } });
  }

  function duplicateWarmup() {
    activityStore.setDuplicateWarmup(warmupList.value);
    router.push({
      name: "session",
      params: { sessionId },
      query: { d: "duplicate" },
    });
  }

  function canUserCreateActivity() {
    const freeActivitySlot =
      activityStore.getSessionActivities(sessionId)?.length ?? 100;
    return (
      (userStore.isTrainer || userStore.isSelfMadeMan) && freeActivitySlot < 100
    );
  }

  function sortActivities(evt: any) {
    const { newDraggableIndex, oldDraggableIndex } = evt;
    activityStore.moveActivity(
      session?.id,
      newDraggableIndex,
      oldDraggableIndex
    );
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
  <div
    class="flex mb-6 gap-2"
    v-if="userStore.isTrainer || userStore.isSelfMadeMan"
  >
    <Link
      id="edit-session"
      :to="{ name: 'session', params: { sessionId } }"
      label="Edit"
      :type="LinkType.BUTTON"
      icon="edit"
    ></Link>
    <Button
      id="delete-session"
      :color="ButtonColor.DANGER"
      icon="delete"
      :size="ButtonSize.MEDIUM"
      label="Delete"
      @click="deleteSession"
    ></Button>
    <Link
      v-if="canUserCreateActivity()"
      id="add-activity"
      icon="add"
      :size="ButtonSize.MEDIUM"
      :color="ButtonColor.SUCCESS"
      :to="{ name: 'activity', params: { sessionId } }"
      :type="LinkType.BUTTON"
      label="Add"
    />
    <label v-if="showSwitch" class="w-full sm:w-fit ml-auto">
      Edit order:
      <Switch
        :checked="allowEdit"
        @toggle="(value) => (allowEdit = value)"
      ></Switch>
    </label>
  </div>
  <div class="flex flex-col justify-center">
    <div id="warmup-activities">
      <ActivityList
        :activities="warmupList"
        :is-warmup="true"
        :session-id="sessionId"
        @duplicate="duplicateWarmup"
        @run="runWarmUp"
        @move="sortActivities"
        :allow-drag="allowEdit"
      ></ActivityList>
    </div>
    <div id="list-activities">
      <ActivityList
        :activities="activityList"
        @run="runActivities"
        @move="sortActivities"
        :session-id="sessionId"
        :allow-drag="allowEdit"
      ></ActivityList>
    </div>
  </div>
</template>
