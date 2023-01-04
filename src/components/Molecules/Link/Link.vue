<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { ButtonColor, ButtonSize, LinkType } from "~/utils";

  defineProps({
    to: {
      type: Object,
      required: true,
    },
    type: {
      type: Number,
      required: false,
      default: LinkType.ROUTER,
    },
    full: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: Number,
      required: false,
      default: ButtonSize.MEDIUM,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    color: {
      type: Number,
      required: false,
      default: ButtonColor.PRIMARY,
    },
    icon: {
      type: String,
      required: false,
      default: "",
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    circular: {
      type: Boolean,
      required: false,
      default: false,
    },
  });
</script>

<template>
  <router-link :to="to" @click="$emit('click')">
    <Button
      v-if="type === LinkType.BUTTON"
      :full="full"
      :label="label"
      :color="color"
      :icon="icon"
      :circular="circular"
      :class="class"
      :loading="loading"
      :size="size"
    />
    <div v-else>
      <Icon v-if="icon" :component="icon" class="float-left inline" />
      <slot />
      <span v-if="label" class="ml-2 float-left inline text-md sm:text-sm">
        {{ label }}
      </span>
    </div>
  </router-link>
</template>
