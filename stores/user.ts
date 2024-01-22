import { defineStore } from "pinia";
import { Role } from "~/utils";
import { clearStorage } from "~/helpers/storage";
import { useWorkoutClient } from "~/composable/useWorkoutClient";
import type { User } from "~/models/User";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
    trainer: null as User | null,
  }),
  getters: {
    isLogged: (state) => {
      return state.user !== null;
    },
    username: (state) => {
      return state.user?.name;
    },
    humanizeRole: (state) => {
      return RoleName[state.user?.role as Role];
    },
    isTrainer: (state) => {
      return state.user?.role === Role.TRAINER;
    },
    isSelfMadeMan: (state) => {
      return state.user?.role === Role.SELFMADE;
    },
    isNormal: (state) => {
      return state.user?.role === Role.NORMAL;
    },
  },
  actions: {
    async signIn(username: string, password: string) {
      try {
        const client = useWorkoutClient();
        const loginResponse = await client.auth.signInWithPassword({
          email: username,
          password: password,
        });

        if (loginResponse.error) {
          throw new Error(loginResponse.error.message);
        }

        await client.auth.setSession({
          access_token: loginResponse.data.session.access_token,
          refresh_token: loginResponse.data.session.refresh_token,
        });

        await this.fetchUserInfo();
      } catch (ex) {
        return {
          error: ex as string,
        };
      }

      return { error: "" };
    },
    async fetchUserInfo() {
      const { $user } = useNuxtApp();
      const client = useWorkoutClient();

      const { data } = await client.auth.getUser();
      const userResponse = await $user.getUserData(data.user?.id);
      const { id, name, role, configurations } = userResponse;

      this.user = { id, name, role, configurations };

      return userResponse;
    },
    async getTrainerInfo(trainerId: string | undefined) {
      if (!trainerId) {
        return;
      }
      const { $user } = useNuxtApp();
      const response = await $user.getUserData(trainerId);

      if (response) {
        this.trainer = response;
      }
    },
    async logout() {
      const client = useWorkoutClient();
      const router = useRouter();

      await clearStorage();
      await client.auth.signOut();
      await router.push({ name: "home" });
    },
    async retrieveClients() {
      const { $user } = useNuxtApp();
      return await $user.getTrainerClients(this.user?.id);
    },
  },
});
