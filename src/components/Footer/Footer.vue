<script setup lang="ts">
  import HouseIcon from "~/components/Icons/HouseIcon.vue";
  import GroupIcon from "~/components/Icons/GroupIcon.vue";
  import SettingIcon from "~/components/Icons/SettingIcon.vue";
  import Icon from "~/components/Icons/Icon.vue";
  import { IconSize } from "~/utils";
  import { useUserStore } from "~/stores/user";

  const user = useUserStore();
</script>

<template>
  <div
    class="fixed left-0 bottom-0 w-full rounded-t-xl bg-white px-5 py-2 shadow-sm shadow-gray-300"
  >
    <nav class="flex justify-around text-gray-900">
      <router-link to="/" class="py-3 rounded-full p-3">
        <Icon :component="HouseIcon" :size="IconSize.MEDIUM"></Icon>
      </router-link>
      <!-- <router-link
        to="/trainer"
        class="py-3 rounded-full p-3"
        v-if="user.isTrainer"
      >
        <Icon :component="TrainerIcon" :size="IconSize.MEDIUM"></Icon>
      </router-link> -->
      <router-link
        to="/group"
        class="py-3 rounded-full p-3"
        v-if="user.isTrainer"
      >
        <Icon :component="GroupIcon" :size="IconSize.MEDIUM"></Icon>
      </router-link>
      <router-link to="/settings" class="py-3 rounded-full p-3">
        <Icon :component="SettingIcon" :size="IconSize.MEDIUM"></Icon>
      </router-link>
    </nav>
  </div>
</template>
