<script setup>
import { router } from "@/router";
import { apiConstants } from "@/utils/api-constants";
import { instance } from "@/utils/axios-instance";
import { errorMapping } from "@/utils/error-mapping";
import { ref, reactive, computed } from "vue";
import { RouterLink } from "vue-router";
import { useToast } from "vue-toastification";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

const toast = useToast();
const email = ref("");
const state = reactive({
  otpForm: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: {
      email: "",
    },
  },
  signUpForm: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {
      firstName: "",
      lastName: "",
      password: "",
      otp: "",
    },
  },
});

const handleSignUpFormSubmit = async () => {
  try {
    console.log(email);

    state.signUpForm.isLoading = true;
    const response = await instance.post(apiConstants.signUp, {
      ...state.signUpForm.data,
      email: email.value,
      phoneNumber: "0911234567",
      dob: "9-6-1999",
    });
    console.log(response.data);
    state.signUpForm.isSuccess = true;
    toast.success(
      (response.data.message || "User Sign Up Successfully") + ", please sign in"
    );
    router.replace("/auth");
  } catch (error) {
    const message = errorMapping(error);
    toast.error(message);
  } finally {
    state.otpForm.isLoading = false;
  }
};

const handleOtpFormSubmit = async () => {
  try {
    state.otpForm.isLoading = true;
    const response = await instance.post(
      apiConstants.sendOtp,
      state.otpForm.data
    );
    console.log(response.data);
    state.otpForm.isSuccess = true;
    email.value = state.otpForm.data.email;
    toast.success(response.data.message + ", please check your email address");
  } catch (error) {
    const message = errorMapping(error);
    toast.error(message);
  } finally {
    state.otpForm.isLoading = false;
  }
};
</script>

<template>
  <div class="flex flex-col justify-center w-full border p-6 rounded-md">
    <span class="text-2xl font-light">Welcome !</span>
    <span class="text-3xl font-medium mt-3">Sign up to</span>
    <span class="text-sm font-normal mb-4">Lorem ipsum</span>
    <form
      @submit.prevent="handleOtpFormSubmit"
      v-if="!state.otpForm.isSuccess"
      class="flex flex-col"
    >
      <label for="email" class="text-sm font-medium mb-2">Email</label>
      <input
        v-model="state.otpForm.data.email"
        type="text"
        name="email"
        id="email"
        placeholder="your@email.com"
        class="rounded-md py-3 px-4 border border-black mb-4"
      />
      <button
        type="submit"
        :class="{
          'rounded-md text-white text-center py-3 h-14 ': true,
          'bg-black': !state.otpForm.isLoading,
          'bg-[rgba(0,0,0,.4)]': state.otpForm.isLoading,
        }"
      >
        <template v-if="state.otpForm.isLoading"><ClipLoader /></template>
        <template v-if="!state.otpForm.isLoading">Register</template>
      </button>
    </form>
    <form
      @submit.prevent="handleSignUpFormSubmit"
      v-else="state.otpForm.isSuccess"
      class="flex flex-col"
    >
      <div
        class="flex flex-col md:flex-row items-center justify-between w-full"
      >
        <div class="flex flex-col w-full md:w-[45%]">
          <label htmlFor="firstName" class="text-sm font-medium mb-2"
            >First Name</label
          >
          <input
            v-model="state.signUpForm.data.firstName"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            class="rounded-md py-3 px-4 border border-black mb-4"
          />
        </div>
        <div class="flex flex-col w-full md:w-[45%]">
          <label htmlFor="lastName" class="text-sm font-medium mb-2"
            >Last Name</label
          >
          <input
            v-model="state.signUpForm.data.lastName"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            class="rounded-md py-3 px-4 border border-black mb-4"
          />
        </div>
      </div>

      <label htmlFor="password" class="text-sm font-medium mb-2"
        >Password</label
      >
      <input
        v-model="state.signUpForm.data.password"
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        class="rounded-md py-3 px-4 border border-black mb-4"
      />

      <label htmlFor="otp" class="text-sm font-medium mb-2">Otp</label>
      <input
        v-model="state.signUpForm.data.otp"
        type="text"
        name="otp"
        id="otp"
        placeholder="Enter your otp"
        class="rounded-md py-3 px-4 border border-black mb-4"
      />

      <div class="flex m-3">
        <input type="checkbox" name="remember" id="remember" class="" />
        <label
          htmlFor="remember"
          class="me-auto font-thin text-sm text-[#4D4D4D]"
          >Remeber Me</label
        >
        <RouterLink
          to="/auth"
          class="font-thin text-sm text-[#4D4D4D] underline underline-offset-1"
          >Forget password ?</RouterLink
        >
      </div>
      <button
        type="submit"
        class="bg-black rounded-md text-white text-center py-3 h-14"
      >
        Register
      </button>
    </form>
    <div class="flex mx-auto font-thin text-sm text-[#4D4D4D] mt-14 mb-4">
      <span class="me-2">Already have an Account?</span>
      <RouterLink to="/auth" class="font-semibold text-black"
        >Sign in</RouterLink
      >
    </div>
  </div>
</template>
