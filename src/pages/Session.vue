<script setup lang="ts">
import { useRouter } from "vue-router";
import SessionForm from "../components/SessionForm/SessionForm.vue";
import { ISession } from "../models/Session";
import { useActivityStore } from "../stores/activity";

const store = useActivityStore();
const router = useRouter();

function addSession(session: ISession) {
  store.addSession(session);
  router.push({
    name: "home",
  });
}
</script>
<template>
  <h1 class="mb-3 text-2xl font-bold">Create a new day session:</h1>
  <div class="flex flex-wrap justify-center">
    <SessionForm @save="addSession"></SessionForm>
  </div>
</template>
