/* eslint-disable @typescript-eslint/no-empty-interface */
import { WorkoutRepository, UserRepository } from "~/repositories/workout";

export interface PluginsInjections {
  $workout: WorkoutRepository;
  $user: UserRepository;
}

declare module "#app" {
  interface NuxtApp extends PluginsInjections {}
}
declare module "nuxt/dist/app/nuxt" {
  interface NuxtApp extends PluginsInjections {}
}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties extends PluginsInjections {}
}

export {};
