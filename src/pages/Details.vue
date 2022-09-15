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

const route = useRoute();
const store = useActivityStore();
const queryParam = route.params.id;
const activities = store.getSessionActivities(queryParam as string);
const count = activities?.length ?? 0;
function deleteSession() {
  store.deleteSession(queryParam as string);
  router.push({
    name: "home",
  });
}
</script>
<template>
  <section class="flex flex-col justify-center">
    <div class="w-full flex flex-col sm:flex-row px-3 mb-5" v-if="count > 0">
      <Link
        label="Run session"
        :type="LinkType.BUTTON"
        :size="ButtonSize.MEDIUM"
        :color="ButtonColor.PRIMARY"
        :to="{ name: 'timer', params: { sessionId: queryParam } }"
      >
        <Icon :component="PlayIcon" :size="IconSize.MEDIUM"></Icon>
      </Link>
      <Button
        label="Delete session"
        :size="ButtonSize.MEDIUM"
        :color="ButtonColor.DANGER"
        @click="deleteSession"
      >
        <Icon :component="TrashIcon" :size="IconSize.MEDIUM"></Icon>
      </Button>
    </div>
    <div v-if="count > 0">
      <h1 class="mb-3 text-2xl font-bold">List of activities:</h1>
      <div v-for="activity in activities">
        <Link
          :to="{
            name: 'activity',
            params: { sessionId: queryParam, activityId: activity.id },
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
    <div class="w-full px-3 mb-5">
      <Link
        label="Add activity"
        :type="LinkType.BUTTON"
        :to="{ name: 'activity', params: { sessionId: queryParam } }"
        :size="ButtonSize.MEDIUM"
      >
        <Icon :component="AddIcon" :size="IconSize.MEDIUM"></Icon>
      </Link>
    </div>
  </section>
</template>
