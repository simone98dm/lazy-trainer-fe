import { defineStore } from "pinia";
import { IUserResponse } from "../models/User";
import { Role } from "../utils";

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
    getTrainer: (state) => {
      return state.trainer?.name ?? "";
    },
  },
  actions: {
    async signIn(username: string, password: string) {
      const response = await fetch("/api/auth/sign", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }).then((response) => response.json());

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
    },
    async verifyStorage() {
      const token = localStorage.getItem("_token");
      if (token) {
        const response = await fetch("/api/auth/verify", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then((response) => response.json());

        if (response.data) {
          const { data } = response as IUserResponse;
          const { token, id, name, role } = data;

          this.token = token;
          this.userId = id;
          this.username = name;
          this.role = role as Role;

          localStorage.setItem("_token", this.token);
        }
      }
    },
    async getTrainerInfo(trainerId: string | undefined) {
      if (!trainerId) {
        return;
      }
      const response = await fetch(`/api/user?user=${trainerId}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      }).then((response) => response.json());

      if (response) {
        this.trainer = response as { id: string; name: string };
      }
    },
    logout() {
      localStorage.clear();
      location.href = "/";
    },
  },
});
