<script setup lang="ts">
  import { getAnalytics, logEvent } from "@firebase/analytics";
  import { inject, ref, watch } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore, useSettingStore } from "~/stores";
  import { ButtonColor, GaCustomEvents, logOptions } from "~/utils";

  const $log = inject("$logger") as logOptions;

  const username = ref("");
  const usernameError = ref(false);
  const password = ref("");
  const passwordError = ref(false);
  const error = ref("");
  const router = useRouter();
  const isLoading = ref(false);

  const userStore = useUserStore();
  const settingsStore = useSettingStore();

  if (userStore.isLogged) {
    router.push({ name: "home" });
  }

  if (!userStore.isLogged) {
    settingsStore.loading(true);
    userStore.verifyStorage().then(() => {
      settingsStore.loading(false);
      if (userStore.isLogged) {
        $log("User is logged with local token");
        router.push({ name: "home" });
      }
    });
  }

  async function submit() {
    isLoading.value = true;
    const { id, err } = await userStore.signIn(username.value, password.value);
    isLoading.value = false;

    if (id) {
      $log("Login success", "info");
      logEvent(getAnalytics(), GaCustomEvents.LOGIN, {
        userId: id,
      });
      router.push({
        name: "home",
      });
      return;
    }

    if (err) {
      $log("Login failed", "warn");
      logEvent(getAnalytics(), GaCustomEvents.LOGIN, {
        attempt: "failed",
        err,
      });
      error.value = err;
      return;
    }
  }

  watch([username, password], () => {
    if (username.value && password.value) {
      error.value = "";
    }
  });
</script>

<template>
  <div class="flex justify-center">
    <form class="bg-white rounded-lg shadow-md p-6 w-full max-w-screen-lg" @submit.prevent>
      <div class="text-center">
        <h1 class="mb-3 text-4xl font-bold">Login</h1>
      </div>
      <div class="flex flex-wrap mb-3">
        <Input
          error="'Username is required'"
          name="usernameField"
          id="username"
          :disabled="false"
          :has-error="usernameError"
          label="Username"
          @change="(v: string) => (username = v)"
          @keyup.enter="submit"
        />
      </div>
      <div class="flex flex-wrap mb-3">
        <Input
          error="'Password is required'"
          name="passwordField"
          id="password"
          type="password"
          :disabled="false"
          :has-error="passwordError"
          label="Password"
          @change="(v: string) => (password = v)"
          @keyup.enter="submit"
        />
      </div>
      <div class="text-center mb-6">
        <span v-if="error" class="font-bold text-red-500">{{ error }}</span>
      </div>
      <div class="flex justify-center">
        <Button
          :loading="isLoading"
          :color="ButtonColor.PRIMARY"
          :disabled="isLoading"
          label="Login"
          icon="login"
          :full="true"
          @click="submit"
        />
      </div>
    </form>
  </div>
</template>
