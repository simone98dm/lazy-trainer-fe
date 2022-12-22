<script lang="ts" setup>
  import { ref } from "vue";

  let isOnline = ref(true);

  let dismissBanner = ref(false);
</script>

<template>
  <Banner
    v-if="!isOnline && !dismissBanner"
    text="You are currently offline"
    @close="dismissBanner = true"
  />
</template>
