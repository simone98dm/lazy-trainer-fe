<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useUserStore, useSettingStore } from "~/stores";
  import { ButtonColor } from "~/utils";

  const route = useRoute();

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
        router.push({ name: "home" });
      }
    });
  }

  async function submit() {
    isLoading.value = true;
    const response = await userStore.signIn(username.value, password.value);
    isLoading.value = false;

    if (!response) {
      router.push({
        name: "home",
      });
    } else {
      error.value = response;
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
    <form
      class="bg-white rounded-lg shadow-md p-6 w-full max-w-screen-lg"
      @submit.prevent
    >
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
          full="true"
          @click="submit"
        />
      </div>
    </form>
  </div>
</template>
