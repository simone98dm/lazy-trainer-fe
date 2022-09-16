<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
import { useActivityStore } from "./stores/activity";
const store = useActivityStore();
store.restoreSession();
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header></Header>
    <div class="p-5 w-full sm:w-4/5 md:w-2/3 mx-auto">
      <router-view></router-view>
    </div>
    <!-- <Footer></Footer> -->
  </div>
</template>
