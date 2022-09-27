<script setup lang="ts">
  import AddIcon from "~/components/Icons/AddIcon.vue";
  import Item from "~/components/Item/Item.vue";
  import Link from "~/components/Link/Link.vue";
  import Loading from "../Loading/Loading.vue";
  import { useUserStore } from "~/stores/user";
  import { ButtonSize, LinkType } from "~/utils";
  const user = useUserStore();
  const props = defineProps(["list", "loading"]);
</script>

<template>
  <div class="flex justify-center w-full" v-if="props.loading">
    <Loading></Loading>
  </div>
  <section v-else>
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
    <div v-else>
      <h1 class="mb-3 text-2xl font-bold">No sessions found</h1>
    </div>
    <div v-if="user.isTrainer || user.isSelfMadeMan">
      <Link
        :icon="AddIcon"
        :size="ButtonSize.MEDIUM"
        :to="{ name: 'session' }"
        :type="LinkType.BUTTON"
        label="Add day activities"
      />
    </div>
  </section>
</template>
