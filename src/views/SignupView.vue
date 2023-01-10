<script lang="ts" setup>
  import { useRoute, useRouter } from "vue-router";
  import trainer from "~/assets/trainer.jpg";
  import { verifyRegistrationToken } from "~/helpers/http";
  import { useSettingStore } from "~/store";
  const route = useRoute();
  const router = useRouter();
  const settingsStore = useSettingStore();
  const { token } = route.query;
  if (!token) {
    router.back();
  }
  settingsStore.loading(true);
  verifyRegistrationToken(token)
    .then((result: { ok: boolean }) => {
      if (result.ok) {
        settingsStore.loading(false);
      } else {
        throw new Error("Token not valid");
      }
    })
    .catch((err: any) => {
      router.back();
    });
</script>

<template>
  <div class="py-6">
    <div
      class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto lg:max-w-screen-xl h-[500px] lg:h-[700px]"
    >
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
      </div>
      <div
        class="hidden lg:block lg:w-1/2 bg-cover"
        :style="{ backgroundImage: `url(${trainer})`, backgroundPosition: 'center' }"
      ></div>
    </div>
  </div>
</template>
