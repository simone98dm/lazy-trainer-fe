<script setup lang="ts">
  import { ref } from "vue";
  import BaseButton from "~/components/Atoms/BaseButton/BaseButton.vue";
  import BaseModal from "~/components/Molecules/BaseModal/BaseModal.vue";

  const showBanner = ref(
    !window.location.hostname.includes(".simone98dm.dev") &&
      window.location.hostname !== "localhost",
  );

  function closeBanner() {
    showBanner.value = false;
  }

  function openLink() {
    window.open("https://workout.simone98dm.dev", "_blank");
  }
</script>

<template>
  <BaseModal v-if="showBanner" title="We moved to a new home ✈️" @close="closeBanner">
    <template #content>
      <div>
        <h1 class="text-xl">Hey user!</h1>
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
      <BaseButton
        label="Show"
        icon="arrow_forward"
        size="medium"
        color="success"
        @click="openLink"
      />
    </template>
  </BaseModal>
</template>
