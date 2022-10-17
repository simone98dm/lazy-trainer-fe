<script setup lang="ts">
  const props = defineProps(["src", "width", "height"]);
</script>

<template>
  <div v-if="props.src" class="w-full p-3 md:w-1/2">
    <iframe
      class="w-full h-full"
      :src="`https://www.youtube.com/embed/${props.src}?&autoplay=1`"
      title="Video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
