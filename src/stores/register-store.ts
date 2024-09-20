import type { Status } from "@/types/status";
import { apiConstants } from "@/utils/api-constants";
import { instance } from "@/utils/axios-instance";
import { STATUS_VALUES } from "@/utils/constants";
import { errorMapping } from "@/utils/error-mapping";
import { defineStore } from "pinia";

interface State {
  sendOtpStatus: Status;
  registerUserStatus: Status;
  sendOtpError: string | null;
  registerUserError: string | null;
  sendOtpSuccessMessage: string | null;
  registerUserSuccessMessage: string | null;
  email: string | null;
}
// Todo: extract type from yup schema or change it to zod
type SignUpForm = {
  firstName: string;
  lastName: string;
  password: string;
  otp: string;
};

export const useRegisterStore = defineStore("register-store", {
  state: (): State => {
    return {
      sendOtpStatus: STATUS_VALUES.initial,
      registerUserStatus: STATUS_VALUES.initial,
      sendOtpError: null,
      registerUserError: null,
      sendOtpSuccessMessage: null,
      registerUserSuccessMessage: null,
      email: null,
    };
  },
  actions: {
    async sendOtp(values: { email: string }) {
      try {
        this.$state.sendOtpError = null;
        this.$state.sendOtpStatus = STATUS_VALUES.loading;
        const response = await instance.post(apiConstants.sendOtp, values);
        this.$state.sendOtpStatus = STATUS_VALUES.success;
        this.$state.email = values.email;
        this.$state.sendOtpSuccessMessage =
          response.data.message + ", please check your email address";
      } catch (error) {
        console.log(error);
        this.$state.sendOtpStatus = STATUS_VALUES.failure;
        const message = errorMapping(error as Error);
        this.$state.sendOtpError = message;
      }
    },
    async signUp(values: SignUpForm) {
      try {
        this.registerUserStatus = STATUS_VALUES.loading;
        this.registerUserError = null;
        const response = await instance.post(apiConstants.signUp, {
          ...values,
          email: this.$state.email,
          phoneNumber: "0911234567",
          dob: "9-6-1999",
        });
        console.log(response.data);
        this.registerUserStatus = STATUS_VALUES.success;
        this.registerUserSuccessMessage =
          (response.data.message || "User Sign Up Successfully") +
          ", please sign in";
      } catch (error) {
        this.$state.registerUserStatus = STATUS_VALUES.failure;
        const message = errorMapping(error as Error);
        this.$state.registerUserError = message;
      }
    },
  },
});
