import { workoutRepository } from "~/repositories/workout";
import { userRepository } from "~/repositories/user";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      workout: workoutRepository,
      user: userRepository,
    },
  };
});
