<script setup lang="ts">
  import { useUserStore } from "~/stores";
  import { ref } from "vue";
  import { IUser } from "~/models/User";

  const userStore = useUserStore();

  const clients = ref([] as IUser[]);
  clients.value = await userStore.retrieveClients();
</script>

<template>
  <div class="flex flex-col justify-center w-full">
    <PlaceholderList v-if="!clients" />
    <div id="list-groups" v-else>
      <ButtonLink
        v-for="client in clients"
        :to="{
          name: 'home',
          params: {
            plan: client.id,
          },
        }"
        :key="client.id"
      >
        <ActivityItem icon="person" :name="client.name" :id="client.id" />
      </ButtonLink>
    </div>
  </div>
</template>
