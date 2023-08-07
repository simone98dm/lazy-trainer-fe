<script setup lang="ts">
  import { useSettingStore, useUserStore } from "~/stores";
  import { ref } from "vue";

  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  settingsStore.setHeader("Your clients");

  const clients = ref(undefined as { id: string; name: string }[] | undefined);
  userStore.retrieveClients().then((response) => (clients.value = response));
</script>

<template>
  <div class="flex flex-col justify-center w-full">
    <PlaceholderList v-if="!clients" />
    <div id="list-groups" v-else>
      <ButtonLink
        v-for="client in clients"
        :to="{
          path: '/',
          params: {
            planId: client.id,
          },
        }"
        :key="client.id"
      >
        <Item icon="person" :name="client.name" :id="client.id" />
      </ButtonLink>
    </div>
  </div>
</template>
