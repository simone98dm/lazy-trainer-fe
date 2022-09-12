<script setup lang="ts">
import { useStore } from "../../store/main";
import { IActivity } from "../../models/Activity";
import { ref, watch } from "vue";

const store = useStore();
let name = ref("");
let id = ref("");
let description = ref("");
let time = ref(0);
let videoUrl = ref("");

function save() {
  const activity: IActivity = {
    id: id.value,
    name: name.value,
    description: description.value,
    time: time.value,
    videoUrl: videoUrl.value,
  };
  store.addActivity(activity);
}
</script>

<template>
  <form @submit.prevent>
    <label for="activityName">
      Name:
      <input type="text" name="activityName" v-model="name" />
    </label>
    <label for="activityDescriptions">
      Desc.:
      <input type="text" name="activityDescription" v-model="description" />
    </label>
    <label for="activityTime">
      Time:
      <input type="text" name="activityTime" v-model="time" />
    </label>
    <label for="activityUrl">
      Video:
      <input type="text" name="activityVideoUrl" v-model="videoUrl" />
    </label>
    <button type="button" @click="save">Save</button>
  </form>
</template>
