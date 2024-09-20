<script setup>
import { router } from "@/router";
import { RouterLink } from "vue-router";
import { useToast } from "vue-toastification";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { useForm } from "vee-validate";
import { useRegisterStore } from "@/stores/register-store";
import {
  sendOtpValidationSchema,
  signUpValidationSchema,
} from "@/utils/validation-schemas";
import { STATUS_VALUES } from "@/utils/constants";
const toast = useToast();
const registerStore = useRegisterStore();

// Otp related logic
const {
  defineField: defineFieldOtp,
  errors: OtpFormErrors,
  handleSubmit: handleOtpFormSubmit,
} = useForm({
  validationSchema: sendOtpValidationSchema,
});

const [email, emailAttrs] = defineFieldOtp("email");

const onSubmitOtpForm = handleOtpFormSubmit(async (values) => {
  console.log(values);

  await registerStore.sendOtp(values);
  if (
    registerStore.sendOtpError &&
    registerStore.sendOtpStatus === STATUS_VALUES.failure
  ) {
    toast.error(registerStore.sendOtpError);
  } else {
    toast.success(registerStore.sendOtpSuccessMessage);
  }
});

// Register user related logic
const {
  defineField: defineFieldSignUp,
  errors: SignUpFormErrors,
  handleSubmit: handleSignUpFormSubmit,
} = useForm({
  validationSchema: signUpValidationSchema,
});

const [firstName, firstNameAttrs] = defineFieldSignUp("firstName");
const [lastName, lastNameAttrs] = defineFieldSignUp("lastName");
const [password, passwordAttrs] = defineFieldSignUp("password");
const [otp, otpAttrs] = defineFieldSignUp("otp");

const onSubmitSignUpForm = handleSignUpFormSubmit(async (values) => {
  await registerStore.signUp(values);
  if (
    !registerStore.registerUserError &&
    registerStore.registerUserSuccessMessage
  ) {
    toast.success(registerStore.registerUserSuccessMessage);
    return router.replace("/auth");
  }
  toast.error(registerStore.registerUserError);
});
</script>

<template>
  <div class="flex flex-col justify-center w-full border p-6 rounded-md">
    <span class="text-2xl font-light">Welcome !</span>
    <span class="text-3xl font-medium mt-3">Sign up to</span>
    <span class="text-sm font-normal mb-4">Lorem ipsum</span>
    <form
      @submit="onSubmitOtpForm"
      v-if="registerStore.sendOtpStatus != STATUS_VALUES.success"
      class="flex flex-col"
    >
      <label for="email" class="text-sm font-medium mb-2">Email</label>
      <input
        v-model="email"
        :emailAttrs
        type="text"
        name="email"
        id="email"
        placeholder="your@email.com"
        class="rounded-md py-3 px-4 border border-black mb-4"
      />
      <h4
        v-if="OtpFormErrors.email"
        class="text-red-700 bg-[rgba(138,58,52,0.4)] mb-4 rounded-md px-2 font-light"
      >
        {{ OtpFormErrors.email }}
      </h4>
      <button
        type="submit"
        :class="{
          'rounded-md text-white text-center py-3 h-14 ': true,
          'bg-black': registerStore.sendOtpStatus != STATUS_VALUES.loading,
          'bg-[rgba(0,0,0,.4)]':
            registerStore.sendOtpStatus === STATUS_VALUES.loading,
        }"
      >
        <template v-if="registerStore.sendOtpStatus === STATUS_VALUES.loading"
          ><clip-loader :color="'#ffffff'"></clip-loader
        ></template>
        <template v-if="registerStore.sendOtpStatus != STATUS_VALUES.loading"
          >Register</template
        >
      </button>
    </form>
    <form
      @submit="onSubmitSignUpForm"
      v-else="registerStore.sendOtpStatus === STATUS_VALUES.success"
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
            v-model="firstName"
            :firstNameAttrs
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            class="rounded-md py-3 px-4 border border-black mb-4"
          />
          <h4
            v-if="SignUpFormErrors.firstName"
            class="text-red-700 bg-[rgba(138,58,52,0.4)] mb-4 rounded-md px-2 font-light"
          >
            {{ SignUpFormErrors.firstName }}
          </h4>
        </div>
        <div class="flex flex-col w-full md:w-[45%]">
          <label htmlFor="lastName" class="text-sm font-medium mb-2"
            >Last Name</label
          >
          <input
            v-model="lastName"
            :lastNameAttrs
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            class="rounded-md py-3 px-4 border border-black mb-4"
          />
          <h4
            v-if="SignUpFormErrors.lastName"
            class="text-red-700 bg-[rgba(138,58,52,0.4)] mb-4 rounded-md px-2 font-light"
          >
            {{ SignUpFormErrors.lastName }}
          </h4>
        </div>
      </div>

      <label htmlFor="password" class="text-sm font-medium mb-2"
        >Password</label
      >
      <input
        v-model="password"
        :passwordAttrs
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        class="rounded-md py-3 px-4 border border-black mb-4"
      />
      <h4
        v-if="SignUpFormErrors.password"
        class="text-red-700 bg-[rgba(138,58,52,0.4)] mb-4 rounded-md px-2 font-light"
      >
        {{ SignUpFormErrors.password }}
      </h4>

      <label htmlFor="otp" class="text-sm font-medium mb-2">Otp</label>
      <input
        v-model="otp"
        :otpAttrs
        type="text"
        name="otp"
        id="otp"
        placeholder="Enter your otp"
        class="rounded-md py-3 px-4 border border-black mb-4"
      />
      <h4
        v-if="SignUpFormErrors.otp"
        class="text-red-700 bg-[rgba(138,58,52,0.4)] mb-4 rounded-md px-2 font-light"
      >
        {{ SignUpFormErrors.otp }}
      </h4>
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
        :class="{
          'rounded-md text-white text-center py-3 h-14 ': true,
          'bg-black': registerStore.registerUserStatus != STATUS_VALUES.loading,
          'bg-[rgba(0,0,0,.4)]':
            registerStore.registerUserStatus === STATUS_VALUES.loading,
        }"
      >
        <template
          v-if="registerStore.registerUserStatus === STATUS_VALUES.loading"
        >
          <clip-loader :color="'#ffffff'"></clip-loader
        ></template>

        <template
          v-if="registerStore.registerUserStatus != STATUS_VALUES.loading"
          >Register</template
        >
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
