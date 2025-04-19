import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LandingView from "@/views/LandingView.vue";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.roleType == "a") {
          next("/list");
        } else {
          next();
        }
      },
    },
    {
      path: "/list",
      name: "home",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        const toast = useToast();
        if (authStore.roleType !== "a") {
          toast.error("Unauthorized access. Please log in as an admin.");
          next("/");
        } else {
          next();
        }
      },
    },
  ],
});

export default router;
