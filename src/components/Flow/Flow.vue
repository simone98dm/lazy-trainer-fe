<script setup lang="ts">
  import AddIcon from "~/components/Icons/AddIcon.vue";
  import Item from "~/components/Item/Item.vue";
  import Link from "~/components/Link/Link.vue";
  import Loading from "../Loading/Loading.vue";
  import { useUserStore } from "~/stores/user";
  import { ButtonSize, LinkType } from "~/utils";
  import ErrorBanner from "../ErrorBanner/ErrorBanner.vue";
  const user = useUserStore();
  const props = defineProps(["list", "loading"]);
</script>

<template>
  <Loading class="flex justify-center w-full" v-if="props.loading"></Loading>
  <div v-else>
    <div v-if="props.list && props.list.length > 0" class="mb-6">
      <div v-for="item in props.list">
        <Link :to="{ name: 'details', params: { sessionId: item.id } }">
          <Item
            :name="item.name"
            :description="item.description"
            :id="item.id"
            :key="item.id"
          />
        </Link>
      </div>
    </div>
    <ErrorBanner v-else text="No sessions found"></ErrorBanner>
    <Link
      v-if="user.isTrainer || user.isSelfMadeMan"
      :icon="AddIcon"
      :size="ButtonSize.MEDIUM"
      :to="{ name: 'session' }"
      :type="LinkType.BUTTON"
      label="Add day activities"
    />
  </div>
</template>
