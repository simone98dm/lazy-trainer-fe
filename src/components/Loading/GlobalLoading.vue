<script setup lang="ts">
  import { useSettingStore } from "../../stores/settings";
  import Loading from "./Loading.vue";

  const settings = useSettingStore();
</script>
<template>
  <div
    class="absolute z-50 top-0 left-0 flex w-full min-h-screen justify-center items-center opacity-50 bg-gray-900 duration-700"
    v-if="settings.isGlobalLoading"
  >
    <Loading></Loading>
  </div>
</template>
