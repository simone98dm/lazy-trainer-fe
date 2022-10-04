<script setup lang="ts">
  import Item from "~/components/Item/Item.vue";
  import Link from "~/components/Link/Link.vue";
  import { useUserStore } from "~/stores/user";
  import { ButtonSize, LinkType } from "~/utils";
  import ErrorBanner from "~/components/ErrorBanner/ErrorBanner.vue";
  import PlaceholderList from "~/components/Placeholder/PlaceholderList.vue";
  const user = useUserStore();
  const props = defineProps(["list", "loading"]);
</script>

<template>
  <PlaceholderList v-if="props.loading"></PlaceholderList>
  <div v-else>
    <div v-if="props.list && props.list.length > 0" class="mb-6" id="sessions">
      <Link
        v-for="item in props.list"
        :to="{ name: 'details', params: { sessionId: item.id } }"
      >
        <Item
          :name="item.name"
          :description="item.description"
          :id="item.id"
          :key="item.id"
        />
      </Link>
    </div>
    <ErrorBanner v-else text="No sessions found"></ErrorBanner>
  </div>
  <Link
    v-if="user.isTrainer || user.isSelfMadeMan"
    icon="add"
    :size="ButtonSize.MEDIUM"
    :to="{ name: 'session' }"
    :type="LinkType.BUTTON"
    label="Add day activities"
  />
</template>
