<script setup lang="ts">
  import { ButtonColor, Role, RoleName } from "~/utils";
  import { useActivityStore, useSettingStore, useUserStore } from "~/stores";
  import { ref } from "vue";

  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  settingsStore.setHeader("Settings");

  const syncStatus = ref(false);

  if (!userStore.isTrainer) {
    const trainerId = activityStore.plan?.trainerId;
    userStore.getTrainerInfo(trainerId);
  }

  function syncProfile() {
    syncStatus.value = true;
    activityStore.sync().finally(() => {
      syncStatus.value = false;
    });
  }
</script>

<template>
  <div class="flex flex-col justify-center max-w-screen-lg mx-auto">
    <div class="shadow p-5 rounded-xl mb-6 bg-white">
      <h1 class="text-xl font-bold mb-3">Profile</h1>
      <div class="w-full p-3">
        <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted">
          Username
          <span class="font-bold">
            {{ userStore.username }}
          </span>
        </div>
        <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted">
          Role
          <span class="font-bold">
            {{ RoleName[userStore.role as Role] }}
          </span>
        </div>
        <div
          class="flex justify-between pb-1 mb-6 border-b-2 border-dotted"
          v-if="!userStore.isTrainer && !userStore.isSelfMadeMan"
        >
          Trainer
          <span class="font-bold" v-if="userStore.getTrainer">
            {{ userStore.getTrainer.name }}
          </span>
          <Loading v-else :small="true"></Loading>
        </div>
      </div>
      <h1 class="text-xl font-bold mb-3">Preferences</h1>
      <div class="w-full p-3">
        <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted">
          Disable audio
          <Switch
            id="disableAudio"
            name="toggleDisableAudio"
            :checked="settingsStore.isAudioDisabled"
            @toggle="(v) => settingsStore.disableAudio(v)"
          />
        </div>
      </div>
      <Button
        v-if="!userStore.isTrainer"
        :color="ButtonColor.PRIMARY"
        :loading="syncStatus"
        full="true"
        icon="cloud_sync"
        label="Sync data"
        @click="syncProfile"
      />
    </div>
    <div class="mb-6 flex justify-around gap-4">
      <Link
        :to="{ name: 'about' }"
        :full="true"
        :color="ButtonColor.LIGHT"
        icon="account_circle"
        label="Author"
      >
      </Link>
      <Link
        :to="{ name: 'license' }"
        :full="true"
        :color="ButtonColor.LIGHT"
        icon="verified_user"
        label="License"
      >
      </Link>
    </div>
    <div class="w-full flex justify-center">
      <Button
        :color="ButtonColor.PRIMARY"
        full="true"
        icon="logout"
        label="Logout"
        @click="() => userStore.logout()"
      />
    </div>
  </div>
</template>
