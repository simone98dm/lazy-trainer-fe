<script setup lang="ts">
  import { useUserStore } from "~/stores";
  import { useRoute } from "vue-router";
  import { useNotificationStore } from "~/stores/notification";
  const route = useRoute();
  const user = useUserStore();
  const notifications = useNotificationStore();
  const planId = route.query.planId as string;
</script>

<template>
  <div
    class="fixed left-0 bottom-0 w-full rounded-t-xl bg-white px-5 py-2 shadow-sm shadow-gray-300"
  >
    <nav class="flex justify-around text-gray-900">
      <router-link
        :to="{ name: 'home', params: { planId } }"
        class="rounded-full p-3"
      >
        <Icon component="house" />
      </router-link>
      <router-link to="/dashboard" class="rounded-full p-3">
        <Icon component="dashboard" />
      </router-link>
      <router-link v-if="user.isTrainer" to="/group" class="rounded-full p-3">
        <Icon component="groups" />
      </router-link>
      <span class="relative inline-lock my-auto">
        <router-link to="/notifications" class="rounded-full p-3">
          <Icon component="notifications" />
          <span
            v-if="notifications.hasUnreadNotifications"
            class="absolute top-0 right-3 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
          ></span>
        </router-link>
      </span>

      <router-link to="/settings" class="rounded-full p-3">
        <Icon component="settings" />
      </router-link>
    </nav>
  </div>
</template>
