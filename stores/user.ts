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
      return RoleName[Number(state.user?.role) as Role];
    },
    isTrainer: (state) => {
      return Number(state.user?.role) === Role.TRAINER;
    },
    isSelfMadeMan: (state) => {
      return Number(state.user?.role) === Role.SELFMADE;
    },
    isNormal: (state) => {
      return Number(state.user?.role) === Role.NORMAL;
    },
  },
  actions: {
    async signIn(username: string, password: string) {
      try {
        const client = useWorkoutClient();

        const restoreSession = await client.auth.getSession();
        if (restoreSession) {
          restoreSession.data.session?.user;
        }

        const { error } = await client.auth.signInWithPassword({
          email: username,
          password: password,
        });

        if (error) {
          throw new Error(error.message);
        }

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

      const { data, error } = await useWorkoutClient().auth.getSession();
      if (error) {
        console.error(error.message);
        return null;
      }

      const userResponse = await $user.getUserData(data.session?.user?.id);

      if (userResponse) {
        this.user = userResponse;
      }

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

      await client.auth.signOut();
      await clearStorage();
      await router.push({ name: "home" });
    },
    async retrieveClients() {
      const { $user } = useNuxtApp();
      return await $user.getTrainerClients(this.user?.id);
    },
  },
});
