<script setup lang="ts">
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
      <router-link to="/" class="rounded-full p-3">
        <Icon component="house" />
      </router-link>
      <router-link v-if="user.isTrainer" to="/group" class="rounded-full p-3">
        <Icon component="groups" />
      </router-link>
      <router-link to="/settings" class="rounded-full p-3">
        <Icon component="settings" />
      </router-link>
    </nav>
  </div>
</template>
