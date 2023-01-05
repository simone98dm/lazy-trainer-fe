<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { ICustomSession } from "~/models/Session";
  import { useActivityStore, useTimerStore, useUserStore } from "~/stores";
  import { ButtonColor, LinkType } from "~/utils";

  const user = useUserStore();
  const activityStore = useActivityStore();
  const props = defineProps({
    list: {
      type: Array<ICustomSession>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  });
  const router = useRouter();

  function isDayActivity(dayOfWeek: number) {
    return dayOfWeek === new Date().getDay() - 1;
  }

  function runWorkout(sessionId: string) {
    const warmupList = activityStore.getWarmUpActivities(sessionId);
    const activityList = activityStore.getSessionActivities(sessionId);
    const timerStore = useTimerStore();
    if (warmupList && warmupList.length > 0) {
      timerStore.setListActivities(warmupList);
    } else {
      timerStore.setListActivities(activityList);
    }
    router.push({ name: "timer", params: { sessionId } });
  }

  function hasActivities(sessionId: string) {
    const warmupList = activityStore.getWarmUpActivities(sessionId);
    const activityList = activityStore.getSessionActivities(sessionId);
    return (warmupList?.length ?? 0 > 0) || (activityList?.length ?? 0 > 0);
  }
</script>

<template>
  <PlaceholderList v-if="props.loading" />
  <div v-else class="mb-6" id="sessions">
    <div v-if="props.list && props.list.length > 0" class="flex flex-col xl:flex-row w-full">
      <Item
        v-for="item in props.list"
        :key="item.id"
        :name="item.name"
        :description="item.description"
        :id="item.id"
        :highlight="!user.isTrainer && isDayActivity(item.dayOfWeek) ? 'Today session' : ''"
        class="cursor-pointer w-full mx-2"
        @click="() => router.push({ name: 'details', params: { sessionId: item.id } })"
      >
        <template #actions>
          <div>
            <Button
              v-if="!user.isTrainer && isDayActivity(item.dayOfWeek) && hasActivities(item.id)"
              :icon="'play_arrow'"
              :color="ButtonColor.SUCCESS"
              :circular="true"
              @click.stop="runWorkout(item.id)"
              class="float-right"
            />
          </div>
        </template>
      </Item>
    </div>
    <ErrorBanner v-else text="No sessions found" />
  </div>
  <Link
    v-if="
      !props.loading &&
      (user.isTrainer || user.isSelfMadeMan) &&
      activityStore.getMissingDays.length > 0
    "
    icon="add"
    :full="true"
    :to="{ name: 'session' }"
    :type="LinkType.BUTTON"
    label="Add day activities"
  />
</template>
