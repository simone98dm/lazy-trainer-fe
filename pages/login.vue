<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useUserStore } from "~/stores";
  import workout from "~/assets/workout-1.jpg";

  const userStore = useUserStore();
  const router = useRouter();

  const username = ref("");
  const dirtyUsername = ref(false);
  const usernameError = computed(() =>
    username.value === "" && dirtyUsername.value ? "Username not valid" : ""
  );
  function updateUsername(u: string) {
    username.value = u;
    dirtyUsername.value = true;
  }

  const password = ref("");
  const dirtyPassword = ref(false);
  const passwordError = computed(() =>
    password.value === "" && dirtyPassword.value ? "Password not valid" : ""
  );
  function updatePassword(u: string) {
    password.value = u;
    dirtyPassword.value = true;
  }

  const errorMessage = ref("");
  const isLoading = ref(false);

  async function login() {
    isLoading.value = true;

    const { error } = await userStore.signIn(username.value, password.value);

    isLoading.value = false;

    if (error) {
      errorMessage.value = error;
      return;
    }

    router.push({
      name: "home",
    });
  }

  watch([username, password], () => {
    if (username.value && password.value) {
      errorMessage.value = "";
    }
  });
</script>

<template>
  <div class="bg-white dark:bg-gray-900 rounded-xl">
    <div class="flex justify-center sc">
      <div
        class="hidden bg-cover lg:block lg:w-2/3"
        :style="{
          backgroundImage: `url(${workout})`,
        }"
      >
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <div>
            <h2 class="text-4xl font-bold text-white">Lazy Trainer</h2>

            <p class="max-w-xl mt-3 text-gray-300">
              The web app that simplifies the approach to physical activity for those who are
              particularly lazy
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="text-center">
            <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">
              Lazy Trainer
            </h2>

            <p class="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
          </div>

          <div class="mt-8">
            <div class="mt-6">
              <Input
                name="usernameField"
                id="username"
                label="Username"
                :value="username"
                :disabled="false"
                :error="usernameError"
                @change="updateUsername"
                @keyup.enter="login"
              />
            </div>

            <div class="mt-6">
              <Input
                name="passwordField"
                id="password"
                label="Password"
                type="password"
                :value="password"
                :disabled="false"
                :error="passwordError"
                @change="updatePassword"
                @keyup.enter="login"
              />
            </div>

            <div class="mt-6">
              <BaseButton
                :loading="isLoading"
                color="primary"
                :disabled="isLoading"
                label="Login"
                icon="login"
                :full="true"
                @click="login"
              />
            </div>
            <div class="text-center mt-4">
              <span v-if="errorMessage" class="font-bold text-red-500">{{ errorMessage }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  body {
    overflow-y: hidden;
  }
  .sc {
    height: calc(100vh - 2rem) !important;
  }
</style>
