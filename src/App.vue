<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import { useActivityStore } from "./stores/activity";
const store = useActivityStore();
store.restoreSession();
</script>

<template>
  <div class="mx-auto bg-gray-50">
    <div class="flex flex-col h-screen">
      <Header></Header>
      <div class="p-5 w-full sm:w-4/5 md:w-2/3 mx-auto">
        <router-view></router-view>
      </div>
      <!-- <Footer></Footer> -->
    </div>
  </div>
</template>
