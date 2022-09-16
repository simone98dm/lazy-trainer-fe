<script setup lang="ts">
import MenuIcon from "@/components/Icons/MenuIcon.vue";
import ShareIcon from "@/components/Icons/ShareIcon.vue";
import Icon from "@/components/Icons/Icon.vue";
import {IconSize} from "../../utils";

function resetAll() {
  localStorage.clear();
  location.href = "/"
}
</script>

<template>
  <div class="w-full rounded-b-xl bg-indigo-600 p-5 text-white">
    <div class="flex items-center justify-between">
      <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
      >
        <Icon :component="ShareIcon" :size="IconSize.SMALL"></Icon>
      </div>
      <router-link to="/">
        <h1 class="text-center text-3xl font-semibold">Trainer</h1>
      </router-link>
      <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
        @click="resetAll"
      >
        <Icon :component="MenuIcon" :size="IconSize.SMALL"></Icon>
      </div>
    </div>
  </div>
</template>
