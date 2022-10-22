import { defineStore } from "pinia";
import { IUserResponse } from "../models/User";
import { Role } from "../utils";
import { getGroups, signIn, userInfo, verifyUser } from "../helpers/http";

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
        if (response.data) {
          const { data } = response as IUserResponse;
          const { token, id, name, role } = data;

          this.token = token;
          this.userId = id;
          this.username = name;
          this.role = role as Role;

          localStorage.setItem("_token", this.token);
          return undefined;
        }

        return response.error;
      });
    },
    async verifyStorage() {
      const token = localStorage.getItem("_token");
      if (token) {
        return await verifyUser(token).then((response) => {
          if (response.error) {
            this.logout();
            return;
          }

          if (response.data) {
            const { data } = response as IUserResponse;
            const { token, id, name, role } = data;

            this.token = token;
            this.userId = id;
            this.username = name;
            this.role = role as Role;

            localStorage.setItem("_token", this.token);
          }
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
      localStorage.clear();
      location.href = "/";
    },
    async retrieveClients() {
      return getGroups(this.token, this.userId);
    },
  },
});
