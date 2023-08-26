<script setup lang="ts">
  import { useActivityStore } from "~/stores";
  import { Activity } from "~/models/Activity";
  import draggable from "vuedraggable";

  interface ActivityListProps {
    activities: Activity[];
    isWarmup?: boolean;
    allowDrag?: boolean;
    allowDelete?: boolean;
    allowEdit?: boolean;
    title?: string;
  }

  withDefaults(defineProps<ActivityListProps>(), {
    isWarmup: false,
    allowDrag: false,
    allowDelete: false,
    allowEdit: false,
    title: "",
  });

  interface ActivityListEmits {
    (e: "move", activities: Activity[] | undefined, isWarmup: boolean): void;
    (e: "delete", id: string): void;
    (e: "edit", id: string): void;
    (e: "run"): void;
    (e: "delete-activity", activity: Activity): void;
  }

  const emits = defineEmits<ActivityListEmits>();

  const activityStore = useActivityStore();

  function editActivity(activity: Activity) {
    activityStore.setSelectedActivity(activity);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
</script>

<template>
  <div v-if="activities">
    <div class="flex items-center justify-between gap-2">
      <h4 v-if="title" class="text-5xl font-bold mr-auto">
        {{ title }}
      </h4>
    </div>
    <draggable
      v-if="allowDrag"
      class="mt-4"
      :list="activities"
      item-key="id"
      @end="emits('move', activities, isWarmup)"
    >
      <template #item="{ element }">
        <ActivityItem :activity="element">
          <template #actions>
            <BaseButton
              v-if="allowDelete"
              id="delete-activity"
              color="danger"
              icon="delete"
              class="float-right ml-2"
              variant="circular"
              @click.prevent="() => activityStore.deleteActivity(element.id)"
            />
            <BaseButton
              v-if="allowEdit"
              id="edit-activity"
              color="warning"
              icon="edit"
              class="float-right ml-2"
              variant="circular"
              @click.prevent="() => editActivity(element)"
            />
          </template>
        </ActivityItem>
      </template>
    </draggable>
    <ActivityItem v-else v-for="activity in activities" :key="activity.id" :activity="activity" />
  </div>
  <ErrorBanner v-else text="No activities found"></ErrorBanner>
</template>
