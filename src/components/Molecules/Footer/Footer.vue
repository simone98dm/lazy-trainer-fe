<script setup lang="ts">
  import { useUserStore } from "~/store";
  import { useRoute } from "vue-router";
  const route = useRoute();
  const { isTrainer } = useUserStore();
  const planId = route.query.planId as string;
</script>

<template>
  <Offline />
  <div
    class="fixed left-0 bottom-0 w-full rounded-t-xl dark:bg-slate-800 dark:text-slate-100 text-gray-900 bg-white px-5 py-2 shadow-sm shadow-gray-300"
  >
    <nav class="flex justify-around">
      <router-link :to="{ name: 'home', params: { planId } }" class="rounded-full p-4">
        <div class="flex justify-center items-center">
          <Icon component="house" />
        </div>
      </router-link>
      <!-- <router-link to="/dashboard" class="rounded-full p-4">
        <div class="flex justify-center items-center">
          <Icon component="dashboard" />
        </div>
      </router-link> -->
      <router-link v-if="isTrainer" to="/group" class="rounded-full p-4">
        <div class="flex justify-center items-center">
          <Icon component="groups" />
        </div>
      </router-link>
      <router-link to="/settings" class="rounded-full p-4">
        <div class="flex justify-center items-center">
          <Icon component="settings" />
        </div>
      </router-link>
    </nav>
  </div>
</template>
