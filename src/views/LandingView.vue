<script setup lang="ts">
  import workoutImage from "~/assets/workout.jpg";
  import { Color, LinkType } from "~/utils";
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-50" />
  <div
    class="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center"
    :style="{ backgroundImage: `url(${workoutImage})` }"
  />
  <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
  <div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
    <div class="mx-auto max-w-[43rem]">
      <div class="text-center">
        <h1 class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-white">
          Lazy-Trainer
        </h1>
        <p class="mt-3 text-lg leading-relaxed text-slate-100">
          Lazy-Trainer is a web app that simplifies the approach to physical activity for those who
          are particularly lazy
        </p>
      </div>

      <div class="mt-6 flex items-center justify-center gap-4">
        <Link
          :type="LinkType.BUTTON"
          :color="Color.LIGHT"
          icon="login"
          :to="{ name: 'login' }"
          label="Login"
        />
        <Link
          :type="LinkType.BUTTON"
          :color="Color.DARK"
          class="ml-4"
          icon="inventory"
          :to="{ name: 'home' }"
          label="Register"
        />
      </div>
    </div>
  </div>
</template>
