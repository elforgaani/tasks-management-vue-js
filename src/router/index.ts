import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import Home from "@/pages/Home.vue";
import Settings from "@/pages/Settings.vue";
import SignIn from "@/pages/SignIn.vue";
import SignUp from "@/pages/SignUp.vue";
import { useAuthStore } from "@/stores/auth-store";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: "", name: "home", component: Home },
      { path: "/settings", name: "settings", component: Settings },
    ],
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthLayout,
    meta: {
      requiresAuth: false,
    },
    children: [
      { path: "", name: "sign-in", component: SignIn },
      { path: "/auth/sign-up", name: "sign-up", component: SignUp },
    ],
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user) {
    return next("/auth");
  } else if (!to.meta.requiresAuth && authStore.user) {
    next("/");
  } else {
    next();
  }
});
