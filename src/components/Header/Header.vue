<script setup lang="ts">
  import MenuIcon from "@/components/Icons/MenuIcon.vue";
  import Icon from "@/components/Icons/Icon.vue";
  import { IconSize } from "../../utils";
  import HomeIcon from "../Icons/HomeIcon.vue";
  import { useSettingStore } from "../../stores/settings";
  import { useUserStore } from "../../stores/user";

  const settings = useSettingStore();
  const user = useUserStore();
</script>

<template>
  <div
    :class="[
      'w-full rounded-b-xl p-5 text-white',
      { 'bg-indigo-600': !user.isTrainer },
      { 'bg-orange-600': user.isTrainer },
    ]"
  >
    <!-- <div :class="['flex items-center justify-between']"> -->
    <div>
      <!-- <router-link to="/">
        <div
          class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
        >
          <Icon :component="HomeIcon" :size="IconSize.SMALL"></Icon>
        </div>
      </router-link> -->
      <div class="text-center">
        <h3 class="text-3xl font-semibold">
          {{ settings.getHeaderText }}
        </h3>
      </div>
      <!-- <div
        class="rounded-lg bg-indigo-50/30 p-3 hover:bg-white hover:text-indigo-500"
        @click="() => user.logout()"
      >
        <Icon :component="MenuIcon" :size="IconSize.SMALL"></Icon>
      </div> -->
    </div>
  </div>
</template>
