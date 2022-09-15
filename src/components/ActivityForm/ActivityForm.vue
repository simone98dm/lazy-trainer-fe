<script setup lang="ts">
import { IActivity } from "../../models/Activity";
import { ref } from "vue";
import Button from "../Button/Button.vue";
import { v4 as uuidv4 } from "uuid";
import Icon from "../Icons/Icon.vue";
import TrashIcon from "../Icons/TrashIcon.vue";
import AddIcon from "../Icons/AddIcon.vue";
import { IconSize } from "../../utils/enum";

const props = defineProps(["id", "dayOfWeek", "name", "description", "time"]);
const emits = defineEmits(["save", "remove"]);

const uuid = uuidv4();

let name = ref(props.name || "");
let id = ref(props.id || uuid);
let description = ref(props.description || "");
let time = ref(props.time || 0);
let videoUrl = ref("");

function save() {
  const activity: IActivity = {
    id: id.value,
    name: name.value,
    description: description.value,
    time: (time.value * 1000),
    videoUrl: videoUrl.value,
  };
  emits("save", activity);
}

function isNew() {
  return !Boolean(props.id);
}

function remove() {
  if (!isNew()) {
    emits("remove", props.id);
  }
}
</script>

<template>
  <div class="flex justify-center my-2 md:mx-0">
    <form
      class="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
      @submit.prevent
    >
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="activityName"
          >
            Name:
          </label>
          <input
            v-model="name"
            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
            name="activityName"
            type="text"
          />
        </div>

        <div class="w-full md:w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="activityDescription"
          >
            Description:
          </label>
          <input
            v-model="description"
            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
            name="activityDescription"
            type="text"
          />
        </div>

        <div class="w-full md:w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="activityTime"
          >
            Time in seconds:
          </label>
          <input
            v-model="time"
            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
            name="activityTime"
            type="text"
          />
        </div>
        <!-- <label for="activityUrl">
          Video:
          <input type="text" name="activityVideoUrl" v-model="videoUrl" />
        </label> -->
        <div class="w-full md:w-full px-3">
          <Button @click="save">
            <Icon :component="AddIcon" :size="IconSize.MEDIUM"></Icon>
          </Button>
          <Button @click="remove">
            <Icon :component="TrashIcon" :size="IconSize.MEDIUM"></Icon>
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>
