<script setup lang="ts">
  import { Color, LinkType } from "~~/utils";
  import MaterialIcon from "~~/components/Atoms/MaterialIcon/MaterialIcon.vue";

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
  <RouterLink :to="to" @click="$emit('click')">
    <BaseButton
      v-if="type === LinkType.BUTTON"
      :full="full"
      :label="label"
      :color="color"
      :icon="icon"
    />
    <div v-else>
      <MaterialIcon v-if="icon" :component="icon" class="float-left inline" />
      <slot />
      <span v-if="label" class="ml-2 float-left inline text-md sm:text-sm">
        {{ label }}
      </span>
    </div>
  </RouterLink>
</template>
