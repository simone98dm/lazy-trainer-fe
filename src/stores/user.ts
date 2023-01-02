import { defineStore } from "pinia";
import { IUserResponse } from "../models/User";
import { Role } from "../utils";
import { getGroups, signIn, userInfo, verifyUser } from "../helpers/http";
import { clearStorage, getStorage, saveStorage } from "~/helpers/storage";
import log from "~/helpers/logger";

export const useUserStore = defineStore("user", {
  state: () => ({
    userId: "",
    username: "",
    token: "",
    role: 0,
    trainer: undefined as { name: string; id: string } | undefined,
  }),
  getters: {
    isLogged: (state) => {
      return state.token !== "";
    },
    getUsername: (state) => {
      return state.username;
    },
    isTrainer: (state) => {
      return state.role === Role.TRAINER;
    },
    isSelfMadeMan: (state) => {
      return state.role === Role.SELFMADE;
    },
    getTrainer: (state) => {
      return state.trainer ?? { name: "" };
    },
  },
  actions: {
    async signIn(username: string, password: string) {
      return await signIn(username, password)
        .then(async (response) => {
          const { token, id, name, role } = response;
          if (token && id) {
            this.token = token;
            this.userId = id;
            this.username = name;
            this.role = role as Role;

            await saveStorage("_token", { token });
            return { id };
          }

          return { err: response.error };
        })
        .catch((err) => {
          log(err, "error");
          return { id: undefined, err: "Error" };
        });
    },
    async verifyStorage() {
      const t = await getStorage<{ token: string }>("_token");
      if (t) {
        return await verifyUser(t.token).then(async (response) => {
          if (response.error) {
            await this.logout();
            return;
          }

          const { token, id, name, role } = response;

          this.token = token;
          this.userId = id;
          this.username = name;
          this.role = role as Role;

          await saveStorage("_token", { token });
        });
      }
    },
    async getTrainerInfo(trainerId: string | undefined) {
      if (!trainerId) {
        return;
      }
      const response = await userInfo(this.token, trainerId);

      if (response) {
        this.trainer = response as { id: string; name: string };
      }
    },
    async logout() {
      await clearStorage();
      location.href = "/";
    },
    async retrieveClients() {
      return getGroups(this.token, this.userId);
    },
  },
});
