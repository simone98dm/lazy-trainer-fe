<script setup lang="ts">
  import AddIcon from "@/components/Icons/AddIcon.vue";
  import Item from "@/components/Item/Item.vue";
  import Link from "@/components/Link/Link.vue";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { ISession } from "../models/Session";
  import { useActivityStore } from "../stores/activity";
  import { useUserStore } from "../stores/user";
  import { ButtonSize, getDayOfTheWeek, LinkType } from "../utils";
  import Loading from "../components/Loading/Loading.vue";

  const store = useActivityStore();
  const isLoading = ref(true);

  const user = useUserStore();
  store.setHeader(`Hello ${user.getUsername} 👋`);

  const router = useRouter();
  const sessions = ref([] as ISession[] | undefined);

  store
    .restoreSession()
    .then(() => {
      sessions.value = store.getWeek;
      isLoading.value = false;
    })
    .catch(() => {
      router.push({ name: "login" });
    });
</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <section v-else>
    <div v-if="sessions && sessions.length > 0" class="mb-6">
      <h1 class="mb-3 text-2xl font-bold">Your session:</h1>
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
