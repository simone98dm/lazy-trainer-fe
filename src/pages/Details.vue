<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useStore} from "../stores/main";
import Item from "../components/Item/Item.vue";
import Button from "../components/Button/Button.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();
const queryParam = route.params.id;
const activities = store.getActivities(Number(queryParam));

function showDetails(id: string) {
  router.push({
    name: "activity",
    params: {
      dayOfWeek: queryParam,
      id: id,
    },
  });
}

function runTimer() {
}
</script>
<template>
  <section class="p-5">
    <div class="space-y-2">
      <div class="w-full md:w-full px-3 mb-6">
        <Button @click="runTimer" label="Start"></Button>
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
    </div>
  </section>
</template>
