import { router } from "@/router";
import type { Status } from "@/types/status";
import { apiConstants } from "@/utils/api-constants";
import { instance } from "@/utils/axios-instance";
import { STATUS_VALUES } from "@/utils/constants";
import { errorMapping } from "@/utils/error-mapping";
import { defineStore } from "pinia";

type User = {
  accessToken: string | null;
  refreshToken: string | null;
};
interface State {
  user: User | null;
  signInStatus: Status;
  error: string | null;
}
export const useAuthStore = defineStore("auth-store", {
  state: (): State => {
    return {
      user:
        (JSON.parse(localStorage.getItem("user") as string) as User) || null,
      signInStatus: STATUS_VALUES.initial,
      error: null,
    };
  },
  actions: {
    setUser(user: User) {
      localStorage.setItem("user", JSON.stringify(user));
      this.$state.user = user;
    },
    async signInUser(values: { email: string; password: string }) {
      try {
        this.$state.signInStatus = STATUS_VALUES.loading;
        this.$state.error = null;
        const response = await instance.post(apiConstants.signIn, values);
        this.$state.signInStatus = STATUS_VALUES.success;
        this.setUser(response.data);
      } catch (error) {
        const message = errorMapping(error as Error);
        this.$state.signInStatus = STATUS_VALUES.failure;
        this.$state.error = message;
      }
    },
  },
});
