<script setup>
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth-store";
import { apiConstants } from "@/utils/api-constants";
import { instance } from "@/utils/axios-instance";
import { errorMapping } from "@/utils/error-mapping";
import { useForm } from "vee-validate";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import { toTypedSchema } from "@vee-validate/yup";
import * as Yup from "yup";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

const authStore = useAuthStore();
const toast = useToast();
// Validation Schema
const validationSchema = toTypedSchema(
  Yup.object({
    email: Yup.string().required().email().max(30),
    password: Yup.string().required().min(8).max(16),
  })
);

const { errors, defineField, handleSubmit } = useForm({
  validationSchema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
// State related variable to manage page's different states
const state = reactive({
  isLoading: false,
  isSuccess: false,
  isError: false,
});
// Handling submit section
const onSubmit = handleSubmit(async (values) => {
  try {
    state.isLoading = true;
    const response = await instance.post(apiConstants.signIn, values);
    state.isSuccess = true;
    authStore.setUser(response.data);
    router.replace("/");
  } catch (error) {
    console.log(error);
    const message = errorMapping(error);
    toast.error(message);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="flex flex-col justify-center w-full border p-6 rounded-md">
    <span class="text-2xl font-light">Welcome !</span>
    <span class="text-3xl font-medium mt-3">Sign in to</span>
    <span class="text-sm font-normal mb-4">Lorem ipsum</span>
    <form @submit="onSubmit" class="flex flex-col">
      <label htmlFor="email" class="text-sm font-medium mb-2">Email</label>
      <input
        v-model="email"
        v-bind:emailAttrs
        type="text"
        name="email"
        id="email"
        placeholder="your@email.com"
        class="rounded-md py-3 px-4 border border-black mb-4"
      />
      <h4
        v-if="errors.email"
        class="text-red-700 bg-[rgba(138,58,52,0.4)] mb-4 rounded-md px-2 font-light"
      >
        {{ errors.email }}
      </h4>
      <label htmlFor="password" class="text-sm font-medium mb-2"
        >password</label
      >
      <input
        v-model="password"
        v-bind:passwordAttrs
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        class="rounded-md py-3 px-4 border border-black mb-4"
      />
      <h4
        v-if="errors.password"
        class="text-red-700 bg-[rgba(138,58,52,0.4)] mb-4 rounded-md px-2 font-light"
      >
        {{ errors.password }}
      </h4>
      <div class="flex m-3">
        <input type="checkbox" name="remember" id="remember" class="" />
        <label
          htmlFor="remember"
          class="me-auto font-thin text-sm text-[#4D4D4D]"
          >Remeber Me</label
        >
        <RouterLink
          to="/auth/sign-up"
          class="font-thin text-sm text-[#4D4D4D] underline underline-offset-1"
          >Forget password ?</RouterLink
        >
      </div>
      <button
        type="submit"
        :class="{
          'rounded-md text-white text-center py-3 h-14': true,
          'bg-black': !state.isLoading,
          'bg-[rgba(0,0,0,.4)]': state.isLoading,
        }"
      >
        <template v-if="state.isLoading"
          ><ClipLoader :color="white"
        /></template>
        <template v-if="!state.isLoading"> Login </template>
      </button>
    </form>
    <div class="flex mx-auto font-thin text-sm text-[#4D4D4D] mt-14 mb-4">
      <span class="me-2">Don't have an Account?</span>
      <RouterLink to="/auth/sign-up" class="font-semibold text-black"
        >Register</RouterLink
      >
    </div>
  </div>
</template>
