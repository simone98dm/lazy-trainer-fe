<script setup lang="ts">
  import workoutImage from "~/assets/workout.jpg";
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-3/4 overflow-hidden">
    <img :src="workoutImage" alt="workout" class="w-full overflow-hidden" />
  </div>
  <div class="absolute top-0 left-0 z-10 mt-40">
    <div class="text-center text-2xl">
      <!-- heading -->
      <div class="text-white">
        <h1 class="text-5xl font-bold">Lazy Trainer</h1>
        <p class="font-bolder">
          Lazy-Trainer, is a web app that simplifies the approach to physical
          activity for those who are particularly lazy🤓
        </p>
      </div>
      <!-- end heading -->
      <!-- content -->
      <div class="mt-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill-opacity="1" d="M0,256L1440,32L1440,320L0,320Z"></path>
        </svg>
      </div>
      <p>
        Through your account, you will be able to see and interact with your
        circuit and keep track of individual activities during execution.
        Obviously you have to put the tenacity, the resistance and the
        condition! 💪
      </p>
      <div>
        The methods of use are 2:
        <ul>
          <li>Self-taught: creating your own circuit independently.</li>
          <li>
            From trainer and trainer: by associating a trainer to your account,
            you can run the circuit that a trainer has assigned you.
          </li>
        </ul>
      </div>

      <div class="relative right-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FF0066"
            d="M60.7,-46.4C69.3,-37.6,60.6,-12.9,50.7,4C40.8,20.9,29.9,30.1,14.6,41.8C-0.6,53.5,-20.1,67.8,-33.5,63.6C-46.9,59.4,-54.3,36.7,-55.9,16.5C-57.5,-3.7,-53.4,-21.5,-43.1,-30.7C-32.9,-39.9,-16.4,-40.4,4.8,-44.2C26,-48.1,52.1,-55.2,60.7,-46.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div>
        The features currently available are:
        <ul>
          <li>⛓view your weekly plan</li>
          <li>📄 creation of activities in a simple way</li>
          <li>⏱ keep track of the times for the activities to be performed</li>
          <li>🤝 trainer association</li>
        </ul>
      </div>
      <!-- end content -->
    </div>
  </div>
</template>
