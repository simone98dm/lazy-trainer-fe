import { WorkoutRepository, UserRepository } from '~/repositories/workout';

export interface PluginsInjections {
  $workout: WorkoutRepository;
  $user: UserRepository;
}

declare module '#app' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface NuxtApp extends PluginsInjections {}
}
declare module 'nuxt/dist/app/nuxt' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface NuxtApp extends PluginsInjections {}
}
declare module '@vue/runtime-core' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ComponentCustomProperties extends PluginsInjections {}
}

export {};
