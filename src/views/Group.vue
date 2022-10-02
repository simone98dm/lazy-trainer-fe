<script setup lang="ts">
  import Link from "~/components/Link/Link.vue";
  import { ref } from "vue";
  import Item from "~/components/Item/Item.vue";
  import Loading from "~/components/Loading/Loading.vue";
  import { useSettingStore } from "~/stores/settings";
  import { useUserStore } from "~/stores/user";
  import HandleIcon from "~/components/Icons/HandleIcon.vue";
  import TrainerIcon from "~/components/Icons/TrainerIcon.vue";

  const settingsStore = useSettingStore();
  const userStore = useUserStore();
  settingsStore.setHeader("Your clients");

  const clients = ref(undefined as any[] | undefined);
  userStore.retrieveClients().then((response) => (clients.value = response));
</script>

<template>
  <div class="flex flex-col justify-center w-full">
    <Loading v-if="!clients" class="mx-auto"></Loading>
    <div v-else v-for="client in clients">
      <Link
        :to="{
          name: 'home',
          params: {
            planId: client.id,
          },
        }"
      >
        <Item
          :icon="TrainerIcon"
          :name="client.name"
          :id="client.id"
          :key="client.id"
        ></Item>
      </Link>
    </div>
  </div>
</template>
