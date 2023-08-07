<script setup lang="ts">
  import { getAnalytics, logEvent } from "@firebase/analytics";
  import { ref, watch } from "vue";
  import { useUserStore, useSettingStore } from "~/stores";
  import { GaCustomEvents } from "~/utils";
  import workout from "~/assets/workout-1.jpg";

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
    router.push({ path: "/" });
  }

  if (!userStore.isLogged) {
    settingsStore.loading(true);
    userStore.verifyStorage().then(() => {
      settingsStore.loading(false);
      if (userStore.isLogged) {
        router.push({ path: "/" });
      }
    });
  }

  async function submit() {
    isLoading.value = true;
    const { id, err } = await userStore.signIn(username.value, password.value);
    isLoading.value = false;

    if (id) {
      logEvent(getAnalytics(), GaCustomEvents.LOGIN, {
        userId: id,
      });
      router.push({
        path: "/",
      });
      return;
    }

    if (err) {
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
  <div class="py-6">
    <div
      class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto lg:max-w-screen-xl h-[500px] lg:h-[700px]"
    >
      <div
        class="hidden lg:block lg:w-1/2 bg-cover"
        :style="{ backgroundImage: `url(${workout})`, backgroundPosition: 'center' }"
      ></div>
      <div class="w-full p-8 lg:w-1/2">
        <h2 class="text-2xl font-semibold text-gray-700 text-center">Welcome back!</h2>
        <div class="mt-8">
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
        <div class="mt-4">
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
        <div class="mt-4">
          <div class="text-center mb-6">
            <span v-if="error" class="font-bold text-red-500">{{ error }}</span>
          </div>
        </div>
        <div class="mt-8">
          <BaseButton
            :loading="isLoading"
            color="primary"
            :disabled="isLoading"
            label="Login"
            icon="login"
            :full="true"
            @click="submit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
