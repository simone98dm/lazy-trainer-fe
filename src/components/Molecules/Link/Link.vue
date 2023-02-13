<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { Color, LinkType } from "~/utils";

  defineProps({
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
      type: Number,
      required: false,
      default: LinkType.ROUTER,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    color: {
      type: Number,
      required: false,
      default: Color.PRIMARY,
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
      :label="label"
      :color="color"
      :icon="icon"
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
