<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
</script>

<template>
  <div class="mx-auto">
    <div class="h-screen bg-gray-50">
      <Header></Header>
      <div class="h-full">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
