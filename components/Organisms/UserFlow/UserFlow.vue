<script setup lang="ts">
  import { ICustomSession } from "~/models/Session";
  import { useActivityStore, useTimerStore, useUserStore } from "~/stores";
  import { LinkType } from "~/utils";

  interface UserFlowProps {
    list?: ICustomSession[];
    loading?: boolean;
  }

  const props = withDefaults(defineProps<UserFlowProps>(), {
    loading: false,
  });

  const userStore = useUserStore();
  const activityStore = useActivityStore();
  const router = useRouter();
  const todayActivity = ref<ICustomSession | undefined>();

  todayActivity.value = props.list?.find(
    (session) => isHighlightedCard(session) && hasActivities(session.id)
  );

  function isToday(dayOfWeek: number): boolean {
    return dayOfWeek === new Date().getDay() - 1;
  }

  function hasActivities(sessionId: string): boolean {
    const warmupList = activityStore.getWarmUpActivities(sessionId);
    const activityList = activityStore.getSessionActivities(sessionId);

    const a = (warmupList?.length ?? 0) > 0;
    const b = (activityList?.length ?? 0) > 0;

    return a || b;
  }

  function isHighlightedCard(item: ICustomSession): boolean {
    return !userStore.isTrainer && isToday(item.dayOfWeek);
  }

  function runWorkout() {
    if (todayActivity.value) {
      const warmupList = activityStore.getWarmUpActivities(todayActivity.value.id);
      const activityList = activityStore.getSessionActivities(todayActivity.value.id);

      const timerStore = useTimerStore();

      timerStore.setListActivities(warmupList && warmupList.length > 0 ? warmupList : activityList);

      router.push({ name: "timer", params: { session: todayActivity.value.id } });
    }
  }

  const showAddActivityButton = computed(() => {
    return (
      !props.loading &&
      (userStore.isTrainer || userStore.isSelfMadeMan) &&
      activityStore.getMissingDays.length > 0
    );
  });
</script>

<template>
  <PlaceholderList v-if="props.loading" />
  <div v-else-if="props.list && props.list.length > 0">
    <RouterLink
      v-for="item in props.list"
      :key="item.id"
      :to="{ name: 'details', params: { session: item.id } }"
    >
      <Card :highlight="isHighlightedCard(item)">
        <div class="dark:text-slate-200 text-slate-600">
          <p v-if="isHighlightedCard(item)" class="text-sm">
            {{ !userStore.isTrainer && isToday(item.dayOfWeek) ? "Today session" : "" }}
          </p>
          <h4
            :class="[
              'font-bold mb-2',
              { 'font-semibold text-5xl md:text-4xl': item.description },
              { 'font-bold text-7xl md:text-6xl': !item.description },
            ]"
          >
            {{ item.name }}
          </h4>
          <p
            v-if="item.description"
            class="text-md md:text-lg truncate whitespace-nowrap overflow-hidden"
          >
            {{ item.description }}
          </p>
        </div>
      </Card>
    </RouterLink>
  </div>
  <ErrorBanner v-else text="No sessions found" />
  <BaseButton
    v-if="todayActivity"
    icon="play_arrow"
    color="success"
    variant="circular"
    @click="() => runWorkout()"
    class="floating-button py-2 px-4"
  />
  <ButtonLink
    v-if="showAddActivityButton"
    icon="add"
    :full="true"
    :color="userStore.isTrainer ? 'purple' : 'primary'"
    :to="{ name: 'session' }"
    :type="LinkType.BUTTON"
    label="Add day activities"
  />
</template>
