<script setup lang="ts">
  import Header from "./components/Header/Header.vue";
  import Footer from "./components/Footer/Footer.vue";
  import { useRoute } from "vue-router";
  const route = useRoute();
  function isLogin() {
    return route.name === "login";
  }
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header></Header>
    <div class="p-5 w-full sm:w-4/5 md:w-2/3 mx-auto mb-14">
      <router-view></router-view>
    </div>
    <Footer v-if="!isLogin()"></Footer>
  </div>
</template>
