<script setup lang="ts"></script>

<template>
  <span class="input">HH:mm</span>
</template>

<style>
  .input {
    width: 100%;
  }
  .select-list {
    display: flex;
    max-height: 250px;
    z-index: 100;
  }
  .hours {
    max-height: 250px;
    overflow-y: scroll;
    width: 100%;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
  }
  .minutes {
    max-height: 250px;
    overflow-y: scroll;
    width: 100%;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
  }
</style>
