<script setup lang="ts">
  import Link from "~/components/Link/Link.vue";
  import Item from "~/components/Item/Item.vue";
  import PlaceholderList from "~/components/Placeholder/PlaceholderList.vue";
  import { useSettingStore } from "~/stores/settings";
  import { useUserStore } from "~/stores/user";
  import { ref } from "vue";

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
      >
        <Item
          icon="person"
          :name="client.name"
          :id="client.id"
          :key="client.id"
        ></Item>
      </Link>
    </div>
  </div>
</template>
