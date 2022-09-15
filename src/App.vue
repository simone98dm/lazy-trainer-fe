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
      <div class="flex-1 overflow-y-auto p-5">
        <router-view></router-view>
      </div>
      <!-- <Footer></Footer> -->
    </div>
  </div>
</template>
