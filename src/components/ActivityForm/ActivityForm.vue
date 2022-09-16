<script setup lang="ts">
import { IActivity } from "../../models/Activity";
import { ref, watch } from "vue";
import Button from "../Button/Button.vue";
import { v4 as uuidv4 } from "uuid";
import Icon from "../Icons/Icon.vue";
import TrashIcon from "../Icons/TrashIcon.vue";
import AddIcon from "../Icons/AddIcon.vue";
import SaveIcon from "../Icons/SaveIcon.vue";
import { IconSize, ButtonColor } from "../../utils/enum";

const props = defineProps([
  "id",
  "dayOfWeek",
  "name",
  "description",
  "time",
  "warmup",
  "order",
]);
const emits = defineEmits(["save", "remove"]);

const uuid = uuidv4();

let name = ref(props.name || "");
let id = ref(props.id || uuid);
let description = ref(props.description || "");
let time = ref(props.time / 1000 || 0);
let warmup = ref(props.warmup || false);
let order = ref(props.order || 0);
let videoUrl = ref("");

function save() {
  const activity: IActivity = {
    id: id.value,
    name: name.value,
    description: description.value,
    time: time.value * 1000,
    order: order.value,
    warmup: warmup.value,
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
  <div class="flex justify-center">
    <form class="bg-white rounded-lg shadow-md p-6 w-full" @submit.prevent>
      <h1 class="mb-3 text-2xl font-bold">
        {{ isNew() ? "Add new activity:" : "Edit activity:" }}
      </h1>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 mb-6">
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

        <div class="w-full px-3 mb-6">
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

        <div class="w-full md:w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="activityWarmup"
          >
            Is warm-up?
          </label>
          <input
            v-model="warmup"
            class="toggle"
            name="activityWarmup py-3"
            type="checkbox"
          />
        </div>
        <!-- <label for="activityUrl">
          Video:
          <input type="text" name="activityVideoUrl" v-model="videoUrl" />
        </label> -->
        <div class="w-full flex flex-col sm:flex-row justify-center px-3">
          <Button
            @click="save"
            full="true"
            :label="isNew() ? 'Create' : 'Save'"
            :color="ButtonColor.SUCCESS"
          >
            <Icon :component="isNew() ? AddIcon : SaveIcon" :size="IconSize.MEDIUM"></Icon>
          </Button>
          <Button
            @click="remove"
            full="true"
            label="Remove"
            :color="ButtonColor.DANGER"
          >
            <Icon :component="TrashIcon" :size="IconSize.MEDIUM"></Icon>
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
input[type="checkbox"]:focus {
  outline: 0;
}

.toggle {
  height: 32px;
  width: 60px;
  border-radius: 16px;
  display: inline-block;
  position: relative;
  margin: 0;
  border: 2px solid rgb(79 70 229 / var(--tw-bg-opacity));
  background: linear-gradient(180deg, #ececec 0%, #ececec 100%);
  transition: all 0.2s ease;
}
.toggle:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgb(79 70 229 / var(--tw-bg-opacity));
  box-shadow: 0 1px 2px rgb(79 70 229 / var(--tw-bg-opacity));
  transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
}
.toggle:checked:after {
  transform: translatex(28px);
}
</style>
