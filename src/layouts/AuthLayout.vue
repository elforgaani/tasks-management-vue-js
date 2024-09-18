<script setup>
import { RouterView, RouterLink } from "vue-router";
import img from "@/assets/images/main-picture.png";
</script>

<template>
  <main class="w-full min-h-screen flex justify-center items-center">
    <div class="w-full px-4 md:w-[30%]"><RouterView /></div>
    <img :src="img" alt="Auth Layout Image" class="hidden md:block" />
  </main>
</template>
