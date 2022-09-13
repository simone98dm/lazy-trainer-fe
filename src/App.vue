<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
</script>

<template>
  <div class="mx-auto">
    <div class="h-full bg-gray-50">
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>
</template>
