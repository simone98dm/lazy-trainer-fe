<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "../stores/user";
  import Button from "../components/Button/Button.vue";
  import { ButtonColor } from "../utils";

  const username = ref("");
  const password = ref("");
  const error = ref("");
  const userStore = useUserStore();
  const router = useRouter();
  const isLoading = ref(false);

  if (userStore.isLogged) {
    router.push({ name: "home" });
  }

  if (!userStore.isLogged) {
    userStore.verifyStorage().then(() => {
      if (userStore.isLogged) {
        router.push({ name: "home" });
      }
    });
  }

  function submit() {
    isLoading.value = true;
    userStore.signIn(username.value, password.value).then((response) => {
      isLoading.value = false;
      if (!response) {
        router.push({ name: "home" });
      } else {
        error.value = response;
      }
    });
  }
</script>

<template>
  <div class="flex justify-center">
    <form class="bg-white rounded-lg shadow-md p-6 w-full" @submit.prevent>
      <h1 class="mb-3 text-2xl font-bold">Login</h1>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            v-model="username"
            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            v-model="password"
            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
          />
        </div>
      </div>
      <div class="text-center mb-6">
        <span v-if="error" class="font-bold text-red-500">{{ error }}</span>
      </div>
      <Button
        :loading="isLoading"
        :color="ButtonColor.PRIMARY"
        label="Login"
        full="true"
        @click="submit"
      />
    </form>
  </div>
</template>
