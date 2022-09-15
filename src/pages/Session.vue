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
  <h1 class="text-2xl">Edit plan:</h1>
  <div class="flex flex-wrap justify-center">
    <SessionForm @save="addSession"></SessionForm>
  </div>
</template>
