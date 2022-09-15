<script setup lang="ts">
import { useRouter } from "vue-router";
import Icon from "../Icons/Icon.vue";
import LeftIcon from "../Icons/LeftIcon.vue";
import { IconSize } from "../../utils/enum";

const router = useRouter();
const emits = defineEmits(["click"]);

function onClickHandle() {
  router.back();
  emits("click");
}
</script>s

<template>
  <button @click="onClickHandle" class="back__button">
    <Icon :component="LeftIcon" :size="IconSize.SMALL"></Icon>
    <span class="ml-2"> Back </span>
  </button>
</template>

<style>
.back__button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
