import { IPlan } from "./../models/Plan";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userId: "",
    username: "",
    token: "",
  }),
  getters: {
    isLogged: (state) => {
      return state.token !== "";
    },
  },
  actions: {
    async signIn(username: string, password: string) {
      const response = await fetch("/api/auth/sign", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      }).then((response) => response.json());

      if (response.data) {
        const user = response as { data: { userId: string; token: string } };
        this.token = user.data.token;
        this.userId = user.data.userId;
        this.username = username;
        return undefined;
      }

      return response.error;
    },
    async getUserActivities(): Promise<IPlan> {
      const activities = await fetch("/api/trainer", {
        method: "GET",
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      }).then((response) => response.json());

      return activities[0];
    },
  },
});
