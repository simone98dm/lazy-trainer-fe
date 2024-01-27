<script setup lang="ts">
  import { type Activity } from "~/models/Activity";
  import { computed, ref } from "vue";
  import { useActivityStore, useUserStore } from "~/stores";
  import { storeToRefs } from "pinia";

  interface ActivityFormProps {
    activity: Activity | null;
  }

  const props = withDefaults(defineProps<ActivityFormProps>(), {
    activity: null,
  });

  const user = useUserStore();
  const activityStore = useActivityStore();
  const { selectedActivity } = storeToRefs(activityStore);

  const nameError = computed(() => (!selectedActivity.value?.name ? "Name is required" : ""));

  const descriptionError = computed(() =>
    selectedActivity.value?.description && selectedActivity.value?.description.length > 100
      ? "Description is too long"
      : "",
  );
  const isTimeBasedActivity = ref(
    (Boolean(props.activity?.time !== 0) && Boolean(props.activity?.reps === 0)) ?? false,
  );

  const timeError = computed(() =>
    isTimeBasedActivity.value && !selectedActivity.value?.time ? "Time is required" : "",
  );

  const repsError = computed(() =>
    !isTimeBasedActivity.value && !selectedActivity.value?.reps ? "Reps are required" : "",
  );

  const cardTitle = computed(() =>
    selectedActivity.value?.id ? "Edit activity" : "Create activity",
  );

  const formError = computed(
    () => nameError.value || descriptionError.value || timeError.value || repsError.value,
  );

  async function saveActivity() {
    if (formError.value) {
      return;
    }
    if (selectedActivity.value && selectedActivity.value.id) {
      await activityStore.updateActivity(selectedActivity.value);
    } else {
      await activityStore.addActivity(selectedActivity.value!);
    }
    activityStore.setSelectedActivity(null);
  }
</script>

<template>
  <BaseModal
    id="activity-form"
    :title="cardTitle"
    @close="() => (activityStore.selectedActivity = null)"
  >
    <template #content>
      <div class="p-6 w-full">
        <div class="flex flex-wrap -mx-3">
          <div class="w-full px-3 mb-6">
            <Input
              :value="selectedActivity?.name"
              @change="(value: string) => activityStore.updateActivityValue('name', value)"
              id="activityName"
              name="activityNameField"
              label="Activity name"
              :required="true"
              :error="nameError"
            />
          </div>

          <div class="w-full px-3 mb-6">
            <Input
              :value="selectedActivity?.description"
              @change="(value: string) => activityStore.updateActivityValue('description', value)"
              id="activityDescription"
              name="activityDescriptionField"
              label="Activity description"
              :error="descriptionError"
            />
          </div>

          <div class="w-full px-3 mb-6">
            <label class="font-bold mb-2" for="activityType"> Activity based type </label>
            <div class="flex flex-col sm:flex-row justify-around align-center my-2">
              <div class="w-full sm:w-64 justify-between shadow rounded-full h-12 flex p-1 mb-3">
                <button
                  id="time-based-activity"
                  :class="[
                    'flex items-center w-fit rounded-full h-10 transition-all px-10',
                    {
                      'bg-emerald-600 text-white shadow': isTimeBasedActivity && !user.isTrainer,
                    },
                    {
                      'bg-purple-600 text-white shadow': isTimeBasedActivity && user.isTrainer,
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
                      'bg-emerald-600 text-white shadow': !isTimeBasedActivity && !user.isTrainer,
                    },
                    {
                      'bg-purple-600 text-white shadow': !isTimeBasedActivity && user.isTrainer,
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
                  :time="selectedActivity?.time ?? 0"
                  @timeSelected="
                    (value: string) => activityStore.updateActivityValue('time', value)
                  "
                  :error="timeError"
                />
                <Input
                  v-else
                  :value="`${selectedActivity?.reps}`"
                  @change="
                    (value: string) => activityStore.updateActivityValue('reps', Number(value))
                  "
                  id="activityReps"
                  name="activityRepsField"
                  :error="repsError"
                />
              </div>
            </div>
          </div>
          <div class="w-full px-3 mb-6 flex items-center justify-center gap-4">
            <label class="tracking-wide" :for="`toggle-${props.activity?.id ?? 'new-activity'}`">
              <span class="flex-left inline"> Is warm-up? </span>
            </label>
            <Switch
              class="flex-left inline"
              :id="`toggle-${props.activity?.id ?? 'new-activity'}`"
              :name="`toggleWarmup-${props.activity?.id ?? 'new-activity'}`"
              :checked="selectedActivity?.warmup"
              @toggle="(isWarmup: boolean) => activityStore.updateActivityValue('warmup', isWarmup)"
            />
          </div>
        </div>
      </div>
    </template>
    <template #actions>
      <div class="flex gap-3">
        <BaseButton
          id="remove-activity"
          color="danger"
          icon="delete"
          size="small"
          label="Cancel"
          :full="true"
          @click="() => activityStore.setSelectedActivity(null)"
        />
        <BaseButton
          id="save-activity"
          color="primary"
          icon="save"
          size="small"
          label="Save"
          :full="true"
          @click="() => saveActivity()"
        />
      </div>
    </template>
  </BaseModal>
</template>
