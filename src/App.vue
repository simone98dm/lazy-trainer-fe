<script setup lang="ts">
  import { useRoute } from "vue-router";
  const route = useRoute();

  function isLogin() {
    return route.name === "login";
  }

  function hideDecoration() {
    return route.meta.empty;
  }
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
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
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
