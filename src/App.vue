<script setup lang="ts">
  import Header from "./components/Header/Header.vue";
  import Footer from "./components/Footer/Footer.vue";
  import { useRoute } from "vue-router";
  import GlobalLoading from "./components/GlobalLoading/GlobalLoading.vue";
  const route = useRoute();
  function isLogin() {
    return route.name === "login";
  }
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header></Header>
    <div class="p-5 w-full lg:w-2/3 md:w-5/6 mx-auto mb-14">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <div :key="(route.name as string)">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
    <Footer v-if="!isLogin()"></Footer>
  </div>
  <GlobalLoading></GlobalLoading>
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
