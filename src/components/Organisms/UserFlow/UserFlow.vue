<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { ICustomSession } from "~/models/Session";
  import { useActivityStore, useTimerStore, useUserStore } from "~/store";
  import { Color, LinkType } from "~/utils";
  import Icon1 from "~/assets/svg/working_out_re_nhkg.svg";
  import Icon2 from "~/assets/svg/fitness_tracker_3033.svg";
  import Icon3 from "~/assets/svg/healthy_habit_m1a9.svg";
  import Icon4 from "~/assets/svg/indoor_bike_pwa4.svg";
  import Icon5 from "~/assets/svg/personal_trainer_re_cnua.svg";
  import Icon6 from "~/assets/svg/pilates_ftsd.svg";
  import Icon7 from "~/assets/svg/runner_start_x-0-uu.svg";
  import Icon8 from "~/assets/svg/fitness_stats_sht6.svg";

  const icons = [Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8];

  const userStore = useUserStore();
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
    if (warmupList && warmupList.length > 0) {
      timerStore.setListActivities(warmupList);
    } else {
      timerStore.setListActivities(activityList);
    }
    router.push({ name: "timer", params: { sessionId } });
  }
</script>

<template>
  <PlaceholderList v-if="props.loading" />
  <div v-else-if="props.list && props.list.length > 0" class="flex flex-wrap w-full mb-6">
    <Card
      v-for="(item, i) in props.list"
      :key="item.id"
      class="cursor-pointer xl:h-[200px] xl:w-[350px] w-full xl:mx-2"
      :highlight="isHighlightedCard(item)"
      @click="() => router.push({ name: 'details', params: { sessionId: item.id } })"
    >
      <img :src="icons[i]" class="relative bottom-0 right-0 w-32 h-32 float-right" />
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
      <Button
        v-if="showButton(item)"
        :icon="'play_arrow'"
        :color="Color.SUCCESS"
        :circular="true"
        @click.stop="runWorkout(item.id)"
        class="float-right"
      />
    </Card>
  </div>
  <ErrorBanner v-else text="No sessions found" />
  <Link
    v-if="
      !props.loading &&
      (userStore.isTrainer || userStore.isSelfMadeMan) &&
      activityStore.getMissingDays.length > 0
    "
    icon="add"
    :full="true"
    :color="userStore.isTrainer ? Color.PURPLE : Color.PRIMARY"
    :to="{ name: 'session' }"
    :type="LinkType.BUTTON"
    label="Add day activities"
  />
</template>
