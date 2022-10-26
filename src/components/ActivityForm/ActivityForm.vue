<script setup lang="ts">
  import { IActivity } from "~/models/Activity";
  import { computed, ref, watch } from "vue";
  import { v4 as uuidv4 } from "uuid";
  import { useUserStore } from "~/stores";
  import { ButtonColor } from "~/utils";

  const props = defineProps([
    "id",
    "dayOfWeek",
    "name",
    "description",
    "time",
    "warmup",
    "order",
    "videoUrl",
    "reps",
    "allowDetele",
    "i",
  ]);
  const emits = defineEmits(["update", "remove"]);
  const user = useUserStore();
  const uuid = uuidv4();

  let id = ref(props.id || uuid);
  let name = ref(props.name || "");
  let nameError = computed(() => name.value === "" && name.value.length < 20);

  let description = ref(props.description || "");
  let descriptionError = computed(() => description.value.length > 100);

  let time = ref(props.time / 1000 || 0);
  let timeError = computed(() => time.value <= 0 && time.value > 3600);

  let reps = ref(props.reps || 0);
  let repsError = computed(() => reps.value <= 0 && reps.value > 100);

  let warmup = ref(props.warmup || false);

  let order = ref(props.order || 0);

  let videoUrl = ref(props.videoUrl || "");
  let videoUrlError = computed(() => videoUrl.value.length > 8);

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
  watch([name, description, time, reps, warmup, order, videoUrl], update);
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
          :color="ButtonColor.DANGER"
          icon="delete"
          @click="emits('remove', props.id)"
        />
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 mb-6">
          <Input
            :value="name"
            @change="(v) => (name = v)"
            id="activityName"
            name="activityNameField"
            label="Name"
            :has-error="nameError"
            error="Name is required"
          />
        </div>

        <div class="w-full px-3 mb-6">
          <Input
            :value="description"
            @change="(v) => (description = v)"
            id="activityDescription"
            name="activityDescriptionField"
            label="Description"
            :has-error="descriptionError"
            error="Description is required"
          />
        </div>

        <div class="w-full px-3 mb-6">
          <label class="font-bold mb-2" for="activityType">
            Activity based type
          </label>
          <div
            class="flex flex-col sm:flex-row justify-around align-center my-2"
          >
            <div
              class="w-full sm:w-fit sm:w-64 flex justify-between shadow rounded-full h-12 flex p-1 mb-3"
            >
              <button
                id="time-based-activity"
                :class="[
                  'flex items-center w-fit rounded-full h-10 transition-all px-10',
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
                  'flex items-center w-fit rounded-full h-10 transition-all px-10',
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
            <div class="w-full sm:w-fit mb-3">
              <TimeSelector
                v-if="isTimeBasedActivity"
                :time="time"
                @timeSelected="(v) => (time = v)"
                :has-error="timeError"
              />
              <Input
                v-else
                :value="reps"
                @change="(v) => (reps = v)"
                id="activityUrl"
                name="activityUrlField"
                :has-error="repsError"
                error="Reps not valid"
              />
            </div>
          </div>
        </div>
        <div class="w-full md:w-full flex flex-col px-3 mb-6">
          <Input
            :value="videoUrl"
            @change="(v) => (videoUrl = v)"
            id="activityUrl"
            name="activityUrlField"
            label="Video Url (just the video id, es. auBLPXO8Fww)"
            :has-error="videoUrlError"
            error="Video url not valid"
          />
        </div>
        <div class="px-3 mb-6">
          <label class="tracking-wide" :for="`toggle-${i}`">
            <span class="flex-left inline"> Is warm-up? </span>
            <Switch
              class="flex-left inline"
              :id="`toggle-${i}`"
              :name="`toggleWarmup-${i}`"
              :checked="warmup"
              @toggle="(v) => (warmup = v)"
            />
          </label>
        </div>
      </div>
    </form>
  </div>
</template>
