<script setup lang="ts">
import {useRoute} from "vue-router";
import router from "../router/router";
import Item from "@/components/Item/Item.vue";
import AddIcon from "@/components/Icons/AddIcon.vue";
import PlayIcon from "@/components/Icons/PlayIcon.vue";
import Link from "@/components/Link/Link.vue";
import TrashIcon from "@/components/Icons/TrashIcon.vue";
import Button from "@/components/Button/Button.vue";
import {ButtonColor, ButtonSize, LinkType} from "../utils";
import {useActivityStore} from "../stores/activity";
import {useTimerStore} from "../stores/timer";

const route = useRoute();
const store = useActivityStore();
const timerStore = useTimerStore();
const {sessionId} = route.params;

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
  timerStore.setListActivities(warmUpActivities);
  router.push({name: "timer", params: {sessionId}});
}

function runActivities() {
  timerStore.setListActivities(activities);
  router.push({name: "timer", params: {sessionId}});
}
</script>
<template>
  <section class="flex flex-col justify-center">
    <div class="flex flex-col sm:flex-row mb-6">
      <Button
          :color="ButtonColor.DANGER"
          :icon="TrashIcon"
          :size="ButtonSize.MEDIUM"
          label="Delete session"
          @click="deleteSession"
      />
    </div>
    <div
      v-if="warmupActivitiesCount"
      class="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-3 mb-6"
    >
      <!-- <h1 class="mb-3 text-2xl font-bold text-slate-50">Warm-up:</h1> -->
      <div class="mb-3">
        <Button
            v-if="activitiesCount"
            :color="ButtonColor.PRIMARY"
            :icon="PlayIcon"
            :size="ButtonSize.MEDIUM"
            :type="LinkType.BUTTON"
            label="Run warm-up"
            @click="runWarmUp"
        />
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
      <h1
          class="mb-3 text-xl font-bold bg-red-400 rounded-xl p-3 text-gray-50 text-center uppercase mb-6"
      >
        No warm up activity found
      </h1>
    </div>
    <div
      v-if="activitiesCount"
      class="bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl p-3 mb-6"
    >
      <!-- <h1 class="mb-3 text-2xl font-bold text-slate-50">Activities:</h1> -->
      <div class="mb-3">
        <Button
            v-if="activitiesCount"
            :color="ButtonColor.PRIMARY"
            :icon="PlayIcon"
            :size="ButtonSize.MEDIUM"
            :type="LinkType.BUTTON"
            label="Run activities"
            @click="runActivities"
        />
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
      <h1
          class="mb-3 text-xl font-bold bg-red-400 rounded-xl p-3 text-gray-50 text-center uppercase mb-6"
      >
        No activity found
      </h1>
    </div>
    <div class="flex flex-col sm:flex-row">
      <Link
          :icon="AddIcon"
          :size="ButtonSize.MEDIUM"
          :to="{ name: 'activity', params: { sessionId } }"
          :type="LinkType.BUTTON"
          label="Add activity"
      />
    </div>
  </section>
</template>
