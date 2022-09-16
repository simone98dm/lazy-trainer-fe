<script setup lang="ts">
import { useRoute } from "vue-router";
import { useActivityStore } from "../stores/activity";
import Item from "../components/Item/Item.vue";
import AddIcon from "../components/Icons/AddIcon.vue";
import { ButtonSize, IconSize, LinkType, ButtonColor } from "../utils/enum";
import PlayIcon from "../components/Icons/PlayIcon.vue";
import Icon from "../components/Icons/Icon.vue";
import Link from "../components/Link/Link.vue";
import TrashIcon from "../components/Icons/TrashIcon.vue";
import Button from "../components/Button/Button.vue";
import router from "../router/router";
import { useTimerStore } from "../stores/timer";

const route = useRoute();
const store = useActivityStore();
const timerStore = useTimerStore();
const { sessionId } = route.params;

const warmUpActivities = store.getWarmUpActivities(sessionId as string);
const activities = store.getSessionActivities(sessionId as string);

const activitiesCount = activities?.length ?? 0;
const warmupActivitiesCount = warmUpActivities?.length ?? 0;

function deleteSession() {
  store.deleteSession(sessionId as string);
  router.push({
    name: "home",
  });
}

function runWarmUp() {
  timerStore.setListActivities(warmUpActivities)
  router.push({ name: 'timer', params: { sessionId } })
}

function runActivities() {
  timerStore.setListActivities(activities)
  router.push({ name: 'timer', params: { sessionId } })
}
</script>
<template>
  <section class="flex flex-col justify-center">
    <div class="flex flex-col sm:flex-row mb-6">
      <Button
        label="Delete session"
        :size="ButtonSize.MEDIUM"
        :color="ButtonColor.DANGER"
        @click="deleteSession"
      >
        <Icon :component="TrashIcon" :size="IconSize.MEDIUM"></Icon>
      </Button>
    </div>
    <div
      v-if="warmupActivitiesCount"
      class="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-3 mb-6"
    >
      <!-- <h1 class="mb-3 text-2xl font-bold text-slate-50">Warm-up:</h1> -->
      <div class="mb-3">
        <Button
          v-if="activitiesCount"
          label="Run warm-up"
          :type="LinkType.BUTTON"
          :size="ButtonSize.MEDIUM"
          :color="ButtonColor.PRIMARY"
          @click="runWarmUp"
        >
          <Icon :component="PlayIcon" :size="IconSize.MEDIUM"></Icon>
        </Button>
      </div>
      <div v-for="activity in warmUpActivities">
        <Link
          :to="{
            name: 'activity',
            params: { sessionId, activityId: activity.id },
          }"
        >
          <Item
            :name="activity.name"
            :description="activity.description"
            :time="activity.time"
            :id="activity.id"
            :key="activity.id"
          />
        </Link>
      </div>
    </div>
    <div v-else>
      <h1 class="mb-3 text-2xl font-bold">No warm up activity found</h1>
    </div>
    <div
      v-if="activitiesCount"
      class="bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl p-3 mb-6"
    >
      <!-- <h1 class="mb-3 text-2xl font-bold text-slate-50">Activities:</h1> -->
      <div class="mb-3">
        <Button
          v-if="activitiesCount"
          label="Run activities"
          :type="LinkType.BUTTON"
          :size="ButtonSize.MEDIUM"
          :color="ButtonColor.PRIMARY"
          @click="runActivities"
        >
          <Icon :component="PlayIcon" :size="IconSize.MEDIUM"></Icon>
        </Button>
      </div>

      <div v-for="activity in activities">
        <Link
          :to="{
            name: 'activity',
            params: { sessionId, activityId: activity.id },
          }"
        >
          <Item
            :name="activity.name"
            :description="activity.description"
            :time="activity.time"
            :id="activity.id"
            :key="activity.id"
          />
        </Link>
      </div>
    </div>
    <div v-else>
      <h1 class="mb-3 text-2xl font-bold">No activity found</h1>
    </div>
    <div class="flex flex-col sm:flex-row">
      <Link
        label="Add activity"
        :type="LinkType.BUTTON"
        :to="{ name: 'activity', params: { sessionId } }"
        :size="ButtonSize.MEDIUM"
      >
        <Icon :component="AddIcon" :size="IconSize.MEDIUM"></Icon>
      </Link>
    </div>
  </section>
</template>
