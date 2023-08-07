<script setup lang="ts">
  import { ICustomSession } from "~/models/Session";
  import { useActivityStore, useTimerStore, useUserStore } from "~/stores";
  import { LinkType } from "~/utils";

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

  const userStore = useUserStore();
  const activityStore = useActivityStore();
  const router = useRouter();

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

  function showButton(item: ICustomSession): boolean {
    return isHighlightedCard(item) && hasActivities(item.id);
  }

  function isHighlightedCard(item: ICustomSession): boolean {
    return !userStore.isTrainer && isToday(item.dayOfWeek);
  }

  function runWorkout(sessionId: string) {
    const warmupList = activityStore.getWarmUpActivities(sessionId);
    const activityList = activityStore.getSessionActivities(sessionId);

    const timerStore = useTimerStore();

    timerStore.setListActivities(warmupList && warmupList.length > 0 ? warmupList : activityList);

    router.push({ path: "/timer", params: { session: sessionId } });
  }
</script>

<template>
  <PlaceholderList v-if="props.loading" />
  <div v-else-if="props.list && props.list.length > 0" class="flex flex-wrap w-full mb-6">
    <RouterLink
      v-for="(item, i) in props.list"
      :key="item.id"
      :to="{ path: 'details', params: { session: item.id } }"
    >
      <Card
        class="cursor-pointer xl:h-[200px] xl:w-[350px] w-full xl:mx-2"
        :highlight="isHighlightedCard(item)"
      >
        {{ JSON.stringify({ path: "details", params: { session: item.id } }) }}
        <SvgIcon :name="icons[i]" class="relative bottom-0 right-0 w-32 h-32 float-right" />
        <div class="flex flex-col dark:text-slate-200 text-slate-600">
          <p v-if="isHighlightedCard(item)" class="italic text-sm">
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
        <BaseButton
          v-if="showButton(item)"
          :icon="'play_arrow'"
          color="success"
          variant="circular"
          @click.stop="runWorkout(item.id)"
          class="float-right"
        />
      </Card>
    </RouterLink>
  </div>
  <ErrorBanner v-else text="No sessions found" />
  <ButtonLink
    v-if="
      !props.loading &&
      (userStore.isTrainer || userStore.isSelfMadeMan) &&
      activityStore.getMissingDays.length > 0
    "
    icon="add"
    :full="true"
    :color="userStore.isTrainer ? 'purple' : 'primary'"
    :to="{ path: '/session' }"
    :type="LinkType.BUTTON"
    label="Add day activities"
  />
</template>
