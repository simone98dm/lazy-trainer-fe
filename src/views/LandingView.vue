<script setup lang="ts">
  import workoutImage from "~/assets/workout.jpg";
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-50" />
  <div
    class="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center"
    :style="{ backgroundImage: `url(${workoutImage})` }"
  />
  <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
  <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
    <h1 class="text-5xl text-white font-bold">Lazy Trainers</h1>
    <div class="text-white max-w-3xl mx-4 sm:mx-auto text-center">
      <p class="mt-6 text-xl sm:text-3xl">
        Lazy-Trainer is a web app that simplifies the approach to physical activity for those who
        are particularly lazy
      </p>
    </div>
    <div class="mt-8 flex">
      <Button class="text-white" icon="login" @click="() => $router.push('/login')" label="Login" />
      <Button
        class="text-white ml-4"
        icon="inventory"
        @click="() => $router.push('/register')"
        label="Register"
      />
    </div>
  </div>
</template>
