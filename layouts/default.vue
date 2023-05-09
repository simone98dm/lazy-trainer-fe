<script setup lang="ts">
  import Header from "~~/components/Molecules/Header/Header.vue";
  import Footer from "~~/components/Molecules/Footer/Footer.vue";
  import GlobalLoading from "~~/components/Organisms/GlobalLoading/GlobalLoading.vue";
  import { useSettingStore } from "~~/stores";
  const r = useRoute();

  const isLogin = computed(() => {
    return r.name === "login";
  });

  const hideDecoration = computed(() => {
    return r.meta.empty;
  });

  const settingsStore = useSettingStore();
  if (settingsStore.darkMode) {
    const theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    settingsStore.toggleDarkMode(theme);
  }
</script>

<template>
  <div class="min-h-screen dark:bg-gray-900 bg-gray-50 flex flex-col">
    <Header v-if="!hideDecoration" />
    <main class="p-4 w-full lg:w-2/3 md:w-5/6 mx-auto mb-14">
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
