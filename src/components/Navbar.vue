<script setup lang="ts">
import { useAuthStore } from "@/stores/auth-store";
import { ref } from "vue";
import { useRoute } from "vue-router";

const paths: {
  name: string;
  link: string;
}[] = [
  { name: "Home", link: "/" },
  { name: "Settings", link: "/settings" },
];
const authStore = useAuthStore();
const route = useRoute();
</script>
<template>
  <nav
    class="bg-[#F6F6F6] h-20 fixed top-0 left-0 right-0 flex justify-between items-center px-12 border-b-2 border-b-[rgba(0,0,0,0.4)]"
  >
    <h1 class="text-3xl font-bold uppercase">Tasky</h1>
    <div class="flex justify-between items-center">
      <RouterLink
        v-for="path in paths"
        :to="path.link"
        :class="{
          'px-4 text-lg font-semibold relative before:absolute before:right-[10%]  before:h-[.125rem] before:bg-black before:top-full  before:transition-all before:rounded-lg': true,
          'before:w-[80%]': route.path === path.link,
          'before:w-0 hover:before:w-[80%]': route.path !== path.link,
        }"
        >{{ path.name }}</RouterLink
      >
    </div>
    <button
      @click="authStore.signOutUser"
      class="bg-black text-white rounded-md p-3 hover:bg-slate-700 transition-all"
    >
      Sign out
    </button>
  </nav>
</template>

<style scoped></style>
