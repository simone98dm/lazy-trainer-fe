<script setup lang="ts">
import AddIcon from "@/components/Icons/AddIcon.vue";
import Item from "@/components/Item/Item.vue";
import Link from "@/components/Link/Link.vue";
import { useActivityStore } from "../stores/activity";
import { ButtonSize, getDayOfTheWeek, LinkType } from "../utils";

const store = useActivityStore();

const sessions = store.getWeek;
</script>

<template>
  <section>
    <div v-if="sessions.length > 0" class="mb-6">
      <h1 class="mb-3 text-2xl font-bold">Your week session:</h1>
      <div v-for="activity in sessions">
        <Link :to="{ name: 'details', params: { sessionId: activity.id } }">
          <Item
            :name="getDayOfTheWeek(activity.dayOfWeek)"
            :description="`${activity.activities.length} ${
              activity.activities.length > 1 ? 'activities' : 'activity'
            }`"
            :id="activity.id"
            :key="activity.dayOfWeek"
          />
        </Link>
      </div>
    </div>
    <div v-else>
      <h1 class="mb-3 text-2xl font-bold">No sessions found</h1>
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
