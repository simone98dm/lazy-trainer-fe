<script setup lang="ts">
import {useRouter} from "vue-router";
import SessionForm from "@/components/SessionForm/SessionForm.vue";
import BackButton from "@/components/BackButton/BackButton.vue";
import {ISession} from "../models/Session";
import {useActivityStore} from "../stores/activity";

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
  <div class="mb-6">
    <BackButton @click="router.back()"></BackButton>
  </div>
  <div class="flex flex-wrap justify-center">
    <SessionForm @save="addSession"></SessionForm>
  </div>
</template>
