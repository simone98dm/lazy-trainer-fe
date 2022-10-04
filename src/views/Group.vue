<script setup lang="ts">
  import Link from "~/components/Link/Link.vue";
  import { ref } from "vue";
  import Item from "~/components/Item/Item.vue";
  import Loading from "~/components/Loading/Loading.vue";
  import { useSettingStore } from "~/stores/settings";
  import { useUserStore } from "~/stores/user";
  import HandleIcon from "~/components/Icons/HandleIcon.vue";
  import TrainerIcon from "~/components/Icons/TrainerIcon.vue";
  import PlaceholderList from "~/components/Placeholder/PlaceholderList.vue";

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
