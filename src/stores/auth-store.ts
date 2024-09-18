import { defineStore } from "pinia";

type User = {
  accessToken: string | null;
  refreshToken: string | null;
};
export const useAuthStore = defineStore("auth-store", {
  state: () => {
    return {
      user:
        (JSON.parse(localStorage.getItem("user") as string) as User) || null,
    };
  },
  actions: {
    setUser(user: User) {
      localStorage.setItem("user", JSON.stringify(user));
      this.$state.user = user;
    },
  },
});
