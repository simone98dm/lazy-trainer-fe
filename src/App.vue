<script setup lang="ts">
  import { useRoute } from "vue-router";
  import { useSettingStore } from "./store";
  const r = useRoute();

  function isLogin() {
    return r.name === "login";
  }

  function hideDecoration() {
    return r.meta.empty;
  }

  const settingsStore = useSettingStore();
  if (settingsStore.darkMode) {
    const theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    settingsStore.toggleDarkMode(theme);
  }
</script>

<template>
  <div class="min-h-screen dark:bg-gray-900 bg-gray-50 flex flex-col">
    <Header v-if="!hideDecoration()" />
    <div class="p-4 w-full lg:w-2/3 md:w-5/6 mx-auto mb-14">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <div :key="(route.name as string)">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
    <!-- <CookieBanner /> -->
    <Footer v-if="!isLogin() && !hideDecoration()" />
  </div>
  <GlobalLoading />
  <Compatibility />
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
