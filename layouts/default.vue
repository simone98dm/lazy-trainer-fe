<script setup lang="ts">
  import { useSettingStore } from "~/stores";

  const route = useRoute();
  const settingsStore = useSettingStore();
  const isLogin = computed(() => route.name === "login");
  const hideDecoration = computed(() => route.meta.empty);

  if (settingsStore.darkMode) {
    const theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    settingsStore.toggleDarkMode(theme);
  }
</script>

<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900 bg-gray-100">
    <Header v-if="!hideDecoration" />
    <main class="flex-grow p-4 w-full lg:w-2/3 md:w-5/6 mx-auto mt-16 mb-16">
      <slot />
    </main>
    <Footer v-if="!isLogin && !hideDecoration" />
  </div>
  <GlobalLoading />
</template>

<style>
  html.dark {
    color-scheme: dark;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
