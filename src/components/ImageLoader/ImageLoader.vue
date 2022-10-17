<script setup lang="ts">
  const props = defineProps(["src", "width", "height"]);
</script>

<template>
  <div v-if="props.src">
    <iframe
      height="300"
      width="450"
      :src="props.src"
      title="Video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
