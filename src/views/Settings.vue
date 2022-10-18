<script setup lang="ts">
  import Button from "~/components/Button/Button.vue";
  import { ButtonColor, Role, RoleName } from "~/utils";
  import Loading from "~/components/Loading/Loading.vue";
  import { useActivityStore } from "~/stores/activity";
  import { useSettingStore } from "~/stores/settings";
  import { useUserStore } from "~/stores/user";
  import Switch from "~/components/Switch/Switch.vue";
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
    activityStore.sync().then(() => {
      syncStatus.value = false;
    });
  }
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="shadow p-5 rounded-xl mb-6 bg-white">
      <h1 class="text-4xl font-bold mb-3">Profile:</h1>
      <div class="w-full p-3">
        <div
          class="text-2xl flex justify-between pb-1 mb-6 border-b-2 border-dotted"
        >
          Username:
          <span class="font-bold">
            {{ userStore.username }}
          </span>
        </div>
        <div
          class="text-2xl flex justify-between pb-1 mb-6 border-b-2 border-dotted"
        >
          Role:
          <span class="font-bold">
            {{ RoleName[userStore.role as Role] }}
          </span>
        </div>
        <div
          class="text-2xl flex justify-between pb-1 mb-6 border-b-2 border-dotted"
          v-if="!userStore.isTrainer"
        >
          Trainer:
          <span class="font-bold" v-if="userStore.getTrainer">
            {{ userStore.getTrainer }}
          </span>
          <Loading v-else :small="true"></Loading>
        </div>
      </div>
    </div>
    <div class="shadow p-5 rounded-xl mb-6 bg-white">
      <h1 class="text-4xl font-bold mb-3">Settings:</h1>
      <div class="w-full p-3">
        <div
          class="text-2xl flex justify-between pb-1 mb-6 border-b-2 border-dotted"
        >
          Disable audio:
          <div>
            <Switch
              id="disableAudio"
              name="toggleDisableAudio"
              :checked="settingsStore.isAudioDisabled"
              @toggle="(v) => settingsStore.disableAudio(v)"
            />
          </div>
        </div>
      </div>
    </div>
    <Button
      v-if="!userStore.isTrainer"
      :color="ButtonColor.PRIMARY"
      :loading="syncStatus"
      full="false"
      icon="cloud_sync"
      label="Sync"
      @click="syncProfile"
    />
    <Button
      :color="ButtonColor.PRIMARY"
      full="false"
      icon="logout"
      label="Logout"
      @click="() => userStore.logout()"
    />
  </div>
</template>
