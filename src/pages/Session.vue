<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import SessionForm from "@/components/SessionForm/SessionForm.vue";
import BackButton from "@/components/BackButton/BackButton.vue";
import { ISession } from "../models/Session";
import { useActivityStore } from "../stores/activity";

const store = useActivityStore();
const router = useRouter();
const route = useRoute();

const { sessionId } = route.params;

const session = store.getSession(sessionId as string);

function cleanDuplicateWarmup() {
  store.duplicateWarmup = undefined;
}
function onBackPageHandler() {
  cleanDuplicateWarmup();
  router.back();
}

function addSession(session: ISession) {
  store.addSession(session);
  cleanDuplicateWarmup();
  router.push({
    name: "home",
  });
}
</script>
<template>
  <div class="mb-6">
    <BackButton
      @click="onBackPageHandler"
    ></BackButton>
  </div>
  <div class="flex flex-wrap justify-center">
    <SessionForm
      @save="addSession"
      :id="sessionId"
      :day-of-week="session?.dayOfWeek"
    ></SessionForm>
  </div>
</template>
