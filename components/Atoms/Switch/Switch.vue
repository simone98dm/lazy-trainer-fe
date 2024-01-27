<script setup lang="ts">
  interface SwitchProps {
    id: string;
    name: string;
    checked?: boolean;
  }

  withDefaults(defineProps<SwitchProps>(), {
    checked: false,
  });

  interface SwitchEmits {
    (e: "toggle", status: boolean): void;
  }

  defineEmits<SwitchEmits>();
</script>

<template>
  <label :for="id" class="flex items-center cursor-pointer switch">
    <input
      type="checkbox"
      class="sr-only"
      :id="id"
      :name="name"
      :checked="checked"
      @change="$emit('toggle', (($event.target as any) || undefined)?.checked)"
    />
    <span class="slider"></span>
  </label>
</template>

<style>
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border: 1px solid #adb5bd;
    transition: 0.4s;
    border-radius: 30px;
  }

  @media (prefers-color-scheme: dark) {
    .slider {
      background-color: rgb(17 24 39);
    }
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 20px;
    left: 0.27em;
    bottom: 0.25em;
    background-color: #adb5bd;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #007bff;
    border: 1px solid #007bff;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #007bff;
  }

  input:checked + .slider:before {
    transform: translateX(1.4em);
    background-color: #fff;
  }
</style>
