<script setup lang="ts">
  import { ref } from "vue";
  import Button from "~/components/Button/Button.vue";
  import { v4 as uuidv4 } from "uuid";
  import TrashIcon from "~/components/Icons/TrashIcon.vue";
  import AddIcon from "~/components/Icons/AddIcon.vue";
  import { ISession } from "~/models/Session";
  import { days, ButtonColor } from "~/utils";
  import SaveIcon from "~/components/Icons/SaveIcon.vue";
  import Item from "~/components/Item/Item.vue";
  import { useActivityStore } from "~/stores/activity";
  import { useUserStore } from "~/stores/user";

  const props = defineProps(["id", "dayOfWeek", "existingForm"]);
  const emits = defineEmits(["save", "remove"]);

  const activityStore = useActivityStore();
  const userStore = useUserStore();

  const uuid = uuidv4();

  let dayOfWeek = ref(props.dayOfWeek || 0);
  let id = ref(props.id || uuid);

  function save() {
    const activity: ISession = {
      id: id.value,
      dayOfWeek: dayOfWeek.value,
      activities: [],
    };

    if (props.existingForm) {
      activityStore.duplicateWarmup = undefined;
      activity.activities = [...props.existingForm];
      activity.id = uuidv4();
    }

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

  function isDaySelected(dayIndex: number) {
    return dayIndex === dayOfWeek.value;
  }
</script>

<template>
  <div class="flex justify-center w-full">
    <form class="bg-white rounded-lg shadow-md p-6 w-full" @submit.prevent>
      <h1 class="mb-3 text-2xl font-bold mb-6">Create a new day session:</h1>
      <div class="flex xl:flex-row flex-col justify-center gap-3 mb-6">
        <button
          v-for="(dayName, i) in days"
          :key="i"
          :class="[
            {
              'bg-indigo-600 text-slate-50':
                isDaySelected(i) && !userStore.isTrainer,
            },
            {
              'bg-orange-600 text-slate-50':
                isDaySelected(i) && userStore.isTrainer,
            },
            { 'bg-gray-200 text-grey-50': !isDaySelected(i) },
            'w-full duration-200 rounded-full px-4 py-2 ',
          ]"
          @click="() => selectDay(i)"
        >
          {{ dayName }}
        </button>
      </div>
      <div v-if="props.existingForm" class="mb-6">
        <h4>Warm-up: {{ props.existingForm?.length }}</h4>
        <p class="text-orange-500">
          *This session will contains the warm-up activities from the other
          session.
        </p>
        <div class="w-full flex flex-col sm:flex-row justify-center px-3 gap-3">
          <div v-for="warmup in props.existingForm">
            <Item :id="warmup.id" :key="warmup.id" :name="warmup.name"></Item>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col sm:flex-row justify-center px-3 gap-3">
        <Button
          full="true"
          :icon="!isNew() ? SaveIcon : AddIcon"
          :label="!isNew() ? 'Save' : 'Create'"
          :color="ButtonColor.SUCCESS"
          @click="save"
        />
        <Button
          full="true"
          v-if="!isNew()"
          :icon="TrashIcon"
          :color="ButtonColor.DANGER"
          label="Delete"
          @click="remove"
        />
      </div>
    </form>
  </div>
</template>
