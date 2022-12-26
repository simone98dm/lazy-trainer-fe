<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { LinkType } from "~/utils";

  const props = defineProps({
    to: {
      type: Object,
      required: true,
    },
    full: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: LinkType.BUTTON,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    color: {
      type: String,
      required: false,
      default: "primary",
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
  });
</script>

<template>
  <router-link :to="to" @click="$emit('click')">
    <Button
      v-if="type === LinkType.BUTTON"
      :full="full"
      :type="type"
      :label="label"
      :color="color"
      :icon="icon"
    />
    <div v-else>
      <Icon
        v-if="props.icon"
        :component="props.icon"
        class="float-left inline"
      />
      <slot />
      <span
        v-if="props.label"
        class="ml-2 float-left inline text-md sm:text-sm"
        >{{ props.label }}</span
      >
    </div>
  </router-link>
</template>
