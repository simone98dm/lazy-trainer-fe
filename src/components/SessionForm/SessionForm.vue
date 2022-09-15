<script setup lang="ts">
import { IActivity } from "../../models/Activity";
import { ref } from "vue";
import Button from "../Button/Button.vue";
import { v4 as uuidv4 } from "uuid";
import Icon from "../Icons/Icon.vue";
import TrashIcon from "../Icons/TrashIcon.vue";
import AddIcon from "../Icons/AddIcon.vue";
import { IconSize } from "../../utils/enum";
import { ISession } from "../../models/Session";
import { days, getDayOfTheWeek } from "../../utils/dates";

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
  <div class="mb-6 flex flex-wrap gap-3">
    <button
      v-for="(dayName, i) in days"
      :key="i"
      class="w-full bg-gray-200 focus:bg-indigo-600 focus:text-slate-50 duration-200 rounded-full px-4 py-2 font-light"
      @click="() => selectDay(i)"
    >
      {{ dayName }}
    </button>
  </div>
  <div class="w-full md:w-full px-3">
    <Button full="true" @click="remove" v-if="!isNew()">
      <Icon :component="TrashIcon" :size="IconSize.MEDIUM"></Icon>
    </Button>
    <Button full="true" @click="save" v-else>
      <Icon :component="AddIcon" :size="IconSize.MEDIUM"></Icon>
    </Button>
  </div>
</template>
