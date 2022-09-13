<script setup lang="ts">
import MenuIcon from "../Icon/MenuIcon.vue";
import ShareIcon from "../Icon/ShareIcon.vue";
</script>

<template>
  <div class="fixed left-0 top-0 w-full rounded-b-xl bg-indigo-600 p-5 text-white">
    <div class="flex items-center justify-between">
      <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
      >
        <menu-icon></menu-icon>
      </div>
      <h1 class="text-center text-3xl font-semibold">
        Trainer
      </h1>
      <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
      >
        <share-icon></share-icon>
      </div>
    </div>
  </div>
</template>
