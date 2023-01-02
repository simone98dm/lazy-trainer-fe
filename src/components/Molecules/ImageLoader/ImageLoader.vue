<script setup lang="ts">
  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <iframe
    v-if="props.src"
    class="w-full p-4 mx-auto h-96 sm:h-128"
    :src="`https://www.youtube.com/embed/${props.src}?&autoplay=1`"
    title="Video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>
