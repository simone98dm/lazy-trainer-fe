<script setup lang="ts">
  import { useUserStore } from "../stores/user";
  import Link from "../components/Link/Link.vue";
  import { ref, watch } from "vue";
  import { useSettingStore } from "../stores/settings";
  import Item from "../components/Item/Item.vue";
  import Loading from "../components/Loading/Loading.vue";
  import TrainerIcon from "../components/Icons/TrainerIcon.vue";

  const user = useUserStore();
  const settings = useSettingStore();
  settings.setHeader("Your clients");

  const clients = ref(undefined as any[] | undefined);
  user.retrieveClients().then((response) => (clients.value = response));
</script>

<template>
  <div class="flex flex-col justify-center">
    <div v-if="!clients">
      <Loading></Loading>
    </div>
    <div v-else>
      <div v-for="client in clients">
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
            :name="client.username"
            :id="client.id"
            :key="client.id"
          ></Item>
        </Link>
      </div>
    </div>
  </div>
</template>
