import { defineStore } from "pinia";
import { Role } from "~/utils";
import { clearStorage } from "~/helpers/storage";
import { useWorkoutClient } from "~/composable/useWorkoutClient";
import { User } from "~/models/User";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as User,
    trainer: {} as User,
  }),
  getters: {
    isLogged: () => {
      const user = useSupabaseUser();
      return user.value !== null;
    },
    getUsername: () => {
      const user = useSupabaseUser();
      return user.value.name;
    },
    isTrainer: (state) => {
      return state.user?.role === Role.TRAINER;
    },
    isSelfMadeMan: (state) => {
      return state.user?.role === Role.SELFMADE;
    },
    getTrainer: (state) => {
      return state.trainer ?? { name: "" };
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

        this.user = {
          ...this.user,
          token: loginResponse.data.session.access_token,
          id: loginResponse.data.user.id,
        };

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

      const {
        data: { user },
      } = await client.auth.getUser();

      const userResponse = await $user.getUserData(user?.id);
      const { name, role } = userResponse;

      this.user = { ...this.user, name, role };

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
      return await $user.getTrainerClients(this.user.id);
    },
  },
});
