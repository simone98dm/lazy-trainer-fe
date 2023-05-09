<script setup lang="ts">
  import { MaterialIcons } from "~/utils";

  interface MaterialIconProps {
    component: MaterialIcons;
  }

  defineProps<MaterialIconProps>();
</script>

<template>
  <span class="material-icons-outlined">{{ component }}</span>
</template>

<style>
  .material-icons-outlined {
    font-family: "Material Symbols Outlined";
    font-weight: normal;
    font-style: normal;
    font-size: 24px; /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  }
</style>
