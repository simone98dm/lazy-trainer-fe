<script setup lang="ts">
  import Button from "../components/Button/Button.vue";
  import { ButtonColor, Role, RoleName } from "../utils";
  import Loading from "../components/Loading/Loading.vue";
  import { useActivityStore } from "~/stores/activity";
  import { useSettingStore } from "~/stores/settings";
  import { useUserStore } from "~/stores/user";

  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  settingsStore.setHeader("Settings");

  if (!userStore.isTrainer) {
    const trainerId = activityStore.plan?.trainerId;
    userStore.getTrainerInfo(trainerId);
  }
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="w-full mb-6">
      <h1 class="text-2xl flex justify-between shadow p-5 rounded-xl mb-3">
        Username:
        <span class="font-bold">
          {{ userStore.username }}
        </span>
      </h1>
      <h1 class="text-2xl flex justify-between shadow p-5 rounded-xl mb-3">
        Role:
        <span class="font-bold">
          {{ RoleName[userStore.role as Role] }}
        </span>
      </h1>
      <h1
        class="text-2xl flex justify-between shadow p-5 rounded-xl mb-3"
        v-if="!userStore.isTrainer"
      >
        Trainer:
        <span class="font-bold" v-if="userStore.getTrainer">
          {{ userStore.getTrainer }}
        </span>
        <div v-else>
          <Loading></Loading>
        </div>
      </h1>
    </div>
    <Button
      :color="ButtonColor.PRIMARY"
      full="false"
      label="Logout"
      @click="() => userStore.logout()"
    />
  </div>
</template>
