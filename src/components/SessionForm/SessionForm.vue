<script setup lang="ts">
import {ref} from "vue";
import Button from "@/components/Button/Button.vue";
import {v4 as uuidv4} from "uuid";
import TrashIcon from "@/components/Icons/TrashIcon.vue";
import AddIcon from "@/components/Icons/AddIcon.vue";
import {ISession} from "../../models/Session";
import {days} from "../../utils";

const props = defineProps(["id", "dayOfWeek"]);
const emits = defineEmits(["save", "remove"]);

const uuid = uuidv4();

let dayOfWeek = ref(props.dayOfWeek || "");
let id = ref(props.id || uuid);

function save() {
  const activity: ISession = {
    id: id.value,
    dayOfWeek: dayOfWeek.value,
    activities: [],
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

function selectDay(dayIndex: number) {
  dayOfWeek.value = dayIndex;
}
</script>

<template>
  <div class="flex justify-center w-full">
    <form class="bg-white rounded-lg shadow-md p-6 w-full" @submit.prevent>
      <h1 class="mb-3 text-2xl font-bold mb-6">Create a new day session:</h1>
      <div class="flex flex-wrap justify-center gap-3 mb-6">
        <button
          v-for="(dayName, i) in days"
          :key="i"
          class="w-full bg-gray-200 focus:bg-indigo-600 focus:text-slate-50 duration-200 rounded-full px-4 py-2 font-light"
          @click="() => selectDay(i)"
        >
          {{ dayName }}
        </button>
      </div>
      <div>
        <Button v-if="isNew()" :icon="AddIcon" label="Create" @click="save"/>
        <Button v-else :icon="TrashIcon" label="Delete" @click="remove"/>
      </div>
    </form>
  </div>
</template>
