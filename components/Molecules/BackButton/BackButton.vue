<template>
  <button @click="$emit('click')" class="back__button">
    <MaterialIcon component="arrow_back" />
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
