<script setup lang="ts">
  import { useActivityStore } from "~/stores";
  import { type Activity } from "~/models/Activity";
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
  }

  defineEmits<ActivityListEmits>();

  const activityStore = useActivityStore();

  function editActivity(activity: Activity) {
    activityStore.setSelectedActivity(activity);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deleteActivity(activity: Activity) {
    await activityStore.deleteActivity(activity.id);
  }
</script>

<template>
  <div v-if="activities">
    <div class="flex items-center justify-between gap-2">
      <h4 v-if="title" class="text-4xl font-bold mr-auto">
        {{ title }}
      </h4>
    </div>
    <draggable
      v-if="allowDrag"
      class="mt-4"
      :list="activities"
      item-key="id"
      @end="$emit('move', activities, isWarmup)"
    >
      <template #item="{ element }">
        <ActivityItem :activity="element">
          <template #actions>
            <BaseButton
              v-if="allowDelete"
              id="delete-activity"
              color="danger"
              icon="delete"
              size="small"
              class="float-right ml-2"
              @click.prevent="() => deleteActivity(element)"
            />
            <BaseButton
              v-if="allowEdit"
              id="edit-activity"
              color="warning"
              icon="edit"
              size="small"
              class="float-right ml-2"
              @click.prevent="() => editActivity(element)"
            />
          </template>
        </ActivityItem>
      </template>
    </draggable>
    <ActivityItem v-else v-for="activity in activities" :key="activity.id" :activity="activity">
      <template #actions>
        <BaseButton
          v-if="allowDelete"
          id="delete-activity"
          color="danger"
          icon="delete"
          size="small"
          class="float-right ml-2"
          @click.prevent="() => deleteActivity(activity)"
        />
        <BaseButton
          v-if="allowEdit"
          id="edit-activity"
          color="warning"
          icon="edit"
          size="small"
          class="float-right ml-2"
          @click.prevent="() => editActivity(activity)"
        />
      </template>
    </ActivityItem>
  </div>
  <ErrorBanner v-else text="No activities found" />
</template>
