import { defineStore } from "pinia";
import { IUserResponse } from "../models/User";
import { Role } from "../utils";
import { getGroups, signIn, userInfo, verifyUser } from "../helpers/http";
import { clearStorage, getStorage, saveStorage } from "~/helpers/storage";

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
      return await signIn(username, password).then((response) => {
        if (response) {
          const { token, id, name, role } = response;

          this.token = token;
          this.userId = id;
          this.username = name;
          this.role = role as Role;

          saveStorage("_token", { token });
          return { id };
        }

        return { err: response.error };
      });
    },
    async verifyStorage() {
      const t = getStorage<{ token: string }>("_token");
      if (t) {
        return await verifyUser(t.token).then((response) => {
          if (response.error) {
            this.logout();
            return;
          }

          const { token, id, name, role } = response;

          this.token = token;
          this.userId = id;
          this.username = name;
          this.role = role as Role;

          saveStorage("_token", { token });
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
    logout() {
      clearStorage();
      location.href = "/";
    },
    async retrieveClients() {
      return getGroups(this.token, this.userId);
    },
  },
});
