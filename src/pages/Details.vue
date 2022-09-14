<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useActivityStore } from "../stores/activity";
import Item from "../components/Item/Item.vue";
import Button from "../components/Button/Button.vue";
import AddIcon from "../components/Icons/AddIcon.vue";
import { ButtonSize, IconSize } from "../utils/enum";
import PlayIcon from "../components/Icons/PlayIcon.vue";
import Icon from "../components/Icons/Icon.vue";

const route = useRoute();
const router = useRouter();
const store = useActivityStore();
const queryParam = route.params.id;
const activities = store.getSessionActivities(queryParam as string);

function showDetails(id: string) {
  router.push({
    name: "activity",
    params: {
      sessionId: queryParam,
      activityId: id,
    },
  });
}
</script>
<template>
  <section>
    <div class="w-full md:w-full px-3 mb-6">
      <router-link :to="{ name: 'timer', params: { sessionId: queryParam } }">
        <Button full="true" :size="ButtonSize.MEDIUM" @click="">
          <Icon :component="PlayIcon" :size="IconSize.MEDIUM"></Icon>
        </Button>
      </router-link>
    </div>

    <div v-for="activity in activities">
      <Item
        :name="activity.name"
        :description="activity.description"
        :time="activity.time"
        :id="activity.id"
        @click="showDetails"
        :key="activity.id"
      />
    </div>

    <div class="w-full md:w-full px-3 mb-6">
      <router-link
        :to="{ name: 'activity', params: { sessionId: queryParam } }"
      >
        <Button :size="ButtonSize.MEDIUM" full="true">
          <Icon :component="AddIcon" :size="IconSize.MEDIUM"></Icon>
        </Button>
      </router-link>
    </div>
  </section>
</template>
