<script setup lang="ts">
  import { type Color, type MaterialIcons, LinkType } from "~/utils";

  interface ButtonLinkProps {
    to: any;
    full?: boolean;
    type?: LinkType;
    label?: string;
    color?: Color;
    icon?: MaterialIcons;
  }

  withDefaults(defineProps<ButtonLinkProps>(), {
    type: LinkType.ROUTER,
    color: "primary",
    full: false,
    label: "",
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
