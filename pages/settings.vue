<script setup lang="ts">
  import { useActivityStore, useSettingStore, useUserStore } from "~/stores";
  import { version } from "~/package.json";

  const activityStore = useActivityStore();
  const settingsStore = useSettingStore();
  const userStore = useUserStore();

  if (!userStore.isTrainer) {
    const trainerId = activityStore.plan?.trainerId;
    await userStore.getTrainerInfo(trainerId);
  }

  async function logout() {
    await userStore.logout();
  }

  function toggleAudio(v: boolean) {
    settingsStore.toggleAudioEffects(v);
  }

  function toggleEasyMode(v: boolean) {
    settingsStore.toggleEasyMode(v);
  }

  function toggleDarkMode() {
    settingsStore.toggleDarkMode();
  }
</script>

<template>
  <Card>
    <div class="m-0 sm:m-6">
      <h1 class="text-xl font-bold mb-3">Profile</h1>
      <div class="w-full pt-3 px-3">
        <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted text-lg">
          Username
          <span class="font-bold">
            {{ userStore.username }}
          </span>
        </div>
        <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted text-lg">
          Role
          <span class="font-bold">
            {{ userStore.humanizeRole }}
          </span>
        </div>
        <div
          class="flex justify-between pb-1 mb-6 border-b-2 border-dotted text-lg"
          v-if="!userStore.isTrainer && !userStore.isSelfMadeMan"
        >
          Trainer
          <span class="font-bold" v-if="userStore.trainer">
            {{ userStore.trainer?.name }}
          </span>
          <Loading v-else :small="true" :color="userStore.isTrainer ? 'purple' : 'primary'" />
        </div>
      </div>
    </div>
    <div class="m-0 sm:m-6">
      <h1 class="text-xl font-bold mb-3">Preferences</h1>
      <div class="w-full pt-3 px-3">
        <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted text-lg">
          Disable audio
          <Switch
            id="disableAudio"
            name="toggleDisableAudio"
            :checked="settingsStore.isAudioDisabled"
            @toggle="toggleAudio"
          />
        </div>

        <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted text-lg">
          Easy mode
          <Switch
            id="easyMode"
            name="toggleEasyMode"
            :checked="settingsStore.isEasyModeEnabled"
            @toggle="toggleEasyMode"
          />
        </div>

        <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted text-lg">
          Dark Mode (Beta)
          <Switch
            id="darkMode"
            name="toggleDarkMode"
            :checked="settingsStore.isDarkModeEnabled"
            @toggle="toggleDarkMode"
          />
        </div>

        <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted text-lg">
          App version
          <span class="font-bold">
            {{ version }}
          </span>
        </div>
      </div>
    </div>
    <div class="m-0 sm:m-6">
      <div class="flex justify-around">
        <ButtonLink
          :to="{ name: 'about' }"
          :full="true"
          color="trasparent"
          icon="account_circle"
          label="Author"
        />
        <ButtonLink
          :to="{ name: 'license' }"
          :full="true"
          color="trasparent"
          icon="verified_user"
          label="License"
        />
      </div>
    </div>
  </Card>
  <div class="w-full flex justify-center mb-3">
    <BaseButton
      :color="userStore.isTrainer ? 'purple' : 'primary'"
      :full="true"
      icon="logout"
      label="Logout"
      @click="logout"
    />
  </div>
</template>
