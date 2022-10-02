})
<script setup lang="ts">
  import { IActivity } from "~/models/Activity";
  import { ref, watch } from "vue";
  import Button from "~/components/Button/Button.vue";
  import { v4 as uuidv4 } from "uuid";
  import { useUserStore } from "~/stores/user";
  import { ButtonColor } from "~/utils";
  import TrashIcon from "~/components/Icons/TrashIcon.vue";

  const props = defineProps([
    "id",
    "dayOfWeek",
    "name",
    "description",
    "time",
    "warmup",
    "order",
    "reps",
    "allowDetele",
  ]);
  const emits = defineEmits(["update", "remove"]);
  const user = useUserStore();
  const uuid = uuidv4();

  let name = ref(props.name || "");
  let id = ref(props.id || uuid);
  let description = ref(props.description || "");
  let time = ref(props.time / 1000 || 0);
  let reps = ref(props.reps || 0);
  let warmup = ref(props.warmup || false);
  let order = ref(props.order || 0);
  let videoUrl = ref("");
  let isTimeBasedActivity = ref(
    (Boolean(props.time !== 0) && Boolean(props.reps === 0)) ?? false
  );

  function update() {
    const activity: IActivity = {
      id: id.value,
      name: name.value,
      description: description.value,
      time: time.value * 1000,
      order: order.value,
      warmup: warmup.value,
      videoUrl: videoUrl.value,
      requestChange: false,
      reps: reps.value,
    };
    if (isTimeBasedActivity.value) {
      activity.reps = 0;
    } else {
      activity.time = 0;
    }
    emits("update", { activityId: id.value, activity });
  }
  watch([name, description, time, reps, warmup, order], update);
</script>

<template>
  <div class="flex justify-center bg-white rounded-lg shadow-md mb-6">
    <form class="p-6 w-full" @submit.prevent>
      <div class="flex flex-row justify-between">
        <h1 class="mb-3 text-2xl font-bold">
          {{ !props.allowDetele ? "Add new activity:" : "Edit activity:" }}
        </h1>

        <Button
          id="delete-activity"
          v-if="props.allowDetele"
          :color="ButtonColor.DANGER"
          :icon="TrashIcon"
          @click="emits('remove', props.id)"
        ></Button>
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="activityName"
          >
            Name:
          </label>
          <input
            autocomplete="false"
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
            autocomplete="false"
            v-model="description"
            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
            name="activityDescription"
            type="text"
          />
        </div>

        <div class="w-full md:w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="activityType"
          >
            Activity based type:
          </label>
          <div class="flex justify-center">
            <div
              class="w-full sm:w-64 flex justify-between shadow rounded-full h-12 flex p-1 mb-3"
            >
              <button
                id="time-based-activity"
                :class="[
                  'flex items-center w-fit rounded-full h-10 transition-all px-10 text-lg',
                  {
                    'bg-indigo-600 text-white shadow':
                      isTimeBasedActivity && !user.isTrainer,
                  },
                  {
                    'bg-purple-600 text-white shadow':
                      isTimeBasedActivity && user.isTrainer,
                  },
                ]"
                @click="() => (isTimeBasedActivity = true)"
              >
                Time
              </button>
              <button
                id="reps-based-activity"
                :class="[
                  'flex items-center w-fit rounded-full h-10 transition-all px-10 text-lg',
                  {
                    'bg-indigo-600 text-white shadow':
                      !isTimeBasedActivity && !user.isTrainer,
                  },
                  {
                    'bg-purple-600 text-white shadow':
                      !isTimeBasedActivity && user.isTrainer,
                  },
                ]"
                @click="() => (isTimeBasedActivity = false)"
              >
                Reps
              </button>
            </div>
          </div>

          <input
            v-if="isTimeBasedActivity"
            autocomplete="false"
            v-model="time"
            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
            name="activityType"
            type="number"
          />
          <input
            v-else
            autocomplete="false"
            v-model="reps"
            class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
            name="activityType"
            type="number"
          />
        </div>

        <div class="w-full md:w-full flex flex-col px-3 mb-6">
          <label
            class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="toggle"
          >
            Is warm-up?
          </label>
          <div
            class="relative inline-block w-14 mr-2 align-middle select-none transition duration-200 ease-in"
          >
            <input
              id="toggle"
              class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-2 appearance-none cursor-pointer"
              name="toggle"
              type="checkbox"
              v-model="warmup"
            />
            <label
              class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"
              for="toggle"
            ></label>
          </div>
        </div>
        <!-- <label for="activityUrl">
          Video:
          <input type="text" name="activityVideoUrl" v-model="videoUrl" />
        </label> -->
      </div>
    </form>
  </div>
</template>

<style>
  .toggle-checkbox:checked {
    right: 0;
    border-color: rgb(79 70 229 / var(--tw-bg-opacity));
  }

  .toggle-checkbox:checked + .toggle-label {
    background-color: rgb(79 70 229 / var(--tw-bg-opacity));
  }
</style>
