<script setup lang="ts">
  import { useUserStore } from "../stores/user";
  import Button from "../components/Button/Button.vue";
  import { ButtonColor, Role, RoleName } from "../utils";
  import { useSettingStore } from "../stores/settings";
  import { useActivityStore } from "../stores/activity";
  import Loading from "../components/Loading/Loading.vue";

  const user = useUserStore();
  const settings = useSettingStore();
  settings.setHeader("Settings");

  if (!user.isTrainer) {
    const activity = useActivityStore();
    const trainerId = activity.plan?.trainerId;
    user.getTrainerInfo(trainerId);
  }
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
          {{ RoleName[user.role as Role] }}
        </span>
      </h1>
      <h1
        class="text-2xl flex justify-between shadow p-5 rounded-xl mb-3"
        v-if="!user.isTrainer"
      >
        Trainer:
        <span class="font-bold" v-if="user.getTrainer">
          {{ user.getTrainer }}
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
      @click="() => user.logout()"
    />
  </div>
</template>
