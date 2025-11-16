<script setup lang="ts">
interface ImageLoaderProps {
  src: string;
}

defineProps<ImageLoaderProps>();
</script>

<template>
  <iframe
    v-if="src"
    class="w-full p-4 mx-auto h-96 sm:h-128"
    :src="`https://www.youtube.com/embed/${src}?&autoplay=1`"
    title="Video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
</template>
