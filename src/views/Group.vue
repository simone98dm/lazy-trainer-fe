<script setup lang="ts">
  import { useSettingStore, useUserStore } from "~/stores";
  import { ref, watch } from "vue";
  import { LinkType } from "~/utils";

  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  settingsStore.setHeader("Your clients");

  const clients = ref(undefined as any[] | undefined);
  userStore.retrieveClients().then((response) => (clients.value = response));
</script>

<template>
  <div class="flex flex-col justify-center w-full">
    <PlaceholderList v-if="!clients"></PlaceholderList>
    <div id="list-groups" v-else>
      <Link
        v-for="client in clients"
        :to="{
          name: 'home',
          params: {
            planId: client.id,
          },
        }"
        :key="client.id"
      >
        <Item icon="person" :name="client.name" :id="client.id" />
      </Link>
    </div>
  </div>
</template>
