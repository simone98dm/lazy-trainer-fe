<script lang="ts" setup>
  import { ref } from "vue";
  const isOnline = ref(true);
  const dismissBanner = ref(false);
</script>

<template>
  <BaseBanner
    v-if="!isOnline && !dismissBanner"
    text="You are currently offline"
    @close="dismissBanner = true"
  />
</template>
