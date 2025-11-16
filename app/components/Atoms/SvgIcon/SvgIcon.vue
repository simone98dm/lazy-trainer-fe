<script lang="ts" setup>
import { type SvgAvailableIcons } from '~/utils';
import { defineAsyncComponent } from 'vue';

interface SvgIconProps {
  name: SvgAvailableIcons;
}

const { name } = defineProps<SvgIconProps>();

const icon = defineAsyncComponent(
  () => import(`../../../assets/svg/${name}.svg`),
);
</script>

<template>
  <component
    :is="icon"
    class="fill-current"
  />
</template>
