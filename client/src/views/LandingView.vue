<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome</h2>
      <form @submit.prevent="handleLogin">
        <Input id="email" label="Email" v-model="email" type="email" required />
        <Input id="password" label="Password" v-model="password" type="password" required />

        <Button @click="handleLogin">Log in</Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from "vue-toastification";

const authStore = useAuthStore()
const toast = useToast()
const email = ref('')
const password = ref('')
const router = useRouter()

async function handleLogin() {
  authStore.login(email.value, password.value)
    .then(() => router.push("/list"))
    .catch((e) => {
      toast.error(e.response.data.message)
    })
}
</script>
