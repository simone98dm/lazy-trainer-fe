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

  async function logout() {
    logEvent(getAnalytics(), GaCustomEvents.LOGOUT, {
      userId: userStore.userId,
    });
    await userStore.logout();
  }

  function toggleAudio(v: boolean) {
    settingsStore.toggleAudioEffects(v);
  }

  function toggleEasyMode(v: boolean) {
    settingsStore.toggleEasyMode(v);
  }
</script>

<template>
  <div class="flex flex-col justify-center max-w-screen-xl mx-auto">
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
              {{ RoleName[userStore.role as Role] }}
            </span>
          </div>
          <div
            class="flex justify-between pb-1 mb-6 border-b-2 border-dotted text-lg"
            v-if="!userStore.isTrainer && !userStore.isSelfMadeMan"
          >
            Trainer
            <span class="font-bold" v-if="userStore.getTrainer">
              {{ userStore.getTrainer.name }}
            </span>
            <Loading
              v-else
              :small="true"
              :color="userStore.isTrainer ? ButtonColor.PURPLE : ButtonColor.PRIMARY"
            ></Loading>
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
            App version
            <span class="font-bold">
              {{ version }}
            </span>
          </div>
        </div>
      </div>
      <div class="m-0 sm:m-6">
        <div class="flex justify-around">
          <Link
            @click="
              logEvent(getAnalytics(), GaCustomEvents.CLICK, {
                to: 'author',
                userId: userStore.userId,
              })
            "
            :to="{ name: 'about' }"
            :full="true"
            :color="ButtonColor.TRASPARENT"
            icon="account_circle"
            label="Author"
          />
          <Link
            @click="
              logEvent(getAnalytics(), GaCustomEvents.CLICK, {
                to: 'licence',
                userId: userStore.userId,
              })
            "
            :to="{ name: 'license' }"
            :full="true"
            :color="ButtonColor.TRASPARENT"
            icon="verified_user"
            label="License"
          />
        </div>
      </div>
    </Card>
    <div class="w-full flex justify-center mb-3">
      <Button
        v-if="!userStore.isTrainer"
        :color="ButtonColor.LIGHT"
        :loading="syncStatus"
        :full="true"
        icon="cloud_sync"
        label="Sync data"
        @click="syncProfile"
      />
    </div>
    <div class="w-full flex justify-center mb-3">
      <Button
        :color="userStore.isTrainer ? ButtonColor.PURPLE : ButtonColor.PRIMARY"
        :full="true"
        icon="logout"
        label="Logout"
        @click="logout"
      />
    </div>
  </div>
</template>
