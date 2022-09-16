<script setup lang="ts">
import MenuIcon from "@/components/Icons/MenuIcon.vue";
import Icon from "@/components/Icons/Icon.vue";
import { IconSize } from "../../utils";
import HomeIcon from "../Icons/HomeIcon.vue";
import Link from "../Link/Link.vue";

function resetAll() {
  localStorage.clear();
  location.href = "/";
}
</script>

<template>
  <div class="w-full rounded-b-xl bg-indigo-600 p-5 text-white">
    <div class="flex items-center justify-between">
      <router-link to="/">
        <div
          class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
        >
          <Icon :component="HomeIcon" :size="IconSize.SMALL"></Icon>
        </div>
      </router-link>
      <h1 class="text-center text-3xl font-semibold">Trainer</h1>
      <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
        @click="resetAll"
      >
        <Icon :component="MenuIcon" :size="IconSize.SMALL"></Icon>
      </div>
    </div>
  </div>
</template>
