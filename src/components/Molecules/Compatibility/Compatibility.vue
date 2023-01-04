<script setup lang="ts">
  import { ref } from "vue";
  import { useUserStore } from "~/stores";
  import { ButtonSize, ButtonColor } from "~/utils";
  const userStore = useUserStore();

  const showBanner = ref(
    userStore.isLogged && window.location.hostname !== "workout.simone98dm.dev"
  );

  function closeBanner() {
    showBanner.value = false;
  }

  function openLink() {
    window.open("https://workout.simone98dm.dev", "_blank");
  }
</script>

<template>
  <!-- show banner with new website -->
  <Modal :show="showBanner" title="We moved to a new home ✈️" @close="closeBanner">
    <template #content>
      <div>
        <h1 class="text-xl">
          Hey
          <span class="text-indigo-600 font-mono">{{ userStore.username }}</span
          >!
        </h1>
        <p class="text-lg">It has been a crazy year, and a lot of new things happened ✨</p>
        <p class="text-lg">
          I'm always happy to bring new feature to you, for this reason we moved to a new place!
        </p>
        <p class="text-lg">
          Click on the <span class="text-green-600">Show</span> button and install the new app
        </p>
        <p class="text-lg">We are happy to have you and see you there!</p>
      </div>
    </template>
    <template #actions>
      <Button
        label="Show"
        icon="arrow_forward"
        :size="ButtonSize.MEDIUM"
        :color="ButtonColor.SUCCESS"
        @click="openLink"
      />
    </template>
  </Modal>
</template>
