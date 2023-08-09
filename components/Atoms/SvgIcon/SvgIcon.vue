<script lang="ts" setup>
  import { SvgAvailableIcons } from "utils";
  import { defineAsyncComponent } from "vue";

  interface SvgIconProps {
    name: SvgAvailableIcons;
  }

  const props = defineProps<SvgIconProps>();

  const icon = defineAsyncComponent(() => import(`../../../assets/svg/${props.name}.svg`));
</script>

<template>
  <component :is="icon" class="fill-current" />
</template>
