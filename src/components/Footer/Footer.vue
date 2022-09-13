<script setup lang="ts">
import HouseIcon from "../Icon/HouseIcon.vue";
import AnalyticsIcon from "../Icon/AnalyticsIcon.vue";
import SettingIcon from "../Icon/SettingIcon.vue";
import ZapIcon from "../Icon/ZapIcon.vue";
const name = "Footer";
</script>

<template>
  <div
    class="sticky bottom-0 w-full rounded-t-xl bg-white px-5 py-2 shadow-sm shadow-gray-300"
  >
    <nav class="flex justify-around text-gray-900">
      <router-link to="/" class="py-3 rounded-full p-3">
        <house-icon></house-icon>
      </router-link>
      <!-- <router-link to="/analytics" class="py-3 rounded-full p-3">
        <analytics-icon></analytics-icon>
      </router-link>
      <router-link to="/zap" class="py-3 rounded-full p-3">
        <zap-icon></zap-icon>
      </router-link> -->
      <router-link to="/setting" class="py-3 rounded-full p-3">
        <setting-icon></setting-icon>
      </router-link>
    </nav>
  </div>
</template>
