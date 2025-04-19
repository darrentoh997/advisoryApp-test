<template>
  <header class="relative top-0 bg-primary shadow-lg">
    <nav class="container flex flex-row items-center text-white py-6">
      <div class="flex items-center grow">
        <router-link :to="{ name: 'landing' }">
          <a class="text-2xl font-semibold"> AdvisoryApps</a>
        </router-link>
      </div>

      <div class="relative">
        <Button v-if="authStore.isAuthenticated()" @click="logout">Logout</Button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import Button from "./Button.vue";
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const props = defineProps({
});
const router = useRouter()
const logout = () => {
  authStore.logout();
  router.push("/")
};
</script>