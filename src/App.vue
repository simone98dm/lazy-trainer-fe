<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
</script>

<template>
  <div class="mx-auto bg-gray-50">
    <div class="flex flex-col h-screen">
      <Header></Header>
      <div class="mb-auto">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
