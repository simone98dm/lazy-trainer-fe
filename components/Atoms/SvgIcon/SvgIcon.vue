<script lang="ts" setup>
  import { SvgAvailableIcons } from "utils";
  import { defineAsyncComponent, PropType } from "vue";

  const props = defineProps({
    name: {
      type: String as PropType<SvgAvailableIcons>,
      required: true,
    },
  });

  const icon = defineAsyncComponent(() => import(`../../../assets/svg/${props.name}.svg`));
</script>

<template>
  <component :is="icon" class="fill-current" />
</template>
