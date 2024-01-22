<script setup lang="ts">
  const route = useRoute();
  const plan = route.query.planId as string;
</script>

<template>
  <Offline />
  <div
    class="fixed bottom-0 w-full rounded-t-xl dark:bg-slate-800 dark:text-slate-100 text-gray-900 bg-white px-5 py-2 shadow-sm shadow-gray-300"
  >
    <nav class="flex justify-around">
      <RouterLink :to="{ name: 'home', params: { plan } }" class="rounded-full p-4">
        <div class="flex justify-center items-center">
          <MaterialIcon component="house" />
        </div>
      </RouterLink>
      <!-- <RouterLink to="/dashboard" class="rounded-full p-4">
        <div class="flex justify-center items-center">
          <MaterialIcon component="dashboard" />
        </div>
      </RouterLink> -->
      <!-- <RouterLink v-if="isTrainer" to="/group" class="rounded-full p-4">
        <div class="flex justify-center items-center">
          <MaterialIcon component="groups" />
        </div>
      </RouterLink> -->
      <RouterLink to="/settings" class="rounded-full p-4">
        <div class="flex justify-center items-center">
          <MaterialIcon component="settings" />
        </div>
      </RouterLink>
    </nav>
  </div>
</template>
