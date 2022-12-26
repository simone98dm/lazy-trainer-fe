<script setup lang="ts">
  const emits = defineEmits(["click"]);

  function onClickHandle() {
    emits("click");
  }
</script>
s

<template>
  <button @click="onClickHandle" class="back__button">
    <Icon component="arrow_back" />
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
