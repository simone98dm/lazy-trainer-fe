<script setup lang="ts">
  import { useSettingStore } from "~/stores";

  const settingsStore = useSettingStore();

  if (settingsStore.darkMode) {
    const theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    settingsStore.toggleDarkMode(theme);
  }

  onMounted(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
</script>

<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900 bg-gray-100">
    <PageHeader />
    <main
      class="flex-grow p-4 w-full lg:w-2/3 md:w-5/6 mx-auto dark:text-slate-200 text-slate-600 content"
    >
      <slot />
    </main>
    <PageFooter />
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

  .content {
    margin-bottom: 5rem;
  }
</style>
