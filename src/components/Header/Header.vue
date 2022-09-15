<script setup lang="ts">
import MenuIcon from "../Icons/MenuIcon.vue";
import ShareIcon from "../Icons/ShareIcon.vue";
import Icon from "../Icons/Icon.vue";
import { IconSize } from "../../utils/enum";
</script>

<template>
  <div class="w-full rounded-b-xl bg-indigo-600 p-5 text-white">
    <div class="flex items-center justify-between">
      <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
      >
        <Icon :component="ShareIcon" :size="IconSize.SMALL"></Icon>
      </div>
      <a href="/">
        <h1 class="text-center text-3xl font-semibold">Trainer</h1>
      </a>
      <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
      >
        <Icon :component="MenuIcon" :size="IconSize.SMALL"></Icon>
      </div>
    </div>
  </div>
</template>
