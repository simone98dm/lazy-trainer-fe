<script setup lang="ts">
  import { ButtonColor, GaCustomEvents, Role, RoleName } from "~/utils";
  import { useActivityStore, useSettingStore, useUserStore } from "~/stores";
  import { ref } from "vue";
  import { version } from "../../package.json";
  import { getAnalytics, logEvent } from "@firebase/analytics";

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
    logEvent(getAnalytics(), GaCustomEvents.PROFILE_SYNC);
    activityStore.sync().finally(() => {
      syncStatus.value = false;
    });
  }

  function logout() {
    logEvent(getAnalytics(), GaCustomEvents.LOGOUT, {
      id: userStore.userId,
    });
    userStore.logout();
  }

  function toggleAudio(v: boolean) {
    logEvent(getAnalytics(), GaCustomEvents.UPDATE_SETTINGS, {
      settings_name: "audio",
    });
    settingsStore.toggleAudioEffects(v);
  }

  function toggleEasyMode(v: boolean) {
    logEvent(getAnalytics(), GaCustomEvents.UPDATE_SETTINGS, {
      settings_name: "easymode",
    });
    settingsStore.toggleAudioEffects(v);
  }
</script>

<template>
  <div class="flex flex-col justify-center max-w-screen-lg mx-auto">
    <div class="shadow p-5 rounded-xl mb-6 bg-white">
      <div class="m-6">
        <h1 class="text-xl font-bold mb-3">Profile</h1>
        <div class="w-full pt-3 px-3">
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
      </div>
      <div class="m-6">
        <h1 class="text-xl font-bold mb-3">Preferences</h1>
        <div class="w-full pt-3 px-3">
          <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted">
            Disable audio
            <Switch
              id="disableAudio"
              name="toggleDisableAudio"
              :checked="settingsStore.isAudioDisabled"
              @toggle="toggleAudio"
            />
          </div>

          <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted">
            Easy mode
            <Switch
              id="easyMode"
              name="toggleEasyMode"
              :checked="settingsStore.isEasyModeEnabled"
              @toggle="toggleEasyMode"
            />
          </div>

          <div class="flex justify-between pb-1 mb-6 border-b-2 border-dotted">
            App version
            <span class="font-bold">
              {{ version }}
            </span>
          </div>

          <div class="flex justify-around">
            <Link
              @click="
                logEvent(getAnalytics(), GaCustomEvents.CLICK, { to: 'author' })
              "
              :to="{ name: 'about' }"
              :full="true"
              :color="ButtonColor.LIGHT"
              icon="account_circle"
              label="Author"
            />
            <Link
              @click="
                logEvent(getAnalytics(), GaCustomEvents.CLICK, {
                  to: 'licence',
                })
              "
              :to="{ name: 'license' }"
              :full="true"
              :color="ButtonColor.LIGHT"
              icon="verified_user"
              label="License"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center mb-3">
      <Button
        v-if="!userStore.isTrainer"
        :color="ButtonColor.LIGHT"
        :loading="syncStatus"
        full="true"
        icon="cloud_sync"
        label="Sync data"
        @click="syncProfile"
      />
    </div>
    <div class="w-full flex justify-center mb-3">
      <Button
        :color="ButtonColor.PRIMARY"
        full="true"
        icon="logout"
        label="Logout"
        @click="logout"
      />
    </div>
  </div>
</template>
