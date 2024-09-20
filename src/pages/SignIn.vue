<script setup>
import { router } from "@/router";
import { useAuthStore } from "@/stores/auth-store";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { signInValidationSchema } from "@/utils/validation-schemas";
import { storeToRefs } from "pinia";
import { STATUS_VALUES } from "@/utils/constants";

const authStore = useAuthStore();
const { signInStatus } = storeToRefs(authStore);
const toast = useToast();
// Validation Schema

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: signInValidationSchema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  await authStore.signInUser(values);
  if (!authStore.error) {
    return router.replace("/");
  } else toast.error(authStore.error);
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
          'bg-black': signInStatus != STATUS_VALUES.loading,
          'bg-[rgba(0,0,0,.4)]': signInStatus === STATUS_VALUES.loading,
        }"
      >
        <template v-if="signInStatus === STATUS_VALUES.loading"
          ><clip-loader :color="'#ffffff'"></clip-loader
        ></template>
        <template v-if="signInStatus != STATUS_VALUES.loading">
          Login
        </template>
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
