<template>
  <v-card class="bg-card" elevation="24">
    <h1 class="text-center py-8">Welcome back!</h1>

    <v-form ref="form" @submit.prevent="handleLogin">
      <v-text-field
        v-model="email"
        color="blue-lighten-2"
        label="Email"
        type="email"
        required
        outlined
      />
      <v-text-field
        v-model="password"
        color="blue-lighten-2"
        label="Password"
        type="password"
        required
        outlined
      />
      <v-btn type="submit" color="primary" class="mt-1" size="large" block
        >Login</v-btn
      >
    </v-form>
    <slot name="footer" />
  </v-card>
</template>

<script>
import { useAuthStore } from "@/stores/auth"; // Importing the merged auth store
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const authStore = useAuthStore(); // Access the auth store
    const router = useRouter();
    const email = ref(""); // Bind email input
    const password = ref(""); // Bind password input
    const toast = useToast();

    const handleLogin = async () => {
      const success = await authStore.login(email.value, password.value); // Use the store's login action
      if (!success) {
        toast.error("Login failed"); // Display error toast if login fails
      } else {
        toast.success("Login successful"); // Display success toast if login succeeds
        // Redirect to the previously requested page, or to /dashboard if none is specified
        const redirect =
          router.currentRoute.value.query.redirect || "/dashboard";
        router.push(redirect);
      }
    };

    return { email, password, handleLogin };
  },
};
</script>

<style scoped>
.bg-card {
  /* From https://css.glass */
  background: rgba(53, 108, 177, 0.22);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.3px);
  -webkit-backdrop-filter: blur(3.3px);
}
</style>
