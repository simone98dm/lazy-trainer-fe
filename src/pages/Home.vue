<script setup lang="ts">
import AddIcon from "@/components/Icons/AddIcon.vue";
import Item from "@/components/Item/Item.vue";
import Link from "@/components/Link/Link.vue";
import { useActivityStore } from "../stores/activity";
import { ButtonSize, getDayOfTheWeek, LinkType } from "../utils";

const store = useActivityStore();

const sessions = store.getWeek;

function formatDescription(len: number) {
  if (len === 0) {
    return "No activity found";
  }
  return `${len} ${len > 1 ? "activities" : "activity"}`;
}
</script>

<template>
  <section>
    <div v-if="sessions.length > 0" class="mb-6">
      <h1 class="mb-3 text-2xl font-bold">Your week session:</h1>
      <div v-for="activity in sessions">
        <Link :to="{ name: 'details', params: { sessionId: activity.id } }">
          <Item
            :name="getDayOfTheWeek(activity.dayOfWeek)"
            :description="formatDescription(activity.activities.length)"
            :id="activity.id"
            :key="activity.dayOfWeek"
          />
        </Link>
      </div>
    </div>
    <div v-else>
      <h1 class="mb-3 text-2xl font-bold">No activity found</h1>
    </div>
    <Link
      :icon="AddIcon"
      :size="ButtonSize.MEDIUM"
      :to="{ name: 'session' }"
      :type="LinkType.BUTTON"
      label="Add day activities"
    />
  </section>
</template>
