<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { ICustomSession, ISession } from "~/models/Session";
  import { useActivityStore, useTimerStore, useUserStore } from "~/stores";
  import { LinkType, ButtonColor, getDayOfTheWeek } from "~/utils";
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

  function isDayActivity(activity: any) {
    return activity.dayOfWeek === new Date().getDay() - 1;
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
  <PlaceholderList v-if="props.loading"></PlaceholderList>
  <div v-else>
    <div v-if="props.list && props.list.length > 0" class="mb-6" id="sessions">
      <Item
        v-for="item in props.list"
        :name="item.name"
        :description="item.description"
        :key="item.id"
        :id="item.id"
        :highlight="
          !user.isTrainer && isDayActivity(item) ? 'Today session' : ''
        "
        :class="'cursor-pointer'"
        @click="
          () => router.push({ name: 'details', params: { sessionId: item.id } })
        "
      >
        <template #actions>
          <Button
            v-if="
              !user.isTrainer &&
              isDayActivity(item.id) &&
              hasActivities(item.id)
            "
            :full="true"
            :label="'Start'"
            :icon="'play_arrow'"
            :color="ButtonColor.PRIMARY"
            @click.stop="runWorkout(item.id)"
          />
        </template>
      </Item>
    </div>
    <ErrorBanner v-else text="No sessions found"></ErrorBanner>
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
