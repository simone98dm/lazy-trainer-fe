<script setup lang="ts">
  import { useUserStore } from "../stores/user";
  import Button from "../components/Button/Button.vue";
  import { ButtonColor } from "../utils";
  import { useSettingStore } from "../stores/settings";

  const user = useUserStore();
  const settings = useSettingStore();
  settings.setHeader("Settings");
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="w-full mb-6">
      <h1 class="text-2xl flex justify-between shadow p-5 rounded-xl mb-3">
        Username:
        <span class="font-bold">
          {{ user.username }}
        </span>
      </h1>
      <h1 class="text-2xl flex justify-between shadow p-5 rounded-xl mb-3">
        Role:
        <span class="font-bold">
          {{ user.role === 1 ? "Trainer" : "Normal" }}
        </span>
      </h1>
    </div>
    <Button
      :color="ButtonColor.PRIMARY"
      full="false"
      label="Logout"
      @click="() => user.logout()"
    />
  </div>
</template>
