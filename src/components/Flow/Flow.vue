<script setup lang="ts">
  import { useUserStore } from "~/stores/user";
  import { ButtonSize, LinkType } from "~/utils";
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
