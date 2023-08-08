<script setup lang="ts">
  import { MaterialIconSizes, MaterialIcons } from "~/utils";

  interface MaterialIconProps {
    component: MaterialIcons;
    size?: MaterialIconSizes;
  }

  withDefaults(defineProps<MaterialIconProps>(), {
    size: "medium",
  });
</script>

<template>
  <span
    :class="[
      'material-icons',
      { 'md-18': size === 'small' },
      { 'md-24': size === 'medium' },
      { 'md-36': size === 'large' },
    ]"
  >
    {{ component }}
  </span>
</template>

<style>
  .material-icons.md-18 {
    font-size: 18px;
  }
  .material-icons.md-24 {
    font-size: 24px;
  }
  .material-icons.md-36 {
    font-size: 36px;
  }
</style>
