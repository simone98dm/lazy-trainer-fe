<script setup lang="ts">
  import { ButtonColor } from "~/utils";
  import { getStorage, saveStorage } from "~/helpers/storage";
  import { ref } from "vue";
  const cookieName = "cookie-compliance";
  let status = ref(true);

  interface CookieAcceptance {
    acceptanceDate: string;
    acceptanceValue: boolean;
  }

  function dismissCookieBanner() {
    saveStorage(cookieName, {
      acceptanceDate: new Date().toISOString(),
      acceptanceValue: true,
    }).then(() => (status.value = true));
  }

  getStorage<CookieAcceptance>(cookieName).then(
    (stat) => (status.value = stat?.acceptanceValue ?? false)
  );
</script>

<template>
  <Banner color="success" v-if="!status">
    <template #customContent>
      <div class="flex flex-row justify-between align-middle">
        <div class="text-left text-">
          <h1 class="text-xl font-bold">Hello, world!</h1>
          <p class="text-md">Click here to view the full privacy policy</p>
        </div>
        <Button
          :color="ButtonColor.SUCCESS"
          icon="check"
          label="Got it!"
          @click="dismissCookieBanner"
        />
      </div>
    </template>
  </Banner>
</template>
