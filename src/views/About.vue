<script setup lang="ts">
  import { useSettingStore } from "~/stores";
  import github from "~/assets/github.svg";
  import linkedin from "~/assets/linkedin.svg";
  import { useRouter } from "vue-router";
  import { logEvent, getAnalytics } from "@firebase/analytics";
  const router = useRouter();

  const settingsStore = useSettingStore();
  settingsStore.setHeader("About");
</script>

<template>
  <div class="mb-3">
    <BackButton @click="router.back()"></BackButton>
  </div>
  <div class="mx-auto text-center max-w-screen-lg">
    <div class="mb-6 bg-white shadow rounded-xl p-5">
      <img
        src="https://avatars.githubusercontent.com/u/17797267?v=4"
        class="rounded-full w-20 mx-auto mb-6"
      />
      <p class="text-4xl font-bold mb-6">Hi folks 👋</p>
      <p class="text-4xl font-bolder mb-6">my name is Simone</p>
      <p class="text-xl">I'm a software engineer👨🏻‍💻 from Italy🇮🇹</p>
    </div>
    <div class="mb-6 bg-white shadow rounded-xl p-5">
      <p class="text-2xl font-bold">Reach me out:</p>
      <div class="flex flex-col">
        <div class="flex justify-center mb-1">
          <a
            href="https://github.com/simone98dm"
            target="_blank"
            @click="
              logEvent(getAnalytics(), 'click', {
                to: 'github profile',
              })
            "
          >
            <img :src="github" class="w-10" alt="github logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/simone-d-b40a2a6b/"
            target="_blank"
            @click="
              logEvent(getAnalytics(), 'click', {
                to: 'linkedin profile',
              })
            "
          >
            <img :src="linkedin" class="w-10" alt="linkedin logo" />
          </a>
        </div>
        <a
          href="https://www.buymeacoffee.com/simone98dm"
          target="_blank"
          class="mx-auto"
          @click="
            logEvent(getAnalytics(), 'click', {
              to: 'buy me a coffee',
            })
          "
        >
          <img
            src="https://img.shields.io/badge/Someone%20said%20Pizza-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black"
          />
        </a>
      </div>
    </div>
  </div>
</template>
